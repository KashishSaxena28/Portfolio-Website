const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAni(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y:'-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelem",{
        y:'0',
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2

    })

    .from("#herofooter",{
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

var timeout;

function circleChaptaKaro(){
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {

        clearTimeout(timeout);
        
        xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale,yscale);
        
        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1))`;
        },100);

    });
}

circleChaptaKaro();

function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove", function (dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)scale(${xscale}, ${yscale})`;
    })
}


circleMouseFollower();
firstPageAni();


document.querySelectorAll(".elem").forEach(function(elem) {
    var rotate = 0;
    var diffrot = 0;

    
    elem.addEventListener("mouseleave",function(dets) {    
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,    
        });
        
    });

elem.addEventListener("mousemove",function(dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20,20,diffrot * 0.8),        
    });
    
});
});


  function updateClock() {
    const currentTime = new Date();
    
    // Get hours and minutes, and AM/PM
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    
    // Add leading zero to minutes if it's less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Format the time string in "0:05 AM" format
    const timeString = `${hours}:${minutes} ${ampm}`;

    // Update the clock element
    document.getElementById("clock").textContent = timeString;
  }

  // Update the clock every second (1000 ms)
  setInterval(updateClock, 1000);

  // Initialize the clock immediately
  updateClock();
