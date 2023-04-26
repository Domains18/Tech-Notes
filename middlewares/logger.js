const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path');



const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            console.log('Logs folder Not found, attempting to creat one')
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    } catch (error) {
        throw new Error(error)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
}
