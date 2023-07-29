import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cryptoCurrency, firstResponse, globalInfo,   rank } from '../types/types';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  baseUrl = 'https://api.coinlore.net';
  iconUrl = 'https://www.pngwing.com/en/search?q=bitcoin';

  public firstResponse$ = new BehaviorSubject<firstResponse>({
    data: [],
    info: {
        coins_num: 0,
        time: 0
    }
  })

  public globalInfo$ = new Subject<globalInfo>();
  public cryptoData$ = new Subject<cryptoCurrency[]>();
  public theme$ = new Subject<boolean>();

  get cryptoData() {
    return this.cryptoData$.asObservable();
  }

  constructor(private http: HttpClient) { }
  


  getCrypto(rank: rank) {
    
  this.http.get<firstResponse>(`${this.baseUrl}/api/tickers/`, {
    params: {
      start: rank.start,
      limit: rank.limit,
    }
  })
      .subscribe((response) => {
        console.log(response)
        this.cryptoData$.next(response.data)
        this.firstResponse$.next(response)
      });
  }

  getGlobalInfo() {
    this.http.get<globalInfo[]>(`https://api.coinlore.net/api/global/`).subscribe(
      (response) => {
        this.globalInfo$.next(response[0])
      }
    );


  }

  changeTheme(theme: boolean) {
    console.log("Entered service theme was: " + theme)
    if (theme == true) {
      this.theme$.next(false);
      return false;
    } else {
      this.theme$.next(true);
      return true;
    }
  }
}
