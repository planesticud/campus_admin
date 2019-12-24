import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoVinculacionComponent } from './tipo_vinculacion.component';
import { ListTipoVinculacionComponent } from './list-tipo_vinculacion/list-tipo_vinculacion.component';
import { CrudTipoVinculacionComponent } from './crud-tipo_vinculacion/crud-tipo_vinculacion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoVinculacionComponent,
  children: [{
    path: 'list-tipo_vinculacion',
    component: ListTipoVinculacionComponent,
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

export class TipoVinculacionRoutingModule { }

export const routedComponents = [
  TipoVinculacionComponent,
  ListTipoVinculacionComponent,
  CrudTipoVinculacionComponent,
];
