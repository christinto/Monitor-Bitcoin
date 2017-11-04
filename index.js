require('dotenv').config()
const fs = require('fs')
const ccxt = require('ccxt')
const sendEmail = require('./email')

console.log('Monitor Bitcoin price - Made by Christian Barrios')

let config = JSON.parse(fs.readFileSync('./config.json', 'UTF8'))

let interval = config.interval * 60 * 1000
let check = config.check * 60 * 1000
let lost = config.lost
let to = config.to
let subject = config.subject

let exchanges = config.exchanges.map((exchange) => new ccxt[exchange]())

let currentTickers = exchanges.reduce((acc, exchange) => {
    acc[exchange.name] = undefined
    return acc
}, {})

setInterval(async () => {
    exchanges.forEach(async function (exchange) {
        if (!currentTickers[exchange.name]) {
            currentTickers[exchange.name] = await exchange.fetchTicker('BTC/USDT')
            console.log(`Saving the first tickers of ${exchange.name} to compare them later`)
        } else {
            let lastTicker = await exchange.fetchTicker('BTC/USDT')
            if (lastTicker.last < (currentTickers[exchange.name].last - lost)) sendEmail(to, subject, {
                "exchange": exchange.name,
                "currentTicker": currentTickers[exchange.name],
                "lastTicker": lastTicker
            })
            console.log(exchange.name, currentTickers[exchange.name].last, lastTicker.last)
            if (lastTicker.last > currentTickers[exchange.name].last) 
                currentTickers[exchange.name] = lastTicker
            if (Date.parse(lastTicker.datetime) - Date.parse(currentTickers[exchange.name].datetime) > check) 
                currentTickers[exchange.name] = lastTicker
            console.log(exchange.name, currentTickers[exchange.name].last, lastTicker.last)
        }
    });
}, interval)