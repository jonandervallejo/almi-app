import { Component, OnInit } from '@angular/core';
import { AlumnadoService } from '../servicios/alumnado.service';
import { Alumno } from '../models/alumno';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-baja',
  templateUrl: './baja.page.html',
  styleUrls: ['./baja.page.scss'],
})
export class BajaPage implements OnInit {

  alumnos: Alumno[] = [];

  constructor(public loadingController:LoadingController, private alumnadoService:AlumnadoService, public alertController:AlertController, private router:Router) { }

  async getAlumnosBaja(){

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
        loading.dismiss();
      });
  }

  async presentAlertConfirm(idAlumno:any) {

    const alert = await this.alertController.create({

      header: 'Confirmar!',
      message: '¿Estás seguro de que quieres borrar este alumno?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.borrarAlumno(idAlumno);
            this.router.navigateByUrl('');
          }
        }
      ]
    });

    await alert.present();
  }


  async borrarAlumno(id:number){

    const loading = await this.loadingController.create({message:'Cargando...'});
    await loading.present();

    await this.alumnadoService.borrarAlumno(id).subscribe(
      res => {
        console.log(this.alumnos);
        loading.dismiss();
        this.getAlumnosBaja();
      },
      err => {
        console.log(err);
        loading.dismiss();
      });
  }

  borrar(idAlumno:any){
    this.presentAlertConfirm(idAlumno);
  }

  ngOnInit() {
    this.getAlumnosBaja();
  }

}
