import { Component } from '@angular/core';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  theme = false;
  searchText = '';
  constructor(private cryptoService: CryptoService) { }

  globalInfo$ = this.cryptoService.globalInfo$;

  changeTheme() { 
    this.theme = this.cryptoService.changeTheme(this.theme);
    
  }
  

}
