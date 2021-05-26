import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { actorPeliculaDTO } from 'src/app/actores/actor';
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
  errores:string[]=[];
  @Input()
  modelo:peliculaDTO;

  @Output()


OnSubmit: EventEmitter<peliculaCreactionDTO>= new EventEmitter<peliculaCreactionDTO>();
@Input()
generosNoSeleccionados:MutipleSelectorModel[];
@Input()
generosSeleccionados:MutipleSelectorModel[]=[];

@Input()
cinesNoSeleccionados:MutipleSelectorModel[];
@Input()
cinesSeleccionados:MutipleSelectorModel[]=[];

@Input()
actoresSeleccionados:actorPeliculaDTO[]=[];

imagenCambiada:boolean=false;

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
     generosIds:'',
     cinesIds:'',
     actores:''

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
    this.imagenCambiada=true;
  }
  guardarCambios(){
    
    const generosIDs=this.generosSeleccionados.map(val=>val.llave);
    this.form.get('generosIds').setValue(generosIDs);

    const cinesIDs=this.cinesSeleccionados.map(val=>val.llave);
    this.form.get('cinesIds').setValue(cinesIDs);

    const actores=this.actoresSeleccionados.map(val=>{
      return {id:val.id,personaje:val.personaje}
    });
    this.form.get('actores').setValue(actores);
    if (!this.imagenCambiada) {
      this.form.patchValue({'poster':null});
    }

    this.OnSubmit.emit(this.form.value);
    

    
  }

}
