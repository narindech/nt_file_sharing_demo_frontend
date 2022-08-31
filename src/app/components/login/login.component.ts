import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendService } from 'src/app/backend/backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export interface tokenInterface {
  message?: string,
  user?: string,
  token?: string
}

export interface imageInterface {
  image?: string,
  thumbImage?: string,
  alt?: string,
  title?: string,
  order?: number
}

export interface FileModel {
  item_id?: number,
  filename?: string,
  filepath?: string,
  filesize?: string,
  filetype?: string,
  uploadTime?: string,
  uploader?: string,
  editTime?: string,
  editor?: string
}

export interface FileTable {
  itemid?: number,
  filename?: string,
  uploadtime?: string,
  uploader?: string,
  path?: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @Input('uname') uName?: string;
  // @Input('pname') pName?: string;
  signed_in_user: string | null = '';
  already_signin = false;
  form!: FormGroup;
  title = 'nt_file_sharing';
  imageObject: Array<imageInterface> = [];
  fileTable: Array<FileTable> = [];
  // users = [
  //   { number: 1, filename: 'Murphy', updatetime: '3 สิงหาคม 2565 - 16.08 น.', email: 'frank.murphy@test.com' },
  //   { number: 2, filename: 'Reynolds', updatetime: '3 สิงหาคม 2565 - 16.09 น.', email: 'vic.reynolds@test.com' },
  //   { number: 3, filename: 'Jabowski', updatetime: '3 สิงหาคม 2565 - 17.00 น.', email: 'gina.jabowski@test.com' },
  //   { number: 4, filename: 'Glaser', updatetime: '3 สิงหาคม 2565 - 19.15 น.', email: 'jessi.glaser@test.com' },
  //   { number: 5, filename: 'Bilzerian', updatetime: '3 สิงหาคม 2565 - 19.24 น.', email: 'jay.bilzerian@test.com' }
  // ];

  constructor(private backend: BackendService, private http: HttpClient, private fb: FormBuilder, private _auth: AuthService, private router: Router) { }

  ngOnInit(): void{
    console.log("ngOnInit is called. ");
    // const retrieve_token = this._auth.getToken();
    const check_token_sub = this.backend.getTypeRequest('check_token').subscribe((res: tokenInterface) => {
      console.log("check token result --> ", res);
      this.already_signin = true
      this.signed_in_user = res.user ? res.user : '';
      check_token_sub.unsubscribe();
    }, (error) => {
      console.log("check token error --> ", error);
      // if (error.status == 200) {
      //   console.log("Good case")
      //   this.already_signin = true
      //   this.signed_in_user = res.user ? res.user : '';
      // } else  {
        
      // }
      this._auth.clearStorage();
      
      check_token_sub.unsubscribe();
    })
    
    // this.test_jwt();
    this.form = this.fb.group({
      username: ['', Validators.required],
      password:['', Validators.required]
    });
    // let checkserver_sub = this.backend.checkServer().subscribe((elements: any) => {
    //   // console.log("+++++ backend checkServer --> ", elements)
    //   checkserver_sub.unsubscribe();
    // });
    this.pushDataToTable();

    this.imageObject = [{
        image: 'assets/images/img_1.jpg',
        thumbImage: 'assets/images/img_1.jpg',
        // alt: 'alt of image',
        // title: 'title of image'
      }, {
          image: 'assets/images/img_2.jpg', // Support base64 image
          thumbImage: 'assets/images/img_2.jpg', // Support base64 image
          // title: 'Image title', //Optional: You can use this key if want to show image with title
          // alt: 'Image alt', //Optional: You can use this key if want to show image with alt
          order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
      }, {
          image: 'assets/images/img_3.png',
          thumbImage: 'assets/images/img_3.png'
      }, {
          image: 'assets/images/img_4.png',
          thumbImage: 'assets/images/img_4.png'
      }, {
        image: 'assets/images/img_5.jpg',
        thumbImage: 'assets/images/img_5.jpg'
      }, {
        image: 'assets/images/img_6.png',
        thumbImage: 'assets/images/img_6.png'
      }, {
        image: 'assets/images/img_7.jpg',
        thumbImage: 'assets/images/img_7.jpg'
      }, {
        image: 'assets/images/img_8.jpg',
        thumbImage: 'assets/images/img_8.jpg'
      }, {
        image: 'assets/images/img_9.jpg',
        thumbImage: 'assets/images/img_9.jpg'
      }, {
        image: 'assets/images/img_10.png',
        thumbImage: 'assets/images/img_10.png'
      }, {
        image: 'assets/images/img_11.webp',
        thumbImage: 'assets/images/img_11.webp'
      }
    ];
  }

  downloadFunction(file: FileTable){
    // const getfile = this.backend.getFiles().subscribe(sub => {
    //   console.log("sub", sub);
    //   getfile.unsubscribe();
      
    //   const download_sub = this.backend.downloadFile(file).subscribe(blob => {
    //     const a = document.createElement('a')
    //     const objectUrl = URL.createObjectURL(blob)
    //     a.href = objectUrl
    //     a.download = file.filename ? file.filename : '';
    //     a.click();
    //     URL.revokeObjectURL(objectUrl);
    //     download_sub.unsubscribe();
    //   })
    // });
    const download_sub = this.backend.downloadFile(file).subscribe(blob => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = file.filename ? file.filename : '';
      a.click();
      URL.revokeObjectURL(objectUrl);
      download_sub.unsubscribe();
    })
  }

  login(){
    let b = this.form.value
    console.log(b)

    this.backend.postTypeRequest('login', b).subscribe((res: any) => {
      console.log("res", res)
      if(res.token){
        this._auth.setDataInLocalStorage('token', res.token)
        // this._auth.setDataInLocalStorage('userInfo', res.user_info)
        this.router.navigate(['admin'])
      }
    }, err => {
      console.log("error" , err);
      this.tinyAlert('เกิดข้อผิดพลาดระหว่างเข้าสู่ระบบ ลองใหม่อีกครั้ง');
    });
  }

  logout(){
    this._auth.clearStorage();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  register(){
    const uname = document.getElementById('uname') as HTMLInputElement | null;
    const pname = document.getElementById('pname') as HTMLInputElement | null;
    const uname_value = uname?.value;
    const pname_value = pname?.value;
    console.log("register is called. ", uname_value, pname_value);

    const body=JSON.stringify({
      "username": uname_value,
      "password": pname_value
    });

    this.backend.postTypeRequest('register', body).subscribe((res: tokenInterface) => {
      if (res.user != null){
        console.log("res", res)

        this._auth.setDataInLocalStorage('token', res.token)
        this.router.navigate(['admin'])
      }
      
    }, err => {
      console.log(err)
    });

  }

  tinyAlert(message: string) {
    // look at example here
    // https://www.positronx.io/angular-popup-notification-with-sweetalert2-example/
    Swal.fire(message);
  }

  // test_jwt(){
  //   this.backend.getTypeRequest('test-jwt').subscribe((res: any) => {
  //     console.log(res)

  //   }, err => {
  //     console.log(err)
  //   });
  // }

  pushDataToTable(){
    this.fileTable = [];
    let getfile_sub = this.backend.getFiles().subscribe((elements: any) => {
      // console.log("+++++ backend getFiles --> ", elements)
      let filemod: FileModel[] = elements;
      filemod.forEach(item => {
        console.log("loop through item --> ", item);
        this.fileTable.push({
          itemid: item.item_id,
          filename: item.filename,
          uploadtime: item.uploadTime,
          uploader: item.uploader,
          path: item.filepath
        })
      })
      getfile_sub.unsubscribe();
    });
  }

  toUploadPage(){
    this.router.navigate(['admin'])
  }

  ngOnDestroy(): void{
    console.log("ngOnDestroy is called. ");
  }

}
