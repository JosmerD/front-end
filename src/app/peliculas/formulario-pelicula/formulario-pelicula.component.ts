import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { peliculaCreactionDTO, peliculaDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  form:FormGroup;

  @Input()
  modelo:peliculaDTO;

  @Output()


OnSubmit: EventEmitter<peliculaCreactionDTO>= new EventEmitter<peliculaCreactionDTO>();
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      titulo:[
        '',
      {
        validators:[Validators.required],
      },
    ],
     resumen:'',
     enCines:false,
     trailer:'',
     fechaLanzamiento:'',
     poster:''

    });
    if (this.modelo!==undefined) {
      this.form.patchValue(this.modelo);
    }
  }
  changeMarkdown(texto){

    this.form.get('resumen').setValue(texto);
  }
  archivoSeleccionado(archivo:File){
    this.form.get('poster').setValue(archivo);
  }
  guardarCambios(){
    this.OnSubmit.emit(this.form.value);

    
  }

}
