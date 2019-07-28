import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDuracionComponent } from './tipo_duracion.component';
import { ListTipoDuracionComponent } from './list-tipo_duracion/list-tipo_duracion.component';
import { CrudTipoDuracionComponent } from './crud-tipo_duracion/crud-tipo_duracion.component';

const routes: Routes = [{
  path: '',
  component: TipoDuracionComponent,
  children: [{
    path: 'list-tipo_duracion',
    component: ListTipoDuracionComponent,
  }, {
    path: 'crud-tipo_duracion',
    component: CrudTipoDuracionComponent,
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

export class TipoDuracionRoutingModule { }

export const routedComponents = [
  TipoDuracionComponent,
  ListTipoDuracionComponent,
  CrudTipoDuracionComponent,
];
