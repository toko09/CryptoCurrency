import { Component} from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  theme = false;
  searchText: string = '';
  uglyText = ''
  constructor(private cryptoService: CryptoService, private router: Router) {}
  
  globalInfo$ = this.cryptoService.globalInfo$;

  changeTheme() { 
    this.theme = this.cryptoService.changeTheme(this.theme);
  } 
  
  getSearch() {
    this.cryptoService.getSearch(this.searchText);
    this.router.navigate(['/search', this.searchText])
  }

  

}
