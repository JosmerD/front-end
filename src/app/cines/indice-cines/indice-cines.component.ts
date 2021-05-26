import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css']
})
export class IndiceCinesComponent implements OnInit {

  constructor(private cinesServices:CinesService) { }

  cines: cineDTO[];

  columnasAMostrar=['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual=1;
  cantidadRegistrosAMostrar=10;

  ngOnInit(): void {
    
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);

  }
  cargarRegistros(pagina:number,cantidadElementosAMostrar: number){
    
    this.cinesServices.obtenerTodos(pagina,cantidadElementosAMostrar)
    .subscribe((respuesta:HttpResponse<cineDTO[]>)=>{
      this.cines=respuesta.body; 
      console.log(respuesta.headers.get("cantidadTotalRegistros"));   
      this.cantidadTotalRegistros =respuesta.headers.get("cantidadTotalRegistros");
    },error=>console.log(error));   

  }
  actualizarPaginacion(datos:PageEvent){

      this.paginaActual=datos.pageIndex+1;
      this.cantidadRegistrosAMostrar=datos.pageSize;
      this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
          
  }
  borrar(id:number){
    this.cinesServices.borrar(id)
    .subscribe(()=>{
      this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
    }, error=>console.error(error));
  }

}
