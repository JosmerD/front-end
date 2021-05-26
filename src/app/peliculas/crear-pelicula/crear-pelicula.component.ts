import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MutipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModels';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { peliculaCreactionDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  constructor(private peliculasServices:PeliculasService,private router:Router) { }

  generosNoSeleccionados: MutipleSelectorModel[];
  cinesNoSeleccionados: MutipleSelectorModel[];
  errores:string[]=[];
  
  ngOnInit(): void {
    this.peliculasServices.postGet()
    .subscribe(resultado=>{
      this.generosNoSeleccionados=resultado.generos.map(genero=>{
        return <MutipleSelectorModel>{llave:genero.id,valor:genero.nombre}
      });
      this.cinesNoSeleccionados=resultado.cines.map(cines=>{
        return <MutipleSelectorModel>{llave:cines.id,valor:cines.nombre}
      });
    },error=>this.errores=parsearErroresAPI(error));
  }

  guardarCambios(pelicula:peliculaCreactionDTO){

    this.peliculasServices.crear(pelicula).subscribe((id:number)=>this.router.navigate(['/pelicula/'+id]),
    error=>this.errores=parsearErroresAPI(error));

  }
}
