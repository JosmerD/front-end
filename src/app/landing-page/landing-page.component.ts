import { Component, OnInit } from '@angular/core';
import { peliculaDTO } from '../peliculas/pelicula';
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private peliculasServices:PeliculasService){}
  
  ngOnInit(): void {
    
    this.cargarDatos();

    }
  peliculaEnCines:peliculaDTO[];  
  peliculasProximoEstrenos: peliculaDTO[];  
  
  cargarDatos(){
    this.peliculasServices.obtenerLandingPage().subscribe(landingPage=>{
      this.peliculaEnCines=landingPage.enCines;
      this.peliculasProximoEstrenos=landingPage.proximosEstrenos;
    })
  }

  borrado(){
    this.cargarDatos();
  }
    
}
