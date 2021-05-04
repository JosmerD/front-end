import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  ngOnInit(): void {        
        this.peliculaEnCines= [{
          titulo: 'Spider-Man',
          fechaLanzamiento: new Date(),
          precio: 1400.99,
          poster:'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
        },
        {
          titulo: 'Moana',
          fechaLanzamiento: new Date(),
          precio: 20000,
          poster: 'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_UX182_CR0,0,182,268_AL_.jpg'
        }];      
    }
  peliculaEnCines;  
  peliculasProximoEstrenos= [{
    titulo: 'Avengers',
    fechaLanzamiento: new Date(),
    precio: 1400.99
  },
  {
    titulo: 'Atman',
    fechaLanzamiento: new Date(),
    precio: 20000
  }]
    
}
