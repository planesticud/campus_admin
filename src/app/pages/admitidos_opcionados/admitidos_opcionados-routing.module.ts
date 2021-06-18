import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmitidosOpcionadosComponent } from './admitidos_opcionados.component';
import { ListAdmitidosOpcionadosComponent } from './list-admitidos_opcionados/list-admitidos_opcionados.component';

const routes: Routes = [{
  path: '',
  component: AdmitidosOpcionadosComponent,
  children: [{
    path: 'list-admitidos_opcionados',
    component: ListAdmitidosOpcionadosComponent,
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

export class AdmitidosOpcionadosRoutingModule { }

export const routedComponents = [
  AdmitidosOpcionadosComponent,
  ListAdmitidosOpcionadosComponent,
];
