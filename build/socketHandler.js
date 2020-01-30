socket.on('prev', function(msg,form){
  
    try {
      document.getElementById('btnPrevSlide').click();
    } catch (error) {
      console.log('Previo: ' +  error);
    }
    
});

socket.on('next', function(msg,form){
  
  try {
    document.getElementById('btnNextSlide').click();
  } catch (error) {
    console.log('Next: ' + error);
  }
  
});


socket.on('zin', function(msg,form){
  console.log('zoom in')
  try {
    //document.getElementById('lg-zoom-in').click();
    $('#lg-zoom-in').click();
  } catch (error) {
    console.log('z in: ' +  error);
  }
  
});

socket.on('zout', function(msg,form){
  console.log('zoom out')
  try {
    $('#lg-zoom-out').click();
    //document.getElementById('lg-zoom-out').click();
  } catch (error) {
    console.log('z out: ' +  error);
  }
  
});

socket.on('hablartitulo', function(msg,form){
  console.log('hablar titulo')
  try {    
    let str = document.getElementById('prestitulo').innerText;
    funciones.hablar(str);
  } catch (error) {
    console.log('z out: ' +  error);
  }
  
});

