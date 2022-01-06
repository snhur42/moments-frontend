import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user/user";
import {TokenStorageService} from "../../../../services/token-storage.service";
import {AdminService} from "../../../../services/admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import {environment} from "../../../../../environments/environment";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

const fpPromise = FingerprintJS.load({
  token: environment.fingerPrintToken
})


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public fingerPrint: string
  isAdminUploaded: boolean;
  isShowEditAdmin: boolean;
  public updateAdminForm: FormGroup;
  user: User;

  constructor(private adminService: AdminService,
              private tokenStorageService: TokenStorageService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cookies: CookieService) {
    this.isAdminUploaded = false;
    this.isShowEditAdmin = false;
  }

  ngOnInit(): void {
    fpPromise.then(fp => fp.get())
      .then(result => {
        this.fingerPrint = result.visitorId
      })

    this.adminService.getAdminById(this.tokenStorageService.getUserId())
      .subscribe(data => {
        this.user = data;
        this.isAdminUploaded = true;
      });


      this.updateAdminForm = this.formBuilder.group({
        firstName: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        phone: ['', Validators.compose([Validators.required])]
      })

    console.log("refreshToken", this.cookies.get("refreshToken"))

  }


  updateAdmin() {
    this.adminService.updateAdmin(
      this.user.id,
      this.updateAdminForm.value.firstName,
      this.updateAdminForm.value.lastName,
      this.updateAdminForm.value.email,
      this.updateAdminForm.value.phone,
      this.user.role,
      this.user.city
    ).subscribe({
      next: data => {
        if(data.success){
          this.user = data;
        } else {
          alert("Error of getting user")
        }
      },
      error: err =>  {
        console.log(err)
      }
    })

    window.location.reload();

  }

  logout(): void{
    this.adminService.logout(this.tokenStorageService.getUserId(), this.fingerPrint);
    this.router.navigate(['']).then(r => {
      if (r) {
        window.location.reload()
      }
    })
  }




}
