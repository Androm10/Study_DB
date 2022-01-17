const userService = require('../services/userService');
const CronJob = require('cron').CronJob;


module.exports = function() {

    let job = new CronJob('* * 22 * * *', async function() {
        let users = await userService.getAllUsers(null,null);

        for(let user of users) {
            let lastBet = await userService.getLastBet(user.id);

            if(lastBet) {
                if(Date.now() - new Date(lastBet.createdAt) >= 7776000000)  {
                    console.log('server: auto deleted user ' + user.id);
                    userService.deleteAccount();
                    
                }   
            }
        }
    }, null, true, 'Europe/Minsk');


    job.start();

}