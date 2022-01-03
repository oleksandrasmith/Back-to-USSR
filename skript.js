const expressions = [
    `😍`, `😀`, `😔`, `😭`
  ]
  
  // dom node refs
  const creatureOutput = document.querySelector(".output .creature")
  
  const hungerOutput = document.querySelector(".output .hunger")
  const hungerLabel = hungerOutput.querySelector(".name")
  const hungerValueText = hungerOutput.querySelector(".value")
  const hungerProgressBar = hungerOutput.querySelector("progress")
  
  const enrichmentContainer = document.querySelector(".output .enrichment");
  const enrichmentLabel = enrichmentContainer.querySelector(".name");
  const enrichmentValueText = enrichmentContainer.querySelector(".value");
  const enrichmentProgressBar = enrichmentContainer.querySelector("progress");
  
  const happinessOutput = document.querySelector(".output .happiness");
  const happinessLabel = happinessOutput.querySelector(".name");
  const happinessValueText = happinessOutput.querySelector(".value");
  const happinessProgressBar = happinessOutput.querySelector("progress");
  
  const btnFeed = document.querySelector(".action-feed");
  const btnPlay = document.querySelector(".action-play");
  
  // click bindings
  btnFeed.onclick = (e) => feed();
  btnPlay.onclick = (e) => playWith();
  
  // settings
  const renderSpeed = 1000 / 60; // 60fps
  
  const decayRateHunger = 1 * 1000; // in seconds
  const decayRateEnrichment = .5 * 1000; // in seconds
  
  // scores
  let scoreHunger = 100;
  const scoreHungerMax = 100;
  let scoreEnrichment = 100;
  const scoreEnrichmentMax = 100;
  
  // support for actions
  const actionFeedIncrement = 5;
  const actionPlayIncrement = 5;
  
  // actions
  const feed = (amt) => {
    amt = amt || actionFeedIncrement;
    const ttotal = scoreHunger + amt;
    if (ttotal >= scoreHungerMax) scoreHunger = scoreHungerMax;
    else if (ttotal <= 0) scoreHunger = 0;
    else scoreHunger = ttotal;
  }
  
  const playWith = (amt) => {
    amt = amt || actionPlayIncrement;
    const ttotal = scoreEnrichment + amt;
    if (ttotal >= scoreEnrichmentMax) scoreEnrichment = scoreEnrichmentMax;
    else if (ttotal <= 0) scoreEnrichment = 0;
    else scoreEnrichment = ttotal;
  }
  
  // Game Logic
  // every N ms reduce happiness due to hunger
  const hungerLoop = setInterval(makeHungry, decayRateHunger)
  function makeHungry() {
    if (scoreHunger)
      scoreHunger-=1;
  }
  
  // Game Logic
  // every N ms reduce happiness due to boredom
  const boredomLoop = setInterval(makeBored, decayRateEnrichment)
  function makeBored() {
    if (scoreEnrichment)
      scoreEnrichment-=1;
  }
  
  // Rendering 
  // Render Loop -- the "game loop"
  // Renders our game state's result ever N ms.
  const loop = setInterval(render, renderSpeed);
  
  function render() {
    
    creatureOutput.innerHTML = expressions[0];
    const currentHappiness = (scoreHunger + scoreEnrichment) / 2;
    
    //machine for expressions
    if (currentHappiness >= 0 && currentHappiness < 25)
      creatureOutput.innerHTML = expressions[3];
    if (currentHappiness >= 25 && currentHappiness < 50)
      creatureOutput.innerHTML = expressions[2];
    if (currentHappiness >= 50 && currentHappiness < 75)
      creatureOutput.innerHTML = expressions[1];
    if (currentHappiness >= 75 && currentHappiness <= 100)
      creatureOutput.innerHTML = expressions[0];
    
    hungerLabel.innerText = "Hunger"
    hungerValueText.innerText = scoreHunger;
    hungerProgressBar.max = scoreHungerMax;
    hungerProgressBar.value = scoreHunger;
  
    enrichmentLabel.innerText = "Enrichment"
    enrichmentValueText.innerText = scoreEnrichment;
    enrichmentProgressBar.max = scoreEnrichmentMax;
    enrichmentProgressBar.value = scoreEnrichment;
    
    happinessLabel.innerText = "Happiness"
    happinessValueText.innerText = currentHappiness;
    happinessProgressBar.value = currentHappiness;
  
  }