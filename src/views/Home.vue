<template>
    <div class="home__page">



        <b-dropdown variant="none" class="m-md-2 home__page_lang" >
            
            <template #button-content>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAf4AAAFUBAMAAAA3xkOeAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAD1BMVEX///9UesMAOaZGNHnVKx7DEDWkAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+EICgkaN0lArXkAAAEiSURBVHja7c/RAAAgFASwU0ghhRTyZwrh9X+bwRIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAweqW3c3f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f/+t/uuV28/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3nz3eJP1tWKHihAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wOC0xMFQwOToyNjo1NCswMDowMP/vXlAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDgtMTBUMDk6MjY6NTQrMDA6MDCOsubsAAAAAElFTkSuQmCC"
                    alt="ru" width="22" height="14" class="">
                <span class="ml-50 text-body">{{$i18n.locale == 'uz' ? 'O`zbek' : 'Русский'}}</span>
            </template>

            <b-dropdown-item @click="langChanged('ru')">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAf4AAAFUBAMAAAA3xkOeAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAD1BMVEX///9UesMAOaZGNHnVKx7DEDWkAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+EICgkaN0lArXkAAAEiSURBVHja7c/RAAAgFASwU0ghhRTyZwrh9X+bwRIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAweqW3c3f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f/+t/uuV28/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3nz3eJP1tWKHihAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wOC0xMFQwOToyNjo1NCswMDowMP/vXlAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDgtMTBUMDk6MjY6NTQrMDA6MDCOsubsAAAAAElFTkSuQmCC"
                    alt="ru" width="22" height="14" class="">
                <span class="ml-50 text-body">Русский</span>
            </b-dropdown-item>

            <b-dropdown-divider></b-dropdown-divider>
            
            <b-dropdown-item @click="langChanged('uz')">
                <img src="data:image/png;base64,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"
                    alt="uz" width="22" height="14" class="">
                <span class="ml-50">O`zbek</span>
            </b-dropdown-item>

        </b-dropdown>




        <div class="home__page_container">
            <b-card class="home__page__card bg-yellow" no-body @click="goToPage('operator-performance')">
                <img src="@/assets/images/presention-chart.svg" width="80" class="" alt="">
                <span class="mx-1 mt-50">{{$t('report.daily_chart_of_receiving_calls')}}</span>
            </b-card>
            <b-card class="home__page__card bg-green" no-body @click="goToPage('operator-performance-report')">
                <img src="@/assets/images/personalcard.svg" width="80" class="" alt="">
                <span class="mx-1 mt-50">{{$t('report.operator_performance_report')}}</span>
            </b-card>
            <b-card class="home__page__card bg-blue" no-body @click="goToPage('talk-time-report')">
                <img src="@/assets/images/clock.svg" width="80" class="" alt="">
                <span class="mx-1 mt-50">{{$t('report.report_by_time')}}</span>
            </b-card>
        </div>




        <div style="width: 100%; height: 50px;"></div>



        <div class="overlay"></div>


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
        },
        langChanged(value){
            this.$i18n.locale = value;
        }
    }
}
</script>

<style lang="scss">

</style>