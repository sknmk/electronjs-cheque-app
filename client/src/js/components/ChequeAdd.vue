<template>
    <div class="container-fluid px-0">
        <div class="row pb-5">
            <div class="col-12 mb-3">
                <h5 class="bold mt-4">Yeni Çek Kaydı</h5>
            </div>
            <div class="col-md-6 mb-4">
                <div class="input-group" :class="{'has-error' : exception.type}">
                    <select class="form-control" v-model="cheque.type" @change="setAccounts()">
                        <option value="incoming">Alınan Çek</option>
                        <option value="outgoing">Verilen Çek</option>
                    </select>
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="ri-arrow-up-down-line ri-fw ml-1"></i></span>
                    </div>
                </div>
                <span class="exception text-danger" v-if="exception.type">Geçersiz değer.</span>
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-6 mb-3">
                <label :class="{'label-filled': cheque.referenceNumber, 'label-empty': !cheque.referenceNumber}">Çek Numarası</label>
                <div class="input-group" :class="{'has-error' : exception.referenceNumber}">

                    <input type="text" class="form-control" v-model="cheque.referenceNumber" maxlength="50" />
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="ri-key-2-line ri-fw ml-1"></i></span>
                    </div>
                </div>
                <span class="exception text-danger" v-if="exception.referenceNumber">Geçersiz değer.</span>
            </div>
            <div class="col-md-6 mb-3">
                <label :class="{'label-filled': cheque.accountNumber, 'label-empty': !cheque.accountNumber}">Çek Hesap No</label>
                <div class="input-group" :class="{'has-error' : exception.accountNumber}">
                    <input type="text" class="form-control" v-model="cheque.accountNumber" maxlength="26" />
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="ri-barcode-box-line ri-fw ml-1"></i></span>
                    </div>
                </div>
                <span class="exception text-danger" v-if="exception.accountNumber">Geçersiz değer.</span>
            </div>

            <div class="col-12 mb-3">
                <hr />
            </div>

            <div class="col-md-6 mb-4">
                <label :class="{'label-filled': cheque.bank, 'label-empty': !cheque.bank}">Banka</label>
                <div class="input-group" :class="{'has-error' : exception.bank}">
                    <input type="text" class="form-control" v-model="cheque.bank" />
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="ri-bank-line ri-fw ml-1"></i></span>
                    </div>
                </div>
                <span class="exception text-danger" v-if="exception.bank">Geçersiz değer.</span>
            </div>
            <div class="col-md-6 mb-4">
                <label :class="{'label-filled': cheque.bankBranch, 'label-empty': !cheque.bankBranch}">Şube</label>
                <div class="input-group" :class="{'has-error' : exception.bankBranch}">
                    <input type="text" class="form-control" v-model="cheque.bankBranch" />
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="ri-bank-fill ri-fw ml-1"></i></span>
                    </div>
                </div>
                <span class="exception text-danger" v-if="exception.bankBranch">Geçersiz değer.</span>
            </div>
            <div class="col-md-6 mb-4">
                <label :class="{'label-filled': cheque.interlocutor, 'label-empty': !cheque.interlocutor}">Muhatap</label>
                <div class="input-group" :class="{'has-error' : exception.interlocutor}">
                    <select class="form-control" v-model="cheque.interlocutor">
                        <option v-for="(interlocutor, index) in interlocutors" :key="index" :value="interlocutor.id">
                            {{interlocutor.name}}
                        </option>
                    </select>
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="ri-user-received-line ri-fw ml-1"></i></span>
                    </div>
                </div>
                <span class="exception text-danger" v-if="exception.interlocutor">Geçersiz değer.</span>
            </div>
            <div class="col-md-6 mb-4">
                <label :class="{'label-filled': cheque.author, 'label-empty': !cheque.author}">Keşideci</label>
                <div class="input-group" :class="{'has-error' : exception.author}">
                    <select class="form-control" v-model="cheque.author">
                        <option v-for="(author, index) in authors" :key="index" :value="author.id">
                            {{author.name}}
                        </option>
                    </select>
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="ri-user-shared-line ri-fw ml-1"></i></span>
                    </div>
                </div>
                <span class="exception text-danger" v-if="exception.author">Geçersiz değer.</span>
            </div>
            <div class="col-md-6 mb-3">
                <label :class="{'label-filled': cheque.location, 'label-empty': !cheque.location}">Keşide Yeri</label>
                <div class="input-group" :class="{'has-error' : exception.location}">
                    <input type="text" class="form-control" v-model="cheque.location" />
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="ri-map-pin-2-line ri-fw ml-1"></i></span>
                    </div>
                </div>
                <span class="exception text-danger" v-if="exception.location">Geçersiz değer.</span>
            </div>

            <div class="col-12 mb-3">
                <hr />
            </div>

            <div class="col-md-6 mb-4">
                <label :class="{'label-filled': cheque.dueDate, 'label-empty': !cheque.dueDate}">Vade</label>
                <div class="input-group" :class="{'has-error' : exception.dueDate}">
                    <date-picker v-model="cheque.dueDate" format="DD.MM.YYYY"
                        input-class="form-control">
                        <i class="input-group-text ri-calendar-event-line ri-fw ml-1" slot="icon-calendar"></i>
                    </date-picker>
                </div>
                <span class="exception text-danger" v-if="exception.dueDate">Geçersiz değer.</span>
            </div>
            <div class="col-md-6 mb-4">
                <label :class="{'label-filled': cheque.amount, 'label-empty': !cheque.amount}">Tutar</label>
                <div class="input-group" :class="{'has-error' : exception.amount}">
                    <input type="number" step="0.01" class="form-control text-right"
                        v-model="cheque.amount" />
                    <div class="input-group-append">
                        <span class="input-group-text">
                            <select v-model="cheque.currency" class="form-control">
                                <option value="TRY">₺</option>
                                <option value="USD">$</option>
                                <option value="EUR">€</option>
                            </select>
                        </span>
                    </div>
                </div>
                <span class="exception text-danger" v-if="exception.amount || exception.currency">Geçersiz değer.</span>
            </div>
            <div class="col-12 mb-3">
                <button class="btn btn-outline-secondary btn-sm bold" @click="seeChequeOriginal">
                    <span v-if="!cheque.originalImage"><i class="ri-image-add-line"></i> Görsel Yükle</span>
                    <span v-else><i class="ri-gallery-upload-line"></i> Görseli Değiştir</span>
                </button>
                <div class="row" v-if="cheque.originalImage">
                    <div class="offset-md-4 col-md-4">
                        <img :src="cheque.originalImage" alt="Çek Görüntüsü" class="img-fluid" />
                    </div>
                </div>
                <span class="exception text-danger" v-if="exception.originalImage">Görsel yüklenemiyor!</span>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-right footer-buttons py-2">
                <button class="btn btn-outline-secondary btn-sm bold" @click="reset">
                    Sıfırla
                </button>
                <button class="btn btn-outline-primary bold btn-sm" :disabled="waiting"
                    :class="{'btn-danger': exception, 'btn-success': success, 'disabled': waiting}" @click="saveCheque">
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
        right: 0;
        background: white;
        box-shadow: 0 -2px 3px rgba(0, 0, 0, .05);
        z-index: 20;
    }

    .mx-datepicker {
        width: 100%
    }

    .mx-datepicker-main {
        font: 14px/1.5 "Inter",Helvetica,Arial,sans-serif;
        font-weight: 600;
        color: #333;
    }
</style>
<script>
    const { ipcRenderer } = require('electron');
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import 'vue2-datepicker/locale/tr';
    export default {
        data() {
            return {
                cheque: {
                    currency: "TRY",
                    amount: '',
                    type: 'incoming',
                    originalImage: ''
                },
                interlocutors: {},
                accounts: {},
                authors: {},
                waiting: false,
                exception: false,
                success: false
            }
        },
        components: {
            DatePicker
        },
        mounted() {
            this.accounts = ipcRenderer.sendSync('getAccounts')
            this.setAccounts()
        },
        methods: {
            setAccounts() {
                if (this.cheque.type == "incoming") {
                    this.interlocutors = this.accounts.filter(a => {
                        return a.isSystemOwner == "1"
                    })
                    this.authors = this.accounts.filter(a => {
                        return a.isSystemOwner == "0"
                    })
                } else {
                    this.interlocutors = this.accounts.filter(a => {
                        return a.isSystemOwner == "0"
                    })
                    this.authors = this.accounts.filter(a => {
                        return a.isSystemOwner == "1"
                    })
                }
            },
            saveCheque() {
                let result = ipcRenderer.sendSync('saveCheque', this.cheque)
                if (result.exceptions) {
                    this.exception = result.exceptions
                } else {
                    this.success = true
                    this.waiting = true
                    this.reset()
                    setTimeout(() => {  this.success = false }, 2000)
                    setTimeout(() => {  this.waiting = false }, 2000)
                }
            },
            reset() {
                this.cheque = {
                    currency: "TRY",
                    amount: '',
                    type: 'incoming'
                }
                this.exception = false
            },
            seeChequeOriginal() {
                let imagePath = ipcRenderer.sendSync('getChequeImage')
                if (typeof imagePath === undefined || imagePath[0].length < 2) {
                    console.log("Hata")
                    this.exception.originalImage = "invalidPath"
                } else {
                    console.log("Görsel alındı.")
                    this.cheque.originalImage = imagePath[0]
                }  
            }
        }
    }
</script>