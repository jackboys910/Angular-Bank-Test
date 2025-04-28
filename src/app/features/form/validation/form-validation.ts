import { Validators } from '@angular/forms';
import { ValidationService } from '../../../core/services/validation.service';

export const ClientInfoValidators = (validationService: ValidationService) => ({
  firstName: [
    '',
    [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
  ],
  lastName: [
    '',
    [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
  ],
  middleName: ['', [Validators.minLength(2), Validators.maxLength(50)]],
  gender: ['', Validators.required],
  birthDate: ['', [Validators.required, validationService.ageValidator(18)]],
  email: ['', [Validators.required, Validators.email]],
  phone: ['', [Validators.required, validationService.phoneValidator()]],
  passport: ['', [Validators.required, validationService.passportValidator()]],
});

export const AddressValidators = {
  country: ['', Validators.required],
  region: ['', [Validators.required, Validators.minLength(3)]],
  city: ['', [Validators.required, Validators.minLength(3)]],
  street: ['', [Validators.required, Validators.minLength(3)]],
  house: ['', Validators.required],
  apartment: ['', [Validators.pattern(/^\d*$/)]],
  postalCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
};

export const BankDetailsValidators = {
  accountNumber: ['', [Validators.required, Validators.pattern(/^\d{20}$/)]],
  bic: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
  bankName: ['', [Validators.required, Validators.minLength(3)]],
  correspondentAccount: [
    '',
    [Validators.required, Validators.pattern(/^\d{20}$/)],
  ],
};

export const TransactionInfoValidators = {
  transactionType: ['', Validators.required],
  amount: [
    '',
    [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
  ],
  currency: ['', Validators.required],
  comment: ['', Validators.maxLength(200)],
};

export const DocumentValidators = (
  validationService: ValidationService,
  country: string,
  documentType: string
) => ({
  documentType: ['', Validators.required],
  documentNumber: [
    '',
    [
      Validators.required,
      validationService.documentNumberValidator(country, documentType),
    ],
  ],
  issueDate: [
    '',
    [Validators.required, validationService.noFutureDateValidator()],
  ],
});
