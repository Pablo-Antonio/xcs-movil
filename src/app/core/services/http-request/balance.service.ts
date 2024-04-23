import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private autentication: string;
  private _ready: Promise<void>;

  constructor(
    private httpClient: HttpClient
  ) {
  }
  
  private async fetch(target, data = null): Promise<any>{
    return this.httpClient.post<any>(environment.api + '/balance', JSON.stringify({
      target: target,
      input: data
    })).toPromise();
  }

  getBalance({phone_number}): Promise<any>{
    return this.fetch("get_balance", {
      "phone_number": phone_number 
    });
  }
  
  getBalanceMifi({phone_number}): Promise<any>{
    return this.fetch("get_balance_mifi", {
      "phone_number": phone_number 
    });
  }
}
