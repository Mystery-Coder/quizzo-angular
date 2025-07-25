import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { QuizDataResponse } from '../../types';

@Component({
  selector: 'app-play-quiz',
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    MatIcon,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './play-quiz.component.html',
  styleUrl: './play-quiz.component.css',
})
export class PlayQuizComponent {
  private activatedRoute = inject(ActivatedRoute);
  private http = inject(HttpClient);

  quizFound = false;
  isLoaded = false;

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
          } else {
            console.log('No data to display.');
          }
          this.isLoaded = true;
        });
    });
  }
}
