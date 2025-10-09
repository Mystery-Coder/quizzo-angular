import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { QuizExists } from '../../types';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  quizName = signal('');
  constructor(private router: Router) {}

  private checkQuizExists(): Observable<boolean> {
    const params = new HttpParams().set('quiz_name', this.quizName());
    let quizExistsData: QuizExists = { exists: false };
    return this.http
      .get<QuizExists>(
        'https://go-quizzo-api-srikar5725-oprcymdd.leapcell.dev/quiz_exists',
        { params }
      )
      .pipe(
        map((data) => data.exists),
        catchError((error) => {
          if (error.status == 500) {
            console.error('Server DB error');
          }
          return of(false);
        })
      );
  }
  playQuiz() {
    if (this.quizName() == '') {
      this.snackBar.open('Enter Quiz Name', 'Dismiss', { duration: 1 * 1000 });
      return;
    }

    this.checkQuizExists().subscribe((exists) => {
      if (exists) {
        this.router.navigate(['/play-quiz', this.quizName()]);
      } else {
        this.snackBar.open("Quiz Doesn't Exist", 'OK', { duration: 1 * 1000 });
      }
    });
  }
  newQuiz() {
    if (this.quizName() == '') {
      this.snackBar.open('Enter Quiz Name', 'Dismiss', { duration: 1 * 1000 });
      return;
    }

    this.checkQuizExists().subscribe((exists) => {
      if (!exists) {
        this.router.navigate(['/create-quiz', this.quizName()]);
      } else {
        this.snackBar.open('Quiz Name Taken', 'OK', { duration: 1 * 1000 });
      }
    });
  }
}
