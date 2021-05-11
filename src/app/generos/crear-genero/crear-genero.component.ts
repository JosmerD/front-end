import { Component, OnInit, ɵCompiler_compileModuleAsync__POST_R3__ } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { environment } from 'src/environments/environment';
import { generoCreacionDTO } from '../genero';
import { GenerosService } from '../generos.service';


@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent {

  errores:string[]=[];

  constructor(private router:Router,private generosServices:GenerosService) {}
  
  

  guardarCambios(genero:generoCreacionDTO){
    
    this.generosServices.crear(genero).subscribe(()=>{
      this.router.navigate(['/generos'])  
    },error=>this.errores=parsearErroresAPI(error)
    );
       
  }
  

}
