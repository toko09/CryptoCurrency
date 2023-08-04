export interface firstResponse {
  data: cryptoCurrency[];
  info: {
    coins_num: number;
    time: number;
  };
}

export interface cryptoCurrency {
  csupply: number;
  id: number;
  market_cap_usd: number;
  msupply: number;
  name: string;
  nameid: string;
  percent_change_1h: number;
  percent_change_7d: number;
  percent_change_24h: number;
  price_btc: number;
  price_usd: number;
  rank: number;
  symbol: string;
  tsupply: number;
  volume24: number;
  volume24a: number;
}

export interface globalInfo {
  coins_count: number;
  active_markets: number;
  total_mcap: number;
  total_volume: number;
  btc_d: string;
  eth_d: string;
  mcap_change: string;
  volume_change: string;
  avg_change_percent: string;
  volume_ath: number;
  mcap_ath: number;
}
export interface exchange {
  asset_id_base: string;
  asset_id_quote: string;
  rate: number;
  time: string;
}
