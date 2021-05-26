import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import{Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GenerosService } from 'src/app/generos/generos.service';
import { PeliculasService } from '../peliculas.service';
import { generoDTO } from 'src/app/generos/genero';
import { peliculaDTO } from '../pelicula';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private locaction: Location,
    private activaredRoute:ActivatedRoute,private generosServices:GenerosService,private peliculasServices:PeliculasService) { }

    form:FormGroup;

    generos:generoDTO[]=[];
paginaActual=1;
cantidadElementosAMostrar=10;
cantidadElementos;
peliculas :peliculaDTO[];
//peliculasOriginal=this.peliculas;

formularioOriginal={
  titulo:'',
      generoId:0,
      proximosEstrenos:false,
      enCines:false

};
  ngOnInit(): void {
    
    this.generosServices.obtenerTodos()
    .subscribe(generos=>{
      this.generos=generos;

      this.form=this.formBuilder.group(this.formularioOriginal);
      this.leerValoresURL();
      this.buscarPeliculas(this.form.value);
      this.form.valueChanges
      .subscribe(valores=>{
        
        this.buscarPeliculas(valores);
        this.escribirParametrosBusquedaEnURL();
      });

    });

  }
  private leerValoresURL(){
    this.activaredRoute.queryParams.subscribe((params)=>{
      var objeto: any ={};
      if (params.titulo) {
        objeto.titulo=params.titulo;
      }
      if (params.generoID) {
        objeto.generoID=Number(params.generoID);
      }
      if (params.proximosEstrenos) {
        objeto.proximosEstrenos=params.proximosEstrenos;
      }
      if (params.enCines) {
        objeto.enCines=params.enCines;
      }
      this.form.patchValue(objeto);
    });
  }
  private escribirParametrosBusquedaEnURL(){
    var queryStrings=[];
    var valoresFormulario=this.form.value;
    
    if (valoresFormulario.titulo) 
    {
     queryStrings.push(`titulo=${valoresFormulario.titulo}`); 
    }

    if (valoresFormulario.generoId) 
    {
     queryStrings.push(`generoId=${valoresFormulario.generoId}`); 
    }

    if (valoresFormulario.proximosEstrenos) 
    {
     queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`); 
    }

    if (valoresFormulario.enCines) 
    {
     queryStrings.push(`enCines=${valoresFormulario.enCines}`); 
    }
    this.locaction.replaceState('peliculas/buscar',queryStrings.join('&'));
  }
  buscarPeliculas(valores:any){
    valores.pagina=this.paginaActual;
    valores.recordsPorPagina=this.cantidadElementosAMostrar;

    this.peliculasServices.filtrar(valores).subscribe(response=>{
      this.peliculas=response.body;
      this.escribirParametrosBusquedaEnURL();
      this.cantidadElementos=response.headers.get('cantidadTotalRegistros');
    })

  }
  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

  paginatorUpdate(datos:PageEvent){
    this.paginaActual = datos.pageIndex +1;
    this.cantidadElementosAMostrar=datos.pageSize;
    this.buscarPeliculas(this.form.value);
  }

}
