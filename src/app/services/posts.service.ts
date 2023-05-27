import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaPosts } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  getPosts(pull: boolean = false):Observable<RespuestaPosts>{
    if(pull){
      this.paginaPosts = 0;
    }
    this.paginaPosts ++;
    return this.http.get<RespuestaPosts>(`${URL}/posts?pagina=${this.paginaPosts}`);
  }
}
