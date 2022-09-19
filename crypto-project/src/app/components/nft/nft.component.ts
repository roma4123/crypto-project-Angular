import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INft } from 'src/app/models/nft.models';
import { NftService } from 'src/app/services/nft/nft.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss'],
})
export class NftComponent implements OnInit, OnDestroy {
  nftArr$: BehaviorSubject<INft[]> = new BehaviorSubject([] as INft[]);
  constructor(private nftService: NftService) {}

  ngOnInit(): void {
    this.nftArr$ = this.nftService.getNftArr();
  }

  ngOnDestroy(): void {
    window.scroll(0, 0);
  }
}
