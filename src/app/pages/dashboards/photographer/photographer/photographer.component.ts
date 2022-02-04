import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user/user";
import {JwtTokenStorage} from "../../../../services/jwt-token-storage.service";
import {AdminService} from "../../../../services/admin.service";
import {PhotographerService} from "../../../../services/photographer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-photographer',
  templateUrl: './photographer.component.html',
  styleUrls: ['./photographer.component.scss']
})
export class PhotographerComponent implements OnInit {
  isPhotographerUploaded: boolean;
  public updateAdminForm: FormGroup;
  photographer: User;

  constructor(private photographerService: PhotographerService,
              private jwtTokenStorage: JwtTokenStorage,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.isPhotographerUploaded = false;
  }

  ngOnInit(): void {

    this.photographerService.getPhotographerById(this.jwtTokenStorage.getUserId())
      .subscribe(data => {
        this.photographer = data;
        this.isPhotographerUploaded = true;
      });
    //
    // this.updateAdminForm = this.formBuilder.group({
    //   firstName: ['', Validators.compose([Validators.required])],
    //   lastName: ['', Validators.compose([Validators.required])],
    //   email: ['', Validators.compose([Validators.required, Validators.email])],
    //   phone: ['', Validators.compose([Validators.required])]
    // })
  }



}
