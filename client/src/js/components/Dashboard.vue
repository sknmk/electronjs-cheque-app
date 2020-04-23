<template>
    <div class="container-fluid px-0">
        <div class="row d-flex align-items-stretch">
            <div class="col-12">
                <h5 class="bold mt-4">Hesap Özeti</h5>
            </div>
            <div class="col-6">
                <div class="row">
                    <div class="col-12 mt-2 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <balance :height="100"></balance>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <most-debt :height="200"></most-debt>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <most-receivable :height="200"></most-receivable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 mt-2">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="timeline">
                            <ul>
                                <li v-for="(cheque) in this.summary" :key="cheque.id">
                                    <div class="bullet pink" :class="{'pink': cheque.type == 'outgoing', 'green': cheque.type == 'incoming'}"></div>
                                    <div class="time">{{cheque.formattedDueDate}}</div>
                                    <div class="desc">
                                        <h3>{{cheque.type == 'outgoing' ? cheque.interlocutorName:cheque.authorName}}</h3>
                                        <h4>{{cheque.bank}}</h4>
                                        <p>
                                            {{cheque.amount}} {{cheque.currency}}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import Balance from "./Charts/Balance.vue" 
    import MostDebt from "./Charts/MostDebt.vue" 
    import MostReceivable from "./Charts/MostReceivable.vue" 
    const { ipcRenderer } = require('electron')
    export default {
        data() {
            return {
                summary: {}
            }
        },
        components: {
            Balance, MostDebt, MostReceivable
        },
        mounted() {
            this.summary = ipcRenderer.sendSync('getSummary')
        },
        methods: {

        }
    }
</script>