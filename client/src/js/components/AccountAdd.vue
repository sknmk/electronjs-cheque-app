<template>
    <div class="container-fluid px-0">
        <div class="row py-3">
            <div class="col-12">
                <router-link to="/Accounts" tag="button" class="btn btn-outline-secondary rounded-circle btn-sm">
                     <i class="ri-arrow-left-line"></i>
                </router-link>
            </div>
            <div class="col-md-12 mt-3">
                <div class="row py-3">
                    <div class="col-md-6 mb-4">
                        <label :class="{'label-filled': account.name, 'label-empty': !account.name}">İsim</label>
                        <div class="input-group" :class="{'has-error' : exception.name}">
                            <input type="text" class="form-control" v-model="account.name" />
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="ri-user-line ri-fw ml-1"></i></span>
                            </div>
                        </div>
                        <span class="exception text-danger" v-if="exception.name">Geçersiz değer.</span>
                    </div>
                    <div class="col-md-6 mb-4">
                        <label :class="{'label-filled': account.phone, 'label-empty': !account.phone}">Telefon (10 haneli)</label>
                        <div class="input-group" :class="{'has-error' : exception.phone}">
                            <input type="text" class="form-control" v-model="account.phone" maxlength="10"/>
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="ri-phone-line ri-fw ml-1"></i></span>
                            </div>
                        </div>
                        <span class="exception text-danger" v-if="exception.phone">Geçersiz değer.</span>
                    </div>
                    <div class="col-md-6 mb-4">
                        <label :class="{'label-filled': account.email, 'label-empty': !account.email}">Email</label>
                        <div class="input-group" :class="{'has-error' : exception.email}">
                            <input type="email" class="form-control" v-model="account.email" />
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="ri-mail-line ri-fw ml-1"></i></span>
                            </div>
                        </div>
                        <span class="exception text-danger" v-if="exception.email">Geçersiz değer.</span>
                    </div>
                    <div class="col-md-6 mb-4">
                        <label :class="{'label-filled': account.address, 'label-empty': !account.address}">Adres</label>
                        <div class="input-group" :class="{'has-error' : exception.address}">
                            <input class="form-control" v-model="account.address" />
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="ri-map-pin-2-line ri-fw ml-1"></i></span>
                            </div>
                        </div>
                        <span class="exception text-danger" v-if="exception.address">Geçersiz değer.</span>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check pl-0">
                            <input class="form-check-input" type="checkbox" id="isSystemOwner" v-model="account.isSystemOwner" :value="1">
                            <label class="form-check-label" for="isSystemOwner">
                                Bu hesap size mi ait?
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-right footer-buttons py-2">
                <button class="btn btn-secondary bold" @click="reset">
                    Sıfırla
                </button>
                <button class="btn btn-primary bold" :disabled="waiting" :class="{'btn-danger': exception, 'btn-success': success, 'disabled': waiting}" 
                @click="saveAccount">
                    <span v-if="exception">Yeniden Dene</span>
                    <span v-if="success">Başarılı</span>
                    <span v-if="!exception && !success">Kaydet</span>
                </button>
            </div>
        </div>
    </div>
</template>
<style>
    .footer-buttons {
        position: fixed;
        bottom: 0;
        background: rgba(0, 0, 0, .15); 
    }
</style>
<script>
    const { ipcRenderer } = require('electron')
    export default {
        data() {
            return {
                account: {},
                waiting: false,
                exception: false,
                success: false,
            }
        },
        methods: {
             saveAccount() {
                let result = ipcRenderer.sendSync('saveAccount', this.account)
                if (result.exceptions) {
                    this.exception = result.exceptions
                } else {
                    this.success = true
                    this.waiting = true
                    this.reset()
                    setTimeout(() => {  this.$router.push('/Accounts')  }, 1000)

                }
            },
            reset() {
                this.account = {}
                this.exception = false
            }
        }
    }
</script>