import { Component, ElementRef, OnInit } from '@angular/core';
import { CryptoService } from './services/crypto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tableElementWidth!: number;
  constructor(
    private cryptoService: CryptoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  start: number = Number(sessionStorage.getItem('start'));
  ngOnInit(): void {

    if (this.start == undefined) {
      this.start = 0;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          start: this.start,
        },
      });
    }
    

    this.cryptoService.getCrypto();
    this.cryptoService.getGlobalInfo();
    
    
    // this.cryptoService.getIcons();

    

    
  }
}
