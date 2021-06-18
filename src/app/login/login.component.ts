import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DatabaseserviceService } from '../databaseservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginEvent: EventEmitter<any> = new EventEmitter();
  loginForm: FormGroup | any;
  loading = false;
  submitted = false;
  returnUrl: string = '';
  error: string = '';
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
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginForm.get('username').setValue("brownbutterfly853");
    this.loginForm.get('password').setValue("fishin");
  }

  onSubmit() {
    this.error = "";
    this.submitted = true;
    let userName = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;
    let user = this.databaseserviceService.usersList.filter(x => {
      if (x.login.username == userName) {
        return x;
      }
    })
    if (!!user[0] && user[0].login.password == password) {
      this.databaseserviceService.setCurrentUser(user[0])
      this.loginEvent.emit('loggedIn');
      this.router.navigate(['/']);
    } else {
      this.error = 'Invalid Username or Password'
    }

  }

}
