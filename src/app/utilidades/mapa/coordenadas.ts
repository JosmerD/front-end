export interface Coordenadas{
    latitud:number;
    longitud:number;
}

export interface CoordenadasConMensaje extends Coordenadas{
    mensaje:string;
}