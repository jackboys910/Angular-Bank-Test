import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { COUNTRIES } from '../../constants/form-constants';

@Component({
  selector: 'app-address-info',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './address-info.component.html',
  styleUrl: '../../styles/card-info.css',
})
export class AddressInfoComponent {
  @Input() group!: FormGroup;

  countries = COUNTRIES;
}
