const shell = require('shelljs');
const SSH = require('node-ssh');
const path = require('path');
const nodessh = new SSH();

const printLog = (log) => {
    console.info('');
    console.info('*'.repeat(log.length + 6));
    console.info(`*  ${log}  *`);
    console.info('*'.repeat(log.length + 6));
}

printLog('1. Pusing code to origin repository, dev branch.');

shell.exec('git push origin dev', {silent: true}, (code, stdout, stderr) => {
    printLog('Push successfully.');
    printLog('2. Connecting to your server.')
    nodessh
        .connect({
            host: 'www.mooocha.com',
            username: 'ubuntu',
            privateKey: path.join(__dirname, './NoQ.key')
        })
        .catch((rej) => {
            printLog('Can not connect to your server, due to:')
            console.info(rej);
            Prosime.reject();
        })
        .then(() => {
            printLog('Connect successfully.')
            printLog('3. Remote server is pulling latest code from origin repository, dev branch.')
            return nodessh.execCommand('git pull origin dev', {cwd: '/home/ubuntu/www/NoQ-API'})
        })
        .catch((rej) => {
            printLog('Remote server failed pulling latest code, due to:');
            console.info(rej);
            Promise.reject();
        })
        .then((res) => {
            printLog('Remote server pulled latest code.')
            printLog('4. Remote server is restarting api server.')
            return nodessh.execCommand('pm2 restart Server.js', {cwd: '/home/ubuntu/www/NoQ-API'})
        })
        .catch((rej) => {
            printLog('Remote server failed restarting api server, due to:');
            console.info(rej);
            nodessh.dispose();
        })
        .then((res) => {
            printLog('Api server has been restarted.')
            nodessh.dispose();
        });
});

