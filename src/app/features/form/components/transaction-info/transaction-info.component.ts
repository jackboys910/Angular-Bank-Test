import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { TRANSACTION_TYPES, CURRENCIES } from '../../constants/form-constants';

@Component({
  selector: 'app-transaction-info',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.css', '../../styles/card-info.css'],
})
export class TransactionInfoComponent {
  @Input() group!: FormGroup;

  transactionTypes = TRANSACTION_TYPES;
  currencies = CURRENCIES;
}
