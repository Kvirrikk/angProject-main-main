import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getApi(url : string) : Observable<any>{
    return  this.http.get<any>(url)
}

  getCategory(url : string) : Observable<any[]>{
    return  this.http.get<any[]>(url)
}

getProdCategory(url : string): Observable<any> {
  return this.http.get<any>(url)
}

getFiltered(params: any): Observable<any> {
  let httpParams = new HttpParams({ fromObject: params });
  return this.http.get<any>(`https://restaurant.stepprojects.ge/api/Products/GetFiltered`, { params: httpParams })
}

addToBasket(data: BasketItem, url : string): Observable<any> {
  return this.http.post<any>(url, data);
}


updateBasket(data: BasketItem, url : string): Observable<any> {
  return this.http.put<any>(url, data);
}


deleteProductFromBasket(id: number): Observable<any> {
  return this.http.delete<any>(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`);  
}


getTheBasket(url : string): Observable<any> {
  return this.http.get<any>(url)
}

 
}
