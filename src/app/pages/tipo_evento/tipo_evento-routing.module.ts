import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoEventoComponent } from './tipo_evento.component';
import { ListTipoEventoComponent } from './list-tipo_evento/list-tipo_evento.component';
import { CrudTipoEventoComponent } from './crud-tipo_evento/crud-tipo_evento.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoEventoComponent,
  children: [{
    path: 'list-tipo_evento',
    component: ListTipoEventoComponent,
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

export class TipoEventoRoutingModule { }

export const routedComponents = [
  TipoEventoComponent,
  ListTipoEventoComponent,
  CrudTipoEventoComponent,
];
