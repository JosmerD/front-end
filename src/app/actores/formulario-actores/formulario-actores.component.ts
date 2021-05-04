import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

form:FormGroup;

@Input()

modelo: actorDTO;

@Output()

sudmit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

ngOnInit(): void {
    this.form=this.formBuilder.group({
      nombre:[
        '',
      {
        validators:[Validators.required],
      },
    ],
      fechaNacimiento:'',
      foto:''
    });
    if (this.modelo!==undefined) {
      this.form.patchValue(this.modelo);
    }
  }

archivoSeleccionado(file){
    this.form.get('foto').setValue(file);
  }

  OnSubmit(){
    
    this.sudmit.emit(this.form.value);
  }

}
