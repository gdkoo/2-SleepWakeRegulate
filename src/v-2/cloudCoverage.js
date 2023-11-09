
//The following is for an iteration of finding the PERFECT time to go outside for 5-10 mins
//max given the lowest amount of cloud coverage possible and the most sunlight in a
//short period of time for those who don't have time for a longer walk. 
let sunsInd = i;
let l = sunsInd - 1;
let r = sunsInd + 1;
//for any instance that condition code is less than sunset
if (tnCodMap2to7[l][key] < curr[key] || tnCodMap2to7[r][key] < curr[key]) {
	if (tnCloMap2to7[l][key] < tnCloMap2to7[r][key]) {
		console.log(tnTxtMap2to7[l]);
	}
	else if (tnCloMap2to7[r][key] < tnCloMap2to7[l][key]) {
		console.log(tnTxtMap2to7[r]);
	}
	else {
		console.log(`weathers fine before or after sunset.`);
	}
}
//for any instance where either condition code is the same as sunset
if (tnCodMap2to7[l][key] == curr[key] && tnCodMap2to7[r][key] == curr[key]) {
	if (tnCloMap2to7[i][key] < tnCloMap2to7[l][key] && tnCloMap2to7[i][key] < tnCloMap2to7[r][key]) {
		console.log(`you should still go out at sunset ${tnTxtMap2to7[i]}`);
	}
	else if (tnCloMap2to7[l][key] < tnCloMap2to7[i][key]) {
		console.log(`you should go out at ${tnTxtMap2to7[l]}`);
	}
};