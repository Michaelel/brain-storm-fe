import { Injectable } from '@angular/core';
import { QuestionInterface } from '../shared/interfaces/question.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { QuestionnaireInterface } from '../shared/interfaces/questionnaire.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {

  questionnaireId: number;

  originQuestions: QuestionInterface[];
  questions: QuestionInterface[];
  questionnaire: QuestionnaireInterface;

  constructor(private api: ApiService) { }

  getQuestionnaireWithAnotherLinks(questionnaire: QuestionInterface[]): QuestionInterface[] {
    return questionnaire.map(item => ({ ...item, answers: item.answers.map(answer => ({ ...answer })) }));
  }

  getQuestionnaire(): Observable<QuestionnaireInterface> {
    return this.api.getQuestionnaire(this.questionnaireId).pipe(
      map(questionnaire => this.setTemporaryIdsForQuestionnaire(questionnaire)),
    );
  }

  editQuestionnaire(questionnaire: QuestionnaireInterface): Observable<QuestionnaireInterface> {
    return this.api.editQuestionnaire({ ...questionnaire, questions: this.questions, id: this.questionnaireId }).pipe(
      map(questionnaire => this.setTemporaryIdsForQuestionnaire(questionnaire)),
    );
  }

  setTemporaryIdsForQuestionnaire(questionnaire: QuestionnaireInterface): QuestionnaireInterface {
    return {
      ...questionnaire,
      questions: questionnaire.questions.map(question => (
        {
          ...question,
          temporaryId: question.id,
          answers: question.answers.map(answer => ({ ...answer, temporaryId: answer.id })),
        }),
      ),
    };
  }

}
