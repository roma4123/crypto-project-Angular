import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{BehaviorSubject, Observable} from 'rxjs'
import { INft } from 'src/app/models/nft.models';
@Injectable({
  providedIn: 'root'
})
export class NftService {
  private nftArr$: BehaviorSubject<INft[]> =new BehaviorSubject( [
    {
      title: 'EmoHead #1004: Happy Aryiah',
      price: 34.96,
      img_src: 'https://i.seadn.io/gae/eosmk768gm4WkMS8XT-FE3qP4deKcArKGqHIrRkd6I7EyKzjtekUwIuoMKtz5pyLCxW7vo6acNCzNHBMNb2PWEqg0rL6tKZ2fwgr?w=500&auto=format',
      author: 'EmoHeads by Javirroyo',
      nft_id: '1'
    },
    {
      title: 'Steady Stack #1088',
      price: 3890.40,
      img_src: 'https://lh3.googleusercontent.com/awc2hS_5JIIaUgq6cu8v7nmDvrOf_6eBxieu7sWRa8oPPNE8O0isCmfrwNR-d-JaQFBx0WGgBu4NOJ5Xqm8nDWcdFq-0JYGQiGdc=s0',
      author: 'Steady Stack Titans Official',
      nft_id: '2'
    },
    {
      title: 'NICE#9605',
      price: 50.71,
      img_src: 'https://i.seadn.io/gae/7eZlm2fpl40FGIxqQN4FrsWGUvFwy-8BIpQxhDPRgTLS8r58jwnkZha4jqRKX9CUeZ0utcLB7-cB_j76G-8XthS5rNlMVnlaYWIp?w=500&auto=format',
      author: 'NICE OFFICIAL',
      nft_id: '3'
    },

    {
      title: 'rektguy #2360',
      price: 376.07,
      img_src: 'https://lh3.googleusercontent.com/YWm-yrFIdosVvof7nOwDcIuQSG9CToS49zP-hTGPA_uoB4Tt9hRwGPAP0KjWdg7wC_h5lkDIYEoZFWimb9QK2nhk-E7uQM24jJuPPw=s0',
      author: 'rektguy',
      nft_id: '4'
    },
    {
      title: 'Lazy Ape Yacht Club #3904',
      price: 129.68,
      img_src: 'https://img.seadn.io/files/712b2b932bb442d02967c555346ed782.png?fit=max',
      author: 'LAYC',
      nft_id: '5'
    },
    {
      title: 'Bad Mom #6389',
      price: 90.78,
      img_src: 'https://i.seadn.io/gae/1pZpcYqWZzuckHLvx7VZjAdza9MHtvVVZSH14hYHKqYqh3EOSQGQR3TWHqgWGgEZZBmL5A3u1oLQQG6ejJKmcDI9Y8VIQYVK7O_W?w=500&auto=format',
      author: 'LAYC',
      nft_id: '6'
    },
    
    {
      title: 'CloneX #6739',
      price: 7910.48,
      img_src: 'https://img.seadn.io/files/f10814caf596ff0b0a36d0fc8a3e8e3b.png?fit=max&w=600',
      author: 'CLONE X - X TAKASHI MURAKAMI',
      nft_id: '7'
    },
    {
      title: '3117',
      price: 42.79,
      img_src: 'https://img.seadn.io/files/2fe77eb6fe8f9e5c0a23a492a8631def.png?fit=max&w=600',
      author: 'EIPandas',
      nft_id: '8'
    },
    {
      title: 'goblintown #4589',
      price: 619.60,
      img_src: 'https://img.seadn.io/files/8cc7f24feadac22f5a480cd0f8535edd.png?fit=max&w=600',
      author: 'goblintown.wtf',
      nft_id: '9'
    },
    {
      title: 'BVDCAT #2178',
      price: 1400.54,
      img_src: 'https://i.seadn.io/gae/AJU3UPzDXvNywAmwnOdIFuo5T33KkPbyEca2l8AIsuxbYB-NKgIvjbi1_b6kcmCMRdcbiFSzu6a3_a3_ggFJNBoNvaS7z0UxJJKd?w=500&auto=format',
      author: 'BVDCATs',
      nft_id: '10'
    },
    {
      title: 'DOGGY #7127',
      price: 317.72,
      img_src: 'https://i.seadn.io/gae/kpbtjkuvJbpd5BGY-lNdyCmsSOum2jaiw1zmby5YlLvw5Avh9IxnfXjoCEMVvy0WSlKp_hdyboOJOqe-NLSJE8RbbJ49oyr1F82few?w=500&auto=format',
      author: 'The Doge Pound',
      nft_id: '11'
    },
    {
      title: 'Hooters on Hooch #1945',
      price: 884,
      img_src: 'https://i.seadn.io/gae/aCZQhFVkDz_u_ZjZNIcfM6FgYULrPxWuKHsoczihaCpEkp9yksG-eKoMogmrtPtKq9jZu_YtFFLKN5kxfgYaojaPbH0sjn8HTxqsOb0?w=500&auto=format',
      author: 'Hooter On Hooch',
      nft_id: '12'
    },
  ])
  constructor() { }

  public getNftArr(): BehaviorSubject<INft[]>{
    return this.nftArr$
  }
}
