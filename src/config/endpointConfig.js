
const hostIP = '192.168.0.100'
const localEndpoint = 'http://'+hostIP+':5000/studentchecking/us-central1/checkapp'
const remoteEndpoint = 'https://us-central1-studentchecking.cloudfunctions.net/checkapp'

module.exports = {localEndpoint,remoteEndpoint}