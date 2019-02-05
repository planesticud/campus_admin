import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleAdmisionComponent } from './detalle_admision.component';
import { ListDetalleAdmisionComponent } from './list-detalle_admision/list-detalle_admision.component';



const routes: Routes = [{
  path: '',
  component: DetalleAdmisionComponent,
  children: [{
    path: 'list-detalle_admision',
    component: ListDetalleAdmisionComponent,
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

export class DetalleAdmisionRoutingModule { }

export const routedComponents = [
  DetalleAdmisionComponent,
  ListDetalleAdmisionComponent,
];
