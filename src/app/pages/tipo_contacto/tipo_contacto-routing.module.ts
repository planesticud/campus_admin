import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoContactoComponent } from './tipo_contacto.component';
import { ListTipoContactoComponent } from './list-tipo_contacto/list-tipo_contacto.component';
import { CrudTipoContactoComponent } from './crud-tipo_contacto/crud-tipo_contacto.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoContactoComponent,
  children: [{
    path: 'list-tipo_contacto',
    component: ListTipoContactoComponent,
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

export class TipoContactoRoutingModule { }

export const routedComponents = [
  TipoContactoComponent,
  ListTipoContactoComponent,
  CrudTipoContactoComponent,
];
