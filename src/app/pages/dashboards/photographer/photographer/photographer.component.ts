import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user/user";
import {JwtTokenStorage} from "../../../../services/jwt-token-storage.service";
import {PhotographerService} from "../../../../services/photographer.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-photographer',
  templateUrl: './photographer.component.html',
  styleUrls: ['./photographer.component.scss']
})
export class PhotographerComponent implements OnInit {
  isPhotographerUploaded: boolean;
  isShowUploadedImagesBlock: boolean;
  isShowAllImagesBlock: boolean;
  isShowDownloadedImagesBlock: boolean;

  photographer: User;
  formData: FormGroup;

  selected: FileList;

  photosPath: string[];


  constructor(private photographerService: PhotographerService,
              private jwtTokenStorage: JwtTokenStorage,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder) {
    this.isPhotographerUploaded = false;
  }

  ngOnInit(): void {
    this.isShowUploadedImagesBlock = false
    this.isShowAllImagesBlock = false
    this.isShowDownloadedImagesBlock = false
    this.photosPath = []

    this.photographerService.getPhotographerById(this.jwtTokenStorage.getUserId())
      .subscribe(data => {
        this.photographer = data;
        this.isPhotographerUploaded = true;
      });

    this.formData = this.formBuilder.group({
      files: []
    });
  }

  selectFile(event: any) {
    this.selected = event.target.files;
  }

  upload() {
    this.photographerService.uploadImages(this.selected).subscribe(event => {

    })
  }


  isShowAllImages() {
    if (!this.isShowAllImagesBlock) {
      this.photographerService.getPhotos().subscribe(data => {
        this.photosPath = data;
        this.isShowAllImagesBlock = true;
      })
    } else {
      this.isShowAllImagesBlock = false
    }

  }
}
