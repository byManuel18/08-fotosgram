import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  getPosts(){
    this.paginaPosts ++;
    return this.http.get(`${URL}/posts?pagina=${this.paginaPosts}`);
  }
}