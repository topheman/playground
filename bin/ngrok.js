const ngrok = require('ngrok');
const chalk = require('chalk');

(async () => {
    const url = await ngrok.connect(3000);
    
    console.log(`
Your application is accessible in https at ${chalk.green(url)}
`);
})()