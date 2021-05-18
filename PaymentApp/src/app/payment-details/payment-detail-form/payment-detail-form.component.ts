import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  //styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service: PaymentDetailService, public toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSumbit(form:NgForm){
    if(this.service.formData.paymentDetailId == 0){
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form :NgForm){
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form)
        this.toastr.success('Sumbitted Successfully', 'Payment Details')
      },
      err => {
        this.toastr.warning('Not Sumbitted Successfully', 'Payment Details')
      }
    );
  }

  updateRecord(form: NgForm){
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form)
        this.service.refreshList();
        this.toastr.info('Updated Successfully', 'Payment Details')
      },
      err => {
        this.toastr.warning('Not Updated Successfully', 'Payment Details')
      }
    );
  }

  

  resetForm(form : NgForm){
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }

}
