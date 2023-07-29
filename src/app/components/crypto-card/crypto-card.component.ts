import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { CryptoService } from 'src/app/services/crypto.service';
import { cryptoCurrency, rank } from 'src/app/types/types';
@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css'],
})
export class CryptoCardComponent {
  linkToSvg = '../../../assets/cryptocurrency-icons-master/svg/icon/';
  defaultIMG = '../../../assets/cryptocurrency-icons-master/svg/icon/crpt.svg';

  svgLoadingError = false;

  constructor(private cryptoService: CryptoService) {}

  firstResponse$ = this.cryptoService.firstResponse$;
  cryptoData$ = this.cryptoService.cryptoData$;
  theme$ = this.cryptoService.theme$;

  //using these variables for arrows in html
  sortPrice = 0;
  sort1H = 0;
  sort24H = 0;
  sort7D = 0;

  rank = <rank>{
    start: 0,
    limit: 20
  }
  

  handleImageError(event: any) {
    event.target.src = this.defaultIMG;
  }
  increaseRank() { 
    this.rank.start += 20;
    this.rank.limit += 20;
    this.cryptoService.getCrypto(this.rank);
    // this.cryptoService
    console.log(this.rank)

  }
  decreaseRank() { 
    if (this.rank.start != 0) { 
      this.rank.start -= 20;
      this.rank.limit -= 20;
      this.cryptoService.getCrypto(this.rank);

    }

  }

  sortByPrice() {
    this.sort1H = 0;
    this.sort24H = 0;
    this.sort7D = 0;
    this.firstResponse$.subscribe((res) => {
      let array: cryptoCurrency[] = [...res.data];

      if (this.sortPrice % 2 == 0) {
        array.sort((a, b) => a.price_usd - b.price_usd);
        this.sortPrice++;
      } else {
        array.sort((a, b) => b.price_usd - a.price_usd);
        this.sortPrice++;
      }
      // console.log(array);
      this.cryptoData$.next(array);
    });
  }

  sortBy1H() {
    this.sortPrice = 0;
    this.sort24H = 0;
    this.sort7D = 0;
    this.firstResponse$.subscribe((res) => {
      let array: cryptoCurrency[] = [...res.data];

      if (this.sort1H % 2 == 0) {
        array.sort((a, b) => a.percent_change_1h - b.percent_change_1h);
        this.sort1H++;
      } else {
        array.sort((a, b) => b.percent_change_1h - a.percent_change_1h);
        this.sort1H++;
      }
      this.cryptoData$.next(array);
    });
  }
  sortBy24H() {
    this.sortPrice = 0;
    this.sort1H = 0;
    this.sort7D = 0;
    this.firstResponse$.subscribe((res) => {
      let array: cryptoCurrency[] = [...res.data];

      if (this.sort24H % 2 == 0) {
        array.sort((a, b) => a.percent_change_24h - b.percent_change_24h);
        this.sort24H++;
      } else {
        array.sort((a, b) => b.percent_change_24h - a.percent_change_24h);
        this.sort24H++;
      }
      this.cryptoData$.next(array);
    });
  }
  sortBy7D() {
    this.sortPrice = 0;
    this.sort1H = 0;
    this.sort24H = 0;
    this.firstResponse$.subscribe((res) => {
      let array: cryptoCurrency[] = [...res.data];

      if (this.sort7D % 2 == 0) {
        array.sort((a, b) => a.percent_change_7d - b.percent_change_7d);
        this.sort7D++;
      } else {
        array.sort((a, b) => b.percent_change_7d - a.percent_change_7d);
        this.sort7D++;
      }
      this.cryptoData$.next(array);
    });
  }
}
