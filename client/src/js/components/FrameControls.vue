<template>
    <div class="container-fluid p-0 m-0 bg-primary text-white frame-menu pr-0">
        <div class="row mx-0">
            <div class="col-1 text-center align-self-center">
                <strong class="bold">bq</strong>
            </div>
            <div class="col-11 text-right p-0">
                <span class="frame-control" @click="minimize()">
                    <i class="ri-subtract-line"></i>
                </span>
                <span class="frame-control" @click="maximize()">
                    <i :class="[fullScreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line']"></i>
                </span>
                <span class="frame-control exit" @click="close()">
                    <i class="ri-close-line"></i>
                </span>
            </div>
        </div>
    </div>
</template>
<style>
    .frame-menu {
        position: fixed;
        -webkit-app-region: drag;
        top: 0;
        right: 0;
        z-index: 10;
        box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04);
    }

    .bg-header {
        background: rgba(0,0,0, .1)
    }

    .frame-control {
        -webkit-app-region: no-drag;
        padding-left: 1.2rem;
        padding-right: 1.2rem;
        padding-top: .3rem;
        font-size: 20px
    }

    .frame-control:hover {
        background: rgba(255,255,255, .1)
    }

    .frame-control.exit:hover{
        color:white;
        background: #de3f44;
    }
</style>
<script type="application/javascript">
    export default {
        data() {
            return {
                currentWindow: '',
                fullScreen: false
            }
        },
        mounted: function () {
            const {remote} = require('electron');
            this.currentWindow = remote.getCurrentWindow();
        },
        methods: {
            minimize() {
                this.currentWindow.minimize();
            },
            maximize() {
                if(this.currentWindow.isMaximized()){
                    this.currentWindow.unmaximize();
                    this.fullScreen = false;
                } else{
                    this.currentWindow.maximize();
                    this.fullScreen = true;
                }
            },
            isMaximized() {
                return this.currentWindow.isMaximized();
            },
            close() {
                this.currentWindow.close();
            }
        }
    }
</script>