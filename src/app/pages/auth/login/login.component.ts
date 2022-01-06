import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../../environments/environment";
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import {Role} from "../../../models/user/role";
import {HttpHeaders} from "@angular/common/http";

const fpPromise = FingerprintJS.load({
  token: environment.fingerPrintToken
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public fingerPrint: string

constructor(
    private authService: AuthService,
    private router: Router,
    private cookies: CookieService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder) {

    if (this.authService.isAuthenticated()) {
      if(this.tokenStorage.getRole() == Role.ADMIN){
        this.router.navigate(['admin_panel']);
      }
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
    fpPromise.then(fp => fp.get())
      .then(result => {
        this.fingerPrint = result.visitorId
      })
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password,
      this.fingerPrint
    ).subscribe({
      next: data => {
        if(data.success){

          console.log(document.cookie)

          this.tokenStorage.saveAccessToken(data.accessToken);
          this.tokenStorage.saveUserId(data.userId);
          this.tokenStorage.saveExpiredDate(data.expiredDate);
          this.tokenStorage.saveRole(data.role);
          this.tokenStorage.saveFingerPrint(this.fingerPrint);

          this.router.navigate([LoginComponent.getUserRole(data.role)]);
        } else {

        }
      },
      error: err =>  {
        console.log('Login error: ', err);
      }
    })
  }

  private static getUserRole(role: string): string {
    if(role === "ADMIN"){
      return "admin_panel";
    }else if(role === "MANAGER"){
      return "manager_panel";
    }else if(role === "CLIENT"){
      return "client_panel";
    }else if(role === "PHOTOGRAPHER"){
      return "photographer_panel";
    }else {
      return "error";
    }
  }

}
