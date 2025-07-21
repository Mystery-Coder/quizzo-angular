import { Routes } from '@angular/router';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play-quiz/:quizName', component: PlayQuizComponent },
  { path: 'create-quiz/:quizName', component: CreateQuizComponent },
];
