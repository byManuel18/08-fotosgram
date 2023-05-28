import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages = [];

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
    private route: Router
  ) {}

  async crearPost(){
    const creado = await this.postService.crearPost(this.post);
    if(creado){
      this.post = {
        mensaje: '',
        coords: null,
        posicion: false
      }
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

}
