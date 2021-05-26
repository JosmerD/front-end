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
imagenCambiada = false;

form:FormGroup;
@Input()
errores:string[]=[];
@Input()
modelo: actorDTO;

@Output()

Onsudmit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

ngOnInit(): void {
    this.form=this.formBuilder.group({
      nombre:[
        '',
      {
        validators:[Validators.required],
      },
    ],
      fechaNacimiento:'',
      foto:'',
      biografia:''
    });
    if (this.modelo!==undefined) {
      this.form.patchValue(this.modelo);
    }
  }

archivoSeleccionado(file){
  this.imagenCambiada=true;
    this.form.get('foto').setValue(file);
  }

  OnSubmit(){
    if(!this.imagenCambiada){
      this.form.patchValue({'foto':null});
    }
    this.Onsudmit.emit(this.form.value);
  }

  cambioMarkdown(texto:string){
    this.form.get('biografia').setValue(texto);
  }

}
