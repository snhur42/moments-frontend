import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user/user";
import {AdminService} from "../../../../services/admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../../../models/enum/role";
import {City} from "../../../../models/enum/city";

@Component({
  selector: 'app-photographer-admin',
  templateUrl: './photographer-admin.component.html',
  styleUrls: ['./photographer-admin.component.scss']
})
export class PhotographerAdminComponent implements OnInit {
  photographers: User[]
  isShowAddPhotographer: boolean
  isShowEditPhotographer: boolean
  public createPhotographerForm: FormGroup;
  public updatePhotographerForm: FormGroup;

  constructor(private adminService: AdminService,
              private formBuilder: FormBuilder) {
    this.isShowAddPhotographer = false
    this.isShowEditPhotographer = false
  }

  ngOnInit(): void {
    console.log('this.adminService.getAllPhotographers');
    this.adminService.getAllPhotographers()

      .subscribe({
        next: data => {
          console.log('this.photographers = data;');

          this.photographers = data;
        }, error: err => {
          console.log(err)
          this.photographers = []
        }
      })
    this.createPhotographerForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('[- +()0-9]{10}')])]
    });

    this.updatePhotographerForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])],
    });
  }

  createPhotographer() {
    this.adminService.createPhotographer(
      this.createPhotographerForm.value.firstName,
      this.createPhotographerForm.value.lastName,
      this.createPhotographerForm.value.email,
      this.createPhotographerForm.value.phone,
      City.KYIV,
      Role.PHOTOGRAPHER
    ).subscribe({
      error: err => {
        console.log(err)
      }
    })
    window.location.reload();
  }

  updatePhotographer() {
    this.adminService.updatePhotographer(
      this.updatePhotographerForm.value.id,
      this.updatePhotographerForm.value.firstName,
      this.updatePhotographerForm.value.lastName,
      this.updatePhotographerForm.value.email,
      this.updatePhotographerForm.value.phone,
      this.updatePhotographerForm.value.city,
      this.updatePhotographerForm.value.role,
    ).subscribe({
      error: err => {
        console.log(err)
      }
    })

    // window.location.reload();

  }

  blockPhotographer(photographerId: string) {
    this.adminService.blockPhotographer(photographerId);
  }
}
