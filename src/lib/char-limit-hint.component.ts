import { Component, OnInit, ViewChild, ElementRef, Input,ViewEncapsulation, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ng-char-limit-hint',
  template: `
    <div #content [ngClass]="parentClass">
      <ng-content></ng-content>
      <p [ngClass]="hintTextClass"> {{formattedRemainCharCount}}</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class CharLimitHintComponent implements OnInit, AfterViewInit {

  @ViewChild('content', {static : false}) content: ElementRef;
  @Input() maxCharLimit: number = 100;
  @Input() format: string = ""
  @Input() parentClass:string = "";
  @Input() hintTextClass:string = "";
  formattedRemainCharCount :string ;
  remainingCharCount: number;

  constructor() {
   }

  ngOnInit(): void {
    this.remainingCharCount = this.maxCharLimit;
    this.getFormattedResult();
  }
  ngAfterViewInit(){
    if(this.content.nativeElement.hasChildNodes('input')){
      this.content.nativeElement.firstElementChild.addEventListener('paste', (event) => {
        let clipboardText = event.clipboardData.getData('text');
        if(clipboardText.length >this.remainingCharCount){
          event.target.value += clipboardText.substring(0,event.target.value.length>0 ? this.remainingCharCount: this.maxCharLimit);
          this.remainingCharCount = 0;
        }
        else{
          event.target.value += clipboardText;
          this.remainingCharCount = this.remainingCharCount - clipboardText.length;
        }
        this.getFormattedResult();
        event.preventDefault();
      });
      this.content.nativeElement.firstElementChild.addEventListener('keydown', (event) => {
        this.remainCount(event)
      });
    }
    else{
      throw "Valid input element not found."
    }
  }
  remainCount(event){
    if(!(event.getModifierState && (event.getModifierState('Control')|| event.getModifierState('Meta')))){
      if(this.isValidKey(event.keyCode)){
        let text = event.target.value;
        let charLength = parseInt(text.length)
        let selection = event.target.selectionEnd - event.target.selectionStart
        if((event.keyCode == 8 || event.keyCode == 127)) {
          if(selection >0){
            charLength = text.length - selection;
          }
          else if (text.length<=0){
            charLength =0;
          }
          else if(text.length>=1) {
            charLength = text.length -1;
          }
        }
        else if(selection >0){
          event.target.value = text.substr(0, event.target.selectionStart) +String.fromCharCode(event.keyCode)+ text.substr(event.target.selectionEnd);
          charLength = event.target.value.length;
          this.remainingCharCount = this.maxCharLimit - charLength;
          this.getFormattedResult();
          event.preventDefault();
          event.target.setSelectionRange(event.target.selectionStart,event.target.selectionStart);
        }
        else if(text.length == this.maxCharLimit){
          event.preventDefault();
        }
        else if(text.length>=0) {
          charLength = text.length +1;
        }
        this.remainingCharCount = this.maxCharLimit - charLength;
        this.getFormattedResult();
      }
    }
  }

  getFormattedResult() {
    var result = this.format;
    if(this.format.length){
      result = result.replace("REMAIN",this.remainingCharCount.toString())
      result = result.replace("TOTAL", this.maxCharLimit.toString())
      this.formattedRemainCharCount =  result;
    }
    else {
      this.formattedRemainCharCount = this.remainingCharCount.toString();
    }
  }

  isValidKey(keycode){
    var valid = 
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223) ||
        (keycode == 8) || 
        (keycode == 127);   // [\]' (in order)
    return valid;
  }

}
