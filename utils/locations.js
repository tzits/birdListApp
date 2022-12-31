

//not sure I really need this first function 
const getAddress = async (lat,lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('No Map for You')
    }

    const data = await response.json()
    const address = data.results[0].formatted_address;
    return address

}

export const getMapPreview = (lat,lng) => {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&size=400x200&markers=color:purple%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
    return imagePreviewUrl
}
