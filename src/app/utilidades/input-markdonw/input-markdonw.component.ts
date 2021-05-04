import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-input-markdonw',
  templateUrl: './input-markdonw.component.html',
  styleUrls: ['./input-markdonw.component.css']
})
export class InputMarkdonwComponent implements OnInit {

  @Input()
  contenidoMarkdown='';
  
  @Input()
  placeHolderTextarea:string='Texto';
  
  @Output()
  
  changeMarkdown: EventEmitter<string>= new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }
  inputTextArea(texto:string){
    
    this.contenidoMarkdown=texto;
    this.changeMarkdown.emit(texto);
  }
}
