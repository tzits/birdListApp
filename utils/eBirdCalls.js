
export const fetchBirds = async (lat, lng) => {

    let theBirds = [];
    const response = await fetch(
        `https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lng}&sort=species&dist=10`, {headers: {
            'X-eBirdAPIToken': API_TOKEN
        }}
    )
    const data = await response.json()
    for (let i=0; i < data.length; i ++) {
        let bird = data[i]
        theBirds.push({species: bird.comName, count: bird.howMany, date: bird.obsDt, location: bird.locName, lat: bird.lat, lng: bird.lng, speciesCode: bird.speciesCode})
    }
    let datedBirds = theBirds.sort(function(a,b){
        return new Date(b.date) - new Date(a.date)
    })
    return datedBirds
}

export const getDetails = async (speciesCode) => {
    const response = await fetch(
        `https://api.ebird.org/v2/ref/taxonomy/ebird?species=${speciesCode}&fmt=json`, {headers: {
            'X-eBirdAPIToken': API_TOKEN
        }})
    const data = response.json()
    return data
}


