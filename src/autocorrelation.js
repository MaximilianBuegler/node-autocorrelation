/*===========================================================================*\
 * Autocorrelation algorithm based on description by Thibauld Nion
 * http://www.tibonihoo.net/literate_musing/autocorrelations.html
 *
 * (c) 2016 Maximilian Bügler
 *
 *===========================================================================*/

var fft = require('fft-js').fft;
var ifft = require('fft-js').ifft;

module.exports = {
    autocorrelation: function autocorrelation(signal) {
        
        var n=signal.length;
        
        var acv=autocovariance(signal);
        
        var variance=acv[0];
        
        var acf=[];
        
        var i;
        
        if (variance>0){
            for (i=0; i<n; i++){
                acf[i]=acv[i]/variance;    
            }
        }
        else{
            for (i=0; i<n; i++){
                acf[i]=0;    
            }            
        }
        return acf;
    
        function autocovariance(signal) {
            
            var n=signal.length;
            
            if (n==0)
                return [];
            
            var mean=0;
            var i;
            for (i=0; i<n; i++){
                mean+=signal[i];
            }
            mean/=n;
                      
            var padded_signal=[];
            
            for (i=0; i<n; i++){
                padded_signal[i]=signal[i]-mean;
                padded_signal[n+i]=0;
            }
                        
            var ft_signal = fft(padded_signal);
                       
            var pseudo_powerSpectralDensity=[];
            
            for (i=0; i<ft_signal.length; i++){
                pseudo_powerSpectralDensity[i]=complexMultiply(ft_signal[i], complexConjugate(ft_signal[i]));
            }
           
            var pseudo_autocovariance = ifft(pseudo_powerSpectralDensity);
    
            var mask=[];
            
            for (i=0; i<n; i++){
                mask[i]=1;
                mask[i+n]=0;
            }
            
            var ft_mask = fft(mask);
    
            var mask_powerSpectralDensity=[];
            
            for (i=0; i<ft_mask.length; i++){
                mask_powerSpectralDensity[i]=complexMultiply(ft_mask[i], complexConjugate(ft_mask[i]));
            }
            
            var mask_correction_factors = ifft(mask_powerSpectralDensity);
    
            var acv=[];
            
            for (i=0; i<n; i++){
                acv[i]=complexDivideRealPart(pseudo_autocovariance[i],mask_correction_factors[i]);
            }    
            
            return acv;
            /*
             * ComplexMultiply
             * 
             * From complex.js in fft-js in https://github.com/vail-systems/node-fft
             *
             * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
             */
            function complexMultiply(a, b){
                return [(a[0] * b[0] - a[1] * b[1]), 
                        (a[0] * b[1] + a[1] * b[0])];
            }
            
            function complexConjugate(a){
                return [a[0], -a[1]];
            }
            /*function complexDivide(a,b){
                return [ (a[0]*b[0]+a[1]*b[1])/(b[0]*b[0]+b[1]*b[1]),
                         (a[1]*b[0]-a[0]*b[1])/(b[0]*b[0]+b[1]*b[1])];
            }*/
            //We only need the real part here
            function complexDivideRealPart(a,b){
                return (a[0]*b[0]+a[1]*b[1])/(b[0]*b[0]+b[1]*b[1]);
            }           
            
        }
    }
    
};