import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user/user";
import {JwtTokenStorage} from "../../../../services/jwt-token-storage.service";
import {ManagerService} from "../../../../services/manager.service";
import {Router} from "@angular/router";
import {Certificate} from "../../../../models/photo_session/certificate";
import {PhotoSession} from "../../../../models/photo_session/photo-session";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  isManagerUploaded: boolean;
  isShowCertificates: boolean;
  isShowPhotoSessionBlock: boolean;

  certificates: Certificate[]
  photoSessions: PhotoSession[];

  user: User;


  constructor(private jwtTokenStorage: JwtTokenStorage,
              private router: Router,
              private managerService: ManagerService,
  ) {
    this.isManagerUploaded = false;
    this.isShowCertificates = false;
    this.isShowPhotoSessionBlock = false;
  }

  ngOnInit(): void {
    this.managerService.getManagerById(this.jwtTokenStorage.getUserId())
      .subscribe(data => {
        this.user = data;
        this.isManagerUploaded = true;
      });

    this.certificates = []
    this.photoSessions = []
  }

  showPhotoSessionBlock(): void {
    if(!this.isShowPhotoSessionBlock) {
      this.uploadPhotoSession()
      this.isShowPhotoSessionBlock = true;
    } else {
      this.isShowPhotoSessionBlock = false;
    }
  }

  showCertificatesBlock(): void {
    if(!this.isShowCertificates) {
      this.uploadCertificates()
      this.isShowCertificates = true;
    } else {
      this.isShowCertificates = false;
    }
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

  addCertificate() {
    this.managerService.addNewCertificate().subscribe()
    this.uploadCertificates()
  }

  deleteCertificate(certificateId: string) {
    this.managerService.deleteCertificate(certificateId).subscribe()
    this.uploadCertificates()
  }

  private uploadPhotoSession() {
    this.managerService.uploadPhotoSession().subscribe(data => {
      this.photoSessions = data
    });
  }
}
