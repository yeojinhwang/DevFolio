<template>
  <v-layout row justify-center align-center style="min-height: 100vh; position: relative; background-image: linear-gradient(-39deg, #ff6b6b 0%, #2b90d9 100%)">
      <v-flex xs6>
        <p style="font-size: 1.8rem; font-weight: 100; letter-spacing: 0.08rem; text-shadow: 2px 2px 5px #185886; color: white;">YOUR NEW PORTFOLIO TEMPLATE</p>
        <p style="font-weight: 900; text-shadow: 2px 2px 2px #103b5b; font-size: 5rem; color: white; font-family: 'Raleway', sans-serif;">DevFolio</p>
        <h2></h2>
        <div class="py-4">
          <v-btn round color="light" v-on:click="aboutFunction()" style="color: #ff6b6b; font-weight: bold; padding: .375rem 2.75rem;">ABOUT US</v-btn>
        </div>
      </v-flex>
      <v-flex xs6>
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
  },
  methods : {
    aboutFunction: function() {
      document.documentElement.scrollTop = 723.2000122070312;
    }

  }
}
</script>