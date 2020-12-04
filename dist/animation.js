setTimeout(function () {
  $('#logoContainer').css('display','block')  
},800)
setTimeout(function () {
    const enterLogo = $('#enterLogo')
    setTimeout(function () {enterLogo.css('display','none')},1000)
    enterLogo.css('animation-duration','1s')
    enterLogo.css('animation-name','dissappear')
    
},3300)