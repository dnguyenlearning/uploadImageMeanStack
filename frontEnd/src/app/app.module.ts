import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

// import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { ImageUploadModule } from "angular2-image-upload";
import { PostsComponent } from './components/posts/posts.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    // FileSelectDirective,
    // FileDropDirective
  ],
  imports: [
    BrowserModule,
    ImageUploadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
