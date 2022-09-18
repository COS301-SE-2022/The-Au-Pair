import { Component, ViewChild } from '@angular/core';
import SwiperCore, { Autoplay, Swiper } from 'swiper';

SwiperCore.use([Autoplay]);

@Component({
  selector: 'the-au-pair-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent{

  @ViewChild('parentSwiper') parentSwiper: any;
  @ViewChild('auPairSwiper') auPairSwiper: any;

  constructor() {}
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.parentSwiper.swiperRef.autoplay.start();
    this.auPairSwiper.swiperRef.autoplay.start();
  }

  slideOpts = {
    speed: 400,
    loop: true,
    spaceBetween: 20,
  };

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

  setSwiperInstance(swiper: Swiper) {
    setInterval(() => {
      swiper.slideNext();
    }, 6000);
  }

  nextParentSlide() {
    this.parentSwiper?.swiperRef.slideNext(500);
  }

  previousParentSlide() {
    this.parentSwiper?.swiperRef.slidePrev(500);
  }

  nextAuPairSlide() {
    this.auPairSwiper?.swiperRef.slideNext(500);
  }

  previousAuPairSlide() {
    this.auPairSwiper?.swiperRef.slidePrev(500);
  }
}
