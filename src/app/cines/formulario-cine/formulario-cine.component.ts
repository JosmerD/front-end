import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Coordenadas } from 'src/app/utilidades/mapa/coordenadas';
import { cineCreacionDTO,cineDTO } from '../cine';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css']
})
export class FormularioCineComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  form:FormGroup
  @Input()
  modelo: cineCreacionDTO;
  //coordenada: Coordenadas;
  @Input()
  errores:string[]=[];
  @Output()
  guardarCambios: EventEmitter<cineCreacionDTO> = new  EventEmitter<cineCreacionDTO>();
  coordenadaInicial: Coordenadas[]=[];

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      nombre:[
        '',
      {
        validators:[Validators.required],
      },
    ],
      latitud:[
      '',
        {
          validators:[Validators.required],
        },
    ],
      longitud:[
    '',
      {
        validators:[Validators.required],
      },
    ]

    });

    if (this.modelo!==undefined) {
      this.form.patchValue(this.modelo);
      this.coordenadaInicial.push({latitud:this.modelo.latitud,longitud:this.modelo.longitud});
    }
  }

  coordenadasSeleccionadas(coordenada:Coordenadas){
    this.form.patchValue(coordenada);

  }

  OnSubmit(){
    this.guardarCambios.emit(this.form.value);
  }
}
