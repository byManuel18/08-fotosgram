import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';

declare var window: any;


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages:  any[]=[];

  post:{
    mensaje: string,
    coords: null | string,
    posicion: boolean
  } = {
    mensaje: '',
    coords: null,
    posicion: false
  }

  cargandoGeo: boolean = false;

  constructor(
    private postService: PostsService,
    private route: Router,
    private domSanitizer: DomSanitizer
  ) {}

  async crearPost(){
    const creado = await this.postService.crearPost(this.post);
    if(creado){
      this.post = {
        mensaje: '',
        coords: null,
        posicion: false
      }
      this.tempImages = [];
      this.route.navigateByUrl('/main/tabs/tab1');
    }
  }

  getGeo(){
    if(!this.post.posicion){
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;

    Geolocation.getCurrentPosition().then(data=>{
      const coords = `${data.coords.latitude},${data.coords.longitude}`;
      this.post.coords = coords;
      this.cargandoGeo = false;
    }).catch(err=>{
      console.log(err);
      this.cargandoGeo = false;
    });

  }

  camara(){
    const options: ImageOptions ={
      quality: 60,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      allowEditing: true,
    }
    this.loadPhoto(options);

  }

  galeria(){
    const options: ImageOptions ={
      quality: 60,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      allowEditing: true,
    }

    this.loadPhoto(options);

  }


  loadPhoto(options: ImageOptions){
    Camera.getPhoto(options).then(dataImg=>{
      // const img = window.Ionic.WebView.convertFileSrc(dataImg);
      // console.log(img);
      const srcLink = this.domSanitizer.bypassSecurityTrustResourceUrl(dataImg.dataUrl!);
      this.postService.subirImagen(dataImg.dataUrl!, dataImg.format);
      this.tempImages.push(srcLink);
    }).catch(err=>{
      console.log(err);
    })
  }

}
