
const hostIP = '10.80.124.86'
const localEndpoint = 'http://'+hostIP+':5000/studentchecking/us-central1/checkapp'
const remoteEndpoint = 'https://us-central1-studentchecking.cloudfunctions.net/checkapp'

module.exports = {localEndpoint,remoteEndpoint}