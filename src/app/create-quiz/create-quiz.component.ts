import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-create-quiz',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css',
})
export class CreateQuizComponent {
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  quizName = '';
  questionsAdded = 0;
  question = '';
  option1 = '';
  option2 = '';
  option3 = '';
  option4 = '';

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
      this.option4 == ''
    ) {
      this.snackBar.open('Fill all Fields', 'Dismiss', {
        duration: 1 * 1000,
      });
      return;
    }
  }
}
