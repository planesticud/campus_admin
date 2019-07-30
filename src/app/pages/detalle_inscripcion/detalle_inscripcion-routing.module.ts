import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleInscripcionComponent } from './detalle_inscripcion.component';
import { ListDetalleInscripcionComponent } from './list-detalle_inscripcion/list-detalle_inscripcion.component';

const routes: Routes = [{
  path: '',
  component: DetalleInscripcionComponent,
  children: [{
    path: 'list-detalle_inscripcion/:id',
    component: ListDetalleInscripcionComponent,
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

export class DetalleInscripcionRoutingModule { }

export const routedComponents = [
  DetalleInscripcionComponent,
  ListDetalleInscripcionComponent,
];
