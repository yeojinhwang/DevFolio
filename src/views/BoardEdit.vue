<template>
  <div>
    <BackBanner>
      <div slot="pageName">
        <p style="font-size: 3rem; font-weight: 300; letter-spacing: 0.08rem; text-shadow: 2px 2px 2px #103b5b; color: white;">Board</p>
      </div>
    </BackBanner>
    <v-container >
      <BoardEditForm/>
    </v-container>
  <Footer/>
  </div>
</template>

<script>
import BackBanner from '@/components/BackBanner.vue'
import BoardEditForm from '@/components/BoardEditForm.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'BoardEdit',
    components: {
        BackBanner,
        BoardEditForm,
        Footer
    },
    data() {
      return {
      }
    },
    methods: {
    }
}
</script>

