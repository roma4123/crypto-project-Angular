import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('sliderFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=>*', [animate('1s')]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  constructor() {}
  currentSlideIndex: number = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
    }, 4000);
  }
  items: any[] = [
    '../../../assets/slider-pic-5.png',

    '../../../assets/slider-pic-2.png',
    '../../../assets/slider-pic-1.png',

    '../../../assets/axali-1.png',
  ];
}
