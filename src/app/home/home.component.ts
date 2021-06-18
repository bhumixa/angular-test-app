import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DatabaseserviceService } from '../databaseservice.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User | any;
  users: any = [];
  currentUserSubscription: Subscription | any;
  user$: any = [];
  searchTxt = "";
  selector: string = '.user-list-div';
  pageNumber: number = 1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseserviceService: DatabaseserviceService
  ) {
    this.currentUser = this.databaseserviceService.currentUserValue;  
    if (!this.databaseserviceService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.databaseserviceService.getUsers(this.pageNumber).subscribe((data: any) => {
      console.log(data.results);
      this.user$ = this.user$.concat(data.results);
      this.databaseserviceService.usersList = this.user$
    })
  }

  onScroll() {
    this.pageNumber++;
    this.getUsers()
    console.log('scrolled!!');
  }

  clearSearch() {
    this.searchTxt = "";
    this.user$ = this.databaseserviceService.usersList;
  }

  search(event) {
    console.log(event.target.value)
    const newData = this.user$.filter(item =>
      item.name.first.toLowerCase().includes(event.target.value) || item.name.last.toLowerCase().includes(event.target.value) || item.location.city.toLowerCase().includes(event.target.value) || item.location.country.toLowerCase().includes(event.target.value)
    )
    this.user$ = newData
  }

}
