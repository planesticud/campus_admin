import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoMetadatoComponent } from './tipo_metadato.component';
import { ListTipoMetadatoComponent } from './list-tipo_metadato/list-tipo_metadato.component';
import { CrudTipoMetadatoComponent } from './crud-tipo_metadato/crud-tipo_metadato.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoMetadatoComponent,
  children: [{
    path: 'list-tipo_metadato',
    component: ListTipoMetadatoComponent,
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

export class TipoMetadatoRoutingModule { }

export const routedComponents = [
  TipoMetadatoComponent,
  ListTipoMetadatoComponent,
  CrudTipoMetadatoComponent,
];
