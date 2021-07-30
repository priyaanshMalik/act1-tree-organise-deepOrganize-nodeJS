let types ={    //types of files that can be organized
    media:["mp4", "mkv"],
    archives: ['zip','rar','iso','7z', 'tar', 'gz','ar', 'xz'],
    documents:['doc','docs','docx','pdf ','xlsx','xls','odt', 'xlsx','xls','odp','pptx', 'odp','txt' ],
    app: ['exe', 'pkg', 'dmg', 'deb'],
    webpages:['html', 'webp'],
    images: ['png','jpeg','jpg','gif','bmp'],
    'Other files and folders':[]
};

var fs = require('fs');
var path = require('path');

function createFolders(src,srcFiles){ //creating directories/folders to organize
    for (let i in types){       //creating folders/directories in 'src'
        let organizedFolderPath = path.join(src, i);
        let isPresent=false
        for(let j=0;j<srcFiles.length;j++){     //loop to check if the directory already exists
            if(srcFiles[j]==i){     
                let stats=fs.statSync(path.join(src,i))
                if(stats.isDirectory()){
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

function org(src){  //function for organizing the files at give path (i.e. at src)
    
    let count = 0 //for counting number of files organized
    console.log("..........ORAGANIZING FILES..........")    
    let srcFiles=fs.readdirSync(path.join(src));

    createFolders(src,srcFiles)
    
    for(let i=0;i<srcFiles.length;i++){     //for iterating through source files
        let copied=false;
        for(let j in types){    //for iterating through folder types to decide which folder to put the file into
            let srcFilePath = path.join(src, srcFiles[i]) //getting path of source file
            for(let k=0;k<types[j].length;k++){   //for iteraing through the extensions
                if (path.extname(srcFilePath).slice(1) == types[j][k]){ //if extensions are same put hte file in desired directory
                    let destFilePath = path.join(src, j, srcFiles[i])
                    fs.copyFileSync(srcFilePath,destFilePath)   //copy the files to destination
                    count+=1
                    console.log(`...${count} file(s) organized`)
                    fs.unlinkSync(srcFilePath)    //deleting file from source
                    copied=true;
                    break;
                }
            }
        
        }
        // if(!copied){  
        //     let destFilePath = path.join(src,"Other files and folders", srcFiles[i])
        //     let srcFilePath = path.join(src, srcFiles[i])
        //     fs.copyFileSync(srcFilePath,destFilePath)   //copy the files to destination
        //     count+=1
        //     console.log(`...${count} file(s) organized`)
        //     fs.unlinkSync(srcFilePath)    //deleting file from source
        //     copied=true;
        // }
    }
    
}

function organizeFn(src){
    console.log("organize command to be executed with path : "+src);
    org(src)
}

module.exports ={
    organizeFxn:organizeFn
}

