import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoAutorProduccionComponent } from './estado_autor_produccion.component';
import { ListEstadoAutorProduccionComponent } from './list-estado_autor_produccion/list-estado_autor_produccion.component';
import { CrudEstadoAutorProduccionComponent } from './crud-estado_autor_produccion/crud-estado_autor_produccion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: EstadoAutorProduccionComponent,
  children: [{
    path: 'list-estado_autor_produccion',
    component: ListEstadoAutorProduccionComponent,
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

export class EstadoAutorProduccionRoutingModule { }

export const routedComponents = [
  EstadoAutorProduccionComponent,
  ListEstadoAutorProduccionComponent,
  CrudEstadoAutorProduccionComponent,
];
