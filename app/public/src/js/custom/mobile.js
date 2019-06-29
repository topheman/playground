define(['custom/common','utils/requestAnimFrame'],function(common){
    
    var mobile;
    
    var inputX = 0,
        inputY = 0,
        socket,
        disconnected = true,
        requestAnimationFrameTimer
    ;
    
    function displayDisconnected(){
        
        var modal = document.getElementById('openModal');
        
        modal.className = "show";
        
        document.getElementById('modal-title').innerHTML = "You've been disconnected";
        document.getElementById('modal-message').innerHTML = '<p>You have another tab/window in your browser running a playground controller.</p><p><a href="javascript:window.location.reload()">Click here to reconnect</a></p>';
        
    }

     function socketConnect (callback){
        //remove this (only for test to force xhr-polling)
        var options = {
//            'transports' : ['xhr-polling']
        };
        socket = io.connect('/mobile',options);
        socket.on('mobile-connected',function(data){
            console.log('respond to mobile-connected');
            console.log('mobile connected',data);
            document.getElementById('ball').style.backgroundColor = data.color;
            disconnected = false;
            callback();
        });
        socket.on('force-disconnect',function(data){
            console.log('force-disconnect');
            socket.disconnect();
            disconnected = true;
            displayDisconnected();
        });
        socket.on('desktop-connected',function(data){
            console.log('desktop connected',data);
            setTimeout(function(){window.location.reload();},0);//boo .. bas setTimeout at 0 (but firefox doesn't respond to reload otherwise ...
        });
    }

     function pushMotionInfos (){
//        console.info('pushMotionInfos');
        socket.emit('mobile-infos',{
            inputX: inputX,
            inputY: inputY
        });
//        console.log('updateCoordinates');
        document.getElementById("coords").innerHTML = "inputX : "+inputX+" - inputY : "+inputY;
        if(disconnected === false){
            window.requestAnimFrame(pushMotionInfos);
        }
    }
    
    mobile = {
    
        isWebSocketsEnabled : function (){
            if(window.WebSocket)
                return true;
            else
                return false;
        },

        checkFeatures : function (){
            var errors = "";
            if(!this.isDeviceMotionEnabled())
                errors += "<li>No gyroscope detected.</li>";
            if(!this.isWebSocketsEnabled())
                errors += "<li>No websockets enabled.</li>";
            if(errors !== ""){
                document.getElementById("errors").innerHTML = "<h3>Errors</h3><ul>"+errors+"</ul>";
                return false;
            }
            else
                return true;
        },

        init : function (){
            //do not execute if all the features needed aren't here
            if( (!window.DeviceMotionEvent && !window.DeviceOrientationEvent) || (!("ontouchstart" in window) && !window.DeviceMotionEvent) || (!("ontouchstart" in window) && !window.DeviceOrientationEvent) ) {
                alert('Please activate "Motion and Orientation" feature in\nSettings > Safari or Settings > Chrome')
                return;
            }
            var reduceInfos = function(n){
                return Math.floor(n*100000)/100000;
            };
            //listen to the orientation of the device
            if(window.DeviceMotionEvent){
                window.addEventListener("devicemotion", function(event){
                    inputX = reduceInfos(event.accelerationIncludingGravity.x);
                    inputY = -reduceInfos(event.accelerationIncludingGravity.y);
                }, false);
            }
            else if(window.DeviceOrientationEvent){
                window.addEventListener('deviceorientation',function(e){
                    inputX = reduceInfos(e.gamma/6);
                    inputY = reduceInfos(e.beta/6);
                },false);
            }
            //make sure to disconnect the socket before leaving the page
            window.addEventListener('beforeunload',function(){
                socket.disconnect();
            },false);
            //push coordinates to server via socket.io
            socketConnect(pushMotionInfos);
        },

        log : function (msg){
            document.getElementById('errors').innerHTML += msg;
        }
        
    };
    
    return mobile;
    
});