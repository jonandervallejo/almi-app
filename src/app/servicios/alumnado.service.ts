import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnadoService {

  public url="http://44.198.98.117:8000/ws/alumnado/";

  constructor(private httpClient:HttpClient) { }

  getAlumnos():Observable<Alumno[]>{

    return this.httpClient.get<Alumno[]>(this.url);
  }

  crearAlumno(alumno:Alumno):Observable<any>{

    alumno.fecha = alumno.fecha?.toString().slice(0,10);
    return this.httpClient.post(this.url + "/add", alumno);
  }

  borrarAlumno(id:number):Observable<any>{

    return this.httpClient.delete(this.url + "/delete/" + id);
  }
}
