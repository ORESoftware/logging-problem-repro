'use strict';


let i = 0;

(function run() {
  
  console.info(i++, 'just saying hi.');
  console.info(i++, 'shit hit the fan');
  console.info(i++, new Error('foo'));
  
  setTimeout(run, 300);
  
})();