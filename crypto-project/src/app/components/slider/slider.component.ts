import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DatabaseService } from 'src/app/services/database/database.service';
import { BehaviorSubject } from 'rxjs';

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
  constructor(private database: DatabaseService) {}
  currentSlideIndex: number = 0;
  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  ngOnInit(): void {
    setInterval(() => {
      this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
    }, 4000);
    this.isLogged$ = this.database.isLogged$;
  }
  items: any[] = [
    '../../../assets/slider-pic-5.png',
    '../../../assets/slider-pic-2.png',
    '../../../assets/slider-pic-1.png',

    '../../../assets/axali-1.png',
  ];
}
