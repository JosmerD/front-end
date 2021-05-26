import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { credencialesUsuario } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private seguridadServices:SeguridadService,private router:Router) { }
errores:string[]=[];
  ngOnInit(): void {
  }
  
  login(credenciales:credencialesUsuario){
   this.seguridadServices.login(credenciales)
   .subscribe(respuesta=>{
     this.seguridadServices.guardarToken(respuesta);
     this.router.navigate(['/']);

   },errores=>this.errores=parsearErroresAPI(errores)); 
  }
}
