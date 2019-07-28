import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudDescuentoComponent } from './solicitud_descuento.component';
import { ListSolicitudDescuentoComponent } from './list-solicitud_descuento/list-solicitud_descuento.component';
import { CrudSolicitudDescuentoComponent } from './crud-solicitud_descuento/crud-solicitud_descuento.component';

const routes: Routes = [{
  path: '',
  component: SolicitudDescuentoComponent,
  children: [{
    path: 'list-solicitud_descuento',
    component: ListSolicitudDescuentoComponent,
  }, {
    path: 'crud-solicitud_descuento',
    component: CrudSolicitudDescuentoComponent,
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

export class SolicitudDescuentoRoutingModule { }

export const routedComponents = [
  SolicitudDescuentoComponent,
  ListSolicitudDescuentoComponent,
  CrudSolicitudDescuentoComponent,
];
