<template>
    <v-btn fab dark small color="pink" id="myBtn" v-on:click="topFunction()" style="display: none; position: fixed; bottom: 20px; right: 30px; z-index: 99;">
      <v-icon dark>arrow_upward</v-icon>
    </v-btn>
</template>

<script>
export default {
	name: 'TopButton',
    methods: {
        topFunction: function() {
           document.documentElement.scrollTop = 0;
        }
    }
}
</script>
