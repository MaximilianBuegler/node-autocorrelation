# node-autocorrelation
Autocorrelation library for node.js

# Simple Example

    var autocorrelation = require('autocorrelation').autocorrelation;

    var signal=[1,0,1,0,1,0,1,0];

    var acf = autocorrelation(signal);

    console.log(acf);

# Testing

Using Mocha:

    mocha

Or:

    npm test

Output:

    Autocorrelation
      1,0,1,0,1,0,1,0
        ✓ Should properly compute [1,0,1,0,1,0,1,0]
      1,1,1,1,0,0,0,0
        ✓ Should properly compute [1,1,1,1,0,0,0,0]
      1,1,1,1,1,1,1,1
        ✓ Should properly compute [1,1,1,1,1,1,1,1]


    3 passing (13ms)

# License

MIT License

Copyright (c) 2016 Maximilian Bügler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
