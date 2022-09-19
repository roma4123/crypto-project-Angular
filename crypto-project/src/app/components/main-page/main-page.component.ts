import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import * as Aos from 'aos';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  // animations: [
  //   trigger('sliderFade', [
  //     state('void', style({ opacity: 0 })),
  //     transition('void <=>*', [animate('0.9s')]),
  //   ]),
  // ],
  animations: [
    trigger('sliderFade', [
      state('void', style({ opacity: 0, transform: 'translateY(1%)' })),
      // state('void <=>*', style({ opacity: 1, transform: 'translateX(100%)' })),

      transition('void <=>*', [animate('1s')]),
    ]),
  ],
})
export class MainPageComponent implements OnInit, OnDestroy {
  constructor() {}
  currentSlideIndex: number = 0;

  ngOnDestroy(): void {
    window.scroll(0, 0);
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
    }, 2500);
  }

  items: any[] = [
    'https://img.seadn.io/files/2fe77eb6fe8f9e5c0a23a492a8631def.png?fit=max&w=600',
    'https://i.seadn.io/gae/7eZlm2fpl40FGIxqQN4FrsWGUvFwy-8BIpQxhDPRgTLS8r58jwnkZha4jqRKX9CUeZ0utcLB7-cB_j76G-8XthS5rNlMVnlaYWIp?w=500&auto=format',

    'https://img.seadn.io/files/8cc7f24feadac22f5a480cd0f8535edd.png?fit=max&w=600',
    'https://img.seadn.io/files/712b2b932bb442d02967c555346ed782.png?fit=max',
    'https://img.seadn.io/files/f10814caf596ff0b0a36d0fc8a3e8e3b.png?fit=max&w=600',

    'https://i.seadn.io/gae/AJU3UPzDXvNywAmwnOdIFuo5T33KkPbyEca2l8AIsuxbYB-NKgIvjbi1_b6kcmCMRdcbiFSzu6a3_a3_ggFJNBoNvaS7z0UxJJKd?w=500&auto=format',
    'https://i.seadn.io/gae/aCZQhFVkDz_u_ZjZNIcfM6FgYULrPxWuKHsoczihaCpEkp9yksG-eKoMogmrtPtKq9jZu_YtFFLKN5kxfgYaojaPbH0sjn8HTxqsOb0?w=500&auto=format',
  ];
}
