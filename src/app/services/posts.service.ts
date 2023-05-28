import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { Observable, map } from 'rxjs';
import { UsuarioService } from './usuario.service';

import { FileTransfer, FileUploadOptions, FileTransferObject} from '@awesome-cordova-plugins/file-transfer'
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts: number = 0;

  nuevoPost = new EventEmitter<Post>()

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  getPosts(pull: boolean = false):Observable<RespuestaPosts>{
    if(pull){
      this.paginaPosts = 0;
    }
    this.paginaPosts ++;
    return this.http.get<RespuestaPosts>(`${URL}/posts?pagina=${this.paginaPosts}`);
  }

  crearPost(post : any): Promise<boolean>{
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token!
    });

    return new Promise<boolean> ((resolve)=>{
      this.http.post(`${URL}/posts`,post,{headers}).pipe(
       map((resp : any)=>{
        if(resp['ok']){
          resp.post.usuario = this.usuarioService.getUsuario();
        }
        return resp;
       })
      ).subscribe((resp: any)=>{
        if(resp['ok']){
          this.nuevoPost.emit(resp.post);
          resolve(true);
        }else{
          resolve(false);
        }
      })
    })
  }

  subirImagen(dataUrl: string, formato:string){

    const archivo = this.dataURLtoFile(dataUrl,formato);
    // const archivo = this.dataUrlToBlob(dataUrl);
    const form = new FormData();
    form.append('img', archivo);
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token!,
    });

    this.http.post(`${URL}/posts/upload`,form,{headers}).subscribe((data: any)=>{
      console.log(data);
    })
  }

  dataURLtoFile(dataurl:string , type: string) {
    let arr = dataurl.split(','),
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr],{type: `image/${type}`});
    // return new File([u8arr], `photo.$`, {type: `image/${type}`});
}

  subirImagen1(img: string){
    const option: FileUploadOptions = {
      fileKey: 'img',
      headers:{
        'x-token': this.usuarioService.token
      },
    }

    const fileTransfer: FileTransferObject = FileTransfer.create();

    fileTransfer.upload(img,`${URL}/posts/pload`,option,true).then(data=>{
      console.log(data);
    }).catch(err=>{
      console.log(err);
    })
  }
}
