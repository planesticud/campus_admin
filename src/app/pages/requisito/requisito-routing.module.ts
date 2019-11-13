import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequisitoComponent } from './requisito.component';
import { ListRequisitoComponent } from './list-requisito/list-requisito.component';
import { CrudRequisitoComponent } from './crud-requisito/crud-requisito.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: RequisitoComponent,
  children: [{
    path: 'list-requisito',
    component: ListRequisitoComponent,
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

export class RequisitoRoutingModule { }

export const routedComponents = [
  RequisitoComponent,
  ListRequisitoComponent,
  CrudRequisitoComponent,
];
