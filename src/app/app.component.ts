import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {

  constructor(
      public authService: AuthService,
      private router: Router,
      public userService: UserService,
      ) {
  }

  redirectToProfile(): void {
    this.router.navigate([`profile/${this.userService.user?.id}`]);
  }

  goToTab(url: string): void {
    this.router.navigate([url]);
  }

}
