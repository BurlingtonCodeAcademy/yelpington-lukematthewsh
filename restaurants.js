let path = window.location.pathname
let pathArray = path.split('/')
let id = pathArray.pop()


let myMap = L.map('map').setView([44.4756, -73.2144], 20)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

}).addTo(myMap)


function placeMarker(address) {
    fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
        .then((data) => {
            return data.json()
        })
        .then((locInfo) => {
            let info = locInfo[0]
            let lat = info.lat
            let lon = info.lon
            L.marker([lat, lon]).addTo(myMap)
            myMap.setView([lat, lon])

        })
}


let name = document.getElementById("name")
let message = document.getElementById("message")
let address = document.getElementById("address")
let hours = document.getElementById("hours")
let phone = document.getElementById("phone")
let website = document.getElementById("websit")

async function getRestsInfo() {
    let restaurantsInfo = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${id}`)
        .then((response) => {
            return response.json()
        })
        .then((jsonObj) => {
            return (jsonObj)
        })
    let link = restaurantsInfo.website
    name.textContent = restaurantsInfo.name
    name.title = name
    name.href = link
    message.textContent = restaurantsInfo.notes
    address.textContent = restaurantsInfo.address
    hours.textContent = restaurantsInfo.hours
    phone.textContent = restaurantsInfo.phone
    placeMarker(restaurantsInfo.address)
}




let barName = document.getElementById("bar-name")
let barMessage = document.getElementById("bar-message")
let barAddress = document.getElementById("bar-address")
let barHours = document.getElementById("bar-hours")
let barPhone = document.getElementById("bar-phone")
let barWebsite = document.getElementById("bar-websit")

let barPath = window.location.pathname
let barPathArray = barPath.split('/')
let barid = barPathArray.pop()

console.log(barid)

async function getBarInfo() {
    let barInfo = await fetch(`../api/${barid}.json`)
        .then((response) => {
            return response.json()
        })
        .then((jsonObj) => {
            console.log(jsonObj)
            return (jsonObj)

        })
    let link = barInfo.website
    barName.textContent = barInfo.name
    barName.title = barName
    barName.href = link
    barMessage.textContent = barInfo.notes
    barAddress.textContent = barInfo.address
    barHours.textContent = barInfo.hours
    barPhone.textContent = barInfo.phone
    placeMarker(barInfo.address)
}
