import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user/user";
import {JwtTokenStorage} from "../../../../services/jwt-token-storage.service";
import {ManagerService} from "../../../../services/manager.service";
import {Router} from "@angular/router";
import {Certificate} from "../../../../models/photo_session/certificate";
import {PhotoSession} from "../../../../models/photo_session/photo-session";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  isManagerUploaded: boolean;
  isShowCertificates: boolean;
  isShowPhotoSessionBlock: boolean;
  isAddPhotoSessionBlock: boolean;

  certificates: Certificate[]
  photoSessions: PhotoSession[];

  photographers: User[];
  clients: User[];
  user: User;

  photoSessionForm: FormGroup;


  constructor(private jwtTokenStorage: JwtTokenStorage,
              private router: Router,
              private managerService: ManagerService,
              private fb: FormBuilder
  ) {
    this.isManagerUploaded = false;
    this.isShowCertificates = false;
    this.isShowPhotoSessionBlock = false;
    this.isAddPhotoSessionBlock = false;
    this.clients = []
    this.photographers = []
  }

  ngOnInit(): void {
    this.managerService.getManagerById(this.jwtTokenStorage.getUserId())
      .subscribe(data => {
        this.user = data;
        this.isManagerUploaded = true;
      });

    this.managerService.getAllClients().subscribe(data => {
      this.clients = data;
    });

    this.managerService.getAllPhotographers().subscribe(data => {
      this.photographers = data;
    });

    this.photoSessionForm = this.createPhotoSessionForm();

    this.certificates = []
    this.photoSessions = []

  }

  createPhotoSessionForm(): FormGroup {
    return this.fb.group({
      clientId: ['', Validators.compose([Validators.required])],
      photographerId: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],
      duration: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      willHappened: ['', Validators.compose([Validators.required])],
      certificateId: ['']
    });
  }

  showPhotoSessionBlock(): void {
    if (!this.isShowPhotoSessionBlock) {
      this.uploadPhotoSession()
      this.isShowPhotoSessionBlock = true;
    } else {
      this.isShowPhotoSessionBlock = false;
    }
  }

  submitPhotoSession(): void {
    this.managerService.createNewPhotoSession(
      this.jwtTokenStorage.getUserId(),
      this.photoSessionForm.value.clientId,
      this.photoSessionForm.value.photographerId,
      this.photoSessionForm.value.type,
      this.photoSessionForm.value.duration,
      this.photoSessionForm.value.location,
      this.photoSessionForm.value.city,
      this.photoSessionForm.value.willHappened,
      this.photoSessionForm.value.certificateId,
    ).subscribe({
      next: data => {
      },
      error: err => {
        console.log('Login error: ', err);
      }
    })
  }

  private uploadPhotoSession() {
    this.managerService.uploadPhotoSession().subscribe(data => {
      this.photoSessions = data
    });
  }

  showCertificatesBlock(): void {
    if(!this.isShowCertificates) {
      this.uploadCertificates()
      this.isShowCertificates = true;
    } else {
      this.isShowCertificates = false;
    }
  }

  addCertificate() {
    this.managerService.addNewCertificate().subscribe()
    this.uploadCertificates()
  }

  deleteCertificate(certificateId: string) {
    this.managerService.deleteCertificate(certificateId).subscribe()
    this.uploadCertificates()
  }


  uploadCertificates():void {
    this.managerService.getCertificates()
      .subscribe(data => {
        this.certificates = data
      });
  }

  logout(): void {
    this.managerService.logout(this.user.id);
    this.router.navigate(['']).then(r => {
      if (r) {
        window.location.reload()
      }
    })
  }
}
