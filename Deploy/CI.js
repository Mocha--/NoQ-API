const shell = require('shelljs');
const SSH = require('node-ssh');
const nodessh = new SSH();

const printLog = (log) => {
    console.info('*'.repeat(log.length + 6));
    console.info(`*  ${log}  *`);
    console.info('*'.repeat(log.length + 6));
}

printLog('Your code will be pushed to origin repository, dev branch.');

shell.exec('git push origin dev', (code, stdout, stderr) => {
    console.info(stderr)

    nodessh
        .connect({
            host: 'www.mooocha.com',
            username: 'ubuntu',
            privateKey: './NoQ.key'
        })
        .then(() => {
            console.info('success connect')
            return nodessh.exec('git pull origin dev', [], {cwd: '/home/ubuntu/www/NoQ-API'})
        })
        .then((res) => {
            console.info(res)
            nodessh.dispose();
        })
        .catch((rej) => {
            console.info(rej);
            nodessh.dispose();
        })

});

