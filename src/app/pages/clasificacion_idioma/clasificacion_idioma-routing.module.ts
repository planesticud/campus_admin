import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClasificacionIdiomaComponent } from './clasificacion_idioma.component';
import { ListClasificacionIdiomaComponent } from './list-clasificacion_idioma/list-clasificacion_idioma.component';
import { CrudClasificacionIdiomaComponent } from './crud-clasificacion_idioma/crud-clasificacion_idioma.component';

const routes: Routes = [{
  path: '',
  component: ClasificacionIdiomaComponent,
  children: [{
    path: 'list-clasificacion_idioma',
    component: ListClasificacionIdiomaComponent,
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

export class ClasificacionIdiomaRoutingModule { }

export const routedComponents = [
  ClasificacionIdiomaComponent,
  ListClasificacionIdiomaComponent,
  CrudClasificacionIdiomaComponent,
];
