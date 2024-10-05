import { TestBed } from '@angular/core/testing';
import { DecimalPipe } from '@angular/common';

import { NumberFormatService } from './number-format.service';

describe('NumberFormatService', () => {
  let service: NumberFormatService;
  let decimalPipeSpy: jasmine.SpyObj<DecimalPipe>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DecimalPipe', ['transform']);

    TestBed.configureTestingModule({
      providers: [
        NumberFormatService,
        { provide: DecimalPipe, useValue: spy }
      ]
    });

    service = TestBed.inject(NumberFormatService);
    decimalPipeSpy = TestBed.inject(DecimalPipe) as jasmine.SpyObj<DecimalPipe>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format number correctly', () => {
    const value = 1234567890;
    const formattedValue = '1,234,567,890';
    decimalPipeSpy.transform.and.returnValue(formattedValue);

    expect(service.formatNumber(value)).toBe(formattedValue);
    expect(decimalPipeSpy.transform).toHaveBeenCalledWith(value, '1.0-0');
  });

  it('should parse number correctly', () => {
    const value = '1,234,567,890';
    const parsedValue = 1234567890;

    expect(service.parseNumber(value)).toBe(parsedValue);
  });

  it('should return null for invalid number string', () => {
    const value = 'invalid';

    expect(service.parseNumber(value)).toBeNull();
  });

  it('should return null for NaN value', () => {
    const value = 'invalid';
    expect(service.formatNumber(value)).toBeNull();
  });

  it('should format string number correctly', () => {
    const value = '1234567890';
    const formattedValue = '1,234,567,890';
    decimalPipeSpy.transform.and.returnValue(formattedValue);

    expect(service.formatNumber(value)).toBe(formattedValue);
    expect(decimalPipeSpy.transform).toHaveBeenCalledWith(1234567890, '1.0-0');
  });
});
