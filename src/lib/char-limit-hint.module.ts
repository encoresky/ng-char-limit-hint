import { NgModule } from '@angular/core';
import { CharLimitHintComponent } from './char-limit-hint.component';
import { BrowserModule } from "@angular/platform-browser";



@NgModule({
  declarations: [CharLimitHintComponent],
  imports: [BrowserModule],
  exports: [CharLimitHintComponent]
})
export class CharLimitHintModule { }
