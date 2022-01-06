import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../../services/admin.service";
import {User} from "../../../../models/user/user";

@Component({
  selector: 'app-client-admin',
  templateUrl: './client-admin.component.html',
  styleUrls: ['./client-admin.component.scss']
})
export class ClientAdminComponent implements OnInit {
  clients: User[]

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllClients().subscribe({
      next: data => {
        this.clients = data;
      }, error: err => {
        console.log(err)
        this.clients = []
      }
    })
  }


}
