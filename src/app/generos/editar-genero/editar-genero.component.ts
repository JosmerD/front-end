import { Component, OnInit } from '@angular/core';
import { generoCreacionDTO, generoDTO } from '../genero';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerosService } from '../generos.service';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  constructor(private router:Router,private activateRoute:ActivatedRoute, private generosServices:GenerosService) { }

  modelo: generoDTO;
  errores:string[]=[];
  
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      this.generosServices.obtenerPorId(params.id)
      .subscribe(genero=>{
        
          this.modelo=genero;
        
        },()=>this.router.navigate(['/generos'])) 
     });   
  }

    guardarCambios(genero:generoCreacionDTO){
      this.generosServices.editar(this.modelo.id,genero)
      .subscribe(()=>{
        this.router.navigate(['/generos']);      
    },error=>this.errores=parsearErroresAPI(error));
  }

}
