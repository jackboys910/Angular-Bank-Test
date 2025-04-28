import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/modules/material.module';

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './client-info.component.html',
  styleUrl: '../../styles/card-info.css',
})
export class ClientInfoComponent {
  @Input() group!: FormGroup;
}
