import { Component, Input, OnInit } from '@angular/core';
import { cineCreacionDTO, cineDTO } from '../cine';
@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor() { }

  modelo:cineDTO=
  {
    nombre:"Cinex",
    latidud:-33.48766971053475,
    longitud:-70.61930179595949
  };

  ngOnInit(): void {
  }
  guardarCambios(cine:cineCreacionDTO){
    console.log(cine);
  }
}
