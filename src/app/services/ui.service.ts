import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private alertCtr: AlertController
  ) { }

  async alertaInformativa(message: string) {
    const alert = await this.alertCtr.create({
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
