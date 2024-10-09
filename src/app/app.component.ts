import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Almi', url: '/folder', icon: 'home' },
    { title: 'Alta', url: '/alta', icon: 'add' },
    { title: 'Baja', url: '/baja', icon: 'trash' },
  ];

  selectedIndex: number | undefined;

  constructor(private platform:Platform) {

    this.initializeApp();
    this.selectedIndex = 0;
  }
  
  initializeApp() {
    console.log();
  }

  ngOnInit(): void {
    const path = window.location.pathname.split('folder/')[1];

    if(path !== undefined){

      this.selectedIndex= this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
