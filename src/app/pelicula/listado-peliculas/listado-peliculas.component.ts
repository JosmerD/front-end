import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { peliculaDTO } from 'src/app/peliculas/pelicula';
import { PeliculasService } from 'src/app/peliculas/peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  constructor(private peliculasServices:PeliculasService) { }
  @Input ()
  pelicula:peliculaDTO[];
  @Output()
  borrado:EventEmitter<void>= new EventEmitter<void>();
  ngOnInit(): void {
   
  }
 borrar(peliculaId: number): void{
   this.peliculasServices.borrar(peliculaId)
   .subscribe(()=>this.borrado.emit());
 }
}
