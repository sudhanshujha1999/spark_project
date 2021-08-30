// prettier-ignore
export const metricData = {
  'Valorant': ['Kills', 'K/D', 'Assists', 'Win %'],
  'League Of Legends': ['Kills', 'K/D', 'Assists', 'Win %'],
  'Rocket League': ['Goals', 'Assists', 'Saves'],
  'Overwatch': ['Kills', 'Damage', 'Healing'],
  'Fortnite': ['Kills', 'top 25', 'top 10'],
}

//these metrics control the whole state of goal setting, to add a new game to goal functionality,
//just add a compatible metric in this file and it'll aiutomatically work.
//if some game is not on these metric then, user can't create a goal for that game.
