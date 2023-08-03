import { Routes } from "@angular/router";
import { CryptoCardComponent } from "./components/crypto-card/crypto-card.component";
import { SearchComponent } from "./components/search/search.component";
import { ExchangeComponent } from "./components/exchange/exchange.component";

export const APP_ROUTES: Routes = [
    {path:'exchange', component:ExchangeComponent, pathMatch:'full'},
    {
        path: 'search', 
        children: [
          {
            path: ':searchedText',
            component: SearchComponent,
          },
        ],
    },
    { path: '', component: CryptoCardComponent, pathMatch: 'full' },
    
]