import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValorAtributoLugarComponent } from './valor_atributo_lugar.component';
import { ListValorAtributoLugarComponent } from './list-valor_atributo_lugar/list-valor_atributo_lugar.component';
import { CrudValorAtributoLugarComponent } from './crud-valor_atributo_lugar/crud-valor_atributo_lugar.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: ValorAtributoLugarComponent,
  children: [{
    path: 'list-valor_atributo_lugar',
    component: ListValorAtributoLugarComponent,
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

export class ValorAtributoLugarRoutingModule { }

export const routedComponents = [
  ValorAtributoLugarComponent,
  ListValorAtributoLugarComponent,
  CrudValorAtributoLugarComponent,
];
