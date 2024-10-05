import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { NumberFormatService } from '../../services/number-format.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  form = signal<FormGroup>(
    new FormGroup({
      documentType: new FormControl('', [
        Validators.required
      ]),
      documentNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(14)
      ]),
    })
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private numberFormatService: NumberFormatService
  ) {}

  ngOnInit() {
    this.form().get('documentNumber')?.valueChanges.subscribe(value => {
      if (value) {
        const formattedValue = this.numberFormatService.formatNumber(value);
        if (formattedValue !== null) {
          this.form().get('documentNumber')?.setValue(formattedValue, { emitEvent: false });
        }
      }
    });
  }

  onSubmit() {
    const documentNumber = this.numberFormatService.parseNumber(this.form().value.documentNumber);
    this.router.navigate([`/${this.form().value.documentType}/${documentNumber}`]);
  }
}
