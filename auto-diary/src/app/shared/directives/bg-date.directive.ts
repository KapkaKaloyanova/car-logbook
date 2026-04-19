import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBgDate]',
  standalone: true
})
export class BgDateDirective implements OnInit {
  @Input() appBgDate: string = '';
  @Input() showYear: boolean = true;
  @Input() checkExpiry: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    const date = new Date(this.appBgDate);
    const today = new Date();

    // Форматиране на дата на български
    const formatted = date.toLocaleDateString('bg-BG', {
      day: 'numeric',
      month: 'long',
      year: this.showYear ? 'numeric' : undefined
    });

    this.renderer.setProperty(
      this.el.nativeElement,
      'textContent',
      formatted
    );

    if (this.checkExpiry &&date < today) {
      this.renderer.addClass(this.el.nativeElement, 'expired');
    }
  }
}
