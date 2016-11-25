/*===========================================================================*\
 * Autocorrelation algorithm based on description by Thibauld Nion
 * http://www.tibonihoo.net/literate_musing/autocorrelations.html
 *
 * (c) 2016 Maximilian Bügler
 *
 * Test setup adapted from fft-js in https://github.com/vail-systems/node-fft
 * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
 *
 *===========================================================================*/



var assert = require('assert'),
    autocorrelation = require('../').autocorrelation;

describe('Autocorrelation', function () {

    describe('1,0,1,0,1,0,1,0', function () {
        it('Should properly compute [1,0,1,0,1,0,1,0]', function () {
            var acf = autocorrelation([1,0,1,0,1,0,1,0]);
            check(acf,[1,-1,1,-1,1,-1,1,-1],0.001);
        });
    });
    describe('1,1,1,1,0,0,0,0', function () {
        it('Should properly compute [1,1,1,1,0,0,0,0]', function () {
            var acf = autocorrelation([1,1,1,1,0,0,0,0]);
            check(acf,[1,0.71,0.33,-0.2,-1,-1,-1,-1],0.01);
        });
    });
    describe('1,1,1,1,1,1,1,1', function () {
        it('Should properly compute [1,1,1,1,1,1,1,1]', function () {
            var acf = autocorrelation([1,1,1,1,1,1,1,1]);
            check(acf,[0,0,0,0,0,0,0,0],0.01);
        });
    });

});

function check(result, desired,threshold) {
    if (Array.isArray(desired)){
        assert(Array.isArray(result));
        assert(result.length==desired.length);
        for (var i=0;i<result.length;i++){
            check(result[i],desired[i],threshold);
        }
    }
    else{
        assert(equalWithThreshold(desired,result,threshold));
    }
}

function equalWithThreshold(val1, val2, threshold) {
    return (val1 > val2 - threshold) &&
           (val1 < val2 + threshold);
}
