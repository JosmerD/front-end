import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import{Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private locaction: Location,
    private activaredRoute:ActivatedRoute) { }
form:FormGroup;
generos=[
  {id:1,nombre:'Drama'},
  {id:2,nombre:'Accion'},
  {id:3,nombre:'Comedia'}
]
peliculas =[
  {
    titulo:'Spider-Man',
    enCines:true,
    proximosEstrenos:false,
    generos:[2],
    poster:'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
  },
  {
    titulo:'Moana',
    enCines:false,
    proximosEstrenos:true,
    generos:[2,3],
    poster:'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_UX182_CR0,0,182,268_AL_.jpg'
  },
  {
    titulo:'Avengers',
    enCines:false,
    proximosEstrenos:false,
    generos:[1,3],
    poster:'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg'
  }

]
peliculasOriginal=this.peliculas;

formularioOriginal={
  titulo:'',
      generoId:0,
      proximosEstrenos:false,
      enCines:false

};
  ngOnInit(): void {
    this.form=this.formBuilder.group(this.formularioOriginal);
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value);
    this.form.valueChanges
    .subscribe(valores=>{
      this.peliculas=this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametrosBusquedaEnURL();
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
    if(valores.titulo){
      this.peliculas=this.peliculas.filter(pelicula=>pelicula.titulo.indexOf(valores.titulo)!==-1);
    }
    if(valores.generoId){
      this.peliculas=this.peliculas.filter(pelicula=>pelicula.generos.indexOf(valores.generoId)!==-1);
    }
    if(valores.proximosEstrenos){
      this.peliculas=this.peliculas.filter(pelicula=>pelicula.proximosEstrenos);
    }
    if(valores.enCines){
      this.peliculas=this.peliculas.filter(pelicula=>pelicula.enCines);
    }

  }
  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

}
