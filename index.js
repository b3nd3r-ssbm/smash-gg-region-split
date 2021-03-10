const fs = require('fs');
const att = getEntrants();
const list = att.split('\n');
const east = ["ME","NH","VT","NY","MA","RI","CT","NJ","PA","DE","MD","MI","OH","IN","IL","WI","Vi","VA","NC","TN","KY","Ca","GA","AL","MS","FL","MN","IA","MO","AR","LA","ON","QC","PEI","NS","NB"];
let eNum = 0;
let wNum = 0;
let mNum = 0;
let cNum = 0;
let west = [];
let eEnt = [];
let mex = [];
for(let i = 1; i<list.length; i++){
	let entrant = list[i].split(',');
	if(entrant[13] == "United States" || entrant[13] == "Canada"){
		if(east.includes(entrant[11])){
			eNum++;
			eEnt.push(entrant);
		}
		else{
			wNum++;
			west.push(entrant);
		}
	}
	else if(entrant[13] == "Mexico"){
		mNum++;
		mex.push(entrant);
	}
}
function getCsv(inList){
	let write = ""; 
	write+=list[0]+"\n";
	for(let j of inList){
		let add = "";
		for(let k of j){
			add+=k + ',';
		}
		add = add.substring(0, add.length-1);
		write+=add;
		write+="\n";
	}
	return write;
}
function getEntrants(){
	let dir = fs.readdirSync('./');
	for(let i of dir){
		if(i.substring(i.length-4)=='.csv'){
			return fs.readFileSync(i, 'utf8');
		}
	}
}
if (!fs.existsSync('./out')){
    fs.mkdirSync('./out');
}
fs.writeFileSync('out/west.csv',getCsv(west));
fs.writeFileSync('out/east.csv',getCsv(eEnt));
fs.writeFileSync('out/mexico.csv',getCsv(mex));
console.log("East: "+eNum);
console.log("West: "+wNum);
console.log("Mexico: "+mNum);
console.log("Press Control C or close this window to exit");
while(true){}
