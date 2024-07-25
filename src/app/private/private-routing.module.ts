import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [{ path: '', component: PrivateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), DropdownModule],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
