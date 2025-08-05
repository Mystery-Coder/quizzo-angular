import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { QuizDataResponse } from '../../types';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'confirmation-dialog',
  standalone: true,
  template: `<h2 mat-dialog-title>Submit Quiz</h2>
    <mat-dialog-content
      ><mat-form-field>
        <mat-label>Enter Submitter Name</mat-label>
        <input [(ngModel)]="submitterName" matInput /> </mat-form-field
    ></mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button (click)="submit()">Submit</button>
    </mat-dialog-actions>`,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ConfirmDialog {
  submitterName = '';
  private data = inject<QuizDataResponse>(MAT_DIALOG_DATA);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<ConfirmDialog>);

  submit() {
    if (this.submitterName == '') {
      this.snackBar.open('Name Required', 'OK', { duration: 1000 });
      return;
    }
    this.data.quiz.submitted_by = this.submitterName;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post('http://localhost:8000/new_quiz', this.data, { headers })
      .pipe(
        catchError((err) => {
          if (err.status == 400) {
            console.error('Quiz Name Taken');
            this.snackBar.open('Quiz Name Taken!', 'OK', {
              duration: 1 * 1000,
            });
          } else {
            console.error('Server Error');
          }
          return of(null);
        })
      )
      .subscribe((data) => {
        if (!data) {
          console.log('Could Not submit');
        } else {
          this.dialogRef.close(true);
        }
      });
  }
}
