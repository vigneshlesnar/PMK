import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInClicked: boolean = false;
  loginForm: any;

  constructor(private service: CommonService, private router: Router, public fb: FormBuilder) {
    if (sessionStorage.getItem('pmkAdminUserDetails')) {
      this.router.navigate(['/admin/users']);
    }
  }

  ngOnInit(): void {
    this.initialLoad();
  }

  initialLoad() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  Login() {
    this.signInClicked = true;
    if (this.loginForm.value.username == 'pmk@gmail.com' && this.loginForm.value.password == 'pmk@123') {
      let userData = {
        email: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      this.service.showToastr('Logged in successfully','success', 'PMK 🥭');
      this.service.setLoginUserDetails(userData);
      this.router.navigate(['admin/users']);
    } else if (this.loginForm.invalid) {
      this.service.showToastr('Please enter valid username password','warning','PMK 🥭');
    }
  }
}
