"use strict";

function convertInputTextToArray(inputString) {
	let outputArray = [];
	let malformedEntries = [];
	
	let entryRegex = /([0-9]+)\n\n([  ]+)([^\n]*)\n\n\$([0-9]*\.[0-9]*)/;
	let entryRegexGlobal = new RegExp(entryRegex.source, entryRegex.flags + "g");
	
	let rawEntries = inputString.match(entryRegexGlobal);
	
	for(let entry of rawEntries) {
		let entryFields = entry.match(entryRegex);
		try {
			let entryObject = {count: parseInt(entryFields[1]), name: entryFields[3], dollarCost: parseFloat(entryFields[4]), dollarCostIndividual: parseFloat(entryFields[4])};
			
			// console.log(`Logging ${entryObject.count} count(s) of ${entryObject.name}, costing $${entryObject.dollarCost}`);
			
			outputArray.push(entryObject);
		} catch {
			console.log(`Malformed entry: ${entry}`);
			malformedEntries.push(entry);
		}
	}
	
	if(malformedEntries.length > 0) {
		alertMessage = "Malformed entries detected:"
		for(entry of malformedEntries) {
			alertMessage += `\n${entry}`;
		}
		alert(alertMessage);
	}
	
	return outputArray;
}

function summarizeParsedInput(inputArray) {
	let outputArray = [];
	
	for(let entry of inputArray) {
		let existingRecord = outputArray.find(a => (a.name == entry.name));
		if(existingRecord === undefined) {
			outputArray.push(entry);
		} else {
			existingRecord.count += entry.count;
			existingRecord.dollarCost += entry.dollarCost;
		}
	}
	
	return outputArray;
}

function clearHtmlTableBody(tableBody) {
	while(tableBody.childNodes.length > 0) {
		tableBody.removeChild(tableBody.childNodes[0]);
	}
}

function updateHtmlTableBody(inputArray, tableBody) {
	clearHtmlTableBody(tableBody);
	
	for(let entry of inputArray) {
		let newRow = tableBody.insertRow();
		
		let itemCountCell = newRow.insertCell();
		let itemCountTextNode = document.createTextNode(entry.count);
		itemCountCell.appendChild(itemCountTextNode);
		
		let itemTypeCell = newRow.insertCell();
		let itemTypeTextNode = document.createTextNode("TBD");
		itemTypeCell.appendChild(itemTypeTextNode);
		
		let itemNameCell = newRow.insertCell();
		let itemNameTextNode = document.createTextNode(entry.name);
		itemNameCell.appendChild(itemNameTextNode);
		
		let dollarCostIndividualCell = newRow.insertCell();
		let dollarCostIndividualTextNode = document.createTextNode(`$${entry.dollarCostIndividual.toFixed(2)}`);
		dollarCostIndividualCell.appendChild(dollarCostIndividualTextNode);
		
		let dollarCostCell = newRow.insertCell();
		let dollarCostTextNode = document.createTextNode(`$${entry.dollarCost.toFixed(2)}`);
		dollarCostCell.appendChild(dollarCostTextNode);
	}
}

function digest() {
	let htmlDataInput = document.getElementById("data-input");
	let htmlOutputTableBody = document.getElementById("output-table-body");
	
	let userInput = htmlDataInput.value;
	let parsedInput = convertInputTextToArray(userInput);
	let rawOutput = summarizeParsedInput(parsedInput);
	let formattedOutput = updateHtmlTableBody(rawOutput, htmlOutputTableBody);
}

