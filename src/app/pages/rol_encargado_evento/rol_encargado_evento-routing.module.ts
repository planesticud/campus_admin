import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolEncargadoEventoComponent } from './rol_encargado_evento.component';
import { ListRolEncargadoEventoComponent } from './list-rol_encargado_evento/list-rol_encargado_evento.component';
import { CrudRolEncargadoEventoComponent } from './crud-rol_encargado_evento/crud-rol_encargado_evento.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: RolEncargadoEventoComponent,
  children: [{
    path: 'list-rol_encargado_evento',
    component: ListRolEncargadoEventoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
      ],
    },
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

export class RolEncargadoEventoRoutingModule { }

export const routedComponents = [
  RolEncargadoEventoComponent,
  ListRolEncargadoEventoComponent,
  CrudRolEncargadoEventoComponent,
];
