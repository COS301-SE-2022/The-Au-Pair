import { Component } from '@angular/core';

@Component({
  selector: 'the-au-pair-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {

  scrollToParent() {
    document.getElementById('section-parent')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  scrollToAuPair() {
    document.getElementById('section-au-pair')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
