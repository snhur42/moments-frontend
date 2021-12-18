import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user/user";
import {TokenStorageService} from "../../../../services/token-storage.service";
import {AdminService} from "../../../../services/admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user: User;

  constructor(private tokenStorageService: TokenStorageService,
              private adminService: AdminService,
              ) {
  }

  ngOnInit(): void {
    this.adminService.getAdminById(this.tokenStorageService.getUserId())
      .subscribe(data => {
        console.log("ngoninit ", this.tokenStorageService.getUserId())
        this.user = data;
      });
  }

  logout(): void{
    console.log("logout1 ", this.tokenStorageService.getUserId())
    this.adminService.logout(this.tokenStorageService.getUserId());
  }


  logout2(): void{
    console.log("logout ", this.tokenStorageService.getUserId())
  }
}
