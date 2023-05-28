import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapaComponent } from './mapa/mapa.component';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    AvatarSelectorComponent,
    MapaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports:[
    PostsComponent,
    AvatarSelectorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
