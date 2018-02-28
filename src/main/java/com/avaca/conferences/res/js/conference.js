var mediaOptions = {
    audio: true,
    video: true
};

var webrtc = new SimpleWebRTC({
	nick: 'Jane Doe',
  // the id/element dom element that will hold "our" video
  localVideoEl: 'localVideo',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: '',
  
   media: mediaOptions,
  // immediately ask for camera access
  autoRequestMedia: true,
 // url: 'https://192.168.1.7:8888'
  url: 'http://192.168.1.7:8888'
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {

	var roomName = $('#roomName').text();
  webrtc.joinRoom(roomName);
});

var countParticipants = 0;
// a peer video has been added
webrtc.on('videoAdded', function (video, peer) {
	countParticipants++;
	//alert('videoAdded');
    console.log('video added', peer);
	 console.log('videoAdded', peer.nick);
    var remotes = document.getElementById('video'+countParticipants);
   if (remotes) {
    	
	 var con = "<div class='item'>" +
			 		" <div class='videoContainer col-xs-4' id='container_" + webrtc.getDomId(peer) + "'>"+
			 	              	video +
							 "<span class='muted'></span>"+
							 "<div class='connectionstate'>Connection established.</div>"+
			         "</div>" +
	 		  " </div>";
	
	 
	
	 
    	var container = document.createElement('div');
        container.className = 'videoContainer item';
        container.id = 'container_' + webrtc.getDomId(peer);
        container.appendChild(video);
    
 // add muted and paused elements
    var muted = document.createElement('span');
    muted.className = 'muted';
    container.appendChild(muted);

    var muted = document.createElement('span');
    muted.className = 'muted';
    container.appendChild(muted);
		 // show the ice connection state
    if (peer && peer.pc) {
        var connstate = document.createElement('div');
        connstate.className = 'connectionstate';
        container.appendChild(connstate);
        peer.pc.on('iceConnectionStateChange', function (event) {
            switch (peer.pc.iceConnectionState) {
            case 'checking':
                connstate.innerText = 'Connecting to peer...';
                break;
            case 'connected':
            case 'completed': // on caller side
                connstate.innerText = 'Connection established.';
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
   }
	
        // suppress contextmenu
        video.oncontextmenu = function () { return false; };
        //container2.appendChild(container);
        remotes.appendChild(container);
        
      //  $('.addremote').append(con);
    }
});

// a peer video was removed
webrtc.on('videoRemoved', function (video, peer) {
    console.log('video removed ', peer);
    var remotes = document.getElementById('remotes');
    var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
    if (remotes && el) {
        remotes.removeChild(el);
    }
});



// listen for mute and unmute events
webrtc.on('mute', function (data) { // show muted symbol
    webrtc.getPeers(data.id).forEach(function (peer) {
        if (data.name == 'audio') {
            $('#videocontainer_' + webrtc.getDomId(peer) + ' .muted').show();
        } else if (data.name == 'video') {
            $('#videocontainer_' + webrtc.getDomId(peer) + ' .paused').show();
            $('#videocontainer_' + webrtc.getDomId(peer) + ' video').hide();
        }
    });
});
webrtc.on('unmute', function (data) { // hide muted symbol
    webrtc.getPeers(data.id).forEach(function (peer) {
        if (data.name == 'audio') {
            $('#videocontainer_' + webrtc.getDomId(peer) + ' .muted').hide();
        } else if (data.name == 'video') {
            $('#videocontainer_' + webrtc.getDomId(peer) + ' video').show();
            $('#videocontainer_' + webrtc.getDomId(peer) + ' .paused').hide();
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
	    loop:false,
	    lazyLoad: true,
	    margin:20,
	    nav:true,
	    responsive:{
	        0:{
	            items:2
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:5
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
	    
	// Instantiate the Bootstrap carousel
	$('.multi-item-carousel').carousel({
	  interval: false
	});

	// for every slide in carousel, copy the next slide's item in the slide.
	// Do the same for the next, next item.
	$('.multi-item-carousel .item').each(function(){
	  var next = $(this).next();
	  if (!next.length) {
	    next = $(this).siblings(':first');
	  }
	  next.children(':first-child').clone().appendTo($(this));
	  
	  if (next.next().length>0) {
	    next.next().children(':first-child').clone().appendTo($(this));
	  } else {
	  	$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
	  }
	});
	
	//
	// navbar  toggle class scroll 
	//
	$(window).scroll(function() {
	    if($(this).scrollTop() > 50)
	    {
	        $('.navbar-trans').addClass('afterscroll');
	    } else
	    {
	        $('.navbar-trans').removeClass('afterscroll');
	    }  

	});
	  
	// demo only 
	// open link in new tab without ugly target="_blank"
	$("a[href^='http']").attr("target", "_blank");
///
	// navbar 
	//
	
	
	
	
	////////chat
	





	
	//////chat
	

	
var button = $('#screenShareButton');

    setButton = function (bool) {
        button.innerText = bool ? 'share screen' : 'stop sharing';
    };
if (!webrtc.capabilities.supportScreenSharing) {
    button.disabled = 'disabled';
}
webrtc.on('localScreenRemoved', function () {
    setButton(true);
});

setButton(true);

button.on('click', function () {
    //alert('df');
    if (webrtc.getLocalScreen()) {
        webrtc.stopScreenShare();
        setButton(true);
    } else {
		
        webrtc.shareScreen(function (err) {
			
            if (err) {
                setButton(true);
            } else {
                setButton(false);
            }
        });

    }
});


// local screen obtained
webrtc.on('localScreenAdded', function (video) {
	alert('localScreenAdded');
    video.onclick = function () {
        video.style.width = video.videoWidth + 'px';
        video.style.height = video.videoHeight + 'px';
    };
    document.getElementById('localScreenContainer').appendChild(video);
    $('#localScreenContainer').show();
});
// local screen removed
webrtc.on('localScreenRemoved', function (video) {
	alert('localScreenRemoved');
    document.getElementById('localScreenContainer').removeChild(video);
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




