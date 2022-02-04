import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../../services/admin.service";
import {User} from "../../../../models/user/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../../../models/user/role";
import {City} from "../../../../models/user/city";

@Component({
  selector: 'app-manager-admin',
  templateUrl: './manager-admin.component.html',
  styleUrls: ['./manager-admin.component.scss']
})
export class ManagerAdminComponent implements OnInit {
  managers: User[]
  isShowAddManager: boolean
  isShowEditManager: boolean
  public createManagerForm: FormGroup;
  public updateManagerForm: FormGroup;

  constructor(private adminService: AdminService,
              private formBuilder: FormBuilder) {
    this.isShowAddManager = false
    this.isShowEditManager = false
  }

  ngOnInit(): void {
    console.log('this.adminService.getAllManagers');

    this.adminService.getAllManagers()
      .subscribe({
      next: data => {
        console.log('this.managers = data;');
        this.managers = data;
      }, error: err => {
        console.log("Error ", err.value)
        this.managers = []
      }
    })
    this.createManagerForm = this.formBuilder.group({
      firstName:  ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      lastName:  ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])],
      email:   ['', Validators.compose([Validators.required, Validators.email])],
      phone:  ['', Validators.compose([Validators.required, Validators.pattern('[- +()0-9]{10}')])]
    });

    this.updateManagerForm = this.formBuilder.group({
      id:  ['', Validators.compose([Validators.required])],
      firstName:  ['', Validators.compose([Validators.required])],
      lastName:  ['', Validators.compose([Validators.required])],
      email:   ['', Validators.compose([Validators.required])],
      phone:  ['', Validators.compose([Validators.required])],
      city:  ['', Validators.compose([Validators.required])],
      role:  ['', Validators.compose([Validators.required])],
    });
  }

  createManager() {
    this.adminService.createManager(
      this.createManagerForm.value.firstName,
      this.createManagerForm.value.lastName,
      this.createManagerForm.value.email,
      this.createManagerForm.value.phone,
      City.KYIV,
      Role.MANAGER
    ).subscribe({
      error: err =>  {
        console.log(err)
      }
    })
    window.location.reload();
  }

  updateManager() {
    this.adminService.updateManager(
      this.updateManagerForm.value.id,
      this.updateManagerForm.value.firstName,
      this.updateManagerForm.value.lastName,
      this.updateManagerForm.value.email,
      this.updateManagerForm.value.phone,
      this.updateManagerForm.value.city,
      this.updateManagerForm.value.role,
    ).subscribe({
      error: err =>  {
        console.log(err)
      }
    })

    // window.location.reload();

  }

  blockManager(managerId: string){
    this.adminService.blockManager(managerId);
  }
}
