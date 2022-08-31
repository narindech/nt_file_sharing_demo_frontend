import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/backend/backend.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';

export interface tokenInterface {
  message?: string,
  user?: string
}

export interface fileInterface {
  data: File,
  inProgress: boolean,
  progress: number
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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  signed_in_user: string | null = '';
  already_signin = false;
  title = 'nt_file_sharing';
  imageObject: Array<imageInterface> = [];
  fileTable: Array<FileTable> = [];

  // uploadForm!: FormGroup;
  testForm!: FormGroup;

  // @ViewChild("fileUpload", {static: false}) fileUpload!: ElementRef; 
  // myfile!: File;

  constructor(private backend : BackendService, private _auth: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // this.uploadForm = this.formBuilder.group({
    //   profile: ['']
    // });
    this.testForm = this.formBuilder.group({
      // username: [''],
      // password: [''],
      avatar: [null]
    });
    console.log("ngOnInit is called. ");
    // const retrieve_token = this._auth.getToken();
    // if(retrieve_token != null){
    //   this.already_signin = true
    //   this.signed_in_user = this._auth.getUserDetails();
    //   console.log("getUserDetails --> ", this._auth.getUserDetails());
    // }
    // console.log("retrieve token --> ", retrieve_token);


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
      //   this.signed_in_user = this._auth.getUserDetails();
      //   console.log("getUserDetails --> ", this._auth.getUserDetails());
      // } else  {
      //   this._auth.clearStorage();
      // }
      this._auth.clearStorage();
      
      check_token_sub.unsubscribe();
    })


    // this.test_jwt();

    // let checkserver_sub = this.backend.checkServer().subscribe((elements: any) => {
    //   checkserver_sub.unsubscribe();
    // });
    this.pushDataToTable();
    
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
      let filemod: FileModel[] = elements;
      filemod.forEach(item => {
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

  downloadFunction(file: FileTable){
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

  deleteFunction(file: FileTable){
    console.log("delete function is called.");
    const download_sub = this.backend.delete(file).subscribe((res: tokenInterface) => {
      console.log("deleteFunction response --> ", res)
      this.pushDataToTable();
    },
    (error) => {
      console.log("deleteFunction error --> ", error)
      console.log("upload error --> ", error);
      if (error.status == 401) {
        this.tinyAlert('ลบไฟล์ไม่สำเร็จ token หมดอายุ กรุณาล็อกอินอีกครั้ง');
      } else {
        this.tinyAlert('ลบไฟล์ไม่สำเร็จ กรุณาติดต่อผู้ดูแลระบบ');
      }
      
    })
  }




  /* This is still an experiment */

  // onSubmit() {
  //   const formData = new FormData();
  //   // formData.set('assignment', this.uploadForm.get('assignment')!.value);
  //   formData.set('file', this.uploadForm.get('file')!.value);

  //   // this.http.post('http://127.0.0.1:5000/upload', formData).subscribe(
  //   //   (res) => console.log(res),
  //   //   (err) => console.log(err)
  //   // );
  //   console.log("onSubmit is called.")
  //   // console.log(formData.get('file'))
  //   const token = this._auth.getToken();
  //   this.backend.uploadfile(formData, token)
  // }

  // onFileSelect(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.uploadForm.get('file')!.setValue(file);
  //   }
  // }
  
  // onFileSelect(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.uploadForm.get('profile')!.setValue(file);
  //   }
  // }


  // uploadFile() {
  //   // const token = this._auth.getToken();
  //   const formData = new FormData();
  //   formData.append('file', this.uploadForm.get('profile')!.value);

  //   // const formData = new FormData();
  //   // formData.append('file', file);
  //   // this.backend.upload(formData, token);
  //   this.backend.upload(formData).pipe(
  //     map(event => {
  //       console.log("map and type: ", event, event.type);
  //       console.log("type: ", event.type);
        
  //     })).subscribe((element: any) => {

  //     });
  // }

  logout(){
    this._auth.clearStorage();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/login']);
  }

  tinyAlert(message: string) {
    // look at example here
    // https://www.positronx.io/angular-popup-notification-with-sweetalert2-example/
    Swal.fire(message);
  }

  submitForm(){
    let formData = new FormData();
    console.log("this.testForm.get(avartar) --> ", this.testForm.get('avatar')!.value)
    // formData.append('username', this.testForm.get('username')!.value);
    // formData.append('password', this.testForm.get('password')!.value);
    formData.append('avatar', this.testForm.get('avatar')!.value);
    // this.backend.testUploadForm(formData);
    // console.log("show me username and password in form --> ", this.testForm.get('username')!.value)
    // this.backend.postTypeRequest('uploader', formData).subscribe(elem => {
    //   console.log("elem -->", elem)
    // })
    this.backend.upload(formData).subscribe({
      next: (response) => {
        console.log("upload next --> ", response);
      },
      error: (error) => {
        console.log("upload error --> ", error);
        if (error.status == 200) {
          console.log("Good case")
          this.pushDataToTable();
          this.tinyAlert('อัพโหลดไฟล์เสร็จสมบูรณ์');
        } else if (error.status == 401) {
          this.tinyAlert('อัพโหลดไฟล์ผิดพลาด token หมดอายุ กรุณาล็อกอินใหม่อีกครั้ง');
        } else {
          this.tinyAlert('อัพโหลดผิดพลาด กรุณาติดต่อผู้ดูแลระบบ');
        }
      }
    })
  }

  uploadFileToFlask(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    console.log("uploadFileToFlask --> ", file)
    this.testForm.patchValue({
      avatar: file,
    });
    this.testForm.get('avatar')!.updateValueAndValidity()
  }

  /* This is still an experiment */

}
