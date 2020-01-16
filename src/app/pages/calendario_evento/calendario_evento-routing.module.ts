import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarioEventoComponent } from './calendario_evento.component';
import { ListCalendarioEventoComponent } from './list-calendario_evento/list-calendario_evento.component';
import { CrudCalendarioEventoComponent } from './crud-calendario_evento/crud-calendario_evento.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: CalendarioEventoComponent,
  children: [{
    path: 'list-calendario_evento',
    component: ListCalendarioEventoComponent,
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

export class CalendarioEventoRoutingModule { }

export const routedComponents = [
  CalendarioEventoComponent,
  ListCalendarioEventoComponent,
  CrudCalendarioEventoComponent,
];
