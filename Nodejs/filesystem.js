//fs.readfile => ('pathname', function(err,data))
//fs.writefile => ('pathname','data',func(err));
//fs.appendFile => ('pathname','data',func(err));
//fs.rename=> ('path1existingname','path2newfilename',fucnc(err));
//fs.unlink=>('pathname',func(err)) => to delete file
//fs.open=>(path,flags,[,mode],callback) eg: fs.open('pathanme',w+,fuunc(err,fd)) =>fd is file descriptor
//fs.stat=>(pathname,func(err,stats))

var http = require('http')
const fs = require('fs');
http.createServer((req, res) => {
    // fs.readFile('input.txt', 'utf-8', (err, data) => {
    // fs.writeFile('input.txt', 'New technics', 'utf-8', (err) => {
    // fs.appendFile('input.txt', 'new data', 'utf-8', (data) => {
    // fs.rename('input.txt', 'sampledata.txt', (err) => {
    // fs.unlink('input.txt', 'utf-8', (data) => {
    // fs.open('newfile.txt', 'w+', (err, fd) => {
    fs.stat('newfile.txt', 'utf-8', (err, stats) => {

        // console.log(data);
        // res.write("sucess");
        // res.write("Appended sucessfully");
        // res.write("File changed successfully");
        console.log(stats);
        // res.write("new file is created");
        res.write("Is it file: " + stats.isFile());
        res.write("Is it Directory: " + stats.isDirectory());
        res.end();
    })

}).listen(4500);
