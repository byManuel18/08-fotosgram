import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  usuario: Usuario = {}

  $avatarUser: BehaviorSubject<string> = new BehaviorSubject<string>('av-1.png');

  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
  }

  ionViewWillEnter(){
    this.usuario = this.usuarioService.getUsuario();
    this.$avatarUser.next(this.usuario.avatar || 'av-1.png');
  }


  logout(){

  }

  async actualizar(fActualizar: NgForm){
    if(fActualizar.invalid){
      return;
    }

   const valido = await  this.usuarioService.actualizarUsuario(this.usuario);
   if(valido){
    this.uiService.presentToast('Usuario Actualizado');
   }else{
    this.uiService.presentToast('No se ha actualizado');
   }
  }

  changeAvantar(avatar: string){
    this.usuario.avatar = avatar;
  }

}
