import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages = [];

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }

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

}
