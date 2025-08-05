import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgIf, NgFor } from '@angular/common';
import { Question, Quiz, QuizDataResponse } from '../../types';
import { MatIcon } from '@angular/material/icon';

import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
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
  private dialog = inject(MatDialog);

  quizName = '';
  questionsAdded = 0;
  submittedQuestions: Question[] = [];
  question = '';
  option1 = '';
  option2 = '';
  option3 = '';
  option4 = '';
  answer = '';

  constructor(private router: Router) {
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

  submitQuiz() {
    let quizToSubmit: Quiz = {
      quiz_id: 0,
      quiz_name: this.quizName,
      submitted_at: new Date().toISOString(),
      submitted_by: '',
    };

    if (this.submittedQuestions.length < 3) {
      this.snackBar.open('Minimum 3 Questions', 'OK', {
        duration: 0.5 * 1000,
      });
      return;
    }

    let quizDataPost: QuizDataResponse = {
      quiz: quizToSubmit,
      questions: this.submittedQuestions,
    };

    this.dialog
      .open(ConfirmDialog, {
        data: quizDataPost,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.snackBar.open('Quiz Submitted Successfully!', 'OK', {
            duration: 1.5 * 1000,
          });
        }
        this.router.navigate(['/']);
      });
  }
}

// @Component({
//   selector: 'confirmation-dialog',
//   standalone: true,
//   template: `<h2 mat-dialog-title>Submit Quiz</h2>
//     <mat-dialog-content
//       ><mat-form-field>
//         <mat-label>Enter Submitter Name</mat-label>
//         <input [(ngModel)]="submitterName" matInput /> </mat-form-field
//     ></mat-dialog-content>
//     <mat-dialog-actions>
//       <button mat-button mat-dialog-close>Cancel</button>
//       <button mat-button (click)="submit()">Submit</button>
//     </mat-dialog-actions>`,
//   imports: [
//     MatDialogTitle,
//     MatDialogContent,
//     MatDialogActions,
//     MatDialogClose,
//     MatButtonModule,
//     FormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//   ],
// })
// export class ConfirmationDialog {
//   submitterName = '';
//   private data = inject<QuizDataResponse>(MAT_DIALOG_DATA);
//   private http = inject(HttpClient);
//   private snackBar = inject(MatSnackBar);
//   private dialogRef = inject(MatDialogRef<ConfirmationDialog>);

//   submit() {
//     if (this.submitterName == '') {
//       this.snackBar.open('Name Required', 'OK', { duration: 1000 });
//       return;
//     }
//     this.data.quiz.submitted_by = this.submitterName;
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     this.http
//       .post('http://localhost:8000/new_quiz', this.data, { headers })
//       .pipe(
//         catchError((err) => {
//           if (err.status == 400) {
//             console.error('Quiz Name Taken');
//             this.snackBar.open('Quiz Name Taken!', 'OK', {
//               duration: 1 * 1000,
//             });
//           } else {
//             console.error('Server Error');
//           }
//           return of(null);
//         })
//       )
//       .subscribe((data) => {
//         if (!data) {
//           console.log('Could Not submit');
//         } else {
//           this.dialogRef.close(true);
//         }
//       });
//   }
// }
