import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent {
  createForm!: FormGroup;
  submited = false;
  @Output() success = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      firstName: ['', Validators.required, Validators.minLength(4)],
      lastName: ['', Validators.required, Validators.minLength(4)],
      email: ['', Validators.required, Validators.email],
      phoneNumber: ['', Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      cartNumber: ['', Validators.required, Validators.minLength(16), Validators.maxLength(16)],
      cartCsv: ['', Validators.required, Validators.maxLength(3)],
      cartDate: ['', Validators.required, Validators.maxLength(4)]
    })
  }

  onSubmit(): void {
    const formValues = {
      firstName: this.createForm.get('firstName')?.value,
      lastName: this.createForm.get('lastName')?.value,
      email: this.createForm.get('email')?.value,
      phoneNumber: this.createForm.get('phoneNumber')?.value,
      cartNumber: this.createForm.get('cartNumber')?.value,
      cartCsv: this.createForm.get('cartCsv')?.value,
      cartDate: this.createForm.get('cartDate')?.value
    }

    this.submited = true;
    if (!formValues.firstName || !formValues.lastName || !formValues.email || !formValues.cartNumber || !formValues.cartCsv || !formValues.cartNumber) {
      alert('please make sure to fill in your information')
      return;
    } else {

      this.success.emit(formValues);
    }
  }

  get FirstName() {
    return this.createForm.get('firstName');
  }

  get LastName() {
    return this.createForm.get('lastName');
  }

  get Email() {
    return this.createForm.get('address');
  }

  get PhoneNumber() {
    return this.createForm.get('phoneNumber');
  }

  get CartNumber() {
    return this.createForm.get('cartNumber');
  }

  get CartCsv() {
    return this.createForm.get('cartCsv');
  }

  get CartDate() {
    return this.createForm.get('cartDate');
  }


}
