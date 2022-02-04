import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {City} from "../../../models/user/city";
import {Role} from "../../../models/user/role";
import {ClientService} from "../../../services/client.service";

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit {
  public createClientForm: FormGroup;
  public isRegSuccess: boolean;
  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService) { }

  ngOnInit(): void {
    this.createClientForm = this.formBuilder.group({
      firstName:  ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      lastName:  ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])],
      email:   ['', Validators.compose([Validators.required, Validators.email])],
      phone:  ['', Validators.compose([Validators.required, Validators.pattern('[- +()0-9]{10}')])],
      password:  ['', Validators.compose([Validators.required])]
    });

    this.isRegSuccess = false;
  }

  createClient() {
    this.clientService.createClient(
      this.createClientForm.value.firstName,
      this.createClientForm.value.lastName,
      this.createClientForm.value.email,
      this.createClientForm.value.phone,
      this.createClientForm.value.password,
      City.KYIV,
      Role.CLIENT
    ).subscribe({
      error: err =>  {
        console.log(err)
      }
    })
    this.isRegSuccess = true;
  }
}
