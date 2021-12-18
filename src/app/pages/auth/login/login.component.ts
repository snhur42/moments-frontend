import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder) {
    // if (this.tokenStorage.getUser()) {
    //   this.router.navigate(['main']);
    // }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
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
      'finger'
    ).subscribe({
      next: data => {
        if(data.success){
          this.tokenStorage.saveAccessToken(data.accessToken);
          this.tokenStorage.saveUserId(data.userId);
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
