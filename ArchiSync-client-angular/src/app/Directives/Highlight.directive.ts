import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight?: string; 

  constructor(private el: ElementRef) {
    this.setBackgroundColor('#fff8e1');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackgroundColor(this.appHighlight || 'yellow');
    
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackgroundColor('#fff8e1');
  }

  private setBackgroundColor(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color="black";

  }
}
