//白屏埋点


const blankWhite = ()=>{

    let point = 10;
    let wrapTag = ["HTML","BODY"];
    let empty = 0;
    function isWrap(ele){
        if( wrapTag.includes( ele[0].nodeName )   ){
            empty += 1;
        }
    }

    for( let i=0;i<point;i++ ) {
        let x = document.elementFromPoint( i / point * window.innerWidth,  window.innerHeight / 2 );
        let y = document.elementsFromPoint( window.innerWidth / 2, i / point * window.innerHeight)
        let k2 = document.elementsFromPoint(i/point * window.innerWidth, i / point * window.innerHeight)
        let k1 = document.elementsFromPoint( (point-i)/point * window.innerWidth, (point-i)/point*window.innerHeight)
   
        isWrap(x);
        isWrap(y);
        isWrap(k2);
        isWrap(k1);
    }

    if( empty === 36 ) {
        //如果为白屏，可以在这里做一些事情，例如上传白屏相关信息到服务器，及时知道  白屏的情况，以及几十修复
    }

}

export default blankWhite;

//白屏埋点的情况：建议在ajax/fetch之后进行，或者dom加载完毕,例如:
// if( document.readyState === "complete" ) {
//     blankWhite();
// }else {
//     window.addEventListener("load",function(){
//         blankWhite()
//     })
// }


