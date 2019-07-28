import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoporteDescuentoComponent } from './soporte_descuento.component';
import { ListSoporteDescuentoComponent } from './list-soporte_descuento/list-soporte_descuento.component';
import { CrudSoporteDescuentoComponent } from './crud-soporte_descuento/crud-soporte_descuento.component';

const routes: Routes = [{
  path: '',
  component: SoporteDescuentoComponent,
  children: [{
    path: 'list-soporte_descuento',
    component: ListSoporteDescuentoComponent,
  }, {
    path: 'crud-soporte_descuento',
    component: CrudSoporteDescuentoComponent,
  }],
}];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
      RouterModule,
  ],
})

export class SoporteDescuentoRoutingModule { }

export const routedComponents = [
  SoporteDescuentoComponent,
  ListSoporteDescuentoComponent,
  CrudSoporteDescuentoComponent,
];
