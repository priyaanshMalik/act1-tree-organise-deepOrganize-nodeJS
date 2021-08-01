let types ={    //types of files that can be organized
    media:["mp4", "mkv"],
    archives: ['zip','rar','iso','7z', 'tar', 'gz','ar', 'xz'],
    documents:['doc','docs','docx','pdf ','xlsx','xls','odt', 'xlsx','xls','odp','pptx', 'odp','txt' ],
    app: ['exe', 'pkg', 'dmg', 'deb'],
    webpages:['html', 'webp'],
    images: ['png','jpeg','jpg','gif','bmp'],
    others:[]
};

var fs = require('fs');
var path = require('path');
var count = 0 //for counting number of files organized

function createFolders(src,srcFiles){ //creating directories/folders to organize
    for (let i in types){       //creating folders/directories in 'src'
        let organizedFolderPath = path.join(src, i);
        let isPresent=false
        for(let j=0;j<srcFiles.length;j++){     //loop to check if the directory already exists
            if(srcFiles[j]==i){     
                if(isFolder(path.join(src,i))){
                    isPresent=true;             //setting variable to true to indicate directory already exists
                    break;
                }
            }
        }
        if(!isPresent){
            fs.mkdirSync(organizedFolderPath); //create directory if not already present
        }
        
    }
}
function isFolder(srcPath){     //check if given path is file or folder/directory
    let stats=fs.statSync(srcPath);
    if(stats.isDirectory()){
        return true;
    }
    return false;
}
function removeTypesFolders(src, srcFiles, root=''){    
    // returns srcFiles list after removing folders named keys of types Obj
    let srcFilesNew=srcFiles.splice(0)
    for (let i=0;i<srcFilesNew.length;i++){
        if(srcFilesNew[i]==undefined)
            break;
        for(let j in types){
            if(srcFilesNew[i]==j){
                if(path.join(root,j)==path.join(src,srcFilesNew[i])){
                    srcFilesNew.slice(j,1)
                }
            }
        }
    }
    return srcFilesNew;
    
}
function copyFiles( src, srcFiles,root){    //root is the root directory holding organized folders
    for(let i=0;i<srcFiles.length;i++){     //for iterating through source files
        let copied=false;
        if(!isFolder(path.join(src,srcFiles[i]))){
            for(let j in types){ 
                if (copied){
                    break;
                }   //for iterating through folder types to decide which folder to put the file into
                let srcFilePath = path.join(src, srcFiles[i]) //getting path of source file
                for(let k=0;k<types[j].length;k++){   //for iteraing through the extensions
                    if (path.extname(srcFilePath).slice(1) == types[j][k]){ //if extensions are same put the file in desired directory
                        let destFilePath = path.join(root, j, srcFiles[i])
                        fs.copyFileSync(srcFilePath,destFilePath)   //copy the files to destination
                        count+=1
                        console.log(`...${count} file(s) organized`)
                        fs.unlinkSync(srcFilePath)    //deleting file from source
                        copied=true;
                        break;
                    }   
                }                     
                
            }
            if(!copied){  
                let destFilePath2 = path.join(root,"others", srcFiles[i])
                let srcFilePath2 = path.join(src, srcFiles[i])
                fs.copyFileSync(srcFilePath2,destFilePath2)   //copy the files to destination
                count+=1
                console.log(`...${count} file(s) organized`)
                fs.unlinkSync(srcFilePath2)    //deleting file from source
                copied=true;
            }  
        }
        else{
            srccccc=path.join(src, srcFiles[i]) //new src is srccccc==path of the folder
            if([]!=removeTypesFolders(srccccc,fs.readdirSync(path.join(src, srcFiles[i])),src)){    
                //if no files inside folder
                copyFiles(srccccc,removeTypesFolders(srccccc,fs.readdirSync(path.join(src, srcFiles[i])),src),root)
                //recursice command
            }
            else{
                continue;
            }
            
            
        }
    }
}
function org(src){  //function for organizing the files at give path (i.e. at src)
    
    console.log("..........ORAGANIZING FILES..........")    
    let srcFiles=fs.readdirSync(path.join(src));

    createFolders(src,srcFiles)
    copyFiles(src,srcFiles,src)
    
    
}
function deepOrg(src){
    console.log("..........DEEP-ORAGANIZING FILES..........")    
    let srcFiles=fs.readdirSync(path.join(src));
    createFolders(src,srcFiles);

    copyFiles(src,srcFiles,src)
}
function deepOrganize(src){
    console.log("deep organize command to be executed with path : "+src);
    deepOrg(src)
}
function organizeFn(src){
    console.log("organize command to be executed with path : "+src);
    org(src)
}

module.exports ={
    organizeFxn:organizeFn,
    deepOrganizeFxn:deepOrganize
    // copyFiles:copyFiles,
    // createFolders:createFolders,
}

