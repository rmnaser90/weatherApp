setTimeout(function () {
  $('#logoContainer').css('display','block')  
},520)
setTimeout(function () {
    const enterLogo = $('#enterLogo')
    setTimeout(function () {enterLogo.css('display','none')},1000)
    enterLogo.css('opacity','1')
    enterLogo.css('animation-duration','1s')
    enterLogo.css('animation-name','dissappear')
    
},3300)