import { Component, Input, OnInit } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.css']
})
export class AutorizadoComponent implements OnInit {

  constructor(private seguridadServices:SeguridadService) { }

  @Input()
  rol:string;

  ngOnInit(): void {
  }

  estaAutorizado():boolean{
    if (this.rol) {
      return this.seguridadServices.obtenerRol() === this.rol;  
    }else{
      return this.seguridadServices.estaLogueado();
    }
    
  }
 

}
