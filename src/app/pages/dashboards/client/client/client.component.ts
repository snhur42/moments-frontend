import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user/user";
import {LocalStorageService} from "../../../../services/local-storage.service";
import {AdminService} from "../../../../services/admin.service";
import {ClientService} from "../../../../services/client.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  user: User;

  constructor(private localStorageService: LocalStorageService,
              private clientService: ClientService,
  ) {
  }

  ngOnInit(): void {
    this.clientService.getClientById(this.localStorageService.getUserIdFromAccessToken())
      .subscribe(data => {
        this.user = data;
      });
  }

  logout(): void{

  }
}
