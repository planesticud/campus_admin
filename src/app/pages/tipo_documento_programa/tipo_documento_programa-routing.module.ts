import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDocumentoProgramaComponent } from './tipo_documento_programa.component';
import { ListTipoDocumentoProgramaComponent } from './list-tipo_documento_programa/list-tipo_documento_programa.component';
import { CrudTipoDocumentoProgramaComponent } from './crud-tipo_documento_programa/crud-tipo_documento_programa.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoDocumentoProgramaComponent,
  children: [{
    path: 'list-tipo_documento_programa',
    component: ListTipoDocumentoProgramaComponent,
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

export class TipoDocumentoProgramaRoutingModule { }

export const routedComponents = [
  TipoDocumentoProgramaComponent,
  ListTipoDocumentoProgramaComponent,
  CrudTipoDocumentoProgramaComponent,
];
