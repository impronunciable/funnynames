
/**
 * Module dependencies
 */

var natural = require('natural')
var db = require('./prop.json')
var first = require('./first.json')
var last = require('./last.json')

/**
 * Constants
 */

var THRESHOLD = 0.87

var weightedData = db.map(function(p){
  
  var bestProb = 0
  var match = -1
  var name = p.can_nam.split(',')

  if (name.length >= 2) {
    for (var i = 0; i < first.length; i++) {
      var fname = name[1].trim().split(' ')
      fname = fname[0]
      match = natural.JaroWinklerDistance(fname, first[i].name)
      if(match > bestProb) {
        bestProb = match;   
      }
    }

    if (bestProb < THRESHOLD) {
      return {
        name: p.can_nam,
        probability: bestProb,
        link: p.lin_ima
      }
    }
  }

  bestProb = 0
  match = -1
  
  if(name.length >= 2) {
   for (var i = 0; i < last.length; i++) {
      match = natural.JaroWinklerDistance(name[0], last[i].name)
      if(match > bestProb) {
        bestProb = match;   
      }
    }
  } else {
    bestProb = 1
  }

  return {
    name: p.can_nam,
    probability: bestProb,
    link: p.lin_ima
  }
})


var funnyNames = weightedData.filter(function(el) {
  return el.probability < THRESHOLD
})

console.log(JSON.stringify(funnyNames, null, '\t'))
