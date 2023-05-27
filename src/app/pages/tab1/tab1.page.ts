import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  posts: Post[] = [];

  habilitado = false;

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.sigueintes();
  }

  recargar(event: any){
    this.posts = [];
    this.habilitado = false;
    this.sigueintes(event, true);
  }

  sigueintes(event?: any, pull: boolean = false){

    this.postsService.getPosts(pull).subscribe(resp=>{
      this.posts.push(...resp.posts);
      if(event){
        event.target.complete();
        if(resp.posts.length === 0){
          this.habilitado = true;
        }
      }
    })
  }

}
