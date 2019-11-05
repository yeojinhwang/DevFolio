<template>
<div>
    <div class="grid-container">
        <div class="item" v-for="template in templates">
            <div @click="template.modal = !template.modal">
                <div class="item-main">
                
                </div>
                <div class="item-name">
                    <div style="padding:10px;">{{template.name}}</div>
                </div>
                <div v-if="template.modal" class="modal">
                </div>
            </div>

            <div v-if="template.modal" class="modal-out">
                <Modal :css="template.css"></Modal>
            </div>
        </div>
    </div>
</div>
</template>


<script>
import Modal from '../components/PortfolioTemplateModal.vue'

export default {
    name: 'portfolioTemplateList',
    components: {
        Modal
    },
    data(){
        return{
            templates:[
                {
                    modal:false,
                    name:'tamplate 1',
                    css:1
                },
                {
                    modal:false,
                    name:'tamplate 2',
                    css:2
                },
                {
                    modal:false,
                    name:'tamplate 3',
                    css:3
                },
                {
                    modal:false,
                    name:'tamplate 4',
                    css:1
                },
                {
                    modal:false,
                    name:'tamplate 5',
                    css:2
                },
                {
                    modal:false,
                    name:'tamplate 6',
                    css:3
                },
            ],
        }
        
    }
}
</script>

<style>
    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
        width:70%;
        margin:10px;
        /* border:1px solid black; */
        grid-gap:10px;
        padding:10px;
    }
    .item{
        margin:5px;
        border:1px solid black;
        height:360px;
    }
    .item-main{
        height:310px;
    }
    .item-name{
        color:white;
        background-color: gray;
        height:50px;
        font-size:20px;
    }

    .modal{
        position: fixed; /* Stay in place */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    .modal-out{
        border : 3px solid yellow;
        background-color: #30b7e8;
        position:fixed;
        top:10%;
        max-height:80%;
        left:7%;
        width:85%;
        margin:auto;
        overflow:scroll;
    }
</style>

