import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import Swiper from 'swiper';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent  implements OnInit, OnDestroy {

  @Output() avatarSelec = new EventEmitter<string>();
  @Input() $avatarActual!: BehaviorSubject<string>;
  avatarActualSub!: Subscription;

  @ViewChild('swiperAvatar') swiperRef!: ElementRef;
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
  constructor() { }

  ngOnInit() {

    if(this. $avatarActual){
      this.avatarActualSub = this.$avatarActual.subscribe(value=>{
        this.avatars.forEach((av,index)=>{
          if(av.img ===value){
            av.seleccionado = true;
            this.swiper?.slideTo(index - 1);
          }else{
            av.seleccionado = false;
          }

        });
      })
    }

  }

  seleccionarAvatar(avatar: any){
    this.avatars.forEach(av=>av.seleccionado = false);
    avatar.seleccionado = true;
    this.avatarSelec.emit(avatar.img);
  }

  swiperReady(){
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  ngOnDestroy(): void {
    if(this.avatarActualSub){
      this.avatarActualSub.unsubscribe();
    }
  }


}
