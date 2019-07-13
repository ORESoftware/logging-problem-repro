
const fs = require('fs');
const path = require('path');

const logfile = path.resolve(process.cwd() + '/temp.log');

const stdinStream = process.stdin.resume()
  .pipe(fs.createWriteStream(logfile));

const container = {
  capAmount: 2000  // 10K bytes
};


const handleFileExcess = () => {
  
  const r = fs.readFileSync(logfile, {encoding:'utf8'});
  
  if(r.length > container.capAmount){
    const b = r.slice(r.length - container.capAmount); // take the last 10K bytes
    console.log();
    console.log('b len:', b.length);
    console.log('r len:', r.length);
    fs.writeFileSync(logfile, b, {encoding:'utf8'});
  }
  
};

setInterval(handleFileExcess, 200);