function generateOdds() {
  return (Math.random() * 2 + 1).toFixed(2);
}

function updateOdds(matches) {
  return matches.map((m) => ({
    ...m,
    oddsA: generateOdds(),
    oddsB: generateOdds(),
  }));
}

module.exports = { updateOdds };