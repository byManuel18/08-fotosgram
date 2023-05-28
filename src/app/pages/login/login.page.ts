import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swiper from 'swiper';
import { UsuarioService } from '../../services/usuario.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../../services/ui.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('swiperMain') swiperRef!: ElementRef;
  swiper?: Swiper;

  loginUser ={
    email: 'prueba1@test.com',
    password: '123456'
  };

  rgisterUser: Usuario ={
    email: 'prueba',
    password: '123456',
    nombre: 'test',
    avatar: 'av-1.png'
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCtr: NavController,
    private uiService: UiService
  ) { }

  ngOnInit() {
  }

  swiperReady(){
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  async login(fLogin: NgForm){
    if(fLogin.invalid){
      return;
    }
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);    console.log(this.loginUser);

    if(valido){
      this.navCtr.navigateRoot('/main/tabs/tab1',{animated: true});
    }else{
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos')
    }

  }

  async registro(fRegistro: NgForm){
    if(fRegistro.invalid){
      return;
    }
    const valido = await this.usuarioService.registro({...this.rgisterUser});
    if(valido){
      this.navCtr.navigateRoot('/main/tabs/tab1',{animated: true});
    }else{
      this.uiService.alertaInformativa('EL correo ya existe');
    }
  }

  seleccionarAvatar(avatar: string){
     this.rgisterUser.avatar = avatar;
   }

  mostrarReg(){
    this.swiper?.slideNext();
  }

  mostrarLogin(){
    this.swiper?.slidePrev();
  }


}
