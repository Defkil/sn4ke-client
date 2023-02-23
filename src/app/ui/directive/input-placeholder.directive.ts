import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appInputPlaceholder]'
})
export class InputPlaceholderDirective {

  htmlElement: HTMLInputElement;
  get value () {
    return this.htmlElement.value;
  }

  set placeholder (value: string) {
    this.htmlElement.placeholder = value;
  }

  get placeholder () {
    return this.htmlElement.placeholder;
  }

  constructor(el: ElementRef) {
    this.htmlElement = el.nativeElement;
    setTimeout(() => this.placeholderUpdater(), 500);
  }
  @Input() placeholderList: string[] = [];
  placeholderLastIndex = 0;


  placeholderUpdater() {
    if (this.value !== '') {
      this.placeholder = '';
      setTimeout(() => this.placeholderUpdater(), 5000);
      return
    }
    const isFinished = () => this.placeholderList[this.placeholderLastIndex] === this.placeholder;
    if (isFinished()) {
      this.placeholder = ''
      if (this.placeholderLastIndex === this.placeholderList.length - 1) {
        this.placeholderLastIndex = 0;
      } else {
        this.placeholderLastIndex++;
      }
    } else {
      this.placeholder = this.placeholderList[this.placeholderLastIndex].slice(0, this.placeholder.length + 1);
    }
    setTimeout(() => this.placeholderUpdater(), (isFinished() ? 2000 : 100));
  }
}
