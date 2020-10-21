import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [ Validators.email, Validators.required ]],
    password: ['', [ Validators.required ]],
  });

  constructor(
      public authService: AuthService,
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<LoginComponent>,
  ) { }

  ngOnInit(): void {
  }

  goToSignup(): void {
    this.authService.isLoginMode = false;
  }

}
