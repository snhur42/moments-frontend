import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moments-frontend';

  constructor(private authService: AuthService) {
  }

  delete() {
    this.authService.deleteAllRefreshToken();
  }
}
