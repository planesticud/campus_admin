import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetadatoSubtipoProduccionComponent } from './metadato_subtipo_produccion.component';
import { ListMetadatoSubtipoProduccionComponent } from './list-metadato_subtipo_produccion/list-metadato_subtipo_produccion.component';
import { CrudMetadatoSubtipoProduccionComponent } from './crud-metadato_subtipo_produccion/crud-metadato_subtipo_produccion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: MetadatoSubtipoProduccionComponent,
  children: [{
    path: 'list-metadato_subtipo_produccion',
    component: ListMetadatoSubtipoProduccionComponent,
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

export class MetadatoSubtipoProduccionRoutingModule { }

export const routedComponents = [
  MetadatoSubtipoProduccionComponent,
  ListMetadatoSubtipoProduccionComponent,
  CrudMetadatoSubtipoProduccionComponent,
];
