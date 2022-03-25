var firstname;
var age;
var availbality;
var gender;
(function (gender) {
    gender[gender["male"] = 1] = "male";
    gender[gender["female"] = 1] = "female";
    gender[gender["transgender"] = 3] = "transgender";
})(gender || (gender = {})); //type declaration
var memberId;
var dataobj = {
    "address": "Chennai",
    "number": 11
};
var skillset = ["c", "react", "js", "ts"];
firstname = 'sujatha';
age = 18;
availbality = true;
memberId = gender.female;
console.log(firstname, age, gender[memberId], memberId[0], dataobj, skillset[0]);
skillset.forEach(function (skill) {
    console.log(skill);
});
var search = "ts";
console.log(skillset.filter(function (skill) { return skill == search; }));
