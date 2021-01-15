import React, {
  useEffect,
  useState
} from "react";
import { connect } from "react-redux";
import EnemyFields from "./components/EnemyField";
import { actions } from './store';
import PointsZone from "./components/PointZone";
import StartZone from "./components/StartZone";
import EndGame from "./components/EndGame";
import { Preloader } from "./components/Preloader";

import halk from "./assets/images/halk.png";
import batman from "./assets/images/batman.png";
import deadpool from "./assets/images/deadpool.png";
import cap from "./assets/images/cap.png";
import natasha from "./assets/images/natasha.png";
import rosya from "./assets/images/rosya.png";
import spidy from "./assets/images/spidy.png";
import toni from "./assets/images/toni.png";
import tor from "./assets/images/tor.png";

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
  const [counter, setCounter] = useState(4000);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [supetHero, setSupetHero] = useState([halk, batman, deadpool, cap, natasha, rosya, spidy, toni, tor]);

  useEffect(() => {
    async function preloadImages() {
      const newSupetHeroImages = await Promise.all(
        supetHero.map(async (pic) => {
          return new Promise(resolve => {
            const img = new Image();
            img.src = pic;
            img.onload = () => {
              resolve(img);
            };
          })
        })
      );
      setSupetHero(newSupetHeroImages);
      setImagesLoaded(true);
    }

    preloadImages();
  }, []);

  useEffect(() => {
    if (counter >= 0) {
      startTimer(counter);
    } else {
      endTimer();
    }
  }, [counter]);

  async function hideEnemy(enemy) {
    if (enemies[enemy].isHeroShowing) {
      hideHero(enemy);
      showSuccessfulKill(enemy);
      endTimer();
      setTimeout(() => hideSuccessfulKill(enemy), 250);
    }
  }

  function ShowEnemy() {
    selectSuperhero();
    setTimeout(() => {
      showRandomHero();
    }, 10);

  }

  function resetField() {
    resetHeroOnField();
  }

  function startGame() {
    let time = Math.round(4000 * (1 - 0.1 * lvl));
    time <= 400 && (time = 550);
    setCounter(time);
    ShowEnemy();
    timer = setInterval(() => setCounter(c => c - 10), 10);
  }

  function endTimer() {
    clearInterval(timer);
    if (counter > 0) {
      gameScore(score + 1);
      (( score + 1) % 10 === 0) && lelevOfDifficult(lvl + 1);
      checkWin();
    } else {
      checkLose();
    }
  }

  function checkWin() {
    if (score + 1 >= 100) {
      endGame(true);
      lelevOfDifficult(0);
      return;
    }
    setTimeout(startGame, 1000);
  }

  function checkLose() {
    clearInterval(timer);
    resetField();
    yourFailed(chance + 1);
    if (chance + 1 >= 3) {
      endGame(false);
      lelevOfDifficult(0);
      return;
    }
    setTimeout(startGame, 1000);
  }

  return (
    <div className="gameZone">
      <h1 className="gameLogo">Genocide Of Superheroes</h1>

      {!imagesLoaded && (
        <Preloader />
      )}

      {!startingScreen && !isEndingScreen && <EnemyFields
        hideEnemy={hideEnemy}
        supetHero={supetHero}
      />}

      {startingScreen && (
        <StartZone
          startGame={startGame}
        />
      )}

      {!startingScreen && isEndingScreen && <EndGame
        startGame={startGame}
      />}
      <PointsZone/>
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
    selectSuperhero: () => dispatch(selectSuperhero()),
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
