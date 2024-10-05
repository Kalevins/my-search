import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class NumberFormatService {

  constructor(
    private decimalPipe: DecimalPipe
  ) {}

  formatNumber(value: string | number): string | null {
    if (typeof value === 'string') {
      const parsedValue = this.parseNumber(value);
      if (parsedValue === null) {
        return null; // Return null if parsing fails
      }
      value = parsedValue;
    }
    if (!isNaN(value)) {
      return this.decimalPipe.transform(value, '1.0-0'); // Format with thousands separator
    }
    return null;
  }

  parseNumber(value: string): number | null {
    const parsedValue = Number(value.replace(/,/g, '')); // Remove commas and convert to number
    return isNaN(parsedValue) ? null : parsedValue;
  }
}
