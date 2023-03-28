import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent {
  // createForm = new FormGroup({
  //   firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
  //   lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
  //   phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]*"), Validators.maxLength(10), Validators.maxLength(10)]),
  //   cartNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]*"), Validators.minLength(16), Validators.maxLength(16)]),
  //   cartCsv: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]*"), Validators.maxLength(3)]),
  //   cartDate: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]*"), Validators.maxLength(4)])
  // });

  submited = false;
  @Output() success = new EventEmitter();

  firstName = ''
  lastName = ''
  phoneNumber: any
  cartNumber: any
  cartCsv: any
  cartDate: any

  error = {
    firstName: false,
    lastName: false,
    phoneNumber: false,
    cartNumber: false,
    cartCsv: false,
    cartDate: false
  }

  constructor(private fb: FormBuilder) { }

  onSubmit(): void {
    const formValues = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      cartNumber: this.cartNumber,
      cartCsv: this.cartCsv,
      cartDate: this.cartDate
    }

    this.submited = true;

    this.success.emit(formValues);

  }

  firstNameChange(val: any): void {
    if (val.length === 0 || val.length < 4 || val.length > 10) {
      this.error.firstName = true;
      return;
    }
    this.error.firstName = false;
  }
  cartCsvChange(val: any): void {
    if (isNaN(val) || val.toString().length < 3) {
      this.error.cartCsv = true;
      return;
    }
    this.error.cartCsv = false;
  }
  cartDateChange(val: any): void {
    if (isNaN(val) || val.toString().length < 4) {
      this.error.cartDate = true;
      return;
    }
    this.error.cartDate = false;
  }
  cartNumberChange(val: any): void {
    if (isNaN(val) || val.toString().length < 16) {
      this.error.cartNumber = true;
      return;
    }
    this.error.cartNumber = false;
  }
  phoneNumberChange(val: number): void {
    if (isNaN(val) || val.toString().length < 9) {
      this.error.phoneNumber = true;
      return;
    }
    this.error.phoneNumber = false;
  }
  lastNameChange(val: any): void {
    if (val.length === 0 || val.length < 4 || val.length > 10) {
      this.error.lastName = true;
      return;
    }
    this.error.lastName = false;
  }

}
