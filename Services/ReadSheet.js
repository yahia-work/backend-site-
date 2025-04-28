const { google } = require('googleapis');
const path = require('path');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../credentials.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
  

async function ReadSheet(SHEET_NAME, filters = {}) {
  // 🔧 Fonction utilitaire pour nettoyer les chaînes de caractères
  function normalize(str) {
      return String(str || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  console.log('📍 Filtres appliqués:', filters);

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  try {
      const res = await sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: `'${SHEET_NAME}'!A1:Z3000`,
      });

      const rows = res.data.values;
      if (!rows || rows.length === 0) {
          console.log('⚠️ Aucune donnée trouvée.');
          return [];
      }

      const headers = rows[0];
      const jsonData = rows.slice(1).map(row => {
          const obj = {};
          headers.forEach((header, i) => {
              obj[header.trim()] = row[i] || '';
          });
          return obj;
      });

      // ✅ Appliquer les filtres
      const filteredData = jsonData.filter(item => {
          return Object.entries(filters).every(([key, value]) => {
              const itemVal = normalize(item[key]);
              const filterVal = normalize(value);
              return itemVal === filterVal;
          });
      });

      console.log('✅ Données filtrées :', filteredData);
      return filteredData;

  } catch (error) {
      console.error('❌ Erreur lors de la lecture de la feuille :', error.message);
      return [];
  }
}

async function ReadNameSheet() {
  // Assurez-vous que auth est correctement initialisé
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });
  
  try {
    // Utilisez spreadsheets.get() pour obtenir les métadonnées des feuilles
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
      fields: 'sheets.properties.title'
    });
    
    // Correction: utiliser 'response' au lieu de 'res' (comme déclaré plus haut)
    const sheetNames = response.data.sheets.map(sheet => sheet.properties.title);
    return sheetNames;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des sheets :', error.message);
    return [];
  }
}

module.exports = { ReadSheet ,ReadNameSheet  };
