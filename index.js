const getInfo = require('./checkTracks')
const cron = require('node-cron')

const start = async () => {
    await getInfo.checkTracks();
}

cron.schedule('0 0 6 * * 2', () => {
    start();
})
