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
            checkResult1(acf);
        });
    });
    describe('1,1,1,1,0,0,0,0', function () {
        it('Should properly compute [1,1,1,1,0,0,0,0]', function () {
            var acf = autocorrelation([1,1,1,1,0,0,0,0]);
            checkResult2(acf);
        });
    });
    describe('1,1,1,1,1,1,1,1', function () {
        it('Should properly compute [1,1,1,1,1,1,1,1]', function () {
            var acf = autocorrelation([1,1,1,1,1,1,1,1]);
            checkResult3(acf);
        });
    });

});

function checkResult1(acf) {
    assert(equalWithThresh(acf[0], 1, 0.01));
    assert(equalWithThresh(acf[1], -1, 0.01));
    assert(equalWithThresh(acf[2], 1, 0.01));
    assert(equalWithThresh(acf[3], -1, 0.01));
    assert(equalWithThresh(acf[4], 1, 0.01));
    assert(equalWithThresh(acf[5], -1, 0.01));
    assert(equalWithThresh(acf[6], 1, 0.01));
    assert(equalWithThresh(acf[7], -1, 0.01));
}

function checkResult2(acf) {
    assert(equalWithThresh(acf[0], 1, 0.01));
    assert(equalWithThresh(acf[1], 0.71, 0.01));
    assert(equalWithThresh(acf[2], 0.33, 0.01));
    assert(equalWithThresh(acf[3], -0.2, 0.01));
    assert(equalWithThresh(acf[4], -1, 0.01));
    assert(equalWithThresh(acf[5], -1, 0.01));
    assert(equalWithThresh(acf[6], -1, 0.01));
    assert(equalWithThresh(acf[7], -1, 0.01));
}


function checkResult3(acf) {
    assert(equalWithThresh(acf[0], 0, 0.01));
    assert(equalWithThresh(acf[1], 0, 0.01));
    assert(equalWithThresh(acf[2], 0, 0.01));
    assert(equalWithThresh(acf[3], 0, 0.01));
    assert(equalWithThresh(acf[4], 0, 0.01));
    assert(equalWithThresh(acf[5], 0, 0.01));
    assert(equalWithThresh(acf[6], 0, 0.01));
    assert(equalWithThresh(acf[7], 0, 0.01));
}

function equalWithThresh(val1, val2, threshold) {
    return (val1 > val2 - threshold) &&
           (val1 < val2 + threshold);
}

