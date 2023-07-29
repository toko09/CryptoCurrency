import { Component, OnInit } from '@angular/core';
import { CryptoService } from './services/crypto.service';
import { rank } from './types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private cryptoService : CryptoService) {    
  }
  rank = <rank>{
    start: 0,
    limit: 20
  }

  ngOnInit(): void {
    
    this.cryptoService.getCrypto(this.rank);
    this.cryptoService.getGlobalInfo();
    // this.cryptoService.getIcons();
  }

}
