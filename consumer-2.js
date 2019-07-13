const fs = require('fs');
const path = require('path');

const logfile = path.resolve(process.cwd() + '/temp.log');

const stdinStream = process.stdin.resume()
  .pipe(fs.createWriteStream(logfile));

const container = {
  capAmount: 2000  // 10K bytes
};


const handleFileExcess = () => {
  
  const fd = fs.openSync(logfile, fs.constants.O_RDWR);
  
  const {size} = fs.statSync(logfile);
  
  if(size > container.capAmount){
    
    const diff = size - container.capAmount;
    const b = Buffer.alloc(diff);
  
    console.log();
    console.log('b len:', size);
    console.log('r len:', b.length);
  
    fs.readSync(fd, b, 0, b.length, diff);
  
    fs.ftruncateSync(fd);
    fs.writeSync(fd, b, 0, b.length, 0);
    
  }

  
  fs.closeSync(fd);
  
};

setInterval(handleFileExcess, 200);