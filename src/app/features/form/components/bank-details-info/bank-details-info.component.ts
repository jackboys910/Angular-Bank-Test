import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/modules/material.module';

@Component({
  selector: 'app-bank-details-info',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './bank-details-info.component.html',
  styleUrl: '../../styles/card-info.css',
})
export class BankDetailsInfoComponent {
  @Input() group!: FormGroup;
}
