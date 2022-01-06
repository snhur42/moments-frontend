import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Role} from "../../models/user/role";

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.authService.isAuthenticated() && this.tokenStorage.getRole() === Role.ADMIN.toString()){
      return true;
    } else {
      this.router.navigate(['']).then(r => {
        if (r) {
          window.location.reload()
        }
      })
      alert("You need to log in to access this page");
      return false
    }

  }

}


// private currentUser: User = new User;
//
// constructor(private authenticationService: AuthenticationService, private router: Router) {
//   this.authenticationService.currentUser.subscribe(data => {
//     this.currentUser = data;
//   });
// }
//
// canActivate(
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//
//   if (this.currentUser) {
//     if (route.data.roles?.indexOf(this.currentUser.role) === -1) {
//       this.router.navigate(['/401']);
//       return false;
//     }
//     return true;
//   }
//
//   this.router.navigate(['/login']);
//   return true;
// }



// constructor(private authenticationService: AuthenticationService, private router: Router,
//   private notificationService: NotificationService) {}
//
// canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//   return this.isUserLoggedIn();
// }
//
// private isUserLoggedIn(): boolean {
//   if (this.authenticationService.isUserLoggedIn()) {
//     return true;
//   }
//   this.router.navigate(['/login']);
//   this.notificationService.notify(NotificationType.ERROR, `You need to log in to access this page`);
//   return false;
// }

// constructor(private router: Router,
//   private tokenService: TokenStorageService
// ) { }
//
// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//   const currentUser = this.tokenService.getUser();
//   if (currentUser) {
//     return true;
//   }
//
//   this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
//   return false;
// }
