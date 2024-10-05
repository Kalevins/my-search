import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DetailsComponent } from './details.component';
import { NumberFormatService } from '../../services/number-format.service';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let numberFormatService: jasmine.SpyObj<NumberFormatService>;

  beforeEach(async () => {
    const numberFormatServiceSpy = jasmine.createSpyObj('NumberFormatService', ['formatNumber']);

    await TestBed.configureTestingModule({
      imports: [
        DetailsComponent,
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

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    numberFormatService = TestBed.inject(NumberFormatService) as jasmine.SpyObj<NumberFormatService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data from API', () => {
    const mockData = {
      firstName: 'John',
      secondName: 'Doe',
      firstLastName: 'Smith',
      secondLastName: 'Johnson',
      documentType: '1',
      documentNumber: '1234567890',
      phone: '5555555555'
    };

    spyOn(component['http'], 'request').and.returnValue(of(mockData));

    component.ngOnInit();
    component.form().value.documentNumber = '1234567890';

    expect(component.form().value).toEqual(mockData);
  });

  it('should format document number', () => {
    const mockData = {
      documentNumber: '1234567890'
    };

    numberFormatService.formatNumber.and.returnValue('1,234,567,890');
    spyOn(component['http'], 'request').and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.form().get('documentNumber')?.value).toBe('1,234,567,890');
  });

  it('should navigate back on error', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    spyOn(component['http'], 'request').and.returnValue(of({ error: 'error' }));

    component.ngOnInit();
    component.onBack();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
