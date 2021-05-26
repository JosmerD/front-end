import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { generoCreacionDTO, generoDTO } from '../genero';
import { GenerosService } from '../generos.service';
import { MatTable } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  constructor(private geneerosServices:GenerosService) { }

  generos: generoDTO[];

  columnasAMostrar=['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual=1;
  cantidadRegistrosAMostrar=10;
  //@ViewChild(MatTable) table:MatTable<any>;

  ngOnInit(): void {
    
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);

  }
  cargarRegistros(pagina:number,cantidadElementosAMostrar: number){
    
    this.geneerosServices.obtenerPaginados(pagina,cantidadElementosAMostrar)
    .subscribe((respuesta:HttpResponse<generoDTO[]>)=>{
      this.generos=respuesta.body; 
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
    this.geneerosServices.borrar(id)
    .subscribe(()=>{
      this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
    }, error=>console.error(error));
  }

}
