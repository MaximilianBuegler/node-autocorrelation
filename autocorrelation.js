/*===========================================================================*\
 * Autocorrelation algorithm based on description by Thibauld Nion
 * http://www.tibonihoo.net/literate_musing/autocorrelations.html
 *
 * (c) 2016 Maximilian Bügler
 *
 * Launcher adapted from fft-js in https://github.com/vail-systems/node-fft
 * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
 *
 *===========================================================================*/


var autocorrelation = require('./').autocorrelation,
    program = require('commander'),
    fs = require('fs');

program.version('0.0.1')
  .usage('[signal]');

program.parse(process.argv);

if (program.args.length < 1) {
    console.log('Please pass a valid signal file!');
    program.outputHelp();
    process.exit(1);
}

fs.readFile(program.args[0], 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }

    var signal = data.toString().split(',').map(parseFloat);
    console.log('Signal: ', signal);

    var acf = autocorrelation(signal); 
    console.log('ACF: ', acf);

});

