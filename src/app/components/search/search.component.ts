import { Component } from '@angular/core';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  linkToSvg = '../../../assets/cryptocurrency-icons-master/svg/icon/';
  theme$ = this.cryptoService.theme$;
  searchedCrypto$ = this.cryptoService.seachedCrypto$


  constructor(private cryptoService: CryptoService) { }

}

