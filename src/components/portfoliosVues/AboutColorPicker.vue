<template>
  <div class="px-1">
    <div class="px-1">
      <p style="color: lightgrey; letter-spacing: 0.05rem;">Color</p>
      <!-- color picker -->
      <div v-if="aboutChoice === 'title'">
          <div id="aboutTitleColor" class="mx-auto" style="height: 3rem;; width: 15rem; background-color: rgb(255, 255, 255)"></div>
          <v-layout
              row
              wrap
          >
              <v-flex xs9>
                  <v-slider
                  v-model="abouttRed"
                  :max="255"
                  label="R"
                  color="error"
                  ></v-slider>
              </v-flex>

              <v-flex xs3>
                  <v-text-field
                  v-model="abouttRed"
                  class="mt-0 ml-auto"
                  style="width: 3.5rem;"
                  type="number"
                  ></v-text-field>
              </v-flex>

              <v-flex xs9>
                  <v-slider
                  v-model="abouttGreen"
                  :max="255"
                  label="G"
                  color="success"
                  ></v-slider>
              </v-flex>

              <v-flex xs3>
                  <v-text-field
                  v-model="abouttGreen"
                  class="mt-0 ml-auto"
                  style="width: 3.5rem;"
                  type="number"
                  ></v-text-field>
              </v-flex>

              <v-flex xs9>
                  <v-slider
                  v-model="abouttBlue"
                  :max="255"
                  label="B"
                  color="primary"
                  ></v-slider>
              </v-flex>

              <v-flex xs3>
                  <v-text-field
                  v-model="abouttBlue"
                  class="mt-0 ml-auto"
                  style="width: 3.5rem;"
                  type="number"
                  ></v-text-field>
              </v-flex>
          </v-layout>
      </div>
    <div v-else-if="aboutChoice === 'subtitle'">
      <div id="aboutSubtitleColor" class="mx-auto" style="height: 3rem;; width: 15rem; background-color: rgb(255, 255, 255)"></div>
          <v-layout
              row
              wrap
          >
              <v-flex xs9>
                  <v-slider
                  v-model="aboutsRed"
                  :max="255"
                  label="R"
                  color="error"
                  ></v-slider>
              </v-flex>

              <v-flex xs3>
                  <v-text-field
                  v-model="aboutsRed"
                  class="mt-0 ml-auto"
                  style="width: 3.5rem;"
                  type="number"
                  ></v-text-field>
              </v-flex>

              <v-flex xs9>
                  <v-slider
                  v-model="aboutsGreen"
                  :max="255"
                  label="G"
                  color="success"
                  ></v-slider>
              </v-flex>

              <v-flex xs3>
                  <v-text-field
                  v-model="aboutsGreen"
                  class="mt-0 ml-auto"
                  style="width: 3.5rem;"
                  type="number"
                  ></v-text-field>
              </v-flex>

              <v-flex xs9>
                  <v-slider
                  v-model="aboutsBlue"
                  :max="255"
                  label="B"
                  color="primary"
                  ></v-slider>
              </v-flex>

              <v-flex xs3>
                  <v-text-field
                  v-model="aboutsBlue"
                  class="mt-0 ml-auto"
                  style="width: 3.5rem;"
                  type="number"
                  ></v-text-field>
              </v-flex>
          </v-layout>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: '',
  props: ['aboutChoice'],
  data() {
    return {
      abouttRed: "255", abouttBlue: "255", abouttGreen: "255",
      aboutsRed: "255", aboutsBlue: "255", aboutsGreen: "255"
    }
  },
  watch: {
    // title color
    abouttRed: function() {
      let rgb = 'rgb(' + this.abouttRed + ',' + this.abouttGreen + ',' + this.abouttBlue + ')';
      document.getElementById('aboutTitleColor').style.backgroundColor = rgb;
      document.getElementById('aboutTitle1').style.color = rgb;
    },
    abouttGreen: function() {
      let rgb = 'rgb(' + this.abouttRed + ',' + this.abouttGreen + ',' + this.abouttBlue + ')';
      document.getElementById('aboutTitleColor').style.backgroundColor = rgb;
      document.getElementById('aboutTitle1').style.color = rgb;
    },
    abouttBlue: function() {
      let rgb = 'rgb(' + this.abouttRed + ',' + this.abouttGreen + ',' + this.abouttBlue + ')';
      document.getElementById('aboutTitleColor').style.backgroundColor = rgb;
      document.getElementById('aboutTitle1').style.color = rgb;
    },
    // subTitle color
    aboutsRed: function() {
      let rgb = 'rgb(' + this.aboutsRed + ',' + this.aboutsGreen + ',' + this.aboutsBlue + ')';
      document.getElementById('aboutSubtitleColor').style.backgroundColor = rgb;
      document.getElementById('aboutSubtitle1').style.color = rgb;
    },
    aboutsBlue: function() {
      let rgb = 'rgb(' + this.aboutsRed + ',' + this.aboutsGreen + ',' + this.aboutsBlue + ')';
      document.getElementById('aboutSubtitleColor').style.backgroundColor = rgb;
      document.getElementById('aboutSubtitle1').style.color = rgb;
    },
    aboutsGreen: function() {
      let rgb = 'rgb(' + this.aboutsRed + ',' + this.aboutsGreen + ',' + this.aboutsBlue + ')';
      document.getElementById('aboutSubtitleColor').style.backgroundColor = rgb;
      document.getElementById('aboutSubtitle1').style.color = rgb;
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>