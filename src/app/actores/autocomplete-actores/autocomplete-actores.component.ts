import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { ActoresService } from '../actores.service';
import {actorPeliculaDTO} from '../actor'

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  constructor(private actoresServices:ActoresService) { }
  control:FormControl= new FormControl();
  
  @Input()  
  actoresSeleccionados:actorPeliculaDTO[]=[];
  actoresAMostrar:actorPeliculaDTO[]=[];
  columnasAMostrar=['imagen','nombre','personaje','acciones'];

  @ViewChild(MatTable) table:MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe(nombre=>{
      this.actoresServices.obtenerPorNombre(nombre).subscribe(actores=>{
        this.actoresAMostrar=actores;
      });
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
