import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoProgramaComponent } from './documento_programa.component';
import { ListDocumentoProgramaComponent } from './list-documento_programa/list-documento_programa.component';
import { CrudDocumentoProgramaComponent } from './crud-documento_programa/crud-documento_programa.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: DocumentoProgramaComponent,
  children: [{
    path: 'list-documento_programa',
    component: ListDocumentoProgramaComponent,
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

export class DocumentoProgramaRoutingModule { }

export const routedComponents = [
  DocumentoProgramaComponent,
  ListDocumentoProgramaComponent,
  CrudDocumentoProgramaComponent,
];
