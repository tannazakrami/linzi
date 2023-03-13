const {google} = require('googleapis')

const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
})

module.exports = {
    updateData: async function(updatedData){
        const client = await auth.getClient()
        const googleSheets = google.sheets({version: 'v4', auth: client})
        const spreadsheetId = '1dgXhRHGvaSIE_aso7tT-00pqH2RHR6d9ckCrOGg0Tt8'
        return new Promise((resolve, reject) => {
            googleSheets.spreadsheets.values.update(
                {
                    auth,
                    spreadsheetId,
                    range: 'Посылки!K2:K',
                    valueInputOption: 'USER_ENTERED',
                    resource: {
                        range: 'Посылки!K2:K',
                        majorDimension: 'ROWS',
                        values: updatedData,
                    },
                },
                (err, resp) => {
                    if(err){
                        console.log('Data Error: ', err)
                        reject(err)
                    }
                    resolve(resp)
                }
            )
        })
    }
}