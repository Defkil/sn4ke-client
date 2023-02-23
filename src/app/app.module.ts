import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { HomeComponent } from './core/page/home/home.component';
import { GameComponent } from './core/page/game/game.component';
import { ButtonComponent } from './ui/button/button.component';
import { RoughBoxComponent } from './ui/rough-box/rough-box.component';
import {HttpClientModule} from "@angular/common/http";
import {InputPlaceholderDirective} from "./ui/directive/input-placeholder.directive";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    GameComponent,
    ButtonComponent,
    RoughBoxComponent,
    InputPlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
