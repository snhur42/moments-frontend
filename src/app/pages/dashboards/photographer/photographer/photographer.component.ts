import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user/user";
import {LocalStorageService} from "../../../../services/local-storage.service";
import {AdminService} from "../../../../services/admin.service";
import {PhotographerService} from "../../../../services/photographer.service";

@Component({
  selector: 'app-photographer',
  templateUrl: './photographer.component.html',
  styleUrls: ['./photographer.component.scss']
})
export class PhotographerComponent implements OnInit {

  user: User;

  constructor(private localStorageService: LocalStorageService,
              private photographerService: PhotographerService,
  ) {
  }

  ngOnInit(): void {
    this.photographerService.getPhotographerById(this.localStorageService.getUserIdFromAccessToken())
      .subscribe(data => {
        this.user = data;
      });
  }

  logout(): void{

  }

}
