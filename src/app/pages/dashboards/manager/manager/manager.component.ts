import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user/user";
import {JwtTokenStorage} from "../../../../services/jwt-token-storage.service";
import {AdminService} from "../../../../services/admin.service";
import {ManagerService} from "../../../../services/manager.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  user: User;

  constructor(private jwtTokenStorage: JwtTokenStorage,
              private managerService: ManagerService,
  ) {
  }

  ngOnInit(): void {
    this.managerService.getManagerById(this.jwtTokenStorage.getUserId())
      .subscribe(data => {
        this.user = data;
      });
  }

  logout(): void{

  }

}
