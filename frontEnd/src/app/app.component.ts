import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  imgPreview=[];
  filesToUpload: Array<File> = [];
  posts:any[];
  maximumSize:number=100000;
  errSize:boolean=false;
  positionErr:number=0;
  constructor(private http: Http) {

  }


  ngOnInit(){
    this.http.get('http://localhost:3000/posts')
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.success){
        this.posts=data.posts;
      }
    })
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    let fileLength = this.filesToUpload.length;

    for (let i = 0; i < fileLength; i++) {
      for(let j=0;j<this.imgPreview.length;j++){
        if(this.filesToUpload[i].name==this.imgPreview[j].name){
          formData.append('uploads[]', files[i], files[i]['name']);
          console.log('times')
        }
      }
    }
    
    this.http.post('http://localhost:3000/upload', formData)
      .map(res => res.json())
      .subscribe(data =>{
        if(data.success){
          this.filesToUpload=[];
          this.imgPreview=[];
          this.posts.unshift(data.post);
          console.log(data.post)
        }
      })
  }


  fileChangeEvent(e: any) {
    this.filesToUpload = <Array<File>>e.target.files;

    console.log(this.filesToUpload);

    this.checkSize(this.filesToUpload);
    
    this.imgPreview=[];

    if(e.target.files){

      for (let i = 0; i < this.filesToUpload.length; i++) {
        var reader = new FileReader();
        reader.onload = (event:any) => {
          let newImageReview={
            name:this.filesToUpload[i].name,
            src:event.target.result,
            size:this.filesToUpload[i].size
          }
          this.imgPreview.push(newImageReview);
        }
        reader.readAsDataURL(this.filesToUpload[i]);
      }

      

    }


  }

  deleteImage(image){
    
    

    this.imgPreview=this.imgPreview.filter((img)=>{
      return img.name!=image.name;
    })


    // checkSize();
    this.checkSize(this.imgPreview);
  }

  checkSize(restImages){
    for(let i=0;i<restImages.length;i++){
      if(restImages[i].size>=this.maximumSize){
        this.errSize=true;
        this.positionErr=i;
        break;
      }else{
        this.errSize=false;
        this.positionErr=0;
      }
    }
    console.log(this.positionErr);
  }


}
