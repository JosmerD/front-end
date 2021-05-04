import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actorCreacionDTO,actorDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  constructor(private activateRoute:ActivatedRoute) { }

  modelo: actorDTO=
  {
    nombre:"Josmer",
    fechaNacimiento:new Date,
    foto:'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
     // alert(params.id);

    })
    
  }
  guardarCambios(actor:actorCreacionDTO){
    console.log(actor); 
   } 

}
