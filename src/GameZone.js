import React from "react";
import { connect } from "react-redux";
import EnemyFields from "./components/EnemyFields";
import * as actions from "./store/actions/actions";
import PointsZone from "./components/PointsZone";
import StartZone from "./components/StartZone";
import EndGame from "./components/EndGame";

let timer;
function GameZone(props) { 
    const { superheroShow, gameScore, startTimer, lelevOfDifficult, yourFailed, chance, score, lvl, startingScreen, isEndingScreen, endGame } = props;
    const [counter, setCounter] = React.useState(4000);

    React.useEffect(() => { 
      if (counter >= 0) {
        startTimer(counter);
      }else{
        endTimer()
      };
     }, [counter]);

    function isThereAHeroHere(enemy){
      const heroBlock = enemy.target;
      if(heroBlock.classList[0] !== "enemy"){
        heroBlock.classList[0] === "show" && hideEnemy(enemy);
      }else{
        heroBlock.children[0].classList[0] === "show" && hideEnemy(enemy);
      }
    }

    function hideEnemy(enemy){
      const heroBlock = enemy.target;
      if(heroBlock.classList[0] !== "enemy"){
        heroBlock.parentNode.classList.add("win");
        heroBlock.classList.remove("show");
        heroBlock.classList.add("hide");
      }else{
        heroBlock.classList.add("win"); 
        heroBlock.children[0].classList.remove("show");
        heroBlock.children[0].classList.add("hide");
      }
     endTimer();
    }
    
    function ShowEnemy(){
      const enemies = document.querySelector(".enemyFields").children;
      setTimeout( droppingWin, 150, enemies);
      let rnd = getRandomInt(6);
      enemies[rnd].children[0].classList.remove("hide");
      enemies[rnd].children[0].classList.add("show");
      superheroShow();
    }

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function droppingWin(enemies){
      for( let i = 0; i < enemies.length; i++ ) {
        enemies[i].classList.remove("win");
      }
    }

    function resetField(){
      const enemies = document.querySelector(".enemyFields").children;
      for( let i = 0; i < enemies.length; i++ ) {
        enemies[i].children[0].classList.remove("show");
        enemies[i].children[0].classList.add("hide");
      }
    } 
    
    function startGame(){
      let time = Math.round(4000 * (1 - 0.1 * lvl)) ;
      setCounter(time);
      ShowEnemy();
      timer = setInterval(() => setCounter(c => c - 10), 10);
    }

    function endTimer(){
      clearInterval(timer);
      if(counter > 0){
        gameScore(score + 1);
        ((score + 1)%10 === 0) && lelevOfDifficult(lvl + 1);
        checkWin();
      }else{
        checkLose();
      }
    }

    function checkWin(){
      if(score >= 100){
        endGame(true);
        document.querySelector(".enemyFields").style.display = "none";
        lelevOfDifficult(0);
      }else setTimeout(startGame, 10);
    }

    function checkLose(){
      resetField();
      yourFailed(chance + 1);
      clearInterval(timer);
      if(chance + 1  >= 3 ){
        endGame(false);
        document.querySelector(".enemyFields").style.display = "none";
        lelevOfDifficult(0);
      }else  setTimeout(startGame, 1000);
    }
    return (
        <div className="gameZone">  
          <h1 className="gameLogo">Genocide Of Superheroes</h1>
           <EnemyFields 
            isThereAHeroHere={isThereAHeroHere} 
          />
          {startingScreen && <StartZone 
            startGame={startGame}
          />}
          {!startingScreen && isEndingScreen && <EndGame 
              startGame={startGame}
          />}
          <PointsZone />
        </div>
      );
}

const mapStateToProps = state => ({
    startingScreen: state.mainState.startingScreen,
    isEndingScreen: state.mainState.isEndingScreen,
    chance: state.mainState.chance,
    score: state.mainState.score,
    lvl: state.mainState.lvl,
  });
  
const mapDispatchToProps = dispatch => {
    const { endGame, superheroShow, gameScore, startTimer, lelevOfDifficult, yourFailed } = actions;
    return {
      endGame: (outcome) => dispatch(endGame(outcome)),
      superheroShow: ()=> dispatch(superheroShow()),
      yourFailed: (chance) => dispatch(yourFailed(chance)),
      startTimer: (baseTime) => dispatch(startTimer(baseTime)),
      gameScore: (score) => dispatch(gameScore(score)),
      lelevOfDifficult: (lvl) => dispatch(lelevOfDifficult(lvl)),
    };
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(GameZone);
