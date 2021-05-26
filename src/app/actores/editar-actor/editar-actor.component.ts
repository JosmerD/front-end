import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerosService } from 'src/app/generos/generos.service';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { actorCreacionDTO,actorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  constructor(private router:Router,private activateRoute:ActivatedRoute, private actoresServices:ActoresService) { }

  modelo: actorDTO;
  errores:string[]=[];
  
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      this.actoresServices.obtenerPorId(params.id)
      .subscribe(actores=>{
        
          this.modelo=actores;
        
        },()=>this.router.navigate(['/actores'])) 
     });   
  }

    guardarCambios(actores:actorCreacionDTO){
      this.actoresServices.editar(this.modelo.id,actores)
      .subscribe(()=>{
        this.router.navigate(['/actores']);      
    },error=>this.errores=parsearErroresAPI(error));
  }

}
