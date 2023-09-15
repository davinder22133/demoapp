function x() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(10);
      }, 2000);
    });
  }
  
  x().then((a) => {
    console.log('a is', a); // This will log 'a is 10' after a 2-second delay
  });