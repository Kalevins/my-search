import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NumberFormatService } from '../../services/number-format.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  form = signal<FormGroup>(
    new FormGroup({
      firstName: new FormControl(''),
      secondName: new FormControl(''),
      firstLastName: new FormControl(''),
      secondLastName: new FormControl(''),
      documentType: new FormControl(''),
      documentNumber: new FormControl(''),
      phone: new FormControl('')
    })
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private numberFormatService: NumberFormatService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.http.request('POST', '/api/user', {
        body: {
          documentType: params['documentType'],
          documentNumber: params['documentNumber']
        }
      }).subscribe({
        next: (data: any) => {
          this.form().patchValue(data);
          this.form().disable();

          const value = this.form().value.documentNumber;
          if (value) {
            const formattedValue = this.numberFormatService.formatNumber(value);
            if (formattedValue !== null) {
              this.form().get('documentNumber')?.setValue(formattedValue, { emitEvent: false });
            }
          }
        },
        error: (error: any) => {
          this.onBack();
        }
      });
    });
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
