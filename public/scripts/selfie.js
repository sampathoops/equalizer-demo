var videoElement = document.querySelector('#camera-stream');
var videoSelect = document.querySelector('select#videoSource');

navigator.mediaDevices.enumerateDevices()
  .then(gotDevices).then(getStream).catch(handleError);

videoSelect.onchange = getStream;

function gotDevices(deviceInfos) {
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    var option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'camera ' +
        (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Found ome other kind of source/device: ', deviceInfo);
    }
  }
}

function getStream() {
  if (window.stream) {
    streamTrack = stream.getTracks()[0];
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }

  var constraints = {
    video: {
      optional: [{
        sourceId: videoSelect.value
      }]
    }
  };

  navigator.mediaDevices.getUserMedia(constraints).
    then(gotStream).catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  streamTrack = stream.getTracks()[0];
  videoElement.srcObject = stream;
}

function handleError(error) {
  console.log('Error: ', error);
}


function demo_app() {
    canvasWidth  = canvas.width;
    canvasHeight = canvas.height;
    ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgb(0,255,0)";
    ctx.strokeStyle = "rgb(0,255,0)";

    var scale = Math.min(max_work_size/canvasWidth, max_work_size/canvasHeight);
    var w = (canvasWidth*scale)|0;
    var h = (canvasHeight*scale)|0;

    img_u8 = new jsfeat.matrix_t(w, h, jsfeat.U8_t | jsfeat.C1_t);
    edg = new jsfeat.matrix_t(w, h, jsfeat.U8_t | jsfeat.C1_t);
    work_canvas = document.createElement('canvas');
    work_canvas.width = w;
    work_canvas.height = h;
    work_ctx = work_canvas.getContext('2d');
    ii_sum = new Int32Array((w+1)*(h+1));
    ii_sqsum = new Int32Array((w+1)*(h+1));
    ii_tilted = new Int32Array((w+1)*(h+1));
    ii_canny = new Int32Array((w+1)*(h+1));

    options = new demo_opt();

}

window.onload=function(){
// References to all the element we will need.
var video = document.querySelector('#camera-stream'),
    image = document.querySelector('#snap'),
    start_camera = document.querySelector('#start-camera'),
    controls = document.querySelector('.controls'),
    take_photo_btn = document.querySelector('#capture-photo'),
    delete_photo_btn = document.querySelector('#delete-photo'),
    download_photo_btn = document.querySelector('#download-photo'),
    error_message = document.querySelector('#error-message');


// The getUserMedia interface is used for handling camera input.
// Some browsers need a prefix so here we're covering all the options
navigator.getMedia = ( navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia);


/*if(!navigator.getMedia){
  displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
}
else{

  // Request the camera.
  navigator.getMedia(
    {
      video: { frameRate: { ideal: 10, max: 20 } }
    },
    // Success Callback
    function(stream){

      // Create an object URL for the video stream and
      // set it as src of our HTLM video element.
      video.src = window.URL.createObjectURL(stream);
      streamTrack = stream.getTracks()[0];
      // Play the video element to start the stream.
      video.play();
      video.onplay = function() {
        showVideo();
      };

    },
    // Error Callback
    function(err){
      displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
    }
  );

}*/


  // Start video playback manually.
  video.play();
  showVideo();

var forceRedraw = function(element){

    if (!element) { return; }

    var n = document.createTextNode(' ');
    var disp = element.style.display;
    element.appendChild(n);
    element.style.display = 'none';

    setTimeout(function(){
        if(document.body.scrollTop == 0)
          document.body.scrollTop = 1;
        else
          document.body.scrollTop = 0;
    },20);
}

scr = setInterval(function(){ forceRedraw(document.getElementById('start-camera')); }, 600); 

take_photo_btn.addEventListener("click", function(e){
  e.preventDefault();
  clearInterval(scr);
  var snap = takeSnapshot();

  // Show image. 
  image.setAttribute('src', snap);
  image.classList.add("visible");

  // Enable delete and save buttons
  delete_photo_btn.classList.remove("disabled");
  download_photo_btn.classList.remove("disabled");

  // Set the href attribute of the download button to the snap url.
  download_photo_btn.href = snap;
  $('#selfieMsg').html('Scanning...');
  if(screen.width < 1000) {$('.mask').addClass('scanning');} else {$('body').css('opacity','0.4');}
  setTimeout("demo_app();",100);
  setTimeout("tick(faceClassifier, 'face');",100);
  setTimeout("tick(upperBodyClassifier, 'upperbody');",100);

  // Pause video playback of stream.
  video.pause();
  
    setTimeout(function () {
      if(screen.width < 1000) {
        $('.mask').removeClass('scanning');
      } else {
        $('body').css('opacity','1');
      }
      var fswRatio = faceW/(shoulderW*2);
      // alert('F/S:'+fswRatio);
      //$('.app').css('opacity','0');
      $('#take-photo').html('');
      $('.capture').css('visibility','hidden');
      $('#confirmation').show();
      $(".trigger").toggleClass("drawn");

      
        localStorage.setItem('pic',canvas.toDataURL());
        localStorage.setItem('faceX',faceX);
        localStorage.setItem('faceY',faceY);
        localStorage.setItem('faceW',faceW);
        localStorage.setItem('faceH',faceH);
        // alert("faceX: "+faceX+", faceY: "+faceY+", faceW: "+faceW+", faceH: "+faceH+", shoulderX: "+localStorage.getItem('shoulderX')+", shoulderY: "+localStorage.getItem('shoulderY')+", shoulderW: "+localStorage.getItem('shoulderW')+", shoulderH: "+localStorage.getItem('shoulderH'));
        

        //find closest in shoulderW
          var closestValS = closest(sarrShoulderW, shoulderW);
          var closestValM = closest(marrShoulderW, shoulderW);
          var closestValXL = closest(xlarrShoulderW, shoulderW);
          var closestValXXL = closest(xxlarrShoulderW, shoulderW);
          var newArr = new Array();
          newArr.push(closestValS);newArr.push(closestValM);newArr.push(closestValXL);newArr.push(closestValXXL);
          var closestValueAmongSizes = closest(newArr, shoulderW);
          
          if(closestValueAmongSizes == closestValS)
            voteS++;
          if(closestValueAmongSizes == closestValM)
            voteM++;
          if(closestValueAmongSizes == closestValXL)
            voteXL++;
          if(closestValueAmongSizes == closestValXXL)
            voteXXL++;

          //find closest in shoulderX
          var closestValS = closest(sarrShoulderX, shoulderX);
          var closestValM = closest(marrShoulderX, shoulderX);
          var closestValXL = closest(xlarrShoulderX, shoulderX);
          var closestValXXL = closest(xxlarrShoulderX, shoulderX);
          newArr = new Array();
          newArr.push(closestValS);newArr.push(closestValM);newArr.push(closestValXL);newArr.push(closestValXXL);
          closestValueAmongSizes = closest(newArr, shoulderX);
          
          if(closestValueAmongSizes == closestValS)
            voteS++;
          if(closestValueAmongSizes == closestValM)
            voteM++;
          if(closestValueAmongSizes == closestValXL)
            voteXL++;
          if(closestValueAmongSizes == closestValXXL)
            voteXXL++;

          //find closest in faceW
          var closestValS = closest(sarrFaceW, faceW);
          var closestValM = closest(marrFaceW, faceW);
          var closestValXL = closest(xlarrFaceW, faceW);
          var closestValXXL = closest(xxlarrFaceW, faceW);
          newArr = new Array();
          newArr.push(closestValS);newArr.push(closestValM);newArr.push(closestValXL);newArr.push(closestValXXL);
          closestValueAmongSizes = closest(newArr, faceW);
          
          if(closestValueAmongSizes == closestValS)
            voteS++;
          if(closestValueAmongSizes == closestValM)
            voteM++;
          if(closestValueAmongSizes == closestValXL)
            voteXL++;
          if(closestValueAmongSizes == closestValXXL)
            voteXXL++;

          //find closest in faceX
          var closestValS = closest(sarrFaceX, faceX);
          var closestValM = closest(marrFaceX, faceX);
          var closestValXL = closest(xlarrFaceX, faceX);
          var closestValXXL = closest(xxlarrFaceX, faceX);
          newArr = new Array();
          newArr.push(closestValS);newArr.push(closestValM);newArr.push(closestValXL);newArr.push(closestValXXL);
          closestValueAmongSizes = closest(newArr, faceX);
          
          if(closestValueAmongSizes == closestValS)
            voteS++;
          if(closestValueAmongSizes == closestValM)
            voteM++;
          if(closestValueAmongSizes == closestValXL)
            voteXL++;
          if(closestValueAmongSizes == closestValXXL)
            voteXXL++;

          var largestVotes = Math.max(voteS,voteM,voteXL,voteXXL);
          if(largestVotes == voteXXL) {
            size = 'xxl';
          } else if(largestVotes == voteXL) {
            size = 'xl';
          } else if(largestVotes == voteM) {
            size = 'l';
          } else if(largestVotes == voteS) {
            size = 'm';
          } else {
            size = 'xl';
          }

          //alert('largest votes for '+size+' total: '+largestVotes);
          
          if((voteM == 1 || voteM ==2) && voteS <=1 && voteXL <= 1)
            size = 'l';
          else if(voteS >= 2 && (voteM == 0 || voteM == 1 || voteM == 2))
            size = 'm';
          else if(voteS <= 1 && voteM <= 1 && voteXXL >= 3)
            size = 'xxl';
          else 
            size = 'xl';
          // alert('votes for m:'+voteS+', l:'+voteM+', xl:'+voteXL+', xxl:'+voteXXL+' Computed: '+size);
          localStorage.setItem('userSize', size);

        stepEMeasure();
    //temp: 100, actual: 4000
    }, 2200);

});

function stepEMeasure() {
  $("#step_selfie").removeClass('completed');
  $("#step_emeasure").addClass('completed');
  //location.href='/update';
  window.onScanComplete();
}

function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''), canvas);

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'), canvas);
    };

    image.src = url;
}

function showVideo(){
  // Display the video stream and the controls.
  $('#camera-stream').css('visibility', 'visible');

  hideUI();
  video.classList.add("visible");
  // controls.classList.add("visible");
}

function takeSnapshot(){
  // Here we're using a trick that involves a hidden canvas element.  

  var hidden_canvas = document.querySelector('canvas'),
      context = hidden_canvas.getContext('2d');

  var width = video.videoWidth,
      height = video.videoHeight;

  if (width && height) {

    // Setup a canvas with the same dimensions as the video.
    hidden_canvas.width = width;
    hidden_canvas.height = height;

    // Make a copy of the current frame in the video on the canvas.

    if(location.href.indexOf('?s=') !== -1) {
      getDataUri('samples/'+location.href.substring(location.href.indexOf('?s=')+3), function(dataUri, i) {
        // Do whatever you'd like with the Data URI!
        console.log('selfie:', dataUri);
        context.drawImage(i, 0, 0, width, height);
        localStorage.setItem('selfie', dataUri);
      });
      
    } else {
      context.drawImage(video, 0, 0, width, height);
    }

    // Turn the canvas image into a dataURL that can be used as a src for our photo.
    return hidden_canvas.toDataURL('image/png');
  }
}

function displayErrorMessage(error_msg, error){
  error = error || "";
  if(error){
    console.log(error);
  }

  error_message.innerText = error_msg;

  hideUI();
  error_message.classList.add("visible");
}

function hideUI(){
  // Helper function for clearing the app UI.

  //controls.classList.remove("visible");
  start_camera.classList.remove("visible");
  video.classList.remove("visible");
  snap.classList.remove("visible");
  error_message.classList.remove("visible");
}

$('#btn_got_it').on('click', function(e) {
  $('.box_instructions').hide();
});
}

function beeLeft(elemId) {
    $("#"+elemId).animate({left: "-=100"}, 1500, "swing", beeRight);
}

function showProducts() {
  console.log("showProducts() func call");
  $.get("./tops.json", function(data, status){
    console.log("showProducts() - Got data...");
    // console.log("Data: ", data[0]['name']);
    // load product images
    //temp: uncomment below and comment line next to it
    //setTimeout("$('.products').show();$('.contentShop').css('margin-top','20px');", 4000);
    $('.products').show();$('.contentShop').css('margin-top','20px');
      for(var i=0;i<data.length;i++) {
        var productBg = document.createElement('div');
        productBg.className = 'product-bg';
        productBg.id = i;

        var productCanvas = document.createElement('canvas');
        productCanvas.id = 'canvas'+i;
        productCanvas.height = '460';
        productCanvas.width = $( window ).width();
        productCanvas.style.position = 'relative';
        productCanvas.style.top = '-23px';
        productBg.appendChild(productCanvas);

        var imageObj = new Image();
        imageObj.id = 'img'+i;
        imageObj.src = localStorage.getItem('pic');
        imageObj.style.display = 'none';
        document.body.appendChild(imageObj);
        document.getElementById('img'+i).onload = function(img) {
          var ctx=document.getElementById('canvas'+img.currentTarget.id.substr(3)).getContext("2d");
          var faceX = localStorage.getItem('faceX');
          var faceY = localStorage.getItem('faceY');
          var faceW = localStorage.getItem('faceW');
          var faceH = localStorage.getItem('faceH');

          var newLeft = $(window).width()/2 - ((98)/2);
          var newTop = 54;
          ctx.drawImage(img.currentTarget, parseInt(faceX,10)-20, parseInt(faceY,10)-90, parseInt(faceW,10)+20, parseInt(faceH,10)+150, newLeft, newTop, 93, 124);
        };


        var transparentImg = document.createElement('img');
        transparentImg.className = 'actual-prod';
        transparentImg.src = 'img/tbg.png';
        transparentImg.style.top = '28px';
        productBg.appendChild(transparentImg);
        

        var productImg = document.createElement('img');
        productImg.className = 'actual-prod';
        productImg.src = 'img/products/'+getGender()+'/'+getCategory()+'/'+i+'/'+getSize()+'.png';
        /*$('#size1').attr('src','img/products/'+getGender()+'/'+getCategory()+'/'+i+'/s.png');
        $('#size2').attr('src','img/products/'+getGender()+'/'+getCategory()+'/'+i+'/s.png');
        $('#size3').attr('src','img/products/'+getGender()+'/'+getCategory()+'/'+i+'/s.png');
        $('#size4').attr('src','img/products/'+getGender()+'/'+getCategory()+'/'+i+'/s.png');*/
        console.log('productImg.src: ', productImg.src);
        productBg.appendChild(productImg);

        document.getElementById('product').appendChild(productBg);

      }

      var open = false;
      $('.product-bg').click(function() {
          $('#tabs').hide();
          setTimeout("$('#buy-now').show();",300);
          for(var i=0;i<4;i++) {
            var suffix = i+1;
            $('#size'+(i+1)).html('');
          }
          var prodId = $(this).attr('id');
              for(var i=0;i<4;i++) {
                var productBg = document.createElement('div');
                productBg.className = 'product-bg-size';

                var productCanvas = document.createElement('canvas');
                productCanvas.id = 'sizecanvas'+i;
                productCanvas.height = '460';
                productCanvas.width = $( window ).width();
                productCanvas.style.position = 'relative';
                productCanvas.style.top = '-23px';
                productBg.appendChild(productCanvas);

                var imageObj = new Image();
                imageObj.id = 'sizeimg'+i;
                imageObj.src = localStorage.getItem('pic');
                imageObj.style.display = 'none';
                if(!$.trim( $('#sizeimg'+i).attr('id')).length) {
                  document.body.appendChild(imageObj);
                }

                document.getElementById('size'+(i+1)).appendChild(productBg);
                //document.getElementById('sizeimg'+i).onload = function(img) {
                  
                //};


                var transparentImg = document.createElement('img');
                transparentImg.className = 'actual-prod';
                transparentImg.src = 'img/tbg.png';
                transparentImg.style.top = '28px';
                productBg.appendChild(transparentImg);
                

                var productImg = document.createElement('img');
                productImg.className = 'actual-prod';
                if(i==0)
                  sizeVal = 's';
                else if(i==1)
                  sizeVal = 'm';
                else if(i==2)
                  sizeVal = 'xl';
                else if(i==3)
                  sizeVal = 'xxl';

                productImg.src = 'img/products/'+getGender()+'/'+getCategory()+'/'+prodId+'/'+sizeVal+'.png';
                console.log('productImg.src: ', productImg.src);
                productBg.appendChild(productImg);
                var idSuffix = i+1;
                document.getElementById('size'+idSuffix).appendChild(productBg);

              }

              console.log('sizecanvas'+prodId);
                  for(var j=0;j<4;j++) {
                  var ctx=document.getElementById('sizecanvas'+j).getContext("2d");
                  var faceX = localStorage.getItem('faceX');
                  var faceY = localStorage.getItem('faceY');
                  var faceW = localStorage.getItem('faceW');
                  var faceH = localStorage.getItem('faceH');

                  var newLeft = $(window).width()/2 - ((98)/2);
                  var newTop = 54;
                  ctx.drawImage(document.getElementById('sizeimg0'), parseInt(faceX,10)-20, parseInt(faceY,10)-90, parseInt(faceW,10)+20, parseInt(faceH,10)+150, newLeft, newTop, 93, 124);
                  }
          setTimeout("$('.products').css('-webkit-filter','blur(5px)');",250);
          $('#footerSlideContent').animate({ height: '100vh' },200);
          $(this).css('backgroundPosition', 'bottom left');
          open = true;
          $('.close').show();

          var fitCircleLeft = document.querySelector('.actual-prod').getBoundingClientRect().left;
          var fitCircleRight = document.querySelector('.actual-prod').getBoundingClientRect().right;
          $('.fit-shoulder-left').css('left',fitCircleLeft);
          $('.fit-shoulder-left').show();
          $('.fit-shoulder-left').addClass('bad');
          $('.fit-shoulder-right').css('left',fitCircleRight);
          $('.fit-shoulder-right').show();
          $('.fit-shoulder-right').addClass('bad');
          $('.fit-waist-left').css('left',fitCircleLeft);
          $('.fit-waist-left').addClass('bad');
          $('.fit-waist-left').show();
          $('.fit-waist-right').css('left',fitCircleRight);
          $('.fit-waist-right').addClass('bad');
          $('.fit-waist-right').show();
          //ToDo: add this based on condition
          { 
            $('.size-title').html('Trying size M');
            $('.fit-shoulder-left').addClass('bad'); 
            $('.fit-waist-wight').addClass('bad');
            $('#buy-now').addClass('badfit').addClass('bubbledLeft').removeClass('btn');
            $('#buy-now').html('Tight around shoulders and waist.');
            removeFitBadClass(); 
            computeFitCircles('M');
            showSizeVal(0);
          }
      });   
      $('.close').click(function() {
          $('#tabs').show();
          $('#buy-now').hide();
          $('.fit-shoulder-left').hide();
          $('.fit-shoulder-right').hide();
          $('.fit-waist-left').hide();
          $('.fit-waist-right').hide();
          setTimeout("$('.products').css('-webkit-filter','blur(0px)');",250);
          $('#footerSlideContent').animate({ height: '0px' },200);
          $(this).css('backgroundPosition', 'top left');
          open = false;
          $('.close').hide();
      });
      console.log("showProducts() - Paint done...");
  });

  $(".variable").slick({
        dots: true,
        infinite: true,
        variableWidth: true
      });
}