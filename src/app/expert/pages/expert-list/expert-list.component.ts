import { Component, OnInit } from '@angular/core';
import { ComponentState } from '../../../shared/modules/component-state/component-state.enum';
import { Router } from '@angular/router';
import { ExpertService } from '../../expert.service';
import { defineState } from '../../../../environments/pure-functions';
import { UserService } from '../../../shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../shared/services/api.service';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { QuestionnaireDialogComponent } from '../../../questionnaire-list/components/questionnaire-dialog/questionnaire-dialog.component';
import { ExpertInterface } from '../../../shared/interfaces/expert.interface';
import { FormControl } from '@angular/forms';
import { UserInterface } from '../../../shared/interfaces/user.interface';
import { RolesEnum } from '../../../shared/enums/roles.enum';

@Component({
  selector: 'app-expert-list',
  templateUrl: './expert-list.component.html',
  styleUrls: ['./expert-list.component.sass']
})
export class ExpertListComponent implements OnInit {

  state = ComponentState.Loading;

  displayedColumns = ['id', 'name', 'email', 'phone', 'action'];

  emailCtrl = new FormControl('');

  constructor(
      public dataService: ExpertService,
      public userService: UserService,
      private router: Router,
      private dialog: MatDialog,
      private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getUserList();
    this.emailCtrl.valueChanges.pipe(
      debounceTime(500),
    ).subscribe(() => this.getUserList());
  }

  getUserList = (): void => {
    this.state = ComponentState.Loading;
    this.dataService.getUserList(this.emailCtrl.value).subscribe(
        res => {
          this.state = defineState(res);
          this.dataService.expertList = res;
        },
        e => {
          this.state = ComponentState.Error;
          alert(e);
        },
    );
  }

  verifyUser(expert: ExpertInterface): void {
    this.api.getQuestionnaireExpertResult(1, expert.id).pipe(
      switchMap(res => this.dialog.open(
        QuestionnaireDialogComponent,
        {
          data: {
            verificationMode: true,
            expert: { ...res, expertInfo: expert },
          },
        },
                ).afterClosed(),
      ),
      filter(res => !!res),
      switchMap(res => this.api.passVerificationProcess(expert.id, res.isVerified)),
    ).subscribe();
  }

  makeAdmin(user: UserInterface): void {
    this.api.editProfileInfo({ ...user, role: RolesEnum.Admin }).subscribe(
      () => this.getUserList(),
      e => alert(e.error.message || e.error),
    );
  }

  goToUser(userId: number): void {
    this.router.navigate([`user-list/user/${userId}`]);
  }

}
