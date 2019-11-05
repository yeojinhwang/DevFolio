<template>
  <div>
    <BackBanner>
      <div slot="pageName">
        <p style="font-size: 3rem; font-weight: 300; letter-spacing: 0.08rem; text-shadow: 2px 2px 2px #103b5b; color: white;">Board</p>
      </div>
    </BackBanner>
    <v-container v-if="state === 'view'" >
      <BoardList v-bind:propsdata="state" @send-state="getChildState"></BoardList>
    </v-container>
    <v-container v-if="state === 'write'">
      <BoardWrite v-bind:propsdata="state" @send-state="getChildState"></BoardWrite>
    </v-container>
  <Footer/>
  </div>
</template>

<script>
import BackBanner from '@/components/BackBanner.vue'
import BoardList from '@/components/BoardList.vue'
import BoardWrite from '@/components/BoardWrite.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'boardpage',
    components: {
        BackBanner,
        BoardList,
        BoardWrite,
        Footer
    },
    data() {
      return {
        state: 'view'
      }
    },
    methods: {
      getChildState: function(text) {
        this.state = text
      }
    }
}
</script>

