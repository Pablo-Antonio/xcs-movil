import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _ready: Promise<void>;

  constructor(
    private storage: Storage
  ) {
    this._ready = new Promise(async resolve => {
      const storage = await this.storage.create();
      this._storage = storage;
      resolve();
    }) 
  }

  async setPNumber(pn: string){
    await this._ready;
    await this._storage.set('phone_number', pn);
  }

  async delPNumber(): Promise<any>{
    await this._ready;
    await this._storage.remove('phone_number');
  }

  async getPNumber(): Promise<any>{
    await this._ready;
    const pn = await this._storage.get('phone_number');
    return pn;
  }
  async setMNumber(pn: string){
    await this._ready;
    await this._storage.set('mifi_number', pn);
  }

  async delMNumber(): Promise<any>{
    await this._ready;
    await this._storage.remove('mifi_number');
  }

  async getMNumber(): Promise<any>{
    await this._ready;
    const pn = await this._storage.get('mifi_number');
    return pn;
  }
}
