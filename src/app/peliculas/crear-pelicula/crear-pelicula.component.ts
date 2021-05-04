import { Component, OnInit } from '@angular/core';
import { peliculaCreactionDTO } from '../pelicula';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  guardarCambios(pelicula:peliculaCreactionDTO){

    console.log(pelicula);

  }
}
