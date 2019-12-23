import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoProyectoComponent } from './tipo_proyecto.component';
import { ListTipoProyectoComponent } from './list-tipo_proyecto/list-tipo_proyecto.component';
import { CrudTipoProyectoComponent } from './crud-tipo_proyecto/crud-tipo_proyecto.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoProyectoComponent,
  children: [{
    path: 'list-tipo_proyecto',
    component: ListTipoProyectoComponent,
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

export class TipoProyectoRoutingModule { }

export const routedComponents = [
  TipoProyectoComponent,
  ListTipoProyectoComponent,
  CrudTipoProyectoComponent,
];
