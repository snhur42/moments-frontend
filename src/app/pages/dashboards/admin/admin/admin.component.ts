import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user/user";
import {JwtTokenStorage} from "../../../../services/jwt-token-storage.service";
import {AdminService} from "../../../../services/admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {CurrentBriefQuestions} from "../../../../models/photo_session/current_brief_questions";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isAdminUploaded: boolean;
  isShowEditAdmin: boolean;
  isShowUserList: boolean;
  isShowBriefQuestion: boolean;

  user: User;
  currentBriefQuestions: CurrentBriefQuestions;
  question: string;

  public updateAdminForm: FormGroup;

  constructor(private adminService: AdminService,
              private jwtTokenStorage: JwtTokenStorage,
              private cookies: CookieService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.isAdminUploaded = false;
    this.isShowEditAdmin = false;
    this.isShowUserList = false;
    this.isShowBriefQuestion = false;
    this.question = '';
  }

  ngOnInit(): void {
    this.adminService.getAdminById(this.jwtTokenStorage.getUserId())
      .subscribe(data => {
        this.user = data;
        this.isAdminUploaded = true;
      });

    this.updateAdminForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required])]
    })
  }


  updateAdmin() {
    this.adminService.updateAdmin(
      this.user.id,
      this.updateAdminForm.value.firstName,
      this.updateAdminForm.value.lastName,
      this.updateAdminForm.value.email,
      this.updateAdminForm.value.phone,
      this.user.role,
      this.user.city
    ).subscribe({
      next: data => {
        if (data.success) {
          this.user = data;
        } else {
          alert("Error of getting user")
        }
      },
      error: err => {
        console.log(err)
      }
    })
    window.location.reload();
  }

  showBriefQuestions(): void{
    if(!this.isShowBriefQuestion){
      this.adminService.getBriefQuestion()
        .subscribe(data => {
          this.currentBriefQuestions = data;
          if(this.currentBriefQuestions.questions == null){
            this.currentBriefQuestions.questions = [];
          }
          this.isShowBriefQuestion = true
        });
    }else {
      this.isShowBriefQuestion = false;
    }
  }

  addQuestionsToBrief() {

    if (this.question.trim()) {
      this.currentBriefQuestions.questions.push(this.question);
    }

    this.question = '';
  }


  logout(): void {
    this.adminService.logout(this.user.id);
    this.router.navigate(['']).then(r => {
      if (r) {
        window.location.reload()
      }
    })
  }

  upQuestion(initialIndex: number) {

    let currentQuestion: string = this.currentBriefQuestions.questions[initialIndex]
    let upperQuestion: string = this.currentBriefQuestions.questions[initialIndex-1]

    this.currentBriefQuestions.questions[initialIndex-1] = currentQuestion
    this.currentBriefQuestions.questions[initialIndex] = upperQuestion
  }

  downQuestion(initialIndex: number) {
    let currentQuestion: string = this.currentBriefQuestions.questions[initialIndex]
    let downerQuestion: string = this.currentBriefQuestions.questions[initialIndex+1]

    this.currentBriefQuestions.questions[initialIndex+1] = currentQuestion
    this.currentBriefQuestions.questions[initialIndex] = downerQuestion
  }

  deleteQuestion(question: string) {
    this.currentBriefQuestions.questions.splice(this.currentBriefQuestions.questions.indexOf(question), 1);
  }

  updateBriefQuestion() {
    this.adminService.updateBriefQuestion(this.currentBriefQuestions).subscribe()
  }
}
