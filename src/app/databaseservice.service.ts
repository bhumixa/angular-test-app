import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError, } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DatabaseserviceService {
  private currentUserSubject: BehaviorSubject<User> | any;
  public currentUser: Observable<User> | any;
  public usersList: [] | any;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || 'null'));

    this.getAllUSersList().subscribe((data: any) => {
      console.log(data.results);
      this.usersList = data.results;
    })
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getAllUSersList() {
    console.log('&&&&&&')
    const headers: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS,POST, PUT",
    })

    return this.http.get("https://randomuser.me/api/?page=1&results=20&seed=foobar")
      .pipe(catchError(this.erroHandler));
  }

  getUsers(pageNUmber) {
    console.log('----' + pageNUmber)
    const headers: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS,POST, PUT",
    })

    return this.http.get("https://randomuser.me/api/?page=" + pageNUmber + "&results=10&seed=foobar")
      .pipe(catchError(this.erroHandler));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
