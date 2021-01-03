import { Injectable } from '@angular/core';
import { Subject, Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class LstorageService {
  private storageSub= new Subject<String>();

  constructor() { }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next('changed');
  }

  removeItem(key) {
    localStorage.removeItem(key);
    this.storageSub.next('changed');
  }
}
