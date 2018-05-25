const platform = require('../..');
let request = required('request-promise');
let config = platform.config.get('shahrzad-bot', {});

let listener = ()=>{
    request({
        uri: `https://api.telegram.org/bot${config.token}/getUpdates`,
        json: true
    })
    .then(({result: updates}) => updates.forEach(({message: {chat: {id: chatId}, text}}) => {
        request({
            uri: `https://api.telegram.org/bot${config.token}/sendMessage`,
            body: {
                chat_id: chatId,
                text: 'hello'
            }
        });
    }));
    setTimeout(listener, 100);
};

listener();