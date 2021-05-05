import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MutipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModels';
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

generosNoSeleccionados:MutipleSelectorModel[]=[
  {
    llave:1,valor:'Drama'
  },
  {
    llave:2,valor:'Accion'
  },
  {
    llave:3,valor:'Comedia'
  }
];
generosSeleccionados:MutipleSelectorModel[]=[];


cinesNoSeleccionados:MutipleSelectorModel[]=[
  {
    llave:1,valor:'Sambil'
  },
  {
    llave:2,valor:'Cinepolis'
  },
  {
    llave:3,valor:'Cine Planet'
  }
];
cinesSeleccionados:MutipleSelectorModel[]=[];

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
     poster:'',
     generosId:'',
     cinesId:''

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
    
    const generosIDs=this.generosSeleccionados.map(val=>val.llave);
    this.form.get('generosId').setValue(generosIDs);

    const cinesIDs=this.cinesSeleccionados.map(val=>val.llave);
    this.form.get('cinesId').setValue(cinesIDs);

    this.OnSubmit.emit(this.form.value);
    

    
  }

}
