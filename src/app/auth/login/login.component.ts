import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Public variables
  loginForm: FormGroup;

  /**
   * Constructor
   * 
   * @param {FormBuilder} fb 
   * @param {MatSnackBar} snackBar 
   * @param {AuthService} authService 
   * @param {Router} router 
   */
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Init
   */
  ngOnInit() {
    // Init Login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Login
   */
  login() {
    console.log('LOGIN FORM : ', this.loginForm.value);
    // if (this.loginForm.valid) {
    localStorage.setItem('userData', "dummy data");
    this.router.navigateByUrl('/dashboard/dashboard');
    // }
  }

}
