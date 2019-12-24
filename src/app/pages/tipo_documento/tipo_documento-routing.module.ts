import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDocumentoComponent } from './tipo_documento.component';
import { ListTipoDocumentoComponent } from './list-tipo_documento/list-tipo_documento.component';
import { CrudTipoDocumentoComponent } from './crud-tipo_documento/crud-tipo_documento.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoDocumentoComponent,
  children: [{
    path: 'list-tipo_documento',
    component: ListTipoDocumentoComponent,
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

export class TipoDocumentoRoutingModule { }

export const routedComponents = [
  TipoDocumentoComponent,
  ListTipoDocumentoComponent,
  CrudTipoDocumentoComponent,
];
