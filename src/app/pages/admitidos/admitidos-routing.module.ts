import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmitidosComponent } from './admitidos.component';
import { ListAdmitidosComponent } from './list-admitidos/list-admitidos.component';
import { CrudAdmitidosComponent } from './crud-admitidos/crud-admitidos.component';



const routes: Routes = [{
  path: '',
  component: AdmitidosComponent,
  children: [{
    path: 'list-admitidos',
    component: ListAdmitidosComponent,
  }, {
    path: 'crud-admitidos',
    component: CrudAdmitidosComponent,
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

export class AdmitidosRoutingModule { }

export const routedComponents = [
  AdmitidosComponent,
  ListAdmitidosComponent,
  CrudAdmitidosComponent,
];
