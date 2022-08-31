import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetimetrans'
})


export class DateTimeTransformPipe implements PipeTransform {
    transform(date?: string, format?: string) {
        console.log("transform ", date)
        if (date){
            return date
        }
        // 2022-08-04T00:00:00
        if (date == null){
            return ""
        }
        let datePart = date.substring(0, date.indexOf(' '))
        let timePart = date.substring(date.indexOf(' ') + 1)

        let dateTerms = datePart.split("-");
        let timeTerms = timePart.split(":");
        console.log("datePart --> ", dateTerms[0], dateTerms[1], dateTerms[2])
        console.log("timePart --> ", timePart)
       
        let shortThaiMonth = [
            'ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.',
            'ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'
            ];  
        let longThaiMonth = [
            'มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
            'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'
            ];      
        
        let outputDateFull = [
            dateTerms[2],
            longThaiMonth[parseInt(dateTerms[1])],
            parseInt(dateTerms[0]) + 543
        ];
        let outputDateMedium = [
            dateTerms[2],
            shortThaiMonth[parseInt(dateTerms[1])],
            parseInt(dateTerms[0]) + 543
        ];
        let outputDateShort = [
            dateTerms[2],
            dateTerms[1],
            parseInt(dateTerms[0]) + 543
        ];    
        let returnDate:string;
        returnDate = outputDateMedium.join(" ");
        if(format=='full'){
            returnDate = outputDateFull.join(" ");
            returnDate += " " + timeTerms[2] + ":" + timeTerms[1] + "น.";
        }    
        if(format=='medium'){
            returnDate = outputDateMedium.join(" ");
            returnDate += " " + timeTerms[2] + ":" + timeTerms[1] + "น.";
        }      
        if(format=='short'){
            returnDate = outputDateShort.join("-");
            returnDate += " " + timeTerms[2] + ":" + timeTerms[1] + "น.";
        }    
        return returnDate;
    }
}