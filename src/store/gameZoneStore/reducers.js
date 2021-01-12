import * as actionTYPES from "./constants";

const defultState = {
      startingScreen: true,
      isEndingScreen: false,
      enemyHide: false,
      outcome: null,
      superhero: 0,
      baseTime: 0,
      chance: 0,
      score: 0,
      lvl: 0,
      enemies: [
            {
              id: 0,
              isHeroShowing: false,
              isSuccessfulKill: false,
            },
            {
              id: 1,
              isHeroShowing: false,
              isSuccessfulKill: false,
            },
            {
              id: 2,
              isHeroShowing: false,
              isSuccessfulKill: false,
            },
            {
              id: 3,
              isHeroShowing: false,
              isSuccessfulKill: false,
            },
            {
              id: 4,
              isHeroShowing: false,
              isSuccessfulKill: false,
            },
            {
              id: 5,
              isHeroShowing: false,
              isSuccessfulKill: false,
            }
          ]
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
                        superhero: action.superhero,
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
            case actionTYPES.UPDATEENEMYFIELD:
                  return {
                        ...state,
                        enemies: action.enemies ,
                  };                        
            default:
                  return state            
      }
}