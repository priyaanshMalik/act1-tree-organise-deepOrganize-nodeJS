//|__________________________________________________|
//|main input:                                       |       
//|  1) input -> node main.js tree "path"            |                                
//|     Prints -> tree command executed with "path"  |                                         
//|                                                  |   
//|  2) input->node main.js organize "path"          |                                  
//|     Print->organize path executed with path      |                                      
//|                                                  |
//|  3) input->node main.js help                     |
//|     print-> list of all the commands             |                                   
//|          1.node main.js tree "path"              |                                 
//|          2.node main.js organize "path"          |                                     
//|          3.node main.js help                     |                          
//|__________________________________________________|   
//input may be node.js tree/organize/path "path"

let helpObj = require("./command/help.js")
let organizeObj = require("./command/organize.js")
let treeObj = require("./command/tree.js")                                       

let inputArr = process.argv.slice(2);
let cmd = inputArr[0]
switch (cmd){
    case "tree":
        treeObj.treeFxn(inputArr[1])
        break;
    case "organize":
        organizeObj.organizeFxn(inputArr[1])
        break;
    case "help":
        helpObj.helpFxn()
        break;
    default: 
        console.log('ERR!!!\nIllegal command.\n Kindly enter correct command.')
        break;
}

