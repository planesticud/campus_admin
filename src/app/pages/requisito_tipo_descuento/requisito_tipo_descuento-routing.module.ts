import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequisitoTipoDescuentoComponent } from './requisito_tipo_descuento.component';
import { ListRequisitoTipoDescuentoComponent } from './list-requisito_tipo_descuento/list-requisito_tipo_descuento.component';
import { CrudRequisitoTipoDescuentoComponent } from './crud-requisito_tipo_descuento/crud-requisito_tipo_descuento.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: RequisitoTipoDescuentoComponent,
  children: [{
    path: 'list-requisito_tipo_descuento',
    component: ListRequisitoTipoDescuentoComponent,
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

export class RequisitoTipoDescuentoRoutingModule { }

export const routedComponents = [
  RequisitoTipoDescuentoComponent,
  ListRequisitoTipoDescuentoComponent,
  CrudRequisitoTipoDescuentoComponent,
];
