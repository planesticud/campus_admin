import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoPublicoComponent } from './tipo_publico.component';
import { ListTipoPublicoComponent } from './list-tipo_publico/list-tipo_publico.component';
import { CrudTipoPublicoComponent } from './crud-tipo_publico/crud-tipo_publico.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoPublicoComponent,
  children: [{
    path: 'list-tipo_publico',
    component: ListTipoPublicoComponent,
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

export class TipoPublicoRoutingModule { }

export const routedComponents = [
  TipoPublicoComponent,
  ListTipoPublicoComponent,
  CrudTipoPublicoComponent,
];
