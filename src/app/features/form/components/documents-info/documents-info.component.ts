import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ValidationService } from '../../../../core/services/validation.service';
import { DocumentValidators } from '../../validation/form-validation';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { DOCUMENT_TYPES } from '../../constants/form-constants';

@Component({
  selector: 'app-documents-info',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './documents-info.component.html',
  styleUrls: ['./documents-info.component.css', '../../styles/card-info.css'],
})
export class DocumentsInfoComponent {
  @Input() formArray!: FormArray;

  documentTypes = DOCUMENT_TYPES;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ) {}

  addDocument() {
    if (!this.formArray) return;

    const country = this.formArray.parent?.get('address.country')?.value;

    this.formArray.push(
      this.fb.group(DocumentValidators(this.validationService, country, ''))
    );
  }

  removeDocument(index: number) {
    this.formArray.removeAt(index);
  }

  get formGroups(): FormGroup[] {
    return this.formArray.controls as FormGroup[];
  }
}
