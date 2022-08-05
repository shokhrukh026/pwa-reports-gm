<template>
    <div class="home__page">
        <b-card class="home__page__card" no-body @click="goToPage('operator-performance')">
            <span class="mx-1">Abonentlardan qo'ng'iroqlarni qabul qilishning kunlik jadvali</span>
        </b-card>
        <b-card class="home__page__card" no-body @click="goToPage('operator-performance-report')">
            <span class="mx-1">Operator faoliyati haqida hisobot</span>
        </b-card>
        <b-card class="home__page__card" no-body @click="goToPage('talk-time-report')">
            <span class="mx-1">Vaqt bo'yicha hisobot</span>
        </b-card>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        goToPage(path){
            this.$router.push('/' + path)
        }
    }
}
</script>

<style lang="scss">
.home__page{
    width: 100%;
    height: 100%;
    min-height: 100vh;

    padding: 40px;

    display: flex;
    justify-content: space-around;
    align-items: center;



    &__card{
        width: 25vw;
        height: 25vw;

        display: flex;
        justify-content: center;
        align-items: center;
        
        cursor: pointer;
        box-shadow: rgba(3, 102, 214, 0.3) 0px 2px 4px 0px, rgba(3, 102, 214, 0.3) 0px 2px 16px 0px;

        span{
            font-weight: 600;
            text-align: center;
            font-size: 25px;
            color: rgba(3, 102, 214, 1);
        }

        &:hover{
            transform: translateY(-8px);
        }
    }
}
</style>