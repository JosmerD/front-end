import { Component, OnInit } from '@angular/core';
import { generoCreacionDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  constructor(private geneerosServices:GenerosService) { }
generos: generoCreacionDTO[];
columnasAMostrar:['id','nombre','acciones']
  ngOnInit(): void {
    
    this.geneerosServices.obtenerTodos().subscribe(generos=>{
      this.generos=generos;    
    },error=>console.log(error));   

  }

}
