#!/usr/bin/env node

const program = require('commander');
program.option('-k, --key <key>', 'Your dialogflow key.');
program.option('-d, --debug', 'Whether to display debug information.');
program.parse(process.argv);

const Winston = require('winston');
const WinstonFormatter = require('winston-console-formatter');
const logger = new Winston.Logger({ level: program.debug ? 'debug' : 'info' });
logger.add(Winston.transports.Console, WinstonFormatter.config());

if (!program.key) {
	logger.error('Please, provide your dialogflow API key to proceed.')
	return;
}

const readline = require('readline');
const readlineInterface = readline.createInterface({ input: process.stdin, output: process.stdout });

const apiai = require('apiai')(program.key);
const sessionId = require('uuid/v1')();

function dialog(apiaiResponse) {
	logger.debug(' ', apiaiResponse);

	const { messages } = apiaiResponse.result.fulfillment;
	for (let i = 0, len = messages.length; i < len; i++) {
		const message = messages[i].speech + '\n';

		if (i < len - 1) {
			readlineInterface.write(message);
		} else {
			readlineInterface.question(message, (answer) => {
				if (answer == 'exit') {
					readlineInterface.close();
				} else {
					apiai.textRequest(answer, { sessionId }).on('response', dialog).end();
				}
			});
		}
	}
}

apiai.eventRequest({ name: 'WELCOME' }, { sessionId }).on('response', dialog).end();
