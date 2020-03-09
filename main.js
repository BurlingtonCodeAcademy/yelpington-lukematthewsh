let myMap = L.map('map').setView([44.4756, -73.2144], 15)
L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

}).addTo(myMap)

let barArray = [
    "what-ales-you",
    "ESOX",
    "gryphon",
    "jps-pub",
    "radio-bean",
    "red-square",
    "ri-ra-irish-pub",
    "ruben-james",
    "rasputins",
    "three-needs",
    "the-whiskey-room"]
let restArray = [
    "Ahli",
    "American",
    "August",
    "City",
    "Cortijo",
    "Farmhouse",
    "Gaku",
    "Hen",
    "Henrys",
    "Honey",
    "Kountry",
    "Leunigs",
    "Mikes",
    "Pascolo",
    "Single",
    "Thai"

]

function placeMarker(address, name, id) {
    fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
        .then((data) => {
            return data.json()
        })
        .then((locInfo) => {
            let info = locInfo[0]
            let lat = info.lat
            let lon = info.lon
            let marker = L.marker([lat, lon]).addTo(myMap)
            marker.bindPopup(name)
            marker.on('mouseover', function () {
                this.openPopup();
            });
            marker.on('mouseout', function () {
                this.closePopup()
            })
            marker.on('click', function () {
                location.replace(`/restaurants/${id}`)
            })
        })
}
function placeBarMarker(address, name, id) {
    fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
        .then((data) => {
            return data.json()
        })
        .then((locInfo) => {
            let info = locInfo[0]
            let lat = info.lat
            let lon = info.lon
            let marker = L.marker([lat, lon]).addTo(myMap)
            marker.bindPopup(name)
            marker.on('mouseover', function () {
                this.openPopup();
            });
            marker.on('mouseout', function () {
                this.closePopup()
            })
            marker.on('click', function () {
                location.replace(`/bars/${id}`)
            })
        })
}


let barContainer = document.getElementById('bars-list')
let restsContainer = document.getElementById('rests-list')

async function getRests() {
    let restaurantsList = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
        .then((response) => {
            return response.json()
        })
        .then((jsonObj) => {
            console.log(jsonObj)
            return (jsonObj)
        })
    restaurantsList.forEach((restaurant) => {
        let id = restaurant.id
        let restName = restaurant.name
        let restAddress = restaurant.address
        restsContainer.innerHTML += `<li><a href= '/restaurants/${id}'>${restName}</a></li>`
        placeMarker(restAddress, restName, id)


    })

}

async function getBars() {
    let barsList = await fetch('./api/all.json')

        .then((response) => {
            return response.json()
        })
        .then((jsonObj) => {
            return (jsonObj)
        })
    barsList.forEach((bar) => {

        fetch(`./api/${bar}.json`)
            .then((response) => {
                return response.json()
            })
            .then((bar) => {
                let barid = bar.id
                let barName = bar.name
                let barAddress = bar.address
                barContainer.innerHTML += `<li><a href= '/bars/${barid}'>${barName}</a></li>`
                placeBarMarker(barAddress, barName, barid)
            })

    })

}