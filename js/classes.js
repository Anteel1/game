class Sprite{
    constructor({position,imgSrc,scale =1 , frameMax =1, offset={x:0,y:0}}){
        this.position = position;
        this.width = 50;
        this.height = 150;  
        this.image = new Image();
        this.image.src = imgSrc;
        this.scale = scale;
        this.frameMax = frameMax;
        this.frameCurrent =0;
        this.frameElapsed = 0;
        this.frameHold = 5;
        this.offset = offset;
    }   
        
    draw(){
        c.drawImage(
            this.image,
           this.frameCurrent*(this.image.width/this.frameMax),
            0,
            this.image.width/this.frameMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y -this.offset.y,
           ( this.image.width /this.frameMax)*this.scale,
            this.image.height*this.scale
            )
    }
    animationFrame(){
        this.frameElapsed++;
        if(this.frameElapsed % this.frameHold ===0){
            if(this.frameCurrent < this.frameMax-1){
            this.frameCurrent++;
        }else{
             this.frameCurrent =0;
        }}
  
    }
    update(){
        this.draw();
        this.animationFrame();
    }
}

class Sprite_Fighter extends Sprite{
    constructor({position, velocity, color = 'red',imgSrc,scale =1 , frameMax =1,offset={x:0,y:0},sprites,attackBox = { offset: {},width: undefined,height:undefined}})
    {   super({
         position,imgSrc,scale,frameMax,offset
    });
        this.velocity= velocity; 
        this.width = 50;
        this.height = 150;
        this.lastkey
        this.isAttacking
        this.color = color;
        this.health =100;
        this.frameCurrent =0;
        this.frameElapsed = 0;
        this.frameHold = 5;
        this.sprites = sprites;
        this.dead = false;
        for(const sprite in this.sprites){
            sprites[sprite].image= new Image();
            sprites[sprite].image.src =sprites[sprite].imgSrc;
        }
        this.attackBox ={
            position:{
                x:this.position.x,
                y:this.position.y
            },
            offset:attackBox.offset,
            width:attackBox.width ,
            height:attackBox.height ,
        } 
    }
    update(){
        this.draw();
        if(!this.dead){ this.animationFrame();}
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y+this.attackBox.offset.y;
      //  c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height);
        this.position.x +=this.velocity.x;
        this.position.y +=this.velocity.y;
        if(this.position.y +this.height+ this.velocity.y >= canvas.height -60){
            this.velocity.y = 0;
            this.position.y = 303;
        }else{
            this.velocity.y += gravity;
        }
        console.log(this.position.y);
    }
    attack(){
        this.switchSprites('attack3');
        this.isAttacking = true;
        setTimeout(()=>{
            this.isAttacking = false
        }, 1000)
    }
    takeHit(){
        this.health -=10;
        if(this.health ===0){
            this.switchSprites('death');
        }else{
            this.switchSprites('takeHit');
        }
    }
    switchSprites(sprite){
        if(this.image ===this.sprites.death.image){
            if(this.frameCurrent ===this.sprites.death.frameMax-1)
             this.dead =true;
            return
        }
        if(this.image === this.sprites.attack3.image
            && this.frameCurrent < this.sprites.attack3.frameMax-1)return
        
        if(this.image === this.sprites.takeHit.image
            &&this.frameCurrent < this.sprites.takeHit.frameMax-1)return
            switch (sprite) {
            case 'idle':
                if(this.image != this.sprites.idle.image){
                    this.image = this.sprites.idle.image;
                    this.frameMax= this.sprites.idle.frameMax;
                    this.frameCurrent = 0;
                }
                
                break;
            case 'run':
                if(this.image != this.sprites.run.image){
                    this.image = this.sprites.run.image;
                    this.frameMax= this.sprites.run.frameMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'jump':
                if(this.image != this.sprites.jump.image){
                    this.image = this.sprites.jump.image;
                    this.frameMax= this.sprites.jump.frameMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'fall':
                if(this.image != this.sprites.fall.image){
                    this.image = this.sprites.fall.image;
                    this.frameMax= this.sprites.fall.frameMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'attack3':
                if(this.image != this.sprites.attack3.image){
                    this.image = this.sprites.attack3.image;
                    this.frameMax= this.sprites.attack3.frameMax;
                    this.frameCurrent = 0;
                }
                break;
             case 'takeHit':
                if(this.image != this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image;
                    this.frameMax= this.sprites.takeHit.frameMax;
                    this.frameCurrent = 0;
                }
                break;
             case 'death':
                if(this.image != this.sprites.death.image){
                    this.image = this.sprites.death.image;
                    this.frameMax= this.sprites.death.frameMax;
                    this.frameCurrent = 0;
                }
                break;
            default:
                break;
        }
    }
}