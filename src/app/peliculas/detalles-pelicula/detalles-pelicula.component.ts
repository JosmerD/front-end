import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from 'src/app/rating/rating.service';
import { Coordenadas, CoordenadasConMensaje } from 'src/app/utilidades/mapa/coordenadas';
import Swal from 'sweetalert2';
import { peliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-detalles-pelicula',
  templateUrl: './detalles-pelicula.component.html',
  styleUrls: ['./detalles-pelicula.component.css']
})
export class DetallesPeliculaComponent implements OnInit {

  constructor(private peliculasServices:PeliculasService, private activateRoute:ActivatedRoute, private sanitazer: DomSanitizer, private ratingServices:RatingService) { }

  pelicula:peliculaDTO;
  fechaLanzamiento:Date;
  trailerURL:SafeResourceUrl;
  coordenadas:CoordenadasConMensaje[];

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      this.peliculasServices.obtenerPorId(params.id).subscribe(pelicula=>{
        console.log(pelicula);
        this.pelicula=pelicula;
        this.fechaLanzamiento=new Date(this.pelicula.fechaLanzamiento);
        this.trailerURL=this.generarURLYoutubeEmbed(this.pelicula.trailer);
        this.coordenadas=pelicula.cines.map(cine=>{
            return {
              longitud:cine.longitud,
              latitud:cine.latitud,
              mensaje:cine.nombre
            }
        });
      })
    })
  }
  
  rated(puntuacion:number){
    this.ratingServices.rate(this.pelicula.id,puntuacion)
    .subscribe(()=>{
      Swal.fire("Exitoso","Su voto ha sido recibido",'success');
    })
  }

  generarURLYoutubeEmbed(url:any):SafeResourceUrl{
    if (!url) {
      return '';
    }
    var video_id=url.split('v=')[1];
    var posicionAmpersand = video_id.indexOf('&');
    if (posicionAmpersand!==-1) {
      video_id=video_id.substring(0,posicionAmpersand);
    }
    return this.sanitazer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video_id}`);
    
  }

}
