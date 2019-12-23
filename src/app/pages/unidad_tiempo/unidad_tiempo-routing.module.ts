import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadTiempoComponent } from './unidad_tiempo.component';
import { ListUnidadTiempoComponent } from './list-unidad_tiempo/list-unidad_tiempo.component';
import { CrudUnidadTiempoComponent } from './crud-unidad_tiempo/crud-unidad_tiempo.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: UnidadTiempoComponent,
  children: [{
    path: 'list-unidad_tiempo',
    component: ListUnidadTiempoComponent,
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

export class UnidadTiempoRoutingModule { }

export const routedComponents = [
  UnidadTiempoComponent,
  ListUnidadTiempoComponent,
  CrudUnidadTiempoComponent,
];
