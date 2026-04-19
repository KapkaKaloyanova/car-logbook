import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appExpiryWarning]',
  standalone: true
})
export class ExpiryWarningDirective implements OnInit {
  @Input() appExpiryWarning: string = ''

  constructor(private el: ElementRef, private renderer: Renderer2) { }


  ngOnInit(): void {
    if (!this.appExpiryWarning) return; 

    const date = new Date(this.appExpiryWarning);
    const soon = new Date();
    soon.setDate(soon.getDate() + 14);
    const today = new Date();

    if (date < today) {
      this.renderer.addClass(this.el.nativeElement, 'expired');
    } else if (date <= soon) {
      this.renderer.addClass(this.el.nativeElement, 'warning');
    }

  }
}
