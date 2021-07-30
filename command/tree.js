let fs=require('fs');
let path=require('path');
//├───
//└───
function pathTree(srcPath, depth ){ //recursive function to print tree
    let toPrintString='';   //printing parent directory
    if(depth!=1)
        for( let j=1; j<depth;j++){
            toPrintString+='.\t'
    }
    toPrintString+='└───'+path.basename(srcPath)
    console.log(toPrintString);
    let content = fs.readdirSync(srcPath);
    for(let i=0; i<content.length; i++){
        let is_file= fs.statSync(path.join(srcPath, content[i]))
        if (is_file.isFile()){
            toPrintString='';

            for( let j=0; j<depth;j++){
                toPrintString+='.\t'
            }
            toPrintString+='├───'+content[i]
            console.log(toPrintString)
        }
        else{
            pathTree(path.join(srcPath, content[i]), depth+1, true)
        }
    }
}
function treeFn(srcPath){
    if (fs.existsSync(srcPath)){
        if(srcPath==undefined){
            srcPath=process.cwd();
        }
        pathTree(srcPath, 1)
    }
    else{
        console.log("\tERROR!!!\nNo such directory exists\nPlease check the path you entered.");
    }
       
}

module.exports ={
    treeFxn:treeFn
}