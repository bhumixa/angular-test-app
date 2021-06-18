import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseserviceService } from './databaseservice.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  usersList: [] | any;
  title = 'user-app';
  currentUser: User | any;
  constructor(
    private router: Router,
    private databaseserviceService: DatabaseserviceService
  ) {
    this.currentUser = this.databaseserviceService.currentUserValue;  
    
  }

  userLoggedIn(){
    console.log('--->>>>>')
    alert('-->')
    //this.currentUser = this.databaseserviceService.currentUserValue;  
  }

  
}
