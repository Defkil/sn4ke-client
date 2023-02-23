import {AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {roughRectangle} from "../../../game";
import {ImageOptions} from "../../../game/pixi/rough/rough.pixi.interface";

@Component({
  selector: 'app-rough-box',
  templateUrl: './rough-box.component.html',
  styleUrls: ['./rough-box.component.scss']
})
export class RoughBoxComponent implements AfterViewInit, OnChanges {
  @ViewChild('box') box!: ElementRef;

  @Input() padding = 22;
  @Input() height?:string;
  @Input() options: ImageOptions = {
    stroke: 'rgba(0,0,0,0.3)',
    strokeWidth: 1,
    roughness: 1,
  };

  ngOnChanges() {
    if (!this.box) return;
    this.setBg();
  }
  ngAfterViewInit() {
    if (this.height) {
      this.box.nativeElement.style.height = this.height;
    }
    this.setBg();
  }

  setBg() {
    const width = this.box.nativeElement.offsetWidth;
    const height = this.box.nativeElement.offsetHeight;
    const bg = roughRectangle({
      x: 0,
      y: 0,
      width,
      height,
      options: this.options,
      padding: this.padding
    })
    const childPadding = this.padding / 2;
    this.box.nativeElement.style.backgroundImage = `url(${bg})`;
    this.box.nativeElement.children[0].style.width = width - this.padding + 'px';
    this.box.nativeElement.children[0].style.padding = childPadding + 'px 0 0 ' + childPadding + 'px';
  }
}
