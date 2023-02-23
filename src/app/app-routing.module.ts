import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/page/home/home.component";
import {GameComponent} from "./core/page/game/game.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {state:  'home'}
  },
  {
    path: 'game',
    component: GameComponent,
    data: {state:  'game'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
