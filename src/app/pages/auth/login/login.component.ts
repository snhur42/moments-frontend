import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../../services/local-storage.service";
import {environment} from "../../../../environments/environment";
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import {Role} from "../../../models/user/role";

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
    private localStorageService: LocalStorageService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {
      if(this.localStorageService.getRoleFromAccessToken() == Role.ADMIN){
        this.router.navigate(['admin_panel']);
      }
    }

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
    ).subscribe({
      next: data => {
        if(data.success) {
          this.localStorageService.saveAccessToken(data.accessToken);
          this.router.navigate([LoginComponent.getUserRole(this.localStorageService.getRoleFromAccessToken())]);
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
