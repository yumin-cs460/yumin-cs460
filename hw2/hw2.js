/**
 * IP Calculator
 * #YUMIN CHEN
 * #CS460 HW2
 */

var minArr = [0,0,0,0];
var maxArr = [0,0,0,0];
var networkArr = [0,0,0,0];
var minIP = undefined;
var maxIP = undefined;
var network = undefined;
var ipTypr = undefined;5

/**
 * Verify IP Type(Public/Private)
 * @param {*} ipF 1st 8bits
 * @param {*} ipS 2nd 8bits
 */
function ipType(ipF, ipS){
    'use strict'
    if(ipF == 192 && ipS == 168) {
        return 'Class C Private IP';
    }else if(ipF == 172 && ipS == 16){
        return 'Class B Private IP';
    }else if(ipF == 10){
        return 'Class A Private IP';
    }else if(ipF == 127){
        return 'Loop Address';     
    }else if(ipF == null){
        return 'Null';
    }else {
        return 'Pubic IP Address';
    }
}

/**
 * Return the number of available address.
 * @param {*} mask Network Mask
 */
function addCalc(mask){
        return Math.pow(2,32-mask);
}


/**
 * Ip Range based on subnet mask.
 * @param {*} ip1 1st 8bits
 * @param {*} ip2 2nd 8bits 
 * @param {*} ip3 3rd 8bits
 * @param {*} ip4 4th 8bits
 * @param {*} mask Net Mask Bits
 */
function ipRange(ip1,ip2,ip3,ip4,mask){
    //var maxCount = 0;
    var avaAddr = addCalc(mask);
    minIP = 0;
    maxIP = 0;
    console.log('PassingInit');

    if(mask==24){
        minIP = ip1+'.'+ip2+'.'+ip3+'.'+0;
        maxIP = ip1+'.'+ip2+'.'+ip3+'.'+255; 
        console.log('PassingFixed');
    }
    if(mask==16){
        minIP = ip1+'.'+ip2+'.'+0+'.'+0;
        maxIP = ip1+'.'+ip2+'.'+255+'.'+255; 
    }
    if(mask==8){
        minIP = ip1+'.'+0+'.'+0+'.'+0;
        maxIP = ip1+'.'+255+'.'+255+'.'+255; 
    }
    if(mask>24){
        var i;
        console.log('Passing>24');
        for(i = 0; i < 256; i = i + avaAddr)
        {
             

            if(ip4 < i){
                minIP = ip1+'.'+ip2+'.'+ip3+'.'+(i-avaAddr);
                maxIP = ip1+'.'+ip2+'.'+ip3+'.'+(avaAddr-1); 
                break;
            }else if(ip4 == i){
                minIP = ip1+'.'+ip2+'.'+ip3+'.'+i;
                maxIP = ip1+'.'+ip2+'.'+ip3+'.'+(i+avaAddr-1);
                break;
            }
        }
    }
    if(mask<24){
        console.log('Passing<24');
        //To binary
        var ip1B = (+ip1).toString(2);
        var ip2B = (+ip2).toString(2);
        var ip3B = (+ip3).toString(2);

        if(mask<8){
           console.log('Passing<8');
           var wildcard8 = 8-mask;
           minArr[0] = parseInt(binaryModify(ip1B,0,wildcard8),2); //Return as Dec
           maxArr[0] = parseInt(binaryModify(ip1B,1,wildcard8),2);
           maxArr[1] = 255;
           maxArr[2] = 255;
           maxArr[3] = 255;
        }else if(mask<16 && mask >8){
            console.log('Passing<16');
            var wildcard16 = 16-mask;
            minArr[0] = ip1;
            maxArr[0] = ip1;
            minArr[1] = parseInt(binaryModify(ip2B,0,wildcard16),2);
            maxArr[1] = parseInt(binaryModify(ip2B,1,wildcard16),2);
            maxArr[2] = 255;
            maxArr[3] = 255;
            console.log(ip1B+"."+ip2B+"."+ip3B);
        }else if(mask<24 && mask>16){
            console.log('Passing<24');
            var wildcard24 = 24-mask;
            minArr[0] = ip1;
            maxArr[0] = ip1;
            minArr[1] = ip2;
            maxArr[1] = ip2;
            minArr[2] = parseInt(binaryModify(ip3B,0,wildcard24),2);
            maxArr[2] = parseInt(binaryModify(ip3B,1,wildcard24),2);
            maxArr[3] = 255;
        }

     }
    
}

/**
 * Modify the binary from 0 to 1 or 1 to 0
 */
 function binaryModify(bin,replace,num){
     var str = '' + bin;  //conv to str
     var strPointer = str.length-1;
     for(var i=0;i<num;i++){
          str = setCharAt(str,strPointer,replace);
          strPointer--;
     }
     return Number(str);
 }
/**
 * Char -> String Helper Method
 */
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}





$('#ipInfo').submit(function (event) {
    event.preventDefault();
    //get the ip address  and mask from text
    var ipp1 = $('#ip1').val().trim();
    var ipp2 = $('#ip2').val().trim();
    var ipp3 = $('#ip3').val().trim();
    var ipp4 = $('#ip4').val().trim();
    var mask = $('#mask').val().trim();
    console.log('Passing: '+ipp1+'.'+ipp2+'.'+ipp3+'.'+ipp4);
    //var result = ipType(ipp1,ipp2);
    //var number = addCalc(mask);
    ipRange(ipp1,ipp2,ipp3,ipp4,mask);
    //ipRange(192,168,100,1,24);
    if(ipp1.length==0 || ipp2.length==0 || ipp3.length==0 || ipp4.length==0 || mask==0){
        alert('Please Enter Current IP');
    }else if(ipp1>255 ||ipp2>255 || ipp3>255 || ipp4>255 || mask>32){
        alert('IP Address Should <= 255 and Network Mask should <= 32');
    }else if(isNaN(ipp1+ipp2+ipp3+ipp4+mask)){
        alert('Please Enter All Integer !');
    }else if(mask>=24 || mask==16 || mask==24){
        $("#resultReturn").empty();
        //$('#resultReturn').html(minIP+' '+maxIP); 
        $('#resultReturn').html(
            //'<h5 class="mt-5">Network: '+minIP+'/'+mask+'</h5>'+
            //'<h5>Min Address: '+minIP+'(Network)</h5>'+
            //'<h5>Max Address: '+maxIP+'(Broadcast Address)</h5>'+
            //'<h5>Hosts Number: '+(addCalc(mask)-2)+'</h5>'+
            //'<h5>IP Type: '+ipType(ipp1,ipp2)+'</h5>'
            '<ul class="list-group mt-5">'+
                '<li class="list-group-item">Network: '+minIP+'/'+mask+'</li>'+
                '<li class="list-group-item">Min Address: '+minIP+'(Network)</li>'+
                '<li class="list-group-item">Max Address: '+maxIP+'(Broadcast Address)</li>'+
                '<li class="list-group-item">Hosts Number: '+(addCalc(mask)-2)+'</li>'+
                '<li class="list-group-item">IP Type: '+ipType(ipp1,ipp2)+'</li>'+
            '</ul>'
        ); 

    }else {
        var ansMin = minArr[0]+'.'+minArr[1]+'.'+minArr[2]+'.'+minArr[3];
        var ansMax = maxArr[0]+'.'+maxArr[1]+'.'+maxArr[2]+'.'+maxArr[3];
        $("#resultReturn").empty();
        $('#resultReturn').html(
            //'<h5 class="mt-5">Network: '+ansMin+'/'+mask+'</h5>'+
            //'<h5>Min Address: '+ansMin+'(Network)</h5>'+
            //'<h5>Max Address: '+ansMax+'(Broadcast Address)</h5>'+
            //'<h5>Hosts Number: '+(addCalc(mask)-2)+'</h5>'+
            //'<h5>IP Type: '+ipType(ipp1,ipp2)+'</h5>'

            '<ul class="list-group mt-5">'+
                '<li class="list-group-item">Network: '+ansMax+'/'+mask+'</li>'+
                '<li class="list-group-item">Min Address: '+ansMin+'(Network)</li>'+
                '<li class="list-group-item">Max Address: '+ansMax+'(Broadcast Address)</li>'+
                '<li class="list-group-item">Hosts Number: '+(addCalc(mask)-2)+'</li>'+
                '<li class="list-group-item">IP Type: '+ipType(ipp1,ipp2)+'</li>'+
            '</ul>'
        );
        
    }


    
});
