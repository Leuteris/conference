var mediaOptions = {
    audio: true,
    video: true
};

var randomUserName = Math.floor((Math.random() * 1000) + 1);

var webrtc = new SimpleWebRTC({
	
	nick: 'user'+randomUserName,
  // the id/element dom element that will hold "our" video
  localVideoEl: 'localVideo',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: '',
  
   media: mediaOptions,
  // immediately ask for camera access
  autoRequestMedia: true,
  url: 'https://192.168.1.8:8888'
//  url: 'http://192.168.1.6:8888'
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
  var roomName = $('#roomName').text();
  webrtc.joinRoom(roomName);
});



// a peer video has been added
webrtc.on('videoAdded', function (video, peer) {

    console.log('video added', peer);
	 console.log('videoAdded', peer.nick);

	 //alert(peer.id);
	
	  var container = document.getElementById(peer.id);
	 // container(videoc.html());
	 if(!container){
		 
	//alert(webrtc.getDomId(peer));
         container = document.createElement('div');
        container.className = 'videoContainer';
        container.id = peer.id;
        container.appendChild(video);
  
       
 // add muted and paused elements
    var muted = document.createElement('div');
    muted.className = 'muted';
    container.appendChild(muted);

    var muted = document.createElement('div');
    muted.className = 'paused';
    container.appendChild(muted);
		 // show the ice connection state
    if (peer && peer.pc) {
        var connstate = document.createElement('span');
        connstate.className = 'connectionstate';
        container.appendChild(connstate);
        peer.pc.on('iceConnectionStateChange', function (event) {
            switch (peer.pc.iceConnectionState) {
            case 'checking':
                connstate.innerText = 'Connecting to peer...';
                break;
            case 'connected':
            case 'completed': // on caller side
                connstate.innerText =  peer.nick;
                break;
            case 'disconnected':
                connstate.innerText = 'Disconnected.';
                break;
            case 'failed':
                break;
            case 'closed':
                connstate.innerText = 'Connection closed.';
                break;
            }
        });
 
        video.oncontextmenu = function () { return false; };
     
        $('.owl-carousel')
        .owlCarousel('add', container)
        .owlCarousel('update')
        //alert(peer);
      //  $('.addremote').append(con);
    }
    
    
	 }else{
		 //alert(peer.type);
		 var con = $('#'+peer.id);
		 if(peer.type == 'screen'){
			
			 con.find("video").addClass('faceVideo');
			 con.find("video").hide();
			 
			 con.append(video);
			 video.className = 'screenVideo mainVideo';
		 }else if(peer.type == 'video'){

			 con.find("video").addClass('screenVideo');
			 con.find("video").show();
			 
			 con.append(video);
			 video.className = 'faceVideo';
			 video.style.display = 'none'; 
		 }
	 }
		 
		 
	 
});

// a peer video was removed
webrtc.on('videoRemoved', function (video, peer) {
    console.log('video removed ', peer);
    
    if(peer === undefined){
         var el =  $('.localVideoContainer');
        // alert(el.html());
    	 el.find(".screenVideo").remove();
    	 el.find(".faceVideo").show();
    	 $('#screenShareButton').show();
    	return;
    }
    
    var el = $('#'+peer.id);
     
    var con = el.parent().closest(".owl-item"); 
     n = con.index();
     var owlCarousel = $('.owl-carousel').data('owl.carousel');
     if(n < 0){
    	 
    	 if(el.parent().hasClass('mainVideoContainer')){
    		 
    		 if(peer.type == 'screen'){
    			 el.find(".screenVideo").remove();
    			 el.find(".faceVideo").show();
        		// con.child().html(con.find(".faceVideo"));
        		 //con.append(video);
        	 }else if(peer.type == 'video'){
        		
        		 $('.owl-item')[0].click();	     	    	
            	 owlCarousel.remove(0);
        	 }
    		 
    		
    	 }
    	 
     }else{
    	  
    	 if(peer.type == 'screen'){
    		 con.find(".screenVideo").remove();
    		 con.find(".faceVideo").show();
    		// con.child().html(con.find(".faceVideo"));
    		 //con.append(video);
    	 }else if(peer.type == 'video'){
      	   owlCarousel.remove(n);
    	 }
     }
		 

});



// listen for mute and unmute events
webrtc.on('mute', function (data) { // show muted symbol
	//alert('.id');
    webrtc.getPeers(data.id).forEach(function (peer) {
        if (data.name == 'audio') {
        	
        	$('#' + peer.id + ' .muted').html('muted');
        	//alert($('#' + peer.id + ' .muted').parent().html());
            $('#' + peer.id + ' .muted').show();
        } else if (data.name == 'video') {
                //	$('#' + peer.id + ' .paused').html('paused');
        	$('#' + peer.id + ' .paused').show();
        	//$('#' + peer.id + ' video').hide();
        }
    });
});
webrtc.on('unmute', function (data) { // hide muted symbol
	///alert("unmute");
    webrtc.getPeers(data.id).forEach(function (peer) {
        if (data.name == 'audio') {
      ///  	alert(peer.id);
            $('#' + peer.id + ' .muted').hide();
        } else if (data.name == 'video') {
        	$('#' + peer.id + ' video').show();
            $('#' + peer.id + ' .paused').hide();
        }
    });
});

//local mute/unmute events
webrtc.on('audioOn', function () {
    // your local audio just turned on
});
webrtc.on('audioOff', function () {
    // your local audio just turned off
});
webrtc.on('videoOn', function () {
    // local video just turned on
});
webrtc.on('videoOff', function () {
    // local video just turned off
});



$(document).ready(function(){ 
		
	
/////
////Screen sharing
/////
	
	

	var owl = $('.owl-carousel');
	owl.owlCarousel({
	  //  loop:false,
	    //lazyLoad: true,
	    //margin:10,

	
	   
	    nav: true,
	     smartSpeed :900,
	     navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>',
	    	 '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
	    //responsiveClass:true,
	    responsive:{
	        0:{
	            items:1,
	            //nav:true
	        },
	        600:{
	            items:3,
	          //  nav:true
	        },
	        1000:{
	            items:5,
	          //  nav:true,
	           
	        }
	    }
	})
	
 
 
	    owl.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY>0) {
        owl.trigger('next.owl');
    } else {
        owl.trigger('prev.owl');
    }
    e.preventDefault();
});
	
	 $(document).on('click', '.owl-item', function(){
		 
        // n = $(this).index();
         //$('.owl-wrapper').trigger('owl.goTo', n);
         
       //alert();
 		var div = $(this).closest('div');
 		//alert($(this).html());
 		var video = $(this).find("video").parent();
 		var mainVideo = $('.mainVideoContainer').find("video").parent();
 		
 		mainVideo.removeClass('mainVideo');
 		mainVideo.addClass('videoContainer');
 		$(this).html(mainVideo);
 		
 		
 		$('.mainVideoContainer').html(video);
 		video.find("video").addClass('mainVideo');
 		video.removeClass('videoContainer');
 		
 		video.find("video").trigger('play');
 	//	video.trigger('play');		
 		mainVideo.find("video").trigger('play');
   });


	
	//
	// navbar  toggle class scroll 
	//
	//$(window).scroll(function() {
	//    if($(this).scrollTop() > 50)
	//    {
	 //       $('.navbar-trans').addClass('afterscroll');
	  //  } else
	 //   {
	 //       $('.navbar-trans').removeClass('afterscroll');
	//    }  

	//});
	
///
	// navbar 
	//
	
	
	////////chat

	
	//////chat
	 var button = $('#screenShareButton');
	    
	 
	if (!webrtc.capabilities.supportScreenSharing) {
	    button.disabled = 'disabled';
	}
	webrtc.on('localScreenRemoved', function () {
	    setButton(true);
	});

	
	button.on('click', function () {
		 // alert("else");
	    if (webrtc.getLocalScreen()) {
	    	 //alert("getLocalScreen");
	       // webrtc.stopScreenShare();
	      
	    } else {
	    	  //alert("else");
	        webrtc.shareScreen(function (err) {
	            if (err) {
	                
	            } else {
	            	$('#screenShareButton').hide();
	            }
	        });

	    }
	});
	
	
	
	var isMute = false;
	$('#mute').on('click', function () {
		//alert('webrtc.');
		if(!isMute){
	    	webrtc.mute();
	      	$('#localScreenContainer .muted').html('muted');
        	//alert($('#' + peer.id + ' .muted').parent().html());
	      	$('#localScreenContainer .muted').show();
    
                	
	    	isMute = true;
		}else{
			webrtc.unmute();
			$('#localScreenContainer .muted').hide();
			isMute = false;
		}
		
	});
	
	var isPaused = false;
	$('#pause').on('click', function () {
		
		if(!isPaused){
			webrtc.pauseVideo();
		
			//$('#localScreenContainer .paused').html('paused');
        	$('#localScreenContainer .paused').show();
        	//$('#localScreenContainer video').hide();
			isPaused = true;
		}else{
			webrtc.resumeVideo();
			$('#localScreenContainer .paused').hide();
        	$('#localScreenContainer video').show();
			isPaused = false;
		}
		
	});
	
	
	
	
	//local screen obtained
	webrtc.on('localScreenAdded', function (video) {
		 //alert("sdf1");
	   // video.onclick = function () {
	   //     video.style.width = video.videoWidth + 'px';
	    //    video.style.height = video.videoHeight + 'px';
	    //};
		// video.style.width = 200+ 'px';
		//       video.style.height = 150  + 'px';
	   // video.addClass('mainVideo');
		
		
		
		$('#localScreenContainer').find('video').hide();
		 $('#localScreenContainer').find('video').addClass('faceVideo');
		 video.className = 'mainVideo screenVideo';
	    $('#localScreenContainer').append(video);
	    
	    
	    
	//    alert( $('#localScreenContainer').html());
	    

	   // $('#localScreenContainer').show();
	    
	    
	  
	});
	// local screen removed
	webrtc.on('localScreenRemoved', function (video) {
		alert("sdf2");
		$('#localScreenContainer').html(''); //document.getElementById('localScreenContainer').removeChild(video);
	    $('#localScreenContainer').hide();
	});



 }) 

 
 
	


//////////
////////////Error handling
//////////

// local p2p/ice failure
webrtc.on('iceFailed', function (peer) {
    var connstate = document.querySelector('#container_' + webrtc.getDomId(peer) + ' .connectionstate');
    console.log('local fail', connstate);
    if (connstate) {
        connstate.innerText = 'Connection failed.';
        fileinput.disabled = 'disabled';
    }
});

// remote p2p/ice failure
webrtc.on('connectivityError', function (peer) {
    var connstate = document.querySelector('#container_' + webrtc.getDomId(peer) + ' .connectionstate');
    console.log('remote fail', connstate);
    if (connstate) {
        connstate.innerText = 'Connection failed.';
        fileinput.disabled = 'disabled';
    }
});

// local p2p/ice failure
webrtc.on('iceFailed', function (peer) {
    var pc = peer.pc;
    console.log('had local relay candidate', pc.hadLocalRelayCandidate);
    console.log('had remote relay candidate', pc.hadRemoteRelayCandidate);
});

// remote p2p/ice failure
webrtc.on('connectivityError', function (peer) {
    var pc = peer.pc;
    console.log('had local relay candidate', pc.hadLocalRelayCandidate);
    console.log('had remote relay candidate', pc.hadRemoteRelayCandidate);
});


function copyToClipboard(element) {
	  var $temp = $("<input>");
	  $("body").append($temp);
	  $temp.val($(element).text()).select();
	  document.execCommand("copy");
	  $temp.remove();
	}

