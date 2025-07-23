export function cookingStatus(remainTime) {
  if (remainTime === 0) {
    return 'Lasagna is done.';
  } else if (remainTime === null || remainTime === undefined) {
    return 'You forgot to set the timer.';
  } else {
    return 'Not done, please wait.';
  }
}

export function preparationTime(layers, averageTimePerLayer = 2) {
  let prepareTime = 0;
  for (let i = 0; i < layers.length; i++) {
    prepareTime += averageTimePerLayer;
  }
  return prepareTime;
}

export function quantities(layers) {
  let noodles = 0;
  let sauce = 0;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i] === 'noodles') {
      noodles += 50;
    } else if (layers[i] === 'sauce') {
      sauce += 0.2;
    }
  }
  
  return {
    noodles: noodles,
    sauce: sauce,
  };
}

export function addSecretIngredient(friendsList, myList) {
  myList.push(friendsList[friendsList.length - 1]);
}

export function scaleRecipe(recipe, portions) {
  const scaledRecipe = {};
  for (const key in recipe) {
    scaledRecipe[key] = recipe[key] * portions / 2;
  }
  return scaledRecipe;
}

/**
 * Values of primitive data types are immutable. 
 * The original value is never affected by what happens to the argument in the function body.
 * 
 * For all other values (objects, arrays, functions), 
 * a reassignment will not affect the original value. 
 * However, if you modify such an argument (e.g. add a key to an object), 
 * that also modifies the original value that was passed in.
 * 
 * By default, all parameters defined in the function declaration are optional in JavaScript. 
 * If you provide fewer arguments than there are parameters, 
 * the missing arguments will be undefined inside the function
 */

