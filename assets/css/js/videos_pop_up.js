/* code 1*/
const btn = document.querySelector('.bouton');
const videoContainer =  document.querySelector('.video-container');
const close =  document.querySelector('.close');

      btn.addEventListener('click',()=>{
          videoContainer.classList.toggle('active');
      })

      close.addEventListener('click',()=>{
          videoContainer.classList.remove('show');
      })
/* code 2*/
      function toggle(){
          var trailer = document.querySelector(".trailer")
          var video = document.querySelector("video")
          trailer.classList.toggle("active");
          video.pause();
          video.currentTime = 0;
          
      }