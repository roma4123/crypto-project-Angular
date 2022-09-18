import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnDestroy(): void {
    window.scroll(0, 0);
  }

  ngOnInit(): void {}
}
