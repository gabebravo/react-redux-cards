class UserDeck {
  constructor(cards, title, description) {
    this.cards = cards;
    this.title = title;
    this.description = description;
  }
  getDeckObj() {
      return this.cards, this.title, this.description;
  }
}

export const buildUserDeck = (deckArray, title, description) => {
  const newUserDeck = new UserDeck(deckArray, title, description);
  return newUserDeck;
}

export const chartSeriesArray = (currentDeck, series) => {  
  return series.map( (seriesObj, index) => {
    seriesObj.data.splice(0, 1, currentDeck[index][seriesObj.name]);
    return seriesObj;
  })
}

export const historySeriesArray = (currentDeck, series) => {  
  return series.map( (seriesObj, index) => {
    seriesObj.data.unshift(currentDeck[index][seriesObj.name])
    const slicedArr = seriesObj.data.slice(0, 5);
    seriesObj.data = slicedArr;
    return seriesObj;
  })
}

export const dpsDataArray = (currentDeck, dpsDataArr) => { 
  return dpsDataArr.map( (dataObj, index) => {
    return({
      name: currentDeck[index].name,
      y: currentDeck[index].damage_per_second || 0
    })
  })
}

export const sumDps = dpsDataArr => { 
  return dpsDataArr.reduce( (total, dataObj) => { return total += dataObj.y }, 0);
}

export const reduceDamageData = currentDeck => {

  let damage = 0, death_damage = 0, dash_damage = 0, charge_damage = 0, 
      area_damage = 0, spawn_damage = 0, crown_tower_damage = 0;

  currentDeck.forEach( card => {
    if( card.spawned_troops_qty ) {
      damage += card.hasOwnProperty('levels') ? (card.levels[`${card.level}`].damage * card.spawned_troops_qty): 0;
    } else {
      damage += card.hasOwnProperty('levels') ? card.levels[`${card.level}`].damage: 0; 
    }
    death_damage += card.hasOwnProperty('levels') ? card.levels[`${card.level}`].death_damage: 0; 
    dash_damage += card.hasOwnProperty('levels') ? card.levels[`${card.level}`].dash_damage: 0;  
    charge_damage += card.hasOwnProperty('levels') ? card.levels[`${card.level}`].charge_damage: 0;  
    area_damage += card.hasOwnProperty('levels') ? card.levels[`${card.level}`].area_damage: 0; 
    spawn_damage += card.hasOwnProperty('levels') ? card.levels[`${card.level}`].spawn_damage: 0;  
    crown_tower_damage += card.hasOwnProperty('levels') ? card.levels[`${card.level}`].crown_tower_damage: 0; 
  })

  const result = [
    { damage }, { death_damage }, { dash_damage }, { charge_damage }, 
    { area_damage }, { spawn_damage }, { crown_tower_damage }
  ]

  return result;
}

export const reduceDpsData = (currentDeck, index) => {
  return currentDeck.map( (card, index) => {
    return({
      name: card.name.length > 0 ? card.name: `card${index+1}`,
      damage_per_second: card.hasOwnProperty('levels') ? card.levels[`${card.level}`].damage_per_second: 0
    })
  })
}