import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';

@NgModule({
  imports: [CommonModule, DetailsRoutingModule, DetailsComponent],
  exports: [DetailsComponent],
  providers: [],
})

export class DetailsModule {}
