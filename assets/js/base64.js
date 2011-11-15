/** CopyRight: Dr Alexander J Turner - all rights reserved.
  * Please feel free to use this any way you want as long as you
  * mention I wrote it!
  */
function Base64() {
    this.maxLineLength = 76;

    this.base64chars =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
   
    this.decode = function(encStr) {
        var base64charToInt = {};
        for (var i = 0; i < 64; i++) base64charToInt[this.base64chars.substr(i,1)] = i;
        encStr = encStr.replace(/\s+/g, "");
        var decStr = "";
        var decArray=new Array();
        var linelen = 0
        var el=encStr.length;
        var bits24;
        for (var i = 0; i < el; i += 4) {
            bits24  = ( base64charToInt[encStr.charAt(i)] & 0xFF  ) <<  18;
            bits24 |= ( base64charToInt[encStr.charAt(i+1)] & 0xFF  ) <<  12;
            bits24 |= ( base64charToInt[encStr.charAt(i+2)] & 0xFF  ) <<   6;
            bits24 |= ( base64charToInt[encStr.charAt(i+3)] & 0xFF  ) <<   0;
            decStr += String.fromCharCode((bits24 & 0xFF0000) >> 16);
            if (encStr.charAt(i + 2) != '=')  // check for padding character =
                decStr += String.fromCharCode((bits24 &   0xFF00) >>  8);
            if (encStr.charAt(i + 3) != '=')  // check for padding character =
                decStr += String.fromCharCode((bits24 &     0xFF) >>  0);
            if(decStr.length>1024)
            {
                decArray.push(decStr);
                decStr='';
            }
        }
        if(decStr.length>0)
        {
            decArray.push(decStr);
        }
        
        var ar2=new Array();
        for(;decArray.length>1;)
        {
            var l=decArray.length;
            for(var c=0;c<l;c+=2)
            {
                if(c+1==l)
                {
                    ar2.push(decArray[c]);
                }
                else
                {
                    ar2.push(''+decArray[c]+decArray[c+1]);
                }
            }
            decArray=ar2;
            ar2=new Array();
        }
        return decArray[0];
    }
   
    this.encode = function(decStr)
    {
        var encArray=new Array();
        var bits, dual, i = 0, encOut = "";
        var linelen = 0;
        var encOut='';
        while(decStr.length >= i + 3){
            bits =    (decStr.charCodeAt(i++) & 0xff) <<16 |
                (decStr.charCodeAt(i++) & 0xff) <<8 |
                decStr.charCodeAt(i++) & 0xff;
            encOut +=
                this.base64chars.charAt((bits & 0x00fc0000) >>18) +
                this.base64chars.charAt((bits & 0x0003f000) >>12) +
                this.base64chars.charAt((bits & 0x00000fc0) >> 6) +
                this.base64chars.charAt((bits & 0x0000003f));
            linelen += 4;
            if (linelen>this.maxLineLength-3) {
                encOut += "\n";
                encArray.push(encOut);
                encOut='';
                linelen = 0;
            }
        }
        if(decStr.length -i > 0 && decStr.length -i < 3) {
            dual = Boolean(decStr.length -i -1);
            bits =
                ((decStr.charCodeAt(i++) & 0xff) <<16) |
                (dual ? (decStr.charCodeAt(i) & 0xff) <<8 : 0);
            encOut +=
                this.base64chars.charAt((bits & 0x00fc0000) >>18) +
                this.base64chars.charAt((bits & 0x0003f000) >>12) +
                      (dual ? this.base64chars.charAt((bits & 0x00000fc0) >>6) : '=') +
                      '=';
        }
       
        encArray.push(encOut);
        // this loop progressive concatonates the
        // array elements entil there is only one
        var ar2=new Array();
        for(;encArray.length>1;)
        {
            var l=encArray.length;
            for(var c=0;c<l;c+=2)
            {
                if(c+1==l)
                {
                    ar2.push(encArray[c]);
                }
                else
                {
                    ar2.push(''+encArray[c]+encArray[c+1]);
                }
            }
            encArray=ar2;
            ar2=new Array();
        }
        return encArray[0];
    }
}
