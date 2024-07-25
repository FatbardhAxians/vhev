import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { PrivateRoutingModule } from './private-routing.module';
import { ChartLineStackedComponent } from './chart-line-stacked/chart-line-stacked.component';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [PrivateComponent, ChartLineStackedComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    DropdownModule,
    MenuModule,
    ButtonModule,
  ],
})
export class PrivateModule {}
