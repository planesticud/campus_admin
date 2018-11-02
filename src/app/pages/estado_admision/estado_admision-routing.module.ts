import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoAdmisionComponent } from './estado_admision.component';
import { ListEstadoAdmisionComponent } from './list-estado_admision/list-estado_admision.component';
import { CrudEstadoAdmisionComponent } from './crud-estado_admision/crud-estado_admision.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: EstadoAdmisionComponent,
  children: [{
    path: 'list-estado_admision',
    component: ListEstadoAdmisionComponent,
    canActivate: [AuthGuard],
  }, {
    path: 'crud-estado_admision',
    component: CrudEstadoAdmisionComponent,
    canActivate: [AuthGuard],
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

export class EstadoAdmisionRoutingModule { }

export const routedComponents = [
  EstadoAdmisionComponent,
  ListEstadoAdmisionComponent,
  CrudEstadoAdmisionComponent,
];
