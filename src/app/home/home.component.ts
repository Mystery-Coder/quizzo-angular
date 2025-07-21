import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  quizName = '';
  constructor(private router: Router) {}
  playQuiz() {
    if (this.quizName == '') {
      alert('Enter Quiz Name');
      return;
    }
    this.router.navigate(['/play-quiz', this.quizName]);
  }
  newQuiz() {
    if (this.quizName == '') {
      alert('Enter Quiz Name');
      return;
    }
    this.router.navigate(['/create-quiz', this.quizName]);
  }
}
