import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidacionDescuentoComponent } from './validacion_descuento.component';
import { ListValidacionDescuentoComponent } from './list-validacion_descuento/list-validacion_descuento.component';
import { CrudValidacionDescuentoComponent } from './crud-validacion_descuento/crud-validacion_descuento.component';

const routes: Routes = [{
  path: '',
  component: ValidacionDescuentoComponent,
  children: [{
    path: 'list-validacion_descuento',
    component: ListValidacionDescuentoComponent,
  }, {
    path: 'crud-validacion_descuento',
    component: CrudValidacionDescuentoComponent,
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

export class ValidacionDescuentoRoutingModule { }

export const routedComponents = [
  ValidacionDescuentoComponent,
  ListValidacionDescuentoComponent,
  CrudValidacionDescuentoComponent,
];
