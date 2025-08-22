import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { QuizExists } from '../../types';
import { catchError, of } from 'rxjs';

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

  quizName = '';
  constructor(private router: Router) {}
  playQuiz() {
    if (this.quizName == '') {
      this.snackBar.open('Enter Quiz Name', 'Dismiss', { duration: 1 * 1000 });
      return;
    }
    this.router.navigate(['/play-quiz', this.quizName]);
  }
  newQuiz() {
    if (this.quizName == '') {
      this.snackBar.open('Enter Quiz Name', 'Dismiss', { duration: 1 * 1000 });
      return;
    }

    this.http
      .get<QuizExists>(
        'https://go-quizzo-api-srikar5725-oprcymdd.leapcell.dev/quiz_exists?quiz_name=' +
          this.quizName
      )
      .pipe(
        catchError((error) => {
          if (error.status == 500) {
            console.error('Server DB error');
          }
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          if (data.exists) {
            this.snackBar.open('Quiz Name Taken', 'OK', { duration: 1 * 1000 });
            return;
          }
          this.router.navigate(['/create-quiz', this.quizName]);
        }
      });
  }
}
