import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDescuentoComponent } from './tipo_descuento.component';
import { ListTipoDescuentoComponent } from './list-tipo_descuento/list-tipo_descuento.component';
import { CrudTipoDescuentoComponent } from './crud-tipo_descuento/crud-tipo_descuento.component';

const routes: Routes = [{
  path: '',
  component: TipoDescuentoComponent,
  children: [{
    path: 'list-tipo_descuento',
    component: ListTipoDescuentoComponent,
  }, {
    path: 'crud-tipo_descuento',
    component: CrudTipoDescuentoComponent,
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

export class TipoDescuentoRoutingModule { }

export const routedComponents = [
  TipoDescuentoComponent,
  ListTipoDescuentoComponent,
  CrudTipoDescuentoComponent,
];
