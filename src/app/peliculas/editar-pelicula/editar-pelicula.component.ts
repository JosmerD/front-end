import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { MutipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModels';
import { peliculaCreactionDTO, peliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private peliculasServices: PeliculasService, private activateRoute:ActivatedRoute, private router:Router) { }

  modelo:peliculaDTO;
  generosSeleccionados: MutipleSelectorModel[];
  generosNoSeleccionados: MutipleSelectorModel[];
  cinesSeleccionados: MutipleSelectorModel[];
  cinesNoSeleccionados: MutipleSelectorModel[];
  actoresSeleccionados:actorPeliculaDTO[];
  errores:string[]=[];
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      this.peliculasServices.putGet(params.id)
      .subscribe(peliculaPutGet=>{
        
        this.modelo=peliculaPutGet.pelicula;
        
        this.generosNoSeleccionados=peliculaPutGet.generosNoSeleccionados.map(genero=>{
          return <MutipleSelectorModel>{llave:genero.id,valor:genero.nombre}
        });
        
        this.generosSeleccionados=peliculaPutGet.generosSeleccionados.map(genero=>{
          return <MutipleSelectorModel>{llave:genero.id,valor:genero.nombre}
        });
        this.cinesSeleccionados=peliculaPutGet.cinesSeleccionados.map(cines=>{
          return <MutipleSelectorModel>{llave:cines.id,valor:cines.nombre}
        });
        this.cinesNoSeleccionados=peliculaPutGet.cinesNoSeleccionados.map(cines=>{
          return <MutipleSelectorModel>{llave:cines.id,valor:cines.nombre}
        });

        this.actoresSeleccionados=peliculaPutGet.actores;

      });
    })
  }
  guardarCambios(pelicula:peliculaCreactionDTO){
    
    this.peliculasServices.editar(this.modelo.id,pelicula)
    .subscribe(()=> this.router.navigate(['/pelicula/'+this.modelo.id]));

  }

}
