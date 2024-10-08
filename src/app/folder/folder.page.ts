import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnadoService } from '../servicios/alumnado.service';
import { Alumno } from '../models/alumno';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  alumnos: Alumno[] = [];


  constructor(private activatedRoute:ActivatedRoute, private alumnadoService:AlumnadoService, private loadingController:LoadingController) {


  }

  ngOnInit() {
    //this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getAlumnosHome();
  }

  async getAlumnosHome(){

    const loading = await this.loadingController.create({message:'Cargando...'});
    await loading.present();

    await this.alumnadoService.getAlumnos().subscribe(
      res => {
        this.alumnos = res;
        console.log(this.alumnos);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss
      }
    )
  }
}
