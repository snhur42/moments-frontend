import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user/user";
import {JwtTokenStorage} from "../../../../services/jwt-token-storage.service";
import {ClientService} from "../../../../services/client.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  user: User;

  constructor(private jwtTokenStorage: JwtTokenStorage,
              private clientService: ClientService,
  ) {
  }

  ngOnInit(): void {
    this.clientService.getClientById(this.jwtTokenStorage.getUserId())
      .subscribe(data => {
        this.user = data;
      });
  }

  logout(): void {

  }
}
