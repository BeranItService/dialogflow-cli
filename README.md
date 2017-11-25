# Dialogflow Command Line Tool

This is a very basic command line application which allows you test your dialogflow agent in your terminal.

## Installation

To install it on your local machine, you will need to download or clone this repository and install npm dependencies by running `npm i` command. Once you do it, the application will be ready to work.

## Usage

This application is very simple and all you need to start using it is to copy API key of your dialogflow agent and start it by running following command:

```
node index.js -k fdd873f4d95276bdacd2b3c65c9580e3
```

If you want to see API responses, you need to run this app with `-d` (or `--debug`) key. Like this:

```
node index.js -key="fdd873f4d95276bdacd2b3c65c9580e3" --debug
```

## Contribute

What to help or have a suggestion? Open a [new ticket](https://github.com/eugene-manuilov/dialogflow-cli/issues/new) and we can discuss it or submit pull request.

## LICENSE

The MIT License (MIT)
