import { Component } from '@angular/core';
import  {trigger, transition, useAnimation}  from  "@angular/animations";
import {rotateCubeToLeft, moveFromLeftFade} from "ngx-router-animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:  [
    trigger('rotateCubeToLeft',  [ transition('* => *', useAnimation(moveFromLeftFade))])
  ]
})
export class AppComponent {
  title = 'sn4ke';
  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }
}
