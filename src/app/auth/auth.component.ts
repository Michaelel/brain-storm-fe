import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit {

  constructor(
      public authService: AuthService,
      public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent);
  }

  openSignUpDialog(): void {
    this.dialog.open(SignupComponent);
  }

}
