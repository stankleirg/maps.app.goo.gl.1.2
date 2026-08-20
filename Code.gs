const SHEET_ID = 'PASTE_SHEET_ID_DI_SINI';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');

    const lat = Number(data.latitude);
    const lng = Number(data.longitude);
    const accuracy = Number(data.accuracy);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      throw new Error('Koordinat tidak valid.');
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Latitude',
        'Longitude',
        'Accuracy (m)',
        'Google Maps'
      ]);
    }

    const mapsUrl =
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(lat + ',' + lng);

    sheet.appendRow([
      new Date(),
      lat,
      lng,
      Number.isFinite(accuracy) ? accuracy : '',
      mapsUrl
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        error: err.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
