import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionFechasComponent } from './configuracion_fechas.component';
import { CrudConfiguracionFechasComponent } from './crud-configuracion_fechas/crud-configuracion_fechas.component';
import { ListConfiguracionFechasComponent } from './list-configuracion_fechas/list-configuracion_fechas.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: ConfiguracionFechasComponent,
  children: [{
    path: 'list-configuracion_fechas',
    component: ListConfiguracionFechasComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
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

export class ConfiguracionFechasRoutingModule { }

export const routedComponents = [
  ConfiguracionFechasComponent,
  CrudConfiguracionFechasComponent,
  ListConfiguracionFechasComponent,
];
