import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {JwtTokenStorage} from "../../../services/jwt-token-storage.service";

import {Role} from "../../../models/user/role";
import {FingerPrintService} from "../../../services/finger-print.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public fingerPrint: string;
  public errorLogin: boolean;

constructor(
    private authService: AuthService,
    private fingerPrintService: FingerPrintService,
    private router: Router,
    private jwtTokenStorage: JwtTokenStorage,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {
      if(this.jwtTokenStorage.getRole() == Role.ADMIN){
        this.router.navigate(['admin_panel']);
      }
    }

    this.errorLogin = false;

    this.loginForm = this.createLoginForm();


  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password,
      this.fingerPrintService.getFingerPrint()
    ).subscribe({
      next: data => {
        if(data.success) {
          this.jwtTokenStorage.saveToken(data.accessToken);
          this.router.navigate([LoginComponent.getUserRole(this.jwtTokenStorage.getRole())]);
        } else {
          this.errorLogin = true;
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
