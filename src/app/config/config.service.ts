import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Item,Order, User } from './config';
import { map,retry, timeout } from 'rxjs/operators';


@Injectable()
export class ConfigService {
  token 
  url = 'https://turkstore.herokuapp.com'
  //url = 'http://localhost:5000'
  constructor(private http: HttpClient) {
   }

   private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

//Items**********************************************************************************************
getBrands():Observable<Item>{
  return this.http.get<Item>(this.url+'/items/brand').pipe(map(data=>data),retry(3))
}
getSomeItem(classify,gendary): Observable<Item>{
  return this.http.get<Item>(this.url+'/items/filteration/'+classify+'/'+gendary).pipe(map(data=>data),retry(3),timeout(30000))
}
  getDescItems(): Observable<any>{
    return this.http.get<Item>(this.url+'/items/descounter/desc').pipe(map(data => data),retry(3),timeout(20000))
  }  
  getHotItems(): Observable<Item>{
    return this.http.get<Item>(this.url+'/items/hoter/hot').pipe(map(data => data),retry(3),timeout(20000))
  }
  filterItem(gendry,filter,page?): Observable<any>{
    return this.http.post<any>(this.url+'/items/filter/'+gendry+`?page=${page}`,filter).pipe(map(data => data),retry(3),timeout(20000))
  }
  getItem(gendry,page?): Observable<any>{
    return this.http.get<any>(this.url+'/items/filtering/'+gendry+`?page=${page}`).pipe(map(data => data),retry(3),timeout(20000))
  }
  searchItem(searchFor,page?): Observable<any>{
    return this.http.get<any>(this.url+'/items/searching/'+searchFor+`?page=${page}`).pipe(map(data => data),retry(3),timeout(20000))
  }
  getItemById(id): Observable<Item>{
    return this.http.get<Item>(this.url+'/items/itemid/'+id).pipe(map(data=>data),retry(3),timeout(30000))
  }
  getRelated(classify,gendary): Observable<Item>{
    return this.http.get<Item>(this.url+'/items/related/'+classify+'/'+gendary).pipe(map(data=>data),retry(3),timeout(30000))
  }


  //Orders*************************************************************************************************
addOrder(order: Order): Observable<Order> {
  return this.http.post<Order>(this.url+'/orders', order,{ headers: { Authorization: `Bearer ${this.getToken()}` }})
    .pipe(retry(3),timeout(30000));
}
getOrder(userId): Observable<any>{
  return this.http.get(this.url+'/orders/'+userId,{ headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(map(data => data),retry(3))
}
deleteOrder(orderId): Observable<Order>{
  return this.http.delete<Order>(this.url+'/orders/'+orderId,{ headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(map(data => data),retry(3),timeout(30000))
}

//User*******************************************************************************************************
updateUser(user:User,userId): Observable<User>{
  return this.http.patch<User>(this.url+'/users/'+userId,user,{ headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(retry(3),timeout(30000))
}
resetPassword(email): Observable<any>{
  return this.http.post(this.url+'/emails/password/',email).pipe(retry(3),timeout(30000))
}

//Wishlist****************************************************************************************************
postWishlist(wishlist): Observable<any>{
  return this.http.post(this.url+'/wishlists/',wishlist,{ headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(retry(3),timeout(30000))
}
getWishlist():Observable<any>{
  return this.http.get(this.url+'/wishlists/',{ headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(map(data => data),retry(3),timeout(30000))
}
}