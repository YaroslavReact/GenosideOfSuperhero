import * as actionTYPES from "../constants/constants";

const defultState = {
      startingScreen: true,
      isEndingScreen: false,
      enemyHide: false,
      outcome: undefined,
      superhero: 0,
      baseTime: 0,
      chance: 0,
      score: 0,
      lvl: 0,
}

export default function gameReducers(state = defultState, action){
      switch(action.type){
            case actionTYPES.STARTINGSCREEN:
                  return {
                        ...state,
                        startingScreen: false,
                  };
            case actionTYPES.ENDGAME:
                  return {
                        ...state,
                        isEndingScreen: !state.isEndingScreen,
                        outcome: action.outcome,
                  };
            case actionTYPES.SUPERHERO:
                  return {
                        ...state,
                        superhero: Math.floor(Math.random() * Math.floor(9)),
                  };
            case actionTYPES.START_TIMER:
                  return {
                        ...state,
                        baseTime: action.baseTime,
                  };
            case actionTYPES.YOUR_FAILED:
                  return {
                        ...state,
                        chance: action.chance,
                  };
            case actionTYPES.SCORE:
                  return {
                        ...state,
                        score: action.score,
                  };
            case actionTYPES.LEVEL_OF_DIFFICULT:
                  return {
                        ...state,
                        lvl: action.lvl,
                  };                          
            default:
                  return state            
      }
}