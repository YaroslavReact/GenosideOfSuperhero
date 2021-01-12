import  * as actionTYPES from "../constants";

export function startingScreen() {
    return {
          type: actionTYPES.STARTINGSCREEN,
        }
  }
  
export function endGame(outcome) {
    return {
          type: actionTYPES.ENDGAME,
          outcome: outcome,
        };
  }

  export function selectSuperhero() {
    const generateSuperhero = Math.floor(Math.random() * Math.floor(9));
    return {
            type: actionTYPES.SUPERHERO,
            superhero: generateSuperhero,
          };
    }

export function startTimer(baseTime) {
    return {
      type: actionTYPES.START_TIMER,
      baseTime: baseTime,
    };
  }
    
export function lelevOfDifficult(lvl = 1) {
    return {
      type: actionTYPES.LEVEL_OF_DIFFICULT,
      lvl: lvl,
    };
  }
    
export function gameScore(score) {
  return {
    type: actionTYPES.SCORE,
    score: score,
  }
}   

export function yourFailed(chance = 0) {
  return {
    type: actionTYPES.YOUR_FAILED,
    chance: chance,
  }
}

export function UpdateEnemyField(enemies) {
  return {
        type: actionTYPES.UPDATEENEMYFIELD,
        enemies: enemies,
      }
}

export function showRandomHero() {
  return (dispatch, getState) => {
    const rndCell = Math.floor(Math.random() * Math.floor(6));
    const currentEnemy = JSON.parse(JSON.stringify(getState().mainState.enemies));
    currentEnemy[rndCell].isHeroShowing = true;
    const enemies = currentEnemy;
    dispatch(UpdateEnemyField(enemies));
  }
}

export function hideHero(selectedСell) {
  return (dispatch, getState) => {
    const currentEnemy = JSON.parse(JSON.stringify(getState().mainState.enemies));
    currentEnemy[selectedСell].isHeroShowing = false;
    const enemies = currentEnemy;
    dispatch(UpdateEnemyField(enemies));
  }
}

export function showSuccessfulKill(selectedСell) {
  return (dispatch, getState) => {
    const currentEnemy = JSON.parse(JSON.stringify(getState().mainState.enemies));
    currentEnemy[selectedСell].isSuccessfulKill = true;
    const enemies = currentEnemy;
    dispatch(UpdateEnemyField(enemies));
  }
}

export function hideSuccessfulKill(selectedСell) {
  return (dispatch, getState) => {
    const currentEnemy = JSON.parse(JSON.stringify(getState().mainState.enemies));
    currentEnemy[selectedСell].isSuccessfulKill = false;
    const enemies = currentEnemy;
    dispatch(UpdateEnemyField(enemies));
  }
}

export function resetHeroOnField() {
  return (dispatch, getState) => {
    const currentEnemy = JSON.parse(JSON.stringify(getState().mainState.enemies));
    const enemies = currentEnemy.map(elem => {
      elem.isSuccessfulKill = false;
      elem.isHeroShowing = false;
      return elem ;
    });
    dispatch(UpdateEnemyField(enemies));
  }
}