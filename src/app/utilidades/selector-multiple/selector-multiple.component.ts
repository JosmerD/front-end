import { Component, Input, OnInit } from '@angular/core';
import { MutipleSelectorModel } from './MultipleSelectorModels';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {

  constructor() { }

  @Input()
  Seleccionados: MutipleSelectorModel[]=[];

@Input()
NoSeleccionados: MutipleSelectorModel[]=[];
  
  ngOnInit(): void {
  }
  seleccionar(item:MutipleSelectorModel,index:number){
    this.Seleccionados.push(item);
    this.NoSeleccionados.splice(index,1);
  }
  deseleccionar(item:MutipleSelectorModel,index:number){
    this.NoSeleccionados.push(item);
    this.Seleccionados.splice(index,1);

  }
  seleccionarTodo(){

    this.Seleccionados.push(...this.NoSeleccionados);
    this.NoSeleccionados=[];
  }
  deseleccionarTodo(){
    this.NoSeleccionados.push(...this.Seleccionados);
    this.Seleccionados=[];
  }
}
