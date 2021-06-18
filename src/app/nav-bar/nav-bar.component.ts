import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseserviceService } from '../databaseservice.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() currentUser: any;
  @Input() showBack : boolean = false;

  constructor(
    private router: Router,
    private databaseserviceService: DatabaseserviceService,
    private _location: Location
  ) {


  }

  ngOnInit(): void {
  }

  logout() {
    this.currentUser = null;
    this.databaseserviceService.logout();
    this.router.navigate(['/login']);
  }

  goBack(){
    this._location.back();
  }

}
