import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDatoAdicionalComponent } from './tipo_dato_adicional.component';
import { ListTipoDatoAdicionalComponent } from './list-tipo_dato_adicional/list-tipo_dato_adicional.component';
import { CrudTipoDatoAdicionalComponent } from './crud-tipo_dato_adicional/crud-tipo_dato_adicional.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoDatoAdicionalComponent,
  children: [{
    path: 'list-tipo_dato_adicional',
    component: ListTipoDatoAdicionalComponent,
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

export class TipoDatoAdicionalRoutingModule { }

export const routedComponents = [
  TipoDatoAdicionalComponent,
  ListTipoDatoAdicionalComponent,
  CrudTipoDatoAdicionalComponent,
];
