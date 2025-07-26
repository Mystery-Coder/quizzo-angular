import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgIf, DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Question, QuizDataResponse } from '../../types';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-play-quiz',
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    MatIcon,
    MatButtonModule,
    RouterLink,
    DatePipe,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './play-quiz.component.html',
  styleUrl: './play-quiz.component.css',
})
export class PlayQuizComponent {
  private activatedRoute = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private snackBarDuration = 1;

  quizFound = false;
  isLoaded = false;
  questionIndex = 0;
  selectedOption = '';
  noOfQuestions = 0;
  correctAnswers = 0;
  quizComplete = false;

  quizData: QuizDataResponse | null = null;

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      let quizName = params['quizName'];
      this.http
        .get<QuizDataResponse>(
          'http://localhost:8000/quiz?quiz_name=' + quizName
        )
        .pipe(
          catchError((error) => {
            if (error.status === 404) {
              // Check API Reference
              console.error('Quiz not found.');
            } else {
              console.error('An error occurred:', error);
            }
            return of(null);
          })
        )
        .subscribe((data) => {
          if (data) {
            console.log(data);
            this.quizFound = true;
            this.quizData = data;
            this.noOfQuestions = this.quizData.questions.length;
          } else {
            console.log('No data to display.');
          }
          this.isLoaded = true;
        });
    });
  }

  get currentQuestion(): Question {
    return this.quizData!.questions[this.questionIndex];
  }

  nextQuestion() {
    if (this.questionIndex < this.noOfQuestions) {
      if (this.selectedOption == '') {
        this.snackBar.open('Select an Option', 'Dismiss', {
          duration: this.snackBarDuration * 1000,
        });
        return;
      }

      let answer = this.currentQuestion.answer;

      if (this.selectedOption == answer) {
        this.correctAnswers += 1;
      }
      if (this.questionIndex == this.noOfQuestions - 1) {
        // Last Question
        this.quizComplete = true;
        return;
      }
      this.questionIndex++;
      this.selectedOption = '';
    }
  }
}
