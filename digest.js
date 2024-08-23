"use strict";

const itemTypes = ["Beer / Cooler / RTD", "Wine", "Liquor", "Non-alcoholic", "Unknown"];

const itemTypeLookup = {
	"BUD LIGHT 473ML":
		itemTypes.indexOf("Beer / Cooler / RTD"),
	
	"MICHELOB ULTRA 473ML":
		itemTypes.indexOf("Beer / Cooler / RTD"),
	
	"STELLA 500ML":
		itemTypes.indexOf("Beer / Cooler / RTD"),
	
	"CUTWATER TEQUILA PALOMA 355ML":
		itemTypes.indexOf("Beer / Cooler / RTD"),
	
	"SVNS HARD LEMONADE 355ML":
		itemTypes.indexOf("Beer / Cooler / RTD"),
	
	"CUTWATER RUM MAI TAI 355ML":
		itemTypes.indexOf("Beer / Cooler / RTD"),
	
	"BRICKWORKS 1904 473ML":
		itemTypes.indexOf("Beer / Cooler / RTD"),
	
	"BUDWEISER 473ML":
		itemTypes.indexOf("Beer / Cooler / RTD"),
	
	"DAY TRIPPING RIESLING 5 OZ":
		itemTypes.indexOf("Wine"),
	
	"HUFF ESTATE MINIMALIST MERLOT 5 0Z":
		itemTypes.indexOf("Wine"),
	
	"DUNROBIN SHERRY WOOD WHISKY 1 OZ":
		itemTypes.indexOf("Liquor"),
	
	"DUNROBIN VODKA 1 OZ":
		itemTypes.indexOf("Liquor"),
	
	"DUNROBIN WHISKY 1 OZ":
		itemTypes.indexOf("Liquor"),
	
	"DUNROBIN EARL GREY GIN 1 OZ":
		itemTypes.indexOf("Liquor"),
	
	"DUNROBIN RUM 1 OZ":
		itemTypes.indexOf("Liquor"),
	
	"PEPSI 591ML":
		itemTypes.indexOf("Non-alcoholic"),
	
	"7UP 591ML":
		itemTypes.indexOf("Non-alcoholic"),
	
	"PEPSI ZERO 591ML":
		itemTypes.indexOf("Non-alcoholic"),
	
	"AQUAFINA WATER 591ML":
		itemTypes.indexOf("Non-alcoholic"),
	
	"DIET PEPSI 591ML":
		itemTypes.indexOf("Non-alcoholic"),
	
	"SCHWEPPES GINGER ALE 591ML":
		itemTypes.indexOf("Non-alcoholic")
}

function convertInputTextToArray(inputString) {
	let outputArray = [];
	let malformedEntries = [];
	
	let entryRegex = /([0-9]+)\n\n([  ]+)([^\n]*)\n\n\$([0-9]*\.[0-9]*)/;
	let entryRegexGlobal = new RegExp(entryRegex.source, entryRegex.flags + "g");
	
	let rawEntries = inputString.match(entryRegexGlobal);
	
	for(let entry of rawEntries) {
		let entryFields = entry.match(entryRegex);
		try {
			let entryObject = {
				count: parseInt(entryFields[1]),
				name: entryFields[3],
				dollarCostIndividual: parseFloat(entryFields[4])/parseInt(entryFields[1]),
				itemType: (itemTypeLookup[entryFields[3]] !== undefined)? itemTypeLookup[entryFields[3]]: itemTypes.indexOf("Unknown")
			};
			
			// console.log(`Logging ${entryObject.count} count(s) of ${entryObject.name} which is type ${itemTypes[entryObject.itemType]}(${entryObject.itemType}), costing $${entryObject.dollarCostIndividual}`);
			
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

function summarizeParsedInputByItem(inputArray) {
	let outputArray = [];
	
	for(let entry of inputArray) {
		let existingRecord = outputArray.find(a => (a.name == entry.name));
		if(existingRecord === undefined) {
			outputArray.push(entry);
		} else {
			existingRecord.count += entry.count;
		}
	}
	
	outputArray.sort((a, b) => (b.count - a.count));
	outputArray.sort((a, b) => (a.itemType - b.itemType));
	
	return outputArray;
}

function summarizeParsedInputByType(inputArray) {
	let outputArray = [];
	
	for(let entry of inputArray) {
		let existingRecord = outputArray.find(a => (a.itemType == entry.itemType));
		if(existingRecord === undefined) {
			let newRecord = {
				count: entry.count,
				itemType: entry.itemType,
				totalCost: (entry.dollarCostIndividual * entry.count)
			};
			
			outputArray.push(newRecord);
		} else {
			existingRecord.count += entry.count;
			existingRecord.totalCost += (entry.dollarCostIndividual * entry.count);
		}
	}
	
	outputArray.sort((a, b) => (a.itemType - b.itemType));
	
	return outputArray;
}

function clearHtmlTableBody(tableBody) {
	while(tableBody.childNodes.length > 0) {
		tableBody.removeChild(tableBody.childNodes[0]);
	}
}

function updateHtmlItemTableBody(inputArray, tableBody) {
	clearHtmlTableBody(tableBody);
	
	for(let entry of inputArray) {
		let newRow = tableBody.insertRow();
		
		let itemCountCell = newRow.insertCell();
		let itemCountTextNode = document.createTextNode(entry.count);
		itemCountCell.appendChild(itemCountTextNode);
		
		let itemTypeCell = newRow.insertCell();
		let itemTypeTextNode = document.createTextNode(itemTypes[entry.itemType]);
		itemTypeCell.appendChild(itemTypeTextNode);
		
		let itemNameCell = newRow.insertCell();
		let itemNameTextNode = document.createTextNode(entry.name);
		itemNameCell.appendChild(itemNameTextNode);
		
		let dollarCostIndividualCell = newRow.insertCell();
		let dollarCostIndividualTextNode = document.createTextNode(`$${entry.dollarCostIndividual.toFixed(2)}`);
		dollarCostIndividualCell.appendChild(dollarCostIndividualTextNode);
	}
}

function updateHtmlTypeTableBody(inputArray, tableBody) {
	clearHtmlTableBody(tableBody);
	
	let totalSales = 0;
	let totalCost = 0.0;
	
	for(let entry of inputArray) {
		totalSales += entry.count;
		totalCost += entry.totalCost;
	}
	
	for(let entry of inputArray) {
		let newRow = tableBody.insertRow();
		
		let itemCountCell = newRow.insertCell();
		let itemCountTextNode = document.createTextNode(entry.count);
		itemCountCell.appendChild(itemCountTextNode);
		
		let itemTypeCell = newRow.insertCell();
		let itemTypeTextNode = document.createTextNode(itemTypes[entry.itemType]);
		itemTypeCell.appendChild(itemTypeTextNode);
		
		let salesCell = newRow.insertCell();
		let salesTextNode = document.createTextNode(`${(entry.count/totalSales * 100).toFixed(2)}%`);
		salesCell.appendChild(salesTextNode);
		
		let costCell = newRow.insertCell();
		let costTextNode = document.createTextNode(`${(entry.totalCost/totalCost * 100).toFixed(2)}%`);
		costCell.appendChild(costTextNode);
	}
}

function digest() {
	let htmlDataInput = document.getElementById("data-input");
	let htmlOutputItemTableBody = document.getElementById("output-item-table-body");
	let htmlOutputTypeTableBody = document.getElementById("output-type-table-body");
	
	let userInput = htmlDataInput.value;
	let parsedInput = convertInputTextToArray(userInput);
	
	let rawItemOutput = summarizeParsedInputByItem(parsedInput);
	updateHtmlItemTableBody(rawItemOutput, htmlOutputItemTableBody);
	
	let rawTypeOutput = summarizeParsedInputByType(parsedInput);
	updateHtmlTypeTableBody(rawTypeOutput, htmlOutputTypeTableBody);
}

function copyTableContentsToClipboard(tableID) {
	let htmlTable = document.getElementById(tableID);
	let copyText = htmlTable.innerText;
	
	navigator.clipboard.writeText(copyText);
}

