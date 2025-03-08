
import { createCanvas,loadImage } from "https://deno.land/x/canvas/mod.ts";
import { getImageInfo } from "jsr:@retraigo/image-size";


export class ImagePainter {
  color: string;
  createcopy: boolean;
  constructor() {
    this.color = "red";
    this.createcopy=false;
  }




  private addSuffixToFilename(filename: string, suffix: string): string {
    return filename.replace(/(\.(png|jpg|jpeg|gif|webp|bmp|tiff))$/, `${suffix}$1`);
  }


  async drawBorderonImage(title:string,options= {size:5,top:true,bottom:true,left:true,right:true}) {

    const imgData = getImageInfo(Deno.readFileSync(title));
  
    imgData.height=  Math.round(imgData.height / 10) * 10;
    imgData.height=  Math.round(imgData.height / 10) * 10;
  
    const canvas = createCanvas(imgData.width, imgData.height);
    
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = this.color;
    const image = await loadImage(title);
    ctx.drawImage(image, 0, 0);
    if(options.top){
      ctx.fillRect(0,0 , imgData.width, options.size);

    }
    if(options.bottom){
      ctx.fillRect(0, imgData.height-options.size , imgData.width, options.size);
    }
    if(options.left){
     ctx.fillRect(0,0 , options.size, imgData.height);
    }
    if(options.right){
     ctx.fillRect(imgData.width-options.size,0 , options.size, imgData.height);


    }




    const buf = canvas.toBuffer();
    if(this.createcopy){
    await Deno.writeFile(this.addSuffixToFilename(title,"_copy"), buf);
    console.log("done");

    }else{
    await Deno.writeFile(title, buf)
    
    }


  }

  async drawonImages(folderpath:string, listofpixel:number[][] ) {
    var songlist:string []  =[]

    for await (const dirEntry of Deno.readDir(folderpath)) {
          console.log(dirEntry.name);
          if(dirEntry.name.includes(".png") || dirEntry.name.includes(".jpg") || dirEntry.name.includes(".jpeg")){
          songlist.push( dirEntry.name);
          }

        }
    console.log(songlist);
    for (let i = 0; i < songlist.length; i++) {
      
      await this.drawOnImage(folderpath+"/"+songlist[i],listofpixel ).then(() => {
        console.log("done");
      }
      );
    }
  }
      

  
  async  drawOnImage(title: string,listofpixel:number[][]) {


    const imgData = getImageInfo(Deno.readFileSync(title));
  
    imgData.height=  Math.round(imgData.height / 10) * 10;
    imgData.height=  Math.round(imgData.height / 10) * 10;
  
    const canvas = createCanvas(imgData.width, imgData.height);
    
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = this.color;
    const image = await loadImage(title);
    var fithheight = imgData.height/listofpixel.length;
    var fithwidth = imgData.width/listofpixel[0].length;
    ctx.drawImage(image, 0, 0);
    for (let i = 0; i < listofpixel.length; i++) {
      for (let j = 0; j < listofpixel[i].length; j++) {
        if (listofpixel[i][j] === 1) {
  
          ctx.fillRect((j)*fithwidth,(i)*fithheight , fithwidth, fithheight);
        }
      }
    }
  
    const buf = canvas.toBuffer();
    if(this.createcopy){
    await Deno.writeFile(this.addSuffixToFilename(title,"_copy"), buf);
    }else{
    await Deno.writeFile(title, buf);
    }
  }

   getSkeletInfo(title:string,divisor_level =10): number[][] {
    
    const imgData =getImageInfo(Deno.readFileSync(title));
  
    var height=  imgData.height/5 
    var width= imgData.width /5
    console.log("height : "+height);
    console.log("width : "+width);
    height=  Math.round(height / 10) * 10;
    width=Math.round(width / 10) * 10
  
    var list :number [][]=[];
  
    height = height / divisor_level;
    width = width / divisor_level;
    for (let i = 0; i < height; i++) {
      list.push([]);
      
      for (let j = 0; j < width; j++) {
        list[i].push(0);
      }
      var theconsole="";
      for (let j = 0; j < width; j++) {
        theconsole+="0,"
      }
      console.log("  [ "+theconsole+"] ," );
    }
    return list;
  }
}



