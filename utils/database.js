import * as SQLite from 'expo-sqlite'
import { BirdSighting } from '../models/BirdSighting'

const database = SQLite.openDatabase('birdSightings.db')

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS birdsightings (
                    id INTEGER PRIMARY KEY NOT NULL,
                    species TEXT NOT NULL,
                    count INTEGER REAL NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL,
                    time TEXT NOT NULL,
                    date TEXT NOT NULL,
                    imageUrl TEXT NOT NULL
                )`,
                [],
                () => {
                    resolve()
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
    return promise
}

export function insertBirdSighting(birdSighting) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`INSERT INTO birdsightings (species, count, lat, lng, time, date, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                birdSighting.species, 
                birdSighting.count, 
                birdSighting.lat, 
                birdSighting.lng, 
                birdSighting.time, 
                birdSighting.date, 
                birdSighting.imageUrl
            ],
            (_, result) => {
                resolve(result)
            },
            (_,error) => {
                reject(error)
            }
            )
        })
    })
    return promise
}

export function fetchBirdSightings() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql('SELECT * FROM birdsightings', [],
            (_, result) => {
                const birdSightings = []

                for (const db of result.rows._array) {
                    birdSightings.push(
                        new BirdSighting(
                            db.species,
                            db.count,
                            {lat: db.lat, lng: db.lng},
                            db.time,
                            db.date,
                            db.imageUrl,
                            db.id
                        )
                    )
                }
                resolve(birdSightings)
            },
            (_, error) => {
                reject(error)
            }
            );
        })
    })
    return promise
}

export function fetchBirdSightingDetails() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql('SELECT * FROM birdsightings WHERE id = ?', [id],
            (_, result) => {
                const dp = result.rows._array[0]
                const birdSighting = new BirdSighting(
                            dp.species,
                            dp.count,
                            {lat: dp.lat, lng: dp.lng},
                            dp.time,
                            dp.date,
                            dp.imageUrl,
                            dp.id
                            )
                            resolve(birdSighting)
            },
            (_, error) => {
                reject(error)
            }
            );
        })
    })
    return promise
}
