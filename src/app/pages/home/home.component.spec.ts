import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { NumberFormatService } from '../../services/number-format.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let numberFormatService: jasmine.SpyObj<NumberFormatService>;

  beforeEach(async () => {
    const numberFormatServiceSpy = jasmine.createSpyObj('NumberFormatService', ['formatNumber', 'parseNumber']);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ documentType: '1', documentNumber: '1234567890' })
          }
        },
        { provide: NumberFormatService, useValue: numberFormatServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    numberFormatService = TestBed.inject(NumberFormatService) as jasmine.SpyObj<NumberFormatService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form().value).toEqual({
      documentType: '',
      documentNumber: ''
    });
  });

  it('should format document number on value change', () => {
    const formattedValue = '1,234,567,890';
    numberFormatService.formatNumber.and.returnValue(formattedValue);

    component.form().get('documentNumber')?.setValue('1234567890');

    expect(component.form().get('documentNumber')?.value).toBe(formattedValue);
  });

  it('should navigate to the correct URL on submit', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    const parsedNumber = 1234567890;
    numberFormatService.parseNumber.and.returnValue(parsedNumber);

    component.form().setValue({
      documentType: '1',
      documentNumber: '1,234,567,890'
    });

    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith(['/1/1234567890']);
  });
});
