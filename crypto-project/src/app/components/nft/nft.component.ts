import { Component, OnInit } from '@angular/core';
import { NftService } from 'src/app/services/nft/nft.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss'],
})
export class NftComponent implements OnInit {
  nfts: any;
  constructor(private nftService: NftService) {}

  ngOnInit(): void {
    this.nftService.getnft().subscribe((v) => {
      this.nfts = v.data;
      console.log(v);
    });
  }

  
}
