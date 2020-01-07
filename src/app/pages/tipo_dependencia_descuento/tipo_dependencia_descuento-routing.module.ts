import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDependenciaDescuentoComponent } from './tipo_dependencia_descuento.component';
import { ListTipoDependenciaDescuentoComponent } from './list-tipo_dependencia_descuento/list-tipo_dependencia_descuento.component';
import { CrudTipoDependenciaDescuentoComponent } from './crud-tipo_dependencia_descuento/crud-tipo_dependencia_descuento.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoDependenciaDescuentoComponent,
  children: [{
    path: 'list-tipo_dependencia_descuento',
    component: ListTipoDependenciaDescuentoComponent,
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

export class TipoDependenciaDescuentoRoutingModule { }

export const routedComponents = [
  TipoDependenciaDescuentoComponent,
  ListTipoDependenciaDescuentoComponent,
  CrudTipoDependenciaDescuentoComponent,
];
