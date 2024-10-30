const sheepTumbling = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
  ];
  
  const sheepTiming = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
  }
  
  const sheep1 = document.querySelector("#sheep1");
  const sheep2 = document.querySelector("#sheep2");
  const sheep3 = document.querySelector("#sheep3");
  
  sheep1.animate(sheepTumbling, sheepTiming).finished
    .then(() => sheep2.animate(sheepTumbling, sheepTiming).finished)
    .then(() => sheep3.animate(sheepTumbling, sheepTiming).finished)
    .catch(error => console.error(`Error animating Sheeps: ${error}`));
  