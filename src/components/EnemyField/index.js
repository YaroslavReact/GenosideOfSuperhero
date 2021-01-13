import React from "react";
import { connect } from "react-redux";

function EnemyFields({ hideEnemy,enemies, hero, supetHero }) {
    return (
        <div className="enemyFields">
            {enemies.map(enemy => (
              <div
                key={enemy.id} className={enemy.isSuccessfulKill ? "enemy win": "enemy"} onClick={() => hideEnemy(enemy.id)}>
                <img className={enemy.isHeroShowing ? "show" : "hide"} src={supetHero[hero].src} alt="hero"/>
              </div>
            ))}
        </div>
      );
}

const mapStateToProps = state => ({
    hero: state.mainState.superhero,
    enemies: state.mainState.enemies,
  });

export default connect(mapStateToProps)(EnemyFields);
