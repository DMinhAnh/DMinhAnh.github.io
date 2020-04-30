var facts = [
"When playing with female puppies, male puppies will often let them win.",
"Turtles can breathe through their butts.",
"Rats laugh when tickled.",
"Oysters can change gender depending on which is best for mating.",
"Butterflies taste with their feet."
];

function changeDisplay(index) 
{	
	var output = document.getElementById("output");
	output.innerText = facts[index];
}