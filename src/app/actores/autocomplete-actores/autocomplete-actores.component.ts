import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  constructor() { }
  control:FormControl= new FormControl();
  actores=[
    {
      nombre: 'Tom', 
      'personaje':'',
      foto:'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
    },
    {
      nombre: 'Josmer', 
      'personaje':'',
      foto:'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_UX182_CR0,0,182,268_AL_.jpg'
    }
  ];

  actoresOriginal= this.actores;
  actoresSeleccionados =[];

  columnasAMostrar=['imagen','nombre','personaje','acciones'];

  @ViewChild(MatTable) table:MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor=>{
this.actores=this.actoresOriginal;
this.actores=this.actores.filter(actor=>actor.nombre.indexOf(valor)!==-1);
    })
  }
  opcionSelected(event:MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
    if (this.table!==undefined) {
      this.table.renderRows();
    }
  }
  eliminar(actor){
    const indice=this.actoresSeleccionados.findIndex(a=>a.nombre===actor.nombre);
    this.actoresSeleccionados.splice(indice,1);
    this.table.renderRows();
  }
  finalizaArrastre(event:CdkDragDrop<any>){
    const indicePrevio = this.actoresSeleccionados.findIndex(actor=>actor===event.item.data)
    moveItemInArray(this.actoresSeleccionados,indicePrevio,event.currentIndex);
    this.table.renderRows();

  }
}
