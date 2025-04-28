import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      const age = new Date().getFullYear() - date.getFullYear();
      return age < minAge ? { ageInvalid: true } : null;
    };
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid =
        /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(control.value) ||
        /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(control.value);
      return !valid ? { phoneInvalid: true } : null;
    };
  }

  passportValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = /^\d{4} \d{6}$/.test(control.value);
      return !valid ? { passportInvalid: true } : null;
    };
  }

  documentNumberValidator(
    country: string | null,
    documentType: string | null
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!country) {
        return { countryRequired: 'Выберите страну' };
      }

      if (!documentType) {
        return { documentTypeRequired: 'Выберите тип документа' };
      }

      if (!value) {
        return { required: 'Номер документа обязателен' };
      }

      let valid = false;
      let errorMessage = '';

      switch (documentType) {
        case 'passport':
          if (country === 'Казахстан') {
            valid = /^\d{9}$/.test(value);
            errorMessage = 'Паспорт Казахстана должен содержать 9 цифр';
          } else if (country === 'Беларусь') {
            valid = /^[A-ZА-Я]{2}\d{7}$/.test(value);
            errorMessage = 'Паспорт Беларуси должен содержать 2 буквы и 7 цифр';
          } else if (country === 'Россия') {
            valid = /^\d{10}$/.test(value);
            errorMessage = 'Паспорт России должен содержать 10 цифр';
          }
          break;

        case 'snils':
          if (country === 'Россия') {
            valid = /^\d{3}-\d{3}-\d{3} \d{2}$/.test(value);
            errorMessage = 'СНИЛС России должен быть в формате XXX-XXX-XXX XX';
          } else {
            errorMessage = 'СНИЛС доступен только для России';
          }
          break;

        case 'inn':
          if (country === 'Казахстан') {
            valid = /^\d{12}$/.test(value);
            errorMessage = 'ИНН Казахстана должен содержать 12 цифр';
          } else if (country === 'Беларусь') {
            valid = /^\d{9}$/.test(value);
            errorMessage = 'ИНН Беларуси должен содержать 9 цифр';
          } else if (country === 'Россия') {
            valid = /^\d{12}$/.test(value) || /^\d{10}$/.test(value);
            errorMessage = 'ИНН России должен содержать 12 цифр';
          }
          break;

        default:
          errorMessage = 'Неподдерживаемый тип документа';
      }

      return valid ? null : { documentNumberInvalid: errorMessage };
    };
  }

  noFutureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentDate = new Date();
      const inputDate = new Date(control.value);

      if (inputDate > currentDate) {
        return { futureDate: 'Дата не может быть в будущем' };
      }

      return null;
    };
  }
}
