import { Component, OnInit } from '@angular/core';
import { ExpertInterface } from '../shared/interfaces/expert.interface';
import { UserService } from '../shared/services/user.service';
import { QuestionnairePassService } from './questionnaire-pass.service';
import { ComponentState } from '../shared/modules/component-state/component-state.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { defineState } from '../../environments/pure-functions';
import { QuestionInterface } from '../shared/interfaces/question.interface';

@Component({
  selector: 'app-questionnaire-pass',
  templateUrl: './questionnaire-pass.component.html',
  styleUrls: ['./questionnaire-pass.component.sass']
})
export class QuestionnairePassComponent implements OnInit {

  expert: ExpertInterface;

  state = ComponentState.Loading;

  constructor(
      private userService: UserService,
      public dataService: QuestionnairePassService,
      private router: Router,
      private route: ActivatedRoute,
  ) {
    this.dataService.questionnaireId = +this.route.snapshot.paramMap.get('questionnaireId');
}

  ngOnInit(): void {
    this.getQuestionnaire();
  }

  initExpert(): void {
    this.expert = {
      id: this.userService.user.id,
      answers: this.dataService.questions.map(question => ({
        questionId: question.id,
        answerId: null,
      })),
    };
  }

  getQuestionnaire = (): void => {
    this.state = ComponentState.Loading;
    this.dataService.getExpertQuestionnaire().subscribe(
        res => {
          this.state = defineState(res);
          this.dataService.questions = res;
          this.initExpert();
        },
        e => {
          this.state = ComponentState.Error;
          alert(e);
        },
    );
  }

  passQuestionnaire(): void {
    this.state = ComponentState.Loading;
    this.dataService.passQuestionnaire(this.expert).subscribe(
        res => {
          this.state = ComponentState.Success;
          this.router.navigate([`profile/${this.userService.user.id}`]);
        },
        e => {
          this.state = ComponentState.Success;
          alert(e);
        },
    );
  }

  get isPassButtonDisable(): boolean {
    return !!this.expert.answers.find(answer => !answer.answerId);
  }

}