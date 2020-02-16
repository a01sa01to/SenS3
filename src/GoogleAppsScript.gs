var sheetId = " GOOGLE SPREADSHEET ID ";

function dataGet(music) {
	const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(music);
	const added = sheet.getRange(2, 7).getValue();
	return JSON.stringify(sheet.getRange(3, 1, Number(added), 3).getValues());
}

function dataStore(music, name, score) {
	const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(music);
	try {
		sheet.appendRow([name, score, ((score >= 800000) ? 1 : 0)]);
		return JSON.stringify({
			"Response": 1
		});
	} catch (err) {
		return JSON.stringify({
			"Response": 0
		});
	}
}

function getAvg(music) {
	const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(music);
	return JSON.stringify({
		"Response": sheet.getRange(2, 5).getValue()
	});
}

function getRate(music) {
	const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(music);
	return JSON.stringify({
		"Response": sheet.getRange(2, 6).getValue()
	});
}

function showError(msg) {
	return JSON.stringify({
		"Error": 1,
		"Msg": msg
	})
}

function doGet(e) {
	let _;
	const p = e.parameter;
	if(p.music){
		switch (p.do) {
			case "get":
				_ = dataGet(p.music);
				break;
			case "store":
				if(p.name && p.score){
					_ = dataStore(p.music, p.name, p.score);
				}
				else{
					_ = showError("not enough parameter");
				}
				break;
			case "avg":
				_ = getAvg(p.music);
				break;
			case "rate":
				_ = getRate(p.music);
				break;
			default:
				_ = showError("parameter incorrect");
				break;
		}
	}
	else{
		_ = showError("not enough parameter");
	}
	return ContentService.createTextOutput(_).setMimeType(ContentService.MimeType.JSON);
}