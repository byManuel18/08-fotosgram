import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private alertCtr: AlertController,
    private toastCtr: ToastController
  ) { }

  async alertaInformativa(message: string) {
    const alert = await this.alertCtr.create({
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastCtr.create({
      message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
