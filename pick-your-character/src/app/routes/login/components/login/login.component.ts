import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ModelService} from '../../../../service/model.service';
import {AlertMessage, ERROR} from '../../../../model/alert-message';
import {C} from '../../../../service/c';
import {UserDaoService} from '../../../../service/dao/user-dao.service';
import {DarkModeService} from "../../../../service/control/dark-mode.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userDao: UserDaoService,
    private model: ModelService,
    private darkModeService: DarkModeService
  ) {
  }

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode;
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl<any> } {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userDao.searchUser(this.f['username'].value, this.f['password'].value).subscribe(
      users => {
        console.log('Fetched users: ' + users);
        if (users.length === 0 || users.length > 1) {
          this.model.putBean(C.ALERT_MESSAGE, new AlertMessage('Incorrect user name or password', ERROR));
          return;
        }
        const user = users[0];
        this.model.putBean(C.USER, user);
        this.router.navigate([this.returnUrl]);
      }
    );
  }
}
