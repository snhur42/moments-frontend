import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user/user";
import {TokenStorageService} from "../../../../services/token-storage.service";
import {AdminService} from "../../../../services/admin.service";
import {ManagerService} from "../../../../services/manager.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  user: User;

  constructor(private tokenStorageService: TokenStorageService,
              private managerService: ManagerService,
  ) {
  }

  ngOnInit(): void {
    this.managerService.getManagerById(this.tokenStorageService.getUserId())
      .subscribe(data => {
        this.user = data;
      });
  }

  logout(): void{

  }

}
