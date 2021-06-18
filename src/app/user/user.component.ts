import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseserviceService } from '../databaseservice.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: string | any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private databaseserviceService: DatabaseserviceService
  ) {
    if (this.databaseserviceService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }


  deleteUser(userId: any) {
    console.log(userId)
  }

  viewUser(user){
    this.router.navigate(['/detail'], 
    { queryParams: { user: JSON.stringify(user) }});

  }
}
