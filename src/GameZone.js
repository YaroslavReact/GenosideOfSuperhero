import React from "react";
import { connect } from "react-redux";
import EnemyFields from "./components/EnemyField";
import { actions } from './store';
import PointsZone from "./components/PointZone";
import StartZone from "./components/StartZone";
import EndGame from "./components/EndGame";

let timer;
function GameZone({ 
  selectSuperhero, 
  gameScore, 
  startTimer, 
  lelevOfDifficult, 
  yourFailed, 
  chance, 
  score, 
  lvl, 
  startingScreen, 
  isEndingScreen, 
  endGame, 
  showRandomHero, 
  hideHero, 
  showSuccessfulKill, 
  hideSuccessfulKill, 
  resetHeroOnField, 
  enemies 
}) { 
    const [counter, setCounter] = React.useState(4000);

    React.useEffect(() => { 
      if (counter >= 0) {
        startTimer(counter);
      }else{
        endTimer()
      };
     }, [counter]);

    function hideEnemy(enemy){ 
      if(enemies[enemy].isHeroShowing){
        hideHero(enemy)
        showSuccessfulKill(enemy)
        endTimer()
        setTimeout(() => hideSuccessfulKill(enemy), 250);
      }
    }
    
    function ShowEnemy(){ 
      showRandomHero()
      selectSuperhero();
    }

    function resetField(){ 
      resetHeroOnField()
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
        lelevOfDifficult(0);
        return;
      }
      setTimeout(startGame, 10);
    }

    function checkLose(){
      clearInterval(timer);
      resetField();
      yourFailed(chance + 1);
      if(chance + 1  >= 3 ){
        endGame(false);
        lelevOfDifficult(0);
        return;
      }  
      setTimeout(startGame, 1000);
    }
    return (
        <div className="gameZone">  
          <h1 className="gameLogo">Genocide Of Superheroes</h1>
           {!startingScreen && !isEndingScreen && <EnemyFields 
            hideEnemy={hideEnemy} 
          />}
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
    enemies: state.mainState.enemies,
  });
  
const mapDispatchToProps = dispatch => {
    const { 
      endGame,
      selectSuperhero,
      gameScore, 
      startTimer, 
      lelevOfDifficult, 
      yourFailed, 
      showRandomHero, 
      hideHero, 
      showSuccessfulKill,
      hideSuccessfulKill,
      resetHeroOnField 
    } = actions.gameZone;
    return {
      endGame: (outcome) => dispatch(endGame(outcome)),
      selectSuperhero: ()=> dispatch(selectSuperhero()),
      yourFailed: (chance) => dispatch(yourFailed(chance)),
      startTimer: (baseTime) => dispatch(startTimer(baseTime)),
      gameScore: (score) => dispatch(gameScore(score)),
      lelevOfDifficult: (lvl) => dispatch(lelevOfDifficult(lvl)),
      showRandomHero: () => dispatch(showRandomHero()),
      hideHero: (selectedСell) => dispatch(hideHero(selectedСell)),
      showSuccessfulKill: (selectedСell) => dispatch(showSuccessfulKill(selectedСell)),
      hideSuccessfulKill: (selectedСell) => dispatch(hideSuccessfulKill(selectedСell)),
      resetHeroOnField: () => dispatch(resetHeroOnField()),
    };
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(GameZone);
