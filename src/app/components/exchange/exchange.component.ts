import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent {
  theme$ = this.cryptoService.theme$;
  exchange$ = this.cryptoService.exchange$;
  baseCurrency = 'ETH';
  secondCurrency = 'USD';


  baseCurrencyAmount: number = 1;
  secondCurrencyAmount:number = 1;

  constructor(private router: Router, private cryptoService: CryptoService) { }

  
  swapCurrencies() {
    let  tempCurrency = this.baseCurrency;
    this.baseCurrency = this.secondCurrency;
    this.secondCurrency = tempCurrency
    this.convert();
  }
  convert() { 
    this.cryptoService.convert(this.baseCurrency, this.secondCurrency)

  }
  firstInput(rate:number) { 
    this.secondCurrencyAmount = rate * this.baseCurrencyAmount 

  }
  secondInput(rate: number) { 
    this.baseCurrencyAmount = this.secondCurrencyAmount / rate;
    console.log('running' + this.baseCurrencyAmount)
    

  }

}
