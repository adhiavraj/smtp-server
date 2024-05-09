const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({

    allowInsecureAuth: true,
    authOptional: false,

    onConnect(session, cb) {
        console.log('onConnect', session.id);
        cb();
    },
    onMailFrom(address, session, cb) {
        console.log('onMailFrom', address.address, session.id);
        cb();
    },
    onRcptTo(address, session, cb) {
        console.log('onRctpTo', address.address, session.id);
        cb();
    },
    onData(stream, session, cb) {
        stream.on('data', (data) => console.log(`onData From : ${session.id}, Data : ${data.toString()}`));
        stream.on('end', cb);
    }
});

server.listen(25, () => console.log("Server listening on 25 PORT"));