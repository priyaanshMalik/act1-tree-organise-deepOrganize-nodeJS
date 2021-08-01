This is a program written on node.js environment

# It performs the following functions:
## 1. Organise files in a folder/directory
## 2. Show tree structure for a give directory/folder
### PS: it contains help folder to enable user to be informed on how to pass arguments
just type `node main.js help `


## Organise enables one to organise files in a folder/directory into various categories:
1. apps
2. archive
3. documents
4. media
5. webpages
6. images, etc

**The organize command is of two types :deepOrganize or organize**
>The organize organizes the files in the specified directory
>The deepOrganize organizes all the files, *even those lying within folders within folders*, of a given directory. This is done *recursively*


## The tree command enables the user to view the tree structure of the files inside the directory 
If path isnt't defined it returns the tree structure of the current working directory

