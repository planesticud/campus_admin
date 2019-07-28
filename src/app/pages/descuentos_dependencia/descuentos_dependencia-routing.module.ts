import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DescuentosDependenciaComponent } from './descuentos_dependencia.component';
import { ListDescuentosDependenciaComponent } from './list-descuentos_dependencia/list-descuentos_dependencia.component';
import { CrudDescuentosDependenciaComponent } from './crud-descuentos_dependencia/crud-descuentos_dependencia.component';

const routes: Routes = [{
  path: '',
  component: DescuentosDependenciaComponent,
  children: [{
    path: 'list-descuentos_dependencia',
    component: ListDescuentosDependenciaComponent,
  }, {
    path: 'crud-descuentos_dependencia',
    component: CrudDescuentosDependenciaComponent,
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

export class DescuentosDependenciaRoutingModule { }

export const routedComponents = [
  DescuentosDependenciaComponent,
  ListDescuentosDependenciaComponent,
  CrudDescuentosDependenciaComponent,
];
