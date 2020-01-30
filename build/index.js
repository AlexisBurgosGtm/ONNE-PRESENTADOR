var socket = io();
var $initScope = $('#js-lightgallery');

function InicializarServiceWorkerNotif(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
   navigator.serviceWorker.register('./sw.js')
    .then(registration => console.log('Service Worker registered'))
    .catch(err => 'SW registration failed'));
  };


};

InicializarServiceWorkerNotif();

// Gestión de la Gallery
function getData(idContainer){
  let container = document.getElementById(idContainer);

  let str = '';
  data.map((rows)=>{
    str = str + `
                <a class="" href=${rows.IMG} data-sub-html="${rows.TITULO}">
                  <img class="img-responsive" src=${rows.MINIATURA} alt="image">
                </a>
                `
  });

  container.innerHTML = str;
};

function initGallery(){
                
                if ($initScope.length)
                {
                    $initScope.justifiedGallery(
                    {
                        border: -1,
                        rowHeight: 150,
                        margins: 5,
                        waitThumbnailsLoad: true,
                        randomize: false,
                    }).on('jg.complete', function()
                    {
                        $initScope.lightGallery(
                        {
                            thumbnail: true,
                            animateThumb: true,
                            showThumbByDefault: true,
                        });
                    });
                };
                $initScope.on('onAfterOpen.lg', function(event)
                {
                    $('body').addClass("overflow-hidden");
                });
                $initScope.on('onCloseAfter.lg', function(event)
                {
                    $('body').removeClass("overflow-hidden");
                });
                
                //$initScope.Autoplay(false);
};

// Gestión del Control Remoto
function initControl(idContainer){
  

  let container = document.getElementById(idContainer);
  let view = `<br>
              <div class="row" align="center">
                <div class="col-6">
                  <button class="btn btn-info btn-lg" id="btnPrev">
                    <i class="fal fa-arrow-left"></i>ANTERIOR
                  </button>
                </div>
                <div class="col-6">
                  <button class="btn btn-info btn-lg" id="btnNext">
                    SIGUIENTE<i class="fal fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              <br><br><br>

              <div class="row" align="center">
                <div class="col-6">
                  <button class="btn btn-success btn-lg" id="btnzOut">
                    ZOOM(-)
                  </button>
                  
                </div>
                <div class="col-6">
                  <button class="btn btn-success btn-lg" id="btnzIn">
                    (+)ZOOM
                  </button>
                </div>
              </div>
              
              <br><br><br>

              <div class="row" align="center">
                <div class="col-12">
                  <button class="btn btn-danger btn-lg" id="btnHablarTitulo">
                    LEER TITULO DE DIAPOSITIVA
                  </button>
                </div>
                
              </div>
              `
      container.innerHTML = view;
};

function addListenersContol(){

  let btnPrev = document.getElementById('btnPrev');
  btnPrev.addEventListener('click',()=>{
    socket.emit('prev','msn','user');
  });
  let btnNext = document.getElementById('btnNext');
  btnNext.addEventListener('click',()=>{
    socket.emit('next','msn','user');
  });

  let btnzIn = document.getElementById('btnzIn');
  btnzIn.addEventListener('click',()=>{
    socket.emit('zin','msn','user');
  });
  let btnzOut = document.getElementById('btnzOut');
  btnzOut.addEventListener('click',()=>{
    socket.emit('zout','msn','user');
  });

  let btnHablarTitulo = document.getElementById('btnHablarTitulo');
  btnHablarTitulo.addEventListener('click',()=>{
    socket.emit('hablartitulo','msn','user');
  });
  

};

// CONTROLES
function setState(view){
  switch (view) {
    case 'GALLERY':
        getData('js-lightgallery');
        initGallery();

      break;

    case 'CONTROLS':
      initControl('rootControls');
      addListenersContol();

      break;
  
    default:
      break;
  }
};


setState('GALLERY');
setState('CONTROLS');


