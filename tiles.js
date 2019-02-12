function getTileVertices(shareNum, origCen, origHi, reqRotate){
    var v = [];
    var h = [];
    var tl = [];
    var resCen, resHi, resTl;
    resHi = 1.05;
    resCen = origCen;

    switch (shareNum){
        case 1:
            if(!reqRotate) {
                resCen = (Math.floor((Math.random() * 8 - 10)))/10 + 0.1;
                resHi = 1;
            }
            else {
                resHi = origHi;
            }

            resTl = resCen - 0.1;
            console.log("original centrl, top is: ",resCen, resTl);
            var v1 = getSquareVert(resTl, resHi);
            v1 = v1.concat(getSquareVert(resTl, resHi + 0.1));
            v1 = v1.concat(getSquareVert(resTl+0.1, resHi));
            v1 = v1.concat(getSquareVert(resTl+0.1, resHi + 0.1));
            //curTileVertices = v1;
            return [v1, resHi, resTl]; 

        case 2:
            if(!reqRotate) {
                resHi = 0.95;
            }
            else {
                resCen = origCen;
                resHi = origHi;
            }

            h.push(resHi);
            tl.push(resCen - 0.25);
            var v1 = getSquareVert(resCen - 0.25, resHi + 0.05);  
            v1 = v1.concat(getSquareVert(resCen - 0.15, resHi + 0.05));
            v1 = v1.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v1 = v1.concat(getSquareVert(resCen + 0.05, resHi + 0.05));
            v.push(v1);

            h.push(resHi);
            tl.push(resCen - 0.05);
            var v2 = getSquareVert(resCen - 0.05, resHi - 0.15);  
            v2 = v2.concat(getSquareVert(resCen - 0.05, resHi - 0.05));
            v2 = v2.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v2 = v2.concat(getSquareVert(resCen - 0.05, resHi + 0.15));
            v.push(v2);

            attr = {vertArr: v, heightArr: h, topLeftArr: tl};
            return attr; 

        case 3:
            if(!reqRotate) {
            }
            else {
                resCen = origCen;
                resHi = origHi;
            }

            tl.push(resCen - 0.15);
            h.push(resHi);
            var v1 = getSquareVert(resCen - 0.15, resHi - 0.05);  
            v1 = v1.concat(getSquareVert(resCen - 0.05, resHi - 0.05));
            v1 = v1.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v1 = v1.concat(getSquareVert(resCen + 0.05, resHi + 0.05));
            v.push(v1);

            tl.push(resCen + 0.05);
            h.push(resHi);
            var v2 = getSquareVert(resCen + 0.05, resHi - 0.05);  
            v2 = v2.concat(getSquareVert(resCen + 0.05, resHi + 0.05));
            v2 = v2.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v2 = v2.concat(getSquareVert(resCen - 0.05, resHi + 0.15));
            v.push(v2);

            attr = {vertArr: v, heightArr: h, topLeftArr: tl};
            return attr;    

        case 4:
            if(!reqRotate) {
                //resCen = (Math.floor((Math.random() * 7 - 9)))/10 + 0.05;
            }
            else {
                resCen = origCen;
                resHi = origHi;
            }

            tl.push(resCen - 0.05);
            h.push(resHi);
            var v1 = getSquareVert(resCen - 0.05, resHi - 0.05);   
            v1 = v1.concat(getSquareVert(resCen + 0.05, resHi - 0.05));
            v1 = v1.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v1 = v1.concat(getSquareVert(resCen - 0.15, resHi + 0.05));
            v.push(v1);

            tl.push(resCen - 0.05);
            h.push(resHi);
            var v2 = getSquareVert(resCen - 0.05, resHi - 0.05);  
            v2 = v2.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v2 = v2.concat(getSquareVert(resCen + 0.05, resHi + 0.05));
            v2 = v2.concat(getSquareVert(resCen + 0.05, resHi + 0.15));
            v.push(v2);

            attr = {vertArr: v, heightArr: h, topLeftArr: tl};
            return attr;  

        case 5:
            if(!reqRotate) {
                //resCen = (Math.floor((Math.random() * 7 - 10)))/10 + 0.05;
            }
            else {
                resCen = origCen;
                resHi = origHi;
            }

            tl.push(resCen - 0.15);
            h.push(resHi);
            var v1 = getSquareVert(resCen - 0.15, resHi - 0.05);   
            v1 = v1.concat(getSquareVert(resCen - 0.15, resHi + 0.05));
            v1 = v1.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v1 = v1.concat(getSquareVert(resCen + 0.05, resHi + 0.05));
            v.push(v1);

            tl.push(resCen - 0.05);
            h.push(resHi);
            var v2 = getSquareVert(resCen - 0.05, resHi - 0.05);  
            v2 = v2.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v2 = v2.concat(getSquareVert(resCen - 0.05, resHi + 0.15));
            v2 = v2.concat(getSquareVert(resCen + 0.05, resHi - 0.05));
            v.push(v2);

            tl.push(resCen - 0.15);
            h.push(resHi);
            var v3 = getSquareVert(resCen - 0.15, resHi + 0.05); 
            v3 = v3.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v3 = v3.concat(getSquareVert(resCen + 0.05, resHi + 0.05));
            v3 = v3.concat(getSquareVert(resCen + 0.05, resHi + 0.15));
            v.push(v3);

            tl.push(resCen - 0.05);
            h.push(resHi);
            var v4 = getSquareVert(resCen - 0.05, resHi - 0.05);  
            v4 = v4.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v4 = v4.concat(getSquareVert(resCen - 0.05, resHi + 0.15));
            v4 = v4.concat(getSquareVert(resCen - 0.15, resHi + 0.15));
            v.push(v4);

            attr = {vertArr: v, heightArr: h, topLeftArr: tl};
            return attr; 

        case 6:

            if(!reqRotate) {
                //resCen = (Math.floor((Math.random() * 7 - 8)))/10 - 0.05;
            }
            else {
                resCen = origCen;
                resHi = origHi;
            }

            tl.push(resCen - 0.15);
            h.push(resHi);
            var v1 = getSquareVert(resCen + 0.05, resHi - 0.05); 
            v1 = v1.concat(getSquareVert(resCen - 0.15, resHi + 0.05));
            v1 = v1.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v1 = v1.concat(getSquareVert(resCen + 0.05, resHi + 0.05));
            v.push(v1);

            tl.push(resCen - 0.05);
            h.push(resHi);
            var v2 = getSquareVert(resCen - 0.05, resHi - 0.05);
            v2 = v2.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v2 = v2.concat(getSquareVert(resCen - 0.05, resHi + 0.15));
            v2 = v2.concat(getSquareVert(resCen + 0.05, resHi + 0.15));
            v.push(v2);

            tl.push(resCen - 0.15);
            h.push(resHi);
            var v3 = getSquareVert(resCen - 0.15, resHi + 0.05);  
            v3 = v3.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v3 = v3.concat(getSquareVert(resCen + 0.05, resHi + 0.05));
            v3 = v3.concat(getSquareVert(resCen - 0.15, resHi + 0.15));
            v.push(v3);

            tl.push(resCen - 0.05);
            h.push(resHi);
            var v4 = getSquareVert(resCen - 0.05, resHi - 0.05); 
            v4 = v4.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v4 = v4.concat(getSquareVert(resCen - 0.05, resHi + 0.15));
            v4 = v4.concat(getSquareVert(resCen - 0.15, resHi - 0.05));
            v.push(v4);

            attr = {vertArr: v, heightArr: h, topLeftArr: tl};
            return attr; 

        case 7:
            if(!reqRotate) {
                //resCen = (Math.floor((Math.random() * 7 - 9)))/10 + 0.05;
            }
            else {
                resCen = origCen;
                resHi = origHi;
            }

            tl.push(resCen - 0.15);
            h.push(resHi);
            var v1 = getSquareVert(resCen - 0.05, resHi - 0.05);  
            v1 = v1.concat(getSquareVert(resCen - 0.15, resHi + 0.05));
            v1 = v1.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v1 = v1.concat(getSquareVert(resCen + 0.05, resHi + 0.05));
            v.push(v1);

            tl.push(resCen - 0.05);
            h.push(resHi);
            var v2 = getSquareVert(resCen - 0.05, resHi - 0.05);  
            v2 = v2.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v2 = v2.concat(getSquareVert(resCen - 0.05, resHi + 0.15));
            v2 = v2.concat(getSquareVert(resCen + 0.05, resHi + 0.05));
            v.push(v2);

            tl.push(resCen - 0.15);
            h.push(resHi);
            var v3 = getSquareVert(resCen - 0.15, resHi + 0.05); 
            v3 = v3.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v3 = v3.concat(getSquareVert(resCen + 0.05, resHi + 0.05));
            v3 = v3.concat(getSquareVert(resCen - 0.05, resHi + 0.15));
            v.push(v3);

            tl.push(resCen - 0.05);
            h.push(resHi);
            var v4 = getSquareVert(resCen - 0.05, resHi - 0.05);  
            v4 = v4.concat(getSquareVert(resCen - 0.05, resHi + 0.05));
            v4 = v4.concat(getSquareVert(resCen - 0.05, resHi + 0.15));
            v4 = v4.concat(getSquareVert(resCen - 0.15, resHi + 0.05));
            v.push(v4);

            attr = {vertArr: v, heightArr: h, topLeftArr: tl};
            return attr;
    }
    
}