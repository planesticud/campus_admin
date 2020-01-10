import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubtipoProduccionComponent } from './subtipo_produccion.component';
import { ListSubtipoProduccionComponent } from './list-subtipo_produccion/list-subtipo_produccion.component';
import { CrudSubtipoProduccionComponent } from './crud-subtipo_produccion/crud-subtipo_produccion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: SubtipoProduccionComponent,
  children: [{
    path: 'list-subtipo_produccion',
    component: ListSubtipoProduccionComponent,
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

export class SubtipoProduccionRoutingModule { }

export const routedComponents = [
  SubtipoProduccionComponent,
  ListSubtipoProduccionComponent,
  CrudSubtipoProduccionComponent,
];
