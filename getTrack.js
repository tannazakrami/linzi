const {google} = require('googleapis')
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
})

const getTracks = async () => {
    const client = await auth.getClient()
    const googlesheets = google.sheets({version: 'v4', auth: client})
    const spreadsheetId = '1dgXhRHGvaSIE_aso7tT-00pqH2RHR6d9ckCrOGg0Tt8'
    let data = await googlesheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Посылки!C2:C'
    })

    return data.data.values || undefined
}

module.exports = getTracks