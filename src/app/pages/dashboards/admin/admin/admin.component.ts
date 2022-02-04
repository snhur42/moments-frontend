import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user/user";
import {JwtTokenStorage} from "../../../../services/jwt-token-storage.service";
import {AdminService} from "../../../../services/admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isAdminUploaded: boolean;
  isShowEditAdmin: boolean;
  public updateAdminForm: FormGroup;
  user: User;

  constructor(private adminService: AdminService,
              private jwtTokenStorage: JwtTokenStorage,
              private cookies: CookieService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.isAdminUploaded = false;
    this.isShowEditAdmin = false;
  }

  ngOnInit(): void {
    this.adminService.getAdminById(this.jwtTokenStorage.getUserId())
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
    this.adminService.logout(this.user.id);
    this.router.navigate(['']).then(r => {
      if (r) {
        window.location.reload()
      }
    })
  }
}
