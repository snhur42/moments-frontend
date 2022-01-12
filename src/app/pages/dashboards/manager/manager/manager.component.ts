import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user/user";
import {LocalStorageService} from "../../../../services/local-storage.service";
import {AdminService} from "../../../../services/admin.service";
import {ManagerService} from "../../../../services/manager.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  user: User;

  constructor(private localStorageService: LocalStorageService,
              private managerService: ManagerService,
  ) {
  }

  ngOnInit(): void {
    this.managerService.getManagerById(this.localStorageService.getUserIdFromAccessToken())
      .subscribe(data => {
        this.user = data;
      });
  }

  logout(): void{

  }

}
