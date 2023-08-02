import { Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { cryptoCurrency, exchange, firstResponse, globalInfo } from '../types/types';
import {
  BehaviorSubject,
  Subject,
} from 'rxjs';
import { ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private widthSubject = new BehaviorSubject<number>(0);
  width$ = this.widthSubject.asObservable();
  setwidth(width: number) { 
    this.widthSubject.next(width)
  }


  baseUrl = 'https://api.coinlore.net';
  iconUrl = 'https://www.pngwing.com/en/search?q=bitcoin';

  public firstResponse$ = new BehaviorSubject<firstResponse>({
    data: [],
    info: {
      coins_num: 0,
      time: 0,
    },
  });
  public exchange$ = new Subject<exchange>();

  public globalInfo$ = new Subject<globalInfo>();
  public cryptoData$ = new Subject<cryptoCurrency[]>();
  public seachedCrypto$ = new Subject<cryptoCurrency>();
  public theme$ = new Subject<boolean>();
  
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }


  //gets URL param 'start' and uses it to get data
  //then send data to streams
  //switch checks if page was sorted before reload
  //and runs function that will recover sort
  getCrypto() {
    this.activatedRoute.queryParams.pipe().subscribe((params) => {
      this.http
        .get<firstResponse>(`${this.baseUrl}/api/tickers/`, {
          params: {
            start: params['start'],
            limit: 20,
          },
        })
        .subscribe((response) => {
          this.firstResponse$.next(response);
          this.cryptoData$.next(response.data);

          let sort = sessionStorage.getItem('sortBy');

          // this.checkPreviousSort();

          switch (sort) { 
            case '"Price"':
              this.sortByPrice();
              break;
            case '"1H"':
              this.sortBy1H();
              break;
            case '"24H"':
              this.sortBy24H();
              break;
            case '"7D"':
              this.sortBy7D();
              break;
          }

        });
    });

  }
  getGlobalInfo() {
    this.http
      .get<globalInfo[]>(`https://api.coinlore.net/api/global/`)
      .subscribe((response) => {
        this.globalInfo$.next(response[0]);
      });
  }
  changeTheme(theme: boolean) {
    console.log('Entered service theme was: ' + theme);
    if (theme == true) {
      this.theme$.next(false);
      return false;
    } else {
      this.theme$.next(true);
      return true;
    }
  }

  //getting variable asc and checking if page was sorted asc or desc
  //asc = true > ascending; asc = false > descending
  //then sorts array and saves variables in sessionStorage again
  sortByPrice() {
    let asc = sessionStorage.getItem('asc');
    let ascending: Boolean;
    if (asc === 'false') {
      ascending = false;
    }
    else { 
      ascending = true;
    }
    if (ascending == undefined) {
      console.log('after getItem - ' + ascending)
      ascending = true
     }
  
    //take FirstResponse sort it and next into CryptoData$
    this.firstResponse$.subscribe((res) => {
      let array: cryptoCurrency[] = [...res.data];

      if (ascending) {
        array.sort((a, b) => a.price_usd - b.price_usd);
        ascending = false
      } else {
        array.sort((a, b) => b.price_usd - a.price_usd);
        ascending = true
      }
      this.cryptoData$.next(array);
    });

    sessionStorage.setItem('asc', JSON.stringify(ascending));
    sessionStorage.setItem('sortBy', JSON.stringify('Price'));



    // this.router.navigate([], {
    //   relativeTo: this.activatedRoute,
    //   queryParams: {
    //     sortBy: '1h',
    //     asc: asc,
    //   },queryParamsHandling: 'merge'
    // });

    // ase linkebis damateba iwvevs llooops
  
  }
  sortBy1H() {
    let asc = sessionStorage.getItem('asc');
    let ascending: Boolean;
    if (asc === 'false') {
      ascending = false;
    }
    else { 
      ascending = true;
    }
    if (ascending == undefined) {
      console.log('after getItem - ' + ascending)
      ascending = true
     }
  
    this.firstResponse$.subscribe((res) => {
      let array: cryptoCurrency[] = [...res.data];

      if (ascending) {
        array.sort((a, b) => a.percent_change_1h - b.percent_change_1h);
        ascending = false
      } else {
        array.sort((a, b) => b.percent_change_1h - a.percent_change_1h);
        ascending = true
      }
      this.cryptoData$.next(array);
    });

    sessionStorage.setItem('asc', JSON.stringify(ascending));
    sessionStorage.setItem('sortBy', JSON.stringify('1H'));


  }
  sortBy24H() {
    let asc = sessionStorage.getItem('asc');
    let ascending: Boolean;
    if (asc === 'false') {
      ascending = false;
    }
    else { 
      ascending = true;
    }
    if (ascending == undefined) {
      console.log('after getItem - ' + ascending)
      ascending = true
     }
  
    this.firstResponse$.subscribe((res) => {
      let array: cryptoCurrency[] = [...res.data];

      if (ascending) {
        array.sort((a, b) => a.percent_change_24h - b.percent_change_24h);
        ascending = false
      } else {
        array.sort((a, b) => b.percent_change_24h - a.percent_change_24h);
        ascending = true
      }
      this.cryptoData$.next(array);
    });

    sessionStorage.setItem('asc', JSON.stringify(ascending));
    sessionStorage.setItem('sortBy', JSON.stringify('24H'));


  }
  sortBy7D() {
    let asc = sessionStorage.getItem('asc');
    let ascending: Boolean;
    if (asc === 'false') {
      ascending = false;
    }
    else { 
      ascending = true;
    }
    if (ascending == undefined) {
      console.log('after getItem - ' + ascending)
      ascending = true
     }
  
    this.firstResponse$.subscribe((res) => {
      let array: cryptoCurrency[] = [...res.data];

      if (ascending) {
        array.sort((a, b) => a.percent_change_7d - b.percent_change_7d);
        ascending = false
      } else {
        array.sort((a, b) => b.percent_change_7d - a.percent_change_7d);
        ascending = true
      }
      this.cryptoData$.next(array);
    });

    sessionStorage.setItem('asc', JSON.stringify(ascending));
    sessionStorage.setItem('sortBy', JSON.stringify('7D'));


  }

  getSearch(searchText: string) { 
    this.http
        .get<firstResponse>(`${this.baseUrl}/api/tickers/`, {
          params: {
            start: 0,
            limit: 100,
          },
          
        })
      .subscribe((result) => { 
        // console.log(result)
        let searchedObject = result.data.find(item => item.symbol.toLocaleLowerCase() === searchText.toLocaleLowerCase());
        if (!searchedObject) { 
          searchedObject = result.data.find(item => item.nameid.toLocaleLowerCase() === searchText.toLocaleLowerCase());
        }
        // console.log(searchedObject)
        this.seachedCrypto$.next(searchedObject!)
      })
    
    }

  

  convert(a: string, b: string) { 
    this.http
        .get<exchange>(`https://rest.coinapi.io/v1/exchangerate/${a}/${b}`, {
          headers: {
            "X-CoinAPI-Key": "5EA7A6F9-BA51-478F-A6D6-031174AAC731"
          },
        })
      .subscribe((response) => {
        console.log(response);
        this.exchange$.next(response)
                  
        });

  }

}
