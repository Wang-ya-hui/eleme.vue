<template>
        <div id="back">
            <i class="fa fa-arrow-up"></i>
        </div>
    </template>
    <script>
    export default {
        name:'back',
        data(){
            return {
            }
        },
        methods: {
          
        },
    }
    </script>
    <style scoped>
        #back{
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            border: 1px solid #cccccc;
            line-height: 4rem;
            text-align: center;
            font-size: 20px;
            position: fixed;
            bottom: 7rem;
            right: 1rem;
            background-color: white;
        }
    </style>