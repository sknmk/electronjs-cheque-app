<template>
    <div class="container-fluid px-0" id="cheque-container">
        <div class="row mt-2">
            <div class="col-12 mb-4" v-for="(cheque, index) in this.cheques" :key="index">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6 align-self-center">
                                <h5 class="mb-0 text-success">{{cheque.authorName}}</h5>
                            </div>
                            <div class="col-6 text-right">
                                <h6 class="text-muted mb-1">{{cheque.formattedDueDate}}</h6>
                                <h6 class="text-muted mb-0">{{cheque.location}}</h6>
                            </div>
                            <div class="col-8 mt-4">
                                <h6 class="mb-0">{{cheque.bank}}, {{cheque.bankBranch}}</h6>
                                <span>{{cheque.accountNumber}}</span>
                            </div>
                            <div class="col-4 mt-4 align-self-center text-right">
                                <h4>{{cheque.amount}}{{cheque.currency}}</h4>
                            </div>
                            <div class="col-12 mt-4">
                                <span class="digital-font">{{cheque.referenceNumber}}</span>
                            </div>
                            <div class="col-12 submenu text-right">
                                <span class="rounded-pill bg-white text-primary mx-1 px-2" @click="seeChequeOriginal(cheque.originalImage)"
                                    v-if="cheque.originalImage">Orijinali Görüntüle</span>
                                <span class="rounded-pill bg-white text-success mx-1 px-2" @click="markCheque(index, cheque.id)"
                                    v-if="cheque.status == '0'">
                                    Alındı olarak işaretle</span>
                                <span class="rounded-pill bg-success text-white border border-success mx-1 px-2" @click="markCheque(index, cheque.id)"
                                    v-if="cheque.status == '1'">
                                    Alındı
                                </span>
                                <span class="rounded-pill bg-white text-danger ml-1 px-2" @click="deleteCheque(index, cheque.id)"
                                    title="Sil">Sil
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    #cheque-container {
        max-height: 800px;
        overflow: auto;
    }
</style>
<script>
    const {
        ipcRenderer
    } = require('electron')
    export default {
        data() {
            return {
                form: {
                    type: 'incoming',
                },
                cheques: {}
            }
        },
        mounted() {
            this.cheques = ipcRenderer.sendSync('getCheque', this.form);
        },
        methods: {
            deleteCheque(index, chequeId) {
                let result = ipcRenderer.sendSync('deleteCheque', {
                    chequeId
                });
                this.cheques.splice(index, 1);
            },
            markCheque(index, chequeId) {
                this.cheques[index].status = !this.cheques[index].status;
                let result = ipcRenderer.sendSync('markCheque', {
                    chequeId,
                    "status": this.cheques[index].status
                });
            },
            seeChequeOriginal(imagePath) {
                this.$modal.show({
                    template: `<img :src="imagePath" class="img-fluid"/>`,
                    props: ['imagePath']
                }, {
                    imagePath
                }, {
                    height: 'auto',
                    draggable: true
                })
            }
        }
    }
</script>