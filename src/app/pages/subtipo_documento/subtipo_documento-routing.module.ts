import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubtipoDocumentoComponent } from './subtipo_documento.component';
import { ListSubtipoDocumentoComponent } from './list-subtipo_documento/list-subtipo_documento.component';
import { CrudSubtipoDocumentoComponent } from './crud-subtipo_documento/crud-subtipo_documento.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: SubtipoDocumentoComponent,
  children: [{
    path: 'list-subtipo_documento',
    component: ListSubtipoDocumentoComponent,
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

export class SubtipoDocumentoRoutingModule { }

export const routedComponents = [
  SubtipoDocumentoComponent,
  ListSubtipoDocumentoComponent,
  CrudSubtipoDocumentoComponent,
];
