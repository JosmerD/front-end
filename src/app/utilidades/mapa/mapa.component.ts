import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import { Coordenadas } from 'src/app/utilidades/mapa/coordenadas';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @Input()
  coordenadasIniciales: Coordenadas[]=[];
  constructor() { }
  @Output()
  coordenadasSeleccionadas:EventEmitter<Coordenadas> = new EventEmitter<Coordenadas>();
  ngOnInit(): void {
    this.capas=this.coordenadasIniciales.map(valor=>marker([valor.latitud,valor.longitud]));
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 20,
    center: latLng(-33.48749075238121, -70.61940908432008)
  };

  capas: Marker<any>[]=[];
  
  manejarClick(event:LeafletMouseEvent){
    const latitud=event.latlng.lat;
    const longitud = event.latlng.lng;
    console.log({latitud,longitud});
  
    this.capas.push(marker([latitud,longitud]));
    this.coordenadasSeleccionadas.emit({latitud:latitud,longitud:longitud});

  }

}
