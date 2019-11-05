<template>
  <v-footer
     dark
     height="auto"
   >
   <div class="weather">
     <ul>
       <li><a href="#">About Us</a></li>
       <li><a href="#">Contact Us</a></li>
       <li><a href="#">Our Partner</a></li>
       <li><a href="#">Yeah!</a></li>
     </ul>
   </div>


    <div class="foot" style="">


    <a href="https://lab.ssafy.com/kimsuhan/webmobile-sub2" style="text-decoration:none" target="_black"><p style="text-align: center; padding-top: 10px; font-size: 20px;">Our Project</p></a>
    <p style="text-align: center; padding-top: 20px;">Date Production : 2019-07-11</p>
    <p style="text-align: center; padding-top: 20px;">Made by : 전영진,서지훈,황여진,강신욱</p>
    <p style="text-align: center; padding-top: 10px;">Copyright 2019@ All Right is Reserved.</p>
</div>
</v-footer>
</template>

<script>
export default {
	name: 'Footer',
  }
</script>

<style >
  .foot {
    position: relative;
    text-align: center;
    display: inline-block;
    margin-left: 35vw;
  }
  .weather {
    display: inline-block;
    position: relative;
    text-align: center;
    font-size: 20px;
  }
</style>