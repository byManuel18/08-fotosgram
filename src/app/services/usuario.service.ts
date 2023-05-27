import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UtilsService } from './utils.service';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _storage: Storage | null = null;
  token: string | null = null;

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private utils: UtilsService
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  login(email:string, password: string){
    const data = {email, password: this.utils.encryptWithPublicKey(password)};
    this.http.post(`${URL}/user/login`,data).subscribe(resp=>{
      console.log(resp);
    })
  }
}
