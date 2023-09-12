function delayWithPromise(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Delay completed after ' + milliseconds + ' milliseconds');
      }, milliseconds);
    });
  }
  
  async function runDelayedCode() {
    console.log('Before delay');
    
    const result = await delayWithPromise(3000); // Replace 3000 with the desired delay time in milliseconds
    
    console.log(result, ' vfhdfv');
    
    console.log('After delay');
  }
  
  runDelayedCode();
  