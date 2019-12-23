import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaConocimientoComponent } from './area_conocimiento.component';
import { ListAreaConocimientoComponent } from './list-area_conocimiento/list-area_conocimiento.component';
import { CrudAreaConocimientoComponent } from './crud-area_conocimiento/crud-area_conocimiento.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: AreaConocimientoComponent,
  children: [{
    path: 'list-area_conocimiento',
    component: ListAreaConocimientoComponent,
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

export class AreaConocimientoRoutingModule { }

export const routedComponents = [
  AreaConocimientoComponent,
  ListAreaConocimientoComponent,
  CrudAreaConocimientoComponent,
];
