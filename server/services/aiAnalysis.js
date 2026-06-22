const analyzeText = (text) => {

let trustScore = 90;

if (
  text.includes("guaranteed")
){
  trustScore -= 20;
}

if (
  text.includes("100% true")
){
  trustScore -= 20;
}

if (
  text.includes("urgent")
){
  trustScore -= 15;
}

return {
  trustScore
};

};

module.exports = analyzeText;