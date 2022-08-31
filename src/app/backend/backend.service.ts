import { Injectable, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FileTable {
  itemid?: number,
  filename?: string,
  uploadtime?: string,
  uploader?: string,
  path?: string
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private REST_API_SERVER = "http://127.0.0.1:5000/";
  constructor(private http: HttpClient) { }
  
  // checkServer() {
  //   let pushResult: any[] = [];
  //   const obs = new Observable(observer => {
  //     let sub = this.http.get<any>(this.REST_API_SERVER + 'checkstatus', {}).subscribe(data => {
  //       let result = data;
  //       for (var element of result['content']) {
  //         pushResult.push(element)
  //       }
  //       sub.unsubscribe();
  //     })

  //     setTimeout(() => {
  //         observer.next(pushResult);
  //     }, 500);
  //   })
  //   return obs;
  // }

  getFiles() {
    let pushResult: any[] = [];
    const obs = new Observable(observer => {
      let sub = this.http.get<any>(this.REST_API_SERVER + 'files', {}).subscribe(data => {
        let result = data;
        for (var element of result['content']) {
          pushResult.push(element)
        }
        sub.unsubscribe();
      })

      setTimeout(() => {
          observer.next(pushResult);
      }, 500);
    })
    return obs;
  }

  downloadFile(file: FileTable): Observable<Blob> {
    let url = this.REST_API_SERVER + "download/" + file.filename;
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

  upload(formData: FormData) {
    return this.http.post<any>(this.REST_API_SERVER + 'uploader', formData, {
      reportProgress: true,  
      observe: 'events'  
    });  
  }

  delete(file: FileTable){
    return this.http.delete(this.REST_API_SERVER  + 'delete/' + file.itemid).pipe(map(res => {
      return res;
    }))
  }

  // uploadfile(formParams: FormData, token: string | null) {
  //   console.log("uploadfile is called.")
  //   let head = new HttpHeaders({
  //     'x-access-tokens': token ? token : ""
  //   })
  //   console.log("upload file show me head --> " , head);
  //   return this.http.post(this.REST_API_SERVER + 'upload', formParams, {  
  //     headers : head,
  //     reportProgress: true,  
  //     observe: 'events'  
  //   }).pipe(map(res => {
  //     return res;
  //   })); 
  // }

  // uploadfile(formParams: FormData, token: string | null) {
  //   console.log("uploadfile is called.", token)
  //   let head = new HttpHeaders({
  //     'Content-Type': 'multipart/form-data',
  //     'x-access-tokens': token ? token : ""
  //   })
  //   let pushResult: any[] = [];
  //   const obs = new Observable(observer => {
  //     let sub = this.http.post<any>(this.REST_API_SERVER + 'uploader', formParams, {headers: head}).subscribe(data => {
  //       let result = data;
  //       console.log("upload data --> ", result)
  //       sub.unsubscribe();
  //     })

  //     setTimeout(() => {
  //         observer.next(pushResult);
  //     }, 500);
  //   })
  //   return obs;
  // }

  getTypeRequest(url: string) {
    return this.http.get(this.REST_API_SERVER + url).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url: string, payload: any) {
    return this.http.post(this.REST_API_SERVER + url, payload).pipe(map(res => {
      return res;
    }));
  }

  putTypeRequest(url: string, payload: any) {
    return this.http.put(this.REST_API_SERVER + url, payload).pipe(map(res => {
      return res;
    }))
  } 
}
