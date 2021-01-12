import  * as actionTYPES from "../constants/constants";

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

export function superheroShow() {
    return {
            type: actionTYPES.SUPERHERO,
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
