import { Component, Input, OnInit } from '@angular/core';
import { QuestionInterface } from '../../interfaces/question.interface';
import { ExpertInterface } from '../../interfaces/expert.interface';
import { AnswerInterface } from '../../interfaces/answer.interface';

@Component({
  selector: 'app-questionnaire-pass-form',
  templateUrl: './questionnaire-pass-form.component.html',
  styleUrls: ['./questionnaire-pass-form.component.sass'],
})
export class QuestionnairePassFormComponent implements OnInit {

  @Input() questions: QuestionInterface[];
  @Input() expertAnswers: ExpertInterface;
  @Input() editable: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  check(answer: AnswerInterface, answers: AnswerInterface[]): void {
    answers.forEach(ans => ans.checked = false);
    answer.checked = true;
  }

}
