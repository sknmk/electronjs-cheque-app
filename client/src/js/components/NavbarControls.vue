<template>
    <div class="container-fluid navbar-container px-0">
        <div class="row py-3">
            <router-link to="/Dashboard" tag="div" class="col-12 navbar-item">
                <div class="row navbar-label">
                    <div class="col-12">
                        <i class="ri-calculator-line ri-fw"></i>
                    </div>
                    <div class="col-10 align-self-center navbar-label-text">
                        Hesap Özeti
                    </div>
                </div>
            </router-link>
            <router-link to="/ChequeAdd" tag="div" class="col-12 navbar-item">
               <div class="row navbar-label">
                    <div class="col-12 px-0">
                        <i class="ri-edit-2-line ri-fw"></i>
                    </div>
                    <div class="col-10 align-self-center navbar-label-text">
                        Yeni Çek Oluştur
                    </div>
                </div>
            </router-link>
            <router-link to="/ChequeIncoming" tag="div" class="col-12 navbar-item">
                <div class="row navbar-label">
                    <div class="col-12">
                        <i class="ri-download-line ri-fw"></i>
                    </div>
                    <div class="col-10 align-self-center navbar-label-text">
                        Alınan Çekler
                    </div>
                </div>
            </router-link>
            <router-link to="/ChequeOutgoing" tag="div" class="col-12 navbar-item">
                <div class="row navbar-label">
                    <div class="col-12">
                        <i class="ri-upload-line ri-fw"></i>
                    </div>
                    <div class="col-10 align-self-center navbar-label-text">
                        Verilen Çekler
                    </div>
                </div>
            </router-link>
            <router-link to="/Accounts" tag="div" class="col-12 navbar-item">
                <div class="row navbar-label">
                    <div class="col-12">
                        <i class="ri-user-line ri-fw"></i>
                    </div>
                    <div class="col-10 align-self-center navbar-label-text">
                        Cariler
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<style>
    .navbar-item {
        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;
        cursor: pointer;
        padding: .9rem 1rem;
        margin: .2rem 0;
        color: #333;
        transition: .1s all ease-out;
        text-align: center;
    }

    .navbar-item:hover {
        background: rgba(29,161,242,.1);
        color: rgba(29,161,242,1.00)
    }

    .router-link-active {
        color: rgba(29,161,242,1.00)
    }

    .navbar-label {
        font-weight: 800;
        font-size: 14px;    
    }

    .navbar-label i {
        font-weight: 400;
        font-size: 1.5rem;
    }

    .navbar-label-text {
        display: none;
    }

</style>