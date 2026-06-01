const analyzeFile = () => {

const trustScore =
Math.floor(
Math.random()*41
)+60;

let riskLevel="Low";

if(trustScore<75){
riskLevel="High";
}

else if(trustScore<90){
riskLevel="Medium";
}

return {
trustScore,
riskLevel
};

};

module.exports=analyzeFile;