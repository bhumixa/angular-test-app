import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatabaseserviceService } from '../databaseservice.service';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  currentUser: User | any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private databaseserviceService: DatabaseserviceService) {
    this.currentUser = this.databaseserviceService.currentUserValue;
    if (!this.databaseserviceService.currentUserValue) {
      this.router.navigate(['/login']);
    }

    this.route.queryParams.subscribe(params => {
      console.log(params['user'])
      this.user = JSON.parse(params['user']);
    });
  }

  ngOnInit(): void {

  }

}
