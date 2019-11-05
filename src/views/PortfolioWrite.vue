<template>
  <div>
    <BackBanner>
      <div slot="pageName">
        <p style="font-family: 'Jua', sans-serif; font-size: 4rem; font-weight: 300; letter-spacing: 0.08rem; text-shadow: 2px 2px 2px #103b5b; color: white;">Write Portfolio</p>
      </div>
    </BackBanner>

    <WriteForm/>
    
    <newFooter></newFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import newFooter from '@/components/newFooter.vue'
import BackBanner from '@/components/BackBanner.vue'
import WriteForm from '@/components/WriteForm.vue' 

export default {
  name: 'PortfolioWrite',
  components: {
    WriteForm,
    BackBanner,
    newFooter
  }
}
</script>
<style>
    .tit {
        font-size: 17px;
        color: #333;
        font-weight: 600;
        margin-bottom: 30px;
    }

    .scrollBox {
        font-size: 14px;
        color: #666;
        border: 1px solid #ddd;
        height: 226px;
        padding: 30px;
        overflow-y: auto;
        margin-bottom: 20px;
        word-break: break-all;
    }
</style>