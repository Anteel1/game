function rectangularCollision({rectangle1,rectangle2}){ // thu gon dieu kien hit cua player va enemy
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        && rectangle1.attackBox.position.x <=rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y+ rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y+ rectangle2.height
    )

}
//dem gio
let timer = 60;
let timer_timeout;
function decreaseTime(){
    if(timer>0){
      timer_timeout=  setTimeout(decreaseTime, 1000);
        timer--;
        document.querySelector('#time').innerHTML = timer;
    }
    if(timer === 0){
       // end game khi het gio
        determineWinner({player: this,enemy,timer_timeout});
        }

    }
        // tim nguoi chien thang
    function determineWinner({player,enemy, timer_timeout}){
        clearTimeout(timer_timeout);
        document.querySelector('#text').style.display = 'flex';
        if(player.health === enemy.health){
            document.querySelector('#text').innerHTML = "Tie";
        }else if(player.health > enemy.health){
            document.querySelector('#text').innerHTML = "Player 1 wins";
        }else if(player.health < enemy.health){
            document.querySelector('#text').innerHTML = "Player 2 wins";
        }    
    }