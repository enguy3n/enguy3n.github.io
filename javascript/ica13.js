const aliceTumbling = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
  ];
  
  const aliceTiming = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
  }
  
  const alice1 = document.querySelector("#alice1");
  const alice2 = document.querySelector("#alice2");
  const alice3 = document.querySelector("#alice3");
  
//   alice1.animate(aliceTumbling, aliceTiming);

  // callback implimentation
  function recurse(target, callback){
    const promiseVal = target.animate(aliceTumbling, aliceTiming).finished;
    console.log(promiseVal);
    callback(promiseVal);
  }

  function callBack(){
    recurse(alice1, (result1)=>{
        recurse(alice2, (result2)=>{
            recurse(alice3, (result3)=>
            {
                console.log('something happened');
            });
        });
    });
  }

  // promises implementation
  function promises(){
  alice1.animate(aliceTumbling, aliceTiming).finished
    .then(()=>alice2.animate(aliceTumbling, aliceTiming).finished)
    .then(()=>alice3.animate(aliceTumbling, aliceTiming).finished)
    .catch((error)=>console.error('error: ${error}'));
  }

//   callBack();

  promises();