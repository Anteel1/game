const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 890;
canvas.height = 513;


c.fillRect(0,0,canvas.width,canvas.height); // context canvas
const gravity = 0.7; // trong luc

const background1 = new Sprite({ 
    position:{
        x: 0,
        y: 0
    },
    imgSrc:'./img/Fondos de Juegos de Peleas En Forma de GIFs   Taringa.gif'
    
})

const player = new Sprite_Fighter({
    position:{ x:0,y:0,},
    velocity:{ x:0,y:0},
    offset:{x:0,y:0},
    imgSrc:'./img/Fantasy Warrior/Sprites/Idle.png',
    scale:3,
    frameMax:10,
    offset:{
        x:215,
        y:140
    },
    sprites:{
        idle:{imgSrc:'./img/Fantasy Warrior/Sprites/Idle.png',frameMax:10},
        run:{imgSrc:'./img/Fantasy Warrior/Sprites/Run.png',frameMax:8},
        jump:{imgSrc:'./img/Fantasy Warrior/Sprites/Jump.png',frameMax:3},
        fall:{imgSrc:'./img/Fantasy Warrior/Sprites/Fall.png',frameMax:3},
        attack3:{imgSrc:'./img/Fantasy Warrior/Sprites/Attack3.png',frameMax:8},
        takeHit:{imgSrc:'./img/Fantasy Warrior/Sprites/Take hit.png',frameMax:3},
        death:{imgSrc:'./img/Fantasy Warrior/Sprites/Death.png',frameMax:7},
    },
    attackBox:{
        offset:{
            x:15,
            y:50
        },
        width:180,
        height:50
      }
})
const enemy = new Sprite_Fighter({
  position: {x:800,y:100},
  velocity: {x:0,y:0},
  color: 'green',
  offset:{x:-50,y:0},
  imgSrc:'./img/Medieval King Pack 2/Sprites/Idle.png',
  scale:3,
  frameMax:8,
  offset:{
      x:215,
      y:150
  },
  sprites:{
      idle:{imgSrc:'./img/Medieval King Pack 2/Sprites/Idle.png',frameMax:8},
      run:{imgSrc:'./img/Medieval King Pack 2/Sprites/Run.png',frameMax:8},
      jump:{imgSrc:'./img/Medieval King Pack 2/Sprites/Jump.png',frameMax:2},
      fall:{imgSrc:'./img/Medieval King Pack 2/Sprites/Fall.png',frameMax:2},
      attack3:{imgSrc:'./img/Medieval King Pack 2/Sprites/Attack1.png',frameMax:4},
      takeHit:{imgSrc:'./img/Medieval King Pack 2/Sprites/Take Hit - white silhouette.png',frameMax:4},
      death:{imgSrc:'./img/Medieval King Pack 2/Sprites/Death.png',frameMax:6},
    },
  attackBox:{
    offset:{
        x:-188,
        y:50
    },
    width:180,
    height:50
  }
  
})

console.log(player);
console.log(enemy);

const keys ={ 
    
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    k:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    2:{
        pressed: false
    }
}
 


function animate(){
    window.requestAnimationFrame(animate);
    // tao nhan vat player va enemy,background
    c.fillStyle='black';
    c.fillRect(0,0,canvas.width,canvas.height);
   background1.update();
    player.update();
    enemy.update();
    // su li su kien key
    // player move
    player.velocity.x = 0;
    
   
  if(keys.a.pressed && player.lastkey ==='a'){
        player.velocity.x = -5;
        player.switchSprites('run');
  }else if(keys.d.pressed && player.lastkey ==='d'){
        player.velocity.x = 5;
       player.switchSprites('run');
  }else{
    player.switchSprites('idle');
  }
  if(player.velocity.y < 0){
    player.switchSprites('jump'); 
  }else if(player.velocity.y >0){
    player.switchSprites('fall');
  }
  // enemy move
  enemy.velocity.x = 0;
  if(keys.ArrowLeft.pressed && enemy.lastkey ==='ArrowLeft'){
    enemy.switchSprites('run');
    enemy.velocity.x = -5;
}else if(keys.ArrowRight.pressed && enemy.lastkey ==='ArrowRight'){
    enemy.velocity.x = 5;
    enemy.switchSprites('run');
}else{
    enemy.switchSprites('idle'); 
}
if(enemy.velocity.y < 0){
    enemy.switchSprites('jump'); 
  }else if(enemy.velocity.y >0){
    enemy.switchSprites('fall');
  }
     // xu li va cham && player hit
     if(rectangularCollision({rectangle1:player,rectangle2:enemy})
        && player.isAttacking){
        enemy.takeHit();
        player.isAttacking = false;
       
        document.querySelector('#mau_player2').style.width= enemy.health +'%';
       
     }  
     //xu li danh hut
     if(player.isAttacking && player.frameCurrent ===4){
        player.isAttacking = false;
     }
     if(rectangularCollision({rectangle1:enemy,rectangle2:player})
        && enemy.isAttacking){
        player.takeHit();
        enemy.isAttacking = false;
        document.querySelector('#mau_player1').style.width= player.health +'%';
     }  
     //xu li danh hut
     if(enemy.isAttacking && enemy.frameCurrent ===2){
        enemy.isAttacking = false;
    }
     // end game khi player het mau
     if(enemy.health <=0 || player.health <=0){
        determineWinner({player,enemy,timer_timeout});
     }
}
animate()

// su kien key
window.addEventListener('keydown',(event)=>{ // khi an nut
    if(!player.dead){
    switch(event.key){
        case 'd' :
            keys.d.pressed = true;
            player.lastkey = 'd';
            break;
        case 'a' :
            keys.a.pressed = true;
            player.lastkey = 'a';
            break;
         case 'k' :
            player.velocity.y = -15;
            break;
        case 'j':
            player.attack();
            break;
    }
}
//enemy keys
    if(!enemy.dead){
        switch(event.key){
            case 'ArrowRight' :
                keys.ArrowRight.pressed = true;
                enemy.lastkey='ArrowRight';
                break;
            case 'ArrowLeft' :
                keys.ArrowLeft.pressed = true;
                enemy.lastkey='ArrowLeft';
                break;
            case '2' :
                enemy.velocity.y = -15;
                break;
             case '1' :
                enemy.attack();
                break;
        }
    }
    console.log(event.key);
})
window.addEventListener('keyup',(event)=>{ // khi tha nut
    switch(event.key){
        case 'd' :
            keys.d.pressed = false;
            break;
        case 'a' :
            keys.a.pressed = false;
            break;
        case 'k' :
            keys.k.pressed = false;
            break;
    }
        // enemy keys
    switch(event.key){
        case 'ArrowRight' :
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = false;
            break;
        case '2' :
            keys[2].pressed = false;
            break;
    }
    console.log(event.key);
})
decreaseTime();

