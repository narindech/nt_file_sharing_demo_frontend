import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  // getUserDetails() {
  //   // return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null;
  //   return localStorage.getItem('userInfo') ? localStorage.getItem('userInfo')! : null;
  // }

  setDataInLocalStorage(variableName: any, data: any) {
    localStorage.setItem(variableName, data);
  }

  getToken() {
      return localStorage.getItem('token');
  }

  clearStorage() {
    localStorage.removeItem('token');
    // localStorage.clear();
  }
}
