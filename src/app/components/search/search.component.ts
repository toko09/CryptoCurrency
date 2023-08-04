import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  linkToSvg = '../../../assets/cryptocurrency-icons-master/svg/icon/';
  theme$ = this.cryptoService.theme$;
  searchedCrypto$ = this.cryptoService.seachedCrypto$


  constructor(private cryptoService: CryptoService, private activatedRoute: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.cryptoService.getSearch(this.activatedRoute.snapshot.url[0].path);}  
}

