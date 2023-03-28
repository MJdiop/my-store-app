import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent {
  createForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]*"), Validators.maxLength(10), Validators.maxLength(10)]),
    cartNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]*"), Validators.minLength(16), Validators.maxLength(16)]),
    cartCsv: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]*"), Validators.maxLength(3)]),
    cartDate: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]*"), Validators.maxLength(4)])
  });
  submited = false;
  @Output() success = new EventEmitter();

  constructor(private fb: FormBuilder) { }

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
    console.log(this.createForm);

    this.submited = true;
    if (!formValues.firstName || !formValues.lastName || !formValues.cartNumber || !formValues.cartCsv || !formValues.cartNumber) {
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
