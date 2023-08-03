import {  Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css'],
})
export class CryptoCardComponent  {
  linkToSvg = '../../../assets/cryptocurrency-icons-master/svg/icon/';
  defaultIMG = '../../../assets/cryptocurrency-icons-master/svg/icon/crpt.svg';

  svgLoadingError = false;

  constructor(
    private cryptoService: CryptoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
) { }
  
  cryptoData$ = this.cryptoService.cryptoData$;
  theme$ = this.cryptoService.theme$;

  //using these variables for arrows in html
  //to save sorted pages
  sortPrice:number = Number(sessionStorage.getItem('sortPrice')) | 0;
  sort1H : number = Number(sessionStorage.getItem('sort1H')) | 0;
  sort24H : number = Number(sessionStorage.getItem('sort24H')) | 0;
  sort7D: number = Number(sessionStorage.getItem('sort7D')) | 0;
  
  //saving starting rank for reload
  starter: number = Number(sessionStorage.getItem('start'));

  

  //changes img src to default image
  handleImageError(event: any): void {
    event.target.src = this.defaultIMG;
  }

  //increseRank changes URL param 'start' to +20
  //and calls getCrypto to regenerate new data
  increaseRank() {
    this.starter! += 20;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        start: this.starter,
      },
    });

    sessionStorage.setItem('start', JSON.stringify(this.starter));

    this.cryptoService.getCrypto();
    sessionStorage.setItem('sortBy', JSON.stringify(''));
  }
  //opposite of increaseRank()
  decreaseRank() {
    if (this.starter != 0) {
      this.starter -= 20;

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          start: this.starter,
        },
      });

      sessionStorage.setItem('start', JSON.stringify(this.starter));

      this.cryptoService.getCrypto();
    }
    sessionStorage.setItem('sortBy', JSON.stringify(''));

  }

  //calls service to sort crypto by Price
  //Variables are tied to html arrows
  sortByPrice() {
    this.cryptoService.sortByPrice();
    this.sortPrice++;
    this.sort1H = 0;
    this.sort24H = 0;
    this.sort7D = 0;

    //doing this in all sort functions to keep arrows after reloading page
    sessionStorage.setItem('sortPrice', JSON.stringify(this.sortPrice));
    sessionStorage.setItem('sort1H', JSON.stringify(this.sort1H));
    sessionStorage.setItem('sort24H', JSON.stringify(this.sort24H));
    sessionStorage.setItem('sort7D', JSON.stringify(this.sort7D));

  }
  sortBy1H() {
    this.cryptoService.sortBy1H();
    this.sort1H++;
    this.sortPrice = 0;
    this.sort24H = 0;
    this.sort7D = 0;


    sessionStorage.setItem('sortPrice', JSON.stringify(this.sortPrice));
    sessionStorage.setItem('sort1H', JSON.stringify(this.sort1H));
    sessionStorage.setItem('sort24H', JSON.stringify(this.sort24H));
    sessionStorage.setItem('sort7D', JSON.stringify(this.sort7D));
  }
  sortBy24H() {
    this.cryptoService.sortBy24H();
    this.sort24H++;
    this.sortPrice = 0;
    this.sort1H = 0;
    this.sort7D = 0;

    sessionStorage.setItem('sortPrice', JSON.stringify(this.sortPrice));
    sessionStorage.setItem('sort1H', JSON.stringify(this.sort1H));
    sessionStorage.setItem('sort24H', JSON.stringify(this.sort24H));
    sessionStorage.setItem('sort7D', JSON.stringify(this.sort7D));
  }
  sortBy7D() {
    this.cryptoService.sortBy7D();
    this.sort7D++;
    this.sortPrice = 0;
    this.sort1H = 0;
    this.sort24H = 0;

    sessionStorage.setItem('sortPrice', JSON.stringify(this.sortPrice));
    sessionStorage.setItem('sort1H', JSON.stringify(this.sort1H));
    sessionStorage.setItem('sort24H', JSON.stringify(this.sort24H));
    sessionStorage.setItem('sort7D', JSON.stringify(this.sort7D));
  }
}
