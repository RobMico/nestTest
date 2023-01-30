function binaryNode(op, a, b){
    this.a = a;
    this.b = b;
    this.op=op;
    this.doOperation = function (){
        
    }
}




let unaryNode={
    param:null,
    doOperation:()=>{
        return this.param;
    }
}
let tree={
}

var calculate = function(s) {
    s = s.replaceAll(' ', '');
    console.log(s);
};


console.log(calculate("1+1"));
console.log(calculate(" 2-1 + 2 "));
console.log(calculate("(1+(4+5+2)-3)+(6+8)"));

//(1+(4+5+2)-3)+(6+8)
//            \/             +            \/
//      \/     +        \/            \/   +   \/
//      1         \/    -   \/         6        8
//             \/ + \/      3
//              4 \/ + \/
//                 5    2