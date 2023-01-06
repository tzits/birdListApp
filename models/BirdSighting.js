export class BirdSighting {
    constructor(species, count, location, time, date, imageUrl, id) {
        this.species = species,
        this.count = count,
        this.imageUrl = imageUrl,
        this.lat = location.lat,
        this.lng = location.lng,
        this.time = time,
        this.date = date
        this.id = id
    }
}
