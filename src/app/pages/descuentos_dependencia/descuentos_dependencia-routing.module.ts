import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DescuentosDependenciaComponent } from './descuentos_dependencia.component';
import { ListDescuentosDependenciaComponent } from './list-descuentos_dependencia/list-descuentos_dependencia.component';
import { CrudDescuentosDependenciaComponent } from './crud-descuentos_dependencia/crud-descuentos_dependencia.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: DescuentosDependenciaComponent,
  children: [{
    path: 'list-descuentos_dependencia',
    component: ListDescuentosDependenciaComponent,
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

export class DescuentosDependenciaRoutingModule { }

export const routedComponents = [
  DescuentosDependenciaComponent,
  ListDescuentosDependenciaComponent,
  CrudDescuentosDependenciaComponent,
];
