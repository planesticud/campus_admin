import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'ngx-list-admitidos-opcionados',
  templateUrl: './list-admitidos_opcionados.component.html',
  styleUrls: ['./list-admitidos_opcionados.component.scss'],
})
export class ListAdmitidosOpcionadosComponent implements OnInit {

  cambiotab: boolean = false;
  config: ToasterConfig;

  fakeData = [
    {
      name: 'Camilo',
      lastName: 'Leon',
      id: '1234535',
    },
    {
      name: 'Andres',
      lastName: 'Cuervo',
      id: '1234535516',
    },
  ];

  ngOnInit(): void {}
}
