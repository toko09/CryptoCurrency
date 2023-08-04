import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CryptoCardComponent } from './components/crypto-card/crypto-card.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { SearchComponent } from './components/search/search.component';
import { ExchangeComponent } from './components/exchange/exchange.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptoCardComponent,
    HeaderComponent,
    SearchComponent,
    ExchangeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
