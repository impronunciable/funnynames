
var natural = require('natural')
var prop = require('./prop.json')
var first = require('./first.json')
var last = require('./last.json')

var res = []

prop.forEach(function(p){
  
  var bestProb = [0,0]
  var match = -1

  var name = p.can_nam.split(',')
  if(name.length < 2) return
  for (var i = 0; i < first.length; i++) {
    match = natural.JaroWinklerDistance(name[1], first[i].name)
    if(match > bestProb[0]) {
      bestProb[0] = match;   
    }
  }


  /*
  match = -1
  if(name.length >= 2) {
   for (var i = 0; i < last.length; i++) {
      match = natural.JaroWinklerDistance(name[0], last[i].name)
      if(match > bestProb[1]) {
        bestProb[1] = match;   
      }
    }
  } else {
    bestProb[1] = 1
  }
 */
  

  var bprob = bestProb[0] + bestProb[1]

  if(bprob >= 0.87) return

  res.push({
    name: p.can_nam,
    probability: bprob,
    link: p.lin_ima
  })
})

console.log(res)
