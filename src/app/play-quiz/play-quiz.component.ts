import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-play-quiz',
  imports: [],
  templateUrl: './play-quiz.component.html',
  styleUrl: './play-quiz.component.css',
})
export class PlayQuizComponent {
  quizName = signal('');
  private activatedRoute = inject(ActivatedRoute);
  private http = inject(HttpClient);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.quizName.set(params['quizName']);
    });

    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((data) => {
        console.log('Fetched quiz data:', data);
      });
  }
}
