import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user/user";
import {TokenStorageService} from "../../../../services/token-storage.service";
import {AdminService} from "../../../../services/admin.service";
import {PhotographerService} from "../../../../services/photographer.service";

@Component({
  selector: 'app-photographer',
  templateUrl: './photographer.component.html',
  styleUrls: ['./photographer.component.scss']
})
export class PhotographerComponent implements OnInit {

  user: User;

  constructor(private tokenStorageService: TokenStorageService,
              private photographerService: PhotographerService,
  ) {
  }

  ngOnInit(): void {
    this.photographerService.getPhotographerById(this.tokenStorageService.getUserId())
      .subscribe(data => {
        this.user = data;
      });
  }

  logout(): void{

  }

}
