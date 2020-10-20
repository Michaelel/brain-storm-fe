import { ExpertAnswerInterface } from './expert-answer.interface';
import { UserInterface } from './user.interface';
import { QuestionInterface } from './question.interface';

export interface ExpertInterface {
    questionnaireId?: number;
    expertInfo?: UserInterface;
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    answers: ExpertAnswerInterface[];
    competence?: number;
    questions?: QuestionInterface[];
}
