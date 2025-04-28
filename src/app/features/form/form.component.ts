import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { ValidationService } from '../../core/services/validation.service';
import {
  ClientInfoValidators,
  AddressValidators,
  BankDetailsValidators,
  TransactionInfoValidators,
  DocumentValidators,
} from './validation/form-validation';
import { IFormModel } from '../../core/models/form.models';
import { MaterialModule } from '../../shared/modules/material.module';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { AddressInfoComponent } from './components/address-info/address-info.component';
import { BankDetailsInfoComponent } from './components/bank-details-info/bank-details-info.component';
import { TransactionInfoComponent } from './components/transaction-info/transaction-info.component';
import { DocumentsInfoComponent } from './components/documents-info/documents-info.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ClientInfoComponent,
    AddressInfoComponent,
    BankDetailsInfoComponent,
    TransactionInfoComponent,
    DocumentsInfoComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  form: FormGroup;
  formValue!: IFormModel;
  private isUpdatingValidators = false;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ) {
    this.form = this.fb.group({
      clientInfo: this.fb.group(ClientInfoValidators(this.validationService)),
      address: this.fb.group(AddressValidators),
      bankDetails: this.fb.group(BankDetailsValidators),
      transactionInfo: this.fb.group(TransactionInfoValidators),
      documents: this.fb.array([]),
    });

    this.handleDynamicValidation();
  }

  addDocument() {
    const country = this.addressGroup.get('country')?.value;
    this.documents.push(
      this.fb.group(DocumentValidators(this.validationService, country, ''))
    );
  }

  removeDocument(index: number) {
    this.documents.removeAt(index);
  }

  updateDocumentValidators() {
    const country = this.addressGroup.get('country')?.value;

    this.documents.controls.forEach((control) => {
      const documentGroup = control as FormGroup;
      const documentType = documentGroup.get('documentType')?.value;

      const documentNumberControl = documentGroup.get('documentNumber');
      const currentValidators = documentNumberControl?.validator;

      const newValidators = [
        Validators.required,
        this.validationService.documentNumberValidator(country, documentType),
      ];

      if (JSON.stringify(currentValidators) !== JSON.stringify(newValidators)) {
        documentNumberControl?.setValidators(newValidators);
        documentNumberControl?.updateValueAndValidity({ emitEvent: false });
      }
    });
  }

  handleDynamicValidation() {
    this.addressGroup.get('country')?.valueChanges.subscribe(() => {
      if (!this.isUpdatingValidators) {
        this.isUpdatingValidators = true;
        this.updateDocumentValidators();
        this.isUpdatingValidators = false;
      }
    });

    this.documents.valueChanges.subscribe(() => {
      if (!this.isUpdatingValidators) {
        this.isUpdatingValidators = true;
        this.updateDocumentValidators();
        this.isUpdatingValidators = false;
      }
    });
  }

  submit() {
    if (this.form.valid) {
      this.formValue = this.form.value as IFormModel;
      console.log(this.formValue);

      this.form.reset();

      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        if (control instanceof FormGroup || control instanceof FormArray) {
          control.reset();
          control.updateValueAndValidity();
        }
      });
    }
  }

  reset() {
    this.form.reset();
  }

  get documents(): FormArray {
    return this.form.get('documents') as FormArray;
  }

  get clientInfoGroup(): FormGroup {
    return this.form.get('clientInfo') as FormGroup;
  }

  get addressGroup(): FormGroup {
    return this.form.get('address') as FormGroup;
  }

  get bankDetailsGroup(): FormGroup {
    return this.form.get('bankDetails') as FormGroup;
  }

  get transactionInfoGroup(): FormGroup {
    return this.form.get('transactionInfo') as FormGroup;
  }
}
