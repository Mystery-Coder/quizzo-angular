import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgIf, NgFor } from '@angular/common';
import { Question } from '../../types';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-create-quiz',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    NgIf,
    NgFor,
    MatIcon,
  ],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css',
})
export class CreateQuizComponent {
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  quizName = '';
  questionsAdded = 0;
  submittedQuestions: Question[] = [];
  question = '';
  option1 = '';
  option2 = '';
  option3 = '';
  option4 = '';
  answer = '';

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.quizName = params['quizName'];
    });
  }

  addQuestion() {
    if (
      this.question == '' ||
      this.option1 == '' ||
      this.option2 == '' ||
      this.option3 == '' ||
      this.option4 == '' ||
      this.answer == ''
    ) {
      this.snackBar.open('Fill all Fields', 'Dismiss', {
        duration: 1 * 1000,
      });
      return;
    }
    let submittedQuestion: Question = {
      question_id: 0, // Dummy ID's for DB
      quiz_id: 0, // Dummy ID's for DB
      question: this.question,
      answer: this.answer,
      option1: this.option1,
      option2: this.option2,
      option3: this.option3,
      option4: this.option4,
    };
    this.submittedQuestions[this.questionsAdded++] = submittedQuestion;

    this.question = '';
    this.option1 = '';
    this.option2 = '';
    this.option3 = '';
    this.option4 = '';
    this.answer = '';

    console.log(this.submittedQuestions);
  }
}
