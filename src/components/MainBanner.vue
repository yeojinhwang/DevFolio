<template>
    <v-layout row align-center style="min-height: 100vh; position: relative; background-size: cover; background-image: url('img/mainbanner.png');">
        <v-flex xs6 style="padding-left:10%;">
            <p class="mianBanner-write-css1">YOUR NEW PORTFOLIO TEMPLATE</p>
            <p class="mianBanner-write-css2">DevFolio</p>
            <h2 id="bannerTitle"></h2>
            <div class="py-4">
                <v-btn round color="light" to="/login" style="color: #ff6b6b; font-weight: bold; padding: .375rem 2.75rem;">GET STARTED</v-btn>
            </div>
        </v-flex>
        <v-flex xs6 style="padding-right: 10%;">
            <img :src="images[Math.abs(currentNumber) % images.length]"/>
        </v-flex>
    </v-layout>
</template>

<script>

export default {
    name: 'ImageBanner',
    data () {
        return {
            images:['https://d19m59y37dris4.cloudfront.net/foliou/2-0-0/img/hero-macbook.png'],
            currentNumber:0,
            timer : null
        }
    },
    mounted() {
        // 0729 error 주석처리
        // this.startRotation();
    },

    methods : {
        // aboutFunction: function() {
        //   // 723.2000122070312
        //   document.documentElement.scrollTop = 796;
        // }
    }
}

// typing animation source
document.addEventListener('DOMContentLoaded',function(event){
    // array with texts to type in typewriter
    var dataText = [ "쉽고 빠르게 당신의 포트폴리오를 완성하는 방법,", "지금 바로 시작해 보세요 :)"];
    
    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
        // chekc if text isn't finished yet
        if (i < (text.length)) {
            // add next character to h2
            let idBannerTitle = document.getElementById("bannerTitle")
            if(idBannerTitle) idBannerTitle.innerHTML = text.substring(0, i+1) +'<span id="cursor" aria-hidden="true"></span>';

            // wait for a while and call this function again for next character
            setTimeout(function() {
                typeWriter(text, i + 1, fnCallback)
            }, 100);
        }
        // text finished, call callback if there is a callback function
        else if (typeof fnCallback == 'function') {
            // call callback after timeout
            setTimeout(fnCallback, 700);
        }
    }
    // start a typewriter animation for a text in the dataText array
    function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined'){
            setTimeout(function() {
                StartTextAnimation(0);
            }, 20000);
        }
        // check if dataText[i] exists
        //  0729 오류 fix
        if (i < dataText.length) {
            // text exists! start typewriter animation
            typeWriter(dataText[i], 0, function(){
                // after callback (and whole text has been animated), start next text
                StartTextAnimation(i + 1);
            });
        }
    }
    // start the text animation
    StartTextAnimation(0);
});
</script>

<style>
#bannerTitle {
  font-size: 1.8rem;
  color: white;
}

#cursor {
  border-right: .05em solid;
  animation: caret 1s steps(1) infinite;
}

.mianBanner-write-css1{
    font-size: 1.8rem; 
    font-weight: 100; 
    letter-spacing: 0.08rem; 
    text-shadow: 2px 2px 5px #185886; 
    color: white;
}
.mianBanner-write-css2{
    font-weight: 900; 
    text-shadow: 2px 2px 2px #103b5b; 
    font-size: 5rem; 
    color: white; 
    font-family: 'Raleway', sans-serif;
}

@keyframes caret {
  50% {
    border-color: transparent;
  }
}
</style>