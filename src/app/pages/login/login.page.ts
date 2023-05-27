import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swiper from 'swiper';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('swiperMain') swiperRef!: ElementRef;
  swiper?: Swiper;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  loginUser ={
    email: 'prueba1@test.com',
    password: '123456'
  };

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }

  swiperReady(){
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  login(fLogin: NgForm){
    if(fLogin.invalid){
      return;
    }
    this.usuarioService.login(this.loginUser.email, this.loginUser.password);    console.log(this.loginUser);

  }

  registro(fRegistro: NgForm){
    console.log(fRegistro.valid);
  }

  seleccionarAvatar(avatar: any){
    this.avatars.forEach(av=>av.seleccionado = false);
    avatar.seleccionado = true;
  }

  mostrarReg(){
    this.swiper?.slideNext();
  }

  mostrarLogin(){
    this.swiper?.slidePrev();
  }


}
