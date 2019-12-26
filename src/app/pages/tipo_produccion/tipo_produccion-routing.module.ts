import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoProduccionComponent } from './tipo_produccion.component';
import { ListTipoProduccionComponent } from './list-tipo_produccion/list-tipo_produccion.component';
import { CrudTipoProduccionComponent } from './crud-tipo_produccion/crud-tipo_produccion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoProduccionComponent,
  children: [{
    path: 'list-tipo_produccion',
    component: ListTipoProduccionComponent,
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

export class TipoProduccionRoutingModule { }

export const routedComponents = [
  TipoProduccionComponent,
  ListTipoProduccionComponent,
  CrudTipoProduccionComponent,
];
