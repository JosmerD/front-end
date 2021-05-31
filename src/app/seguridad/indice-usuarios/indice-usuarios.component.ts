import { HttpResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { usuarioDTO } from 'src/app/seguridad/seguridad';
import Swal from 'sweetalert2';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrls: ['./indice-usuarios.component.css']
})
export class IndiceUsuariosComponent implements OnInit {

  constructor(private seguridadServices:SeguridadService) { }
@ViewChild(MatTable) 
table:MatTable<any>;

  usuarios: usuarioDTO[];

  columnasAMostrar=['email','acciones'];
  cantidadTotalRegistros;
  paginaActual=1;
  cantidadRegistrosAMostrar=10;
  //@ViewChild(MatTable) table:MatTable<any>;

  ngOnInit(): void {
    
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);

  }
  cargarRegistros(pagina:number,cantidadElementosAMostrar: number){
    
    this.seguridadServices.obtenerUsuarios(pagina,cantidadElementosAMostrar)
    .subscribe((respuesta:HttpResponse<usuarioDTO[]>)=>{
      this.usuarios=respuesta.body; 
      console.log(respuesta.headers.get("cantidadTotalRegistros"));   
      this.cantidadTotalRegistros =respuesta.headers.get("cantidadTotalRegistros");
    },error=>console.log(error));   

  }
  actualizarPaginacion(datos:PageEvent){

      this.paginaActual=datos.pageIndex+1;
      this.cantidadRegistrosAMostrar=datos.pageSize;
      this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
          
  }
 

  hacerAdmin(usuarioId:string){
    this.seguridadServices.hacerAdmin(usuarioId)
    .subscribe(()=>Swal.fire('Exitoso','La operacion se ha realizado','success'));    
  }
  removerAdmin(usuarioId:string){
    this.seguridadServices.hacerAdmin(usuarioId)
    .subscribe(()=>Swal.fire('Exitoso','La operacion se ha realizado','success'));      
  }
}
