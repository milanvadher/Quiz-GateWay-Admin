import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Constructor
   * 
   * @param {Router} _router
   */
  constructor(private _router: Router) {
  }
  
  /**
   * Check user is login or not
   */
  canActivate(): boolean 
  {
    // Check Login status
    if (localStorage.getItem('user_info')) {
      return true;
    }

    // navigate to login page
    this._router.navigate(['/auth/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}

