import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:39029/api/PaymentDetail'
  formData: PaymentDetail = new PaymentDetail();
  list : PaymentDetail [];

  postPaymentDetail(){
   return this.http.post(this.baseURL,this.formData);
  }

  refreshList(){
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as PaymentDetail[]);
  }
}
