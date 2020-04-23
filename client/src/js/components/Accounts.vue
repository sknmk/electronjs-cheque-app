<template>
    <div class="container-fluid px-0">
        <div class="row py-3">
            <div class="col-12 mb-2">
                <div class="row">
                    <div class="col-4">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="search" placeholder="Ara" @keyup="filter"/>
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="ri-search-line ri-fw ml-1"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-8 align-self-center">
                        <router-link to="/AccountAdd" tag="button" class="btn btn-outline-primary btn-sm bold rounded-pill">
                            <i class="ri-user-add-line"></i> YENİ
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="row d-flex align-items-stretch">
            <div class="col-xl-4 col-lg-6 col-md-6 mb-4" v-for="(account, index) in this.filteredAccounts" :key="account.id">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <i class="ri-user-line mr-1"></i> {{account.name}}
                                <br />
                                <i class="ri-phone-line mr-1"></i> {{account.phone}}
                                <br />
                                <i class="ri-mail-line mr-1"></i> {{account.email}}
                                <br />
                                <i class="ri-map-pin-2-line mr-1"></i> {{account.address}} 
                            </div>
                            <div class="col-4 align-self-center text-center" v-if="account.isSystemOwner == '0' && (account.incomingAmount || account.outgoingAmount)">
                                <div v-if="account.incomingAmount">
                                    ALACAK
                                    <br/>
                                    <span class="text-success">{{account.incomingAmount}}TRY</span>
                                </div>
                                <div v-if="account.outgoingAmount">
                                    BORÇ
                                    <br/>
                                    <span class="text-danger">{{account.outgoingAmount}}TRY</span>
                                </div>
                                
                            </div>
                             <div class="col-12 submenu text-right">
                                 <span class="rounded-pill bg-white text-info mx-1 px-2" v-if="account.isSystemOwner == '1'" title="Bu hesap size ait.">
                                    Bu hesap size ait.
                                </span>
                                <span class="rounded-pill bg-white text-danger mx-1 px-2" @click="deleteAccount(index, account.id)" v-if="!account.incomingAmount && !account.outgoingAmount"
                                title="Cariyi Sil">
                                    Sil
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const { ipcRenderer } = require('electron')
    export default {
        data() {
            return {
                accounts: {},
                filteredAccounts: {},
                search: ''
            }
        },
        mounted() {
            this.accounts = this.filteredAccounts = ipcRenderer.sendSync('getAccounts');
        },
        methods: {
            filter() {
                this.filteredAccounts = this.accounts.filter(a => {
                    return a.name.toLowerCase().includes(this.search.toLowerCase())
                })
            },
            deleteAccount(index, accountId) {
                let result = ipcRenderer.sendSync('deleteAccount', {accountId});
                this.accounts.splice(index, 1);
            } 
        }
    }
</script>