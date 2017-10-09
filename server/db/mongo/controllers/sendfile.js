var path = require('path');
const PATHS = require('../../../../webpack/paths');

export function sendMp3File(req, res) {

    console.log(__dirname);
    console.log(path.resolve(PATHS.src));

    // res.sendFile(__dirname + '../../../../src/mp3/tmclnd.mp3');
    // res.sendFile(path.resolve(app.get('appPath') + '/src/mp3/tmclnd.mp3'));
    res.sendFile('/mp3/04-chi-tien-bit-mieng-chu-tau-1497087052.mp3', {"root": PATHS.src});

}

export default {
    sendMp3File
};