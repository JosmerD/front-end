import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO, cineDTO } from '../cine';
import { CinesService } from '../cines.service';
@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor(private router:Router,private activateRoute:ActivatedRoute,private cinesServices:CinesService) { }

  modelo:cineDTO;

  errores:string[]=[];
  
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      this.cinesServices.obtenerPorId(params.id)
      .subscribe(cine=>{
        
          this.modelo=cine;
        
        },()=>this.router.navigate(['/cines'])) 
     });   
  }

    guardarCambios(cine:cineCreacionDTO){
      this.cinesServices.editar(this.modelo.id,cine)
      .subscribe(()=>{
        this.router.navigate(['/cines']);      
    },error=>this.errores=parsearErroresAPI(error));
  }
}
