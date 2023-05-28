import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UtilsService } from './utils.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _storage: Storage | null = null;
  token: string | null = null;
  usuario: Usuario = {};

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private utils: UtilsService,
    private navCtr : NavController
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadToken();
  }

  login(email:string, password: string): Promise<boolean>{
    const data = {email, password: this.utils.encryptWithPublicKey(password)};
    return new Promise<boolean>(resolve =>{
      this.http.post(`${URL}/user/login`,data).subscribe(async (resp : any)=>{
        console.log(resp);
        if(resp['ok']){
          await this.guardarToken(resp['token']);
          resolve(true);
        }else{
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    })
  }

  registro(usuario: Usuario): Promise<boolean>{
    usuario.password =  this.utils.encryptWithPublicKey(usuario.password!);
    return new Promise<boolean>(resolve=>{
      this.http.post(`${URL}/user/create`,usuario).subscribe(async (resp: any)=>{
        if(resp['ok']){
          await this.guardarToken(resp['token']);
          resolve(true);
        }else{
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      })
    });
  }

  async guardarToken(token: string){
    this.token = token;
    await this.storage.set('token',token);
  }

  async loadToken(){
    this.token = await this.storage.get('token') || null;
  }

  validaToken(): Promise<boolean>{
    return new Promise<boolean>(async (resolve)=>{
      await this.loadToken();
      if(!this.token){
        this.navCtr.navigateRoot('/login');
        resolve(false);
      }else{
        const headers = new HttpHeaders({
          'x-token': this.token
        })
        this.http.get(`${URL}/user/`,{headers}).subscribe(async (resp: any)=>{
          if(resp['ok']){
            this.usuario = resp['usuario'];
            await this.guardarToken(resp['token']);
            resolve(true);
          }else{
            this.navCtr.navigateRoot('/login');
            resolve(false);
          }
        });
      }
    });
  }
}
