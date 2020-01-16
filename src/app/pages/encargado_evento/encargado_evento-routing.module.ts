import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncargadoEventoComponent } from './encargado_evento.component';
import { ListEncargadoEventoComponent } from './list-encargado_evento/list-encargado_evento.component';
import { CrudEncargadoEventoComponent } from './crud-encargado_evento/crud-encargado_evento.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: EncargadoEventoComponent,
  children: [{
    path: 'list-encargado_evento',
    component: ListEncargadoEventoComponent,
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

export class EncargadoEventoRoutingModule { }

export const routedComponents = [
  EncargadoEventoComponent,
  ListEncargadoEventoComponent,
  CrudEncargadoEventoComponent,
];
