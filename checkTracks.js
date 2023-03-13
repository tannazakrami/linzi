const getTracks = require('./getTrack')
const updateTracks = require('./updateTrackStatus')
const axios = require('axios')

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs))

module.exports = {
    checkTracks: async function(){

    let tracks = await getTracks();
    let statusArray = [];

    for(let track of tracks)
    {
        await sleep(13000)
        axios.post('https://api.belpost.by/api/v1/tracking' , {
            number: track[0]
        })
        .then(function (response){
            let data = response.data.data
            let {steps} = data[0]
            try{
                let {event} = steps[0]
                statusArray.push([event])
            }
            catch(e){
                statusArray.push(["Ожидает отправки"])
            }
        })
        .catch(function (error){
            console.log(error)
        })
    }

    await updateTracks.updateData(statusArray)
    }
}