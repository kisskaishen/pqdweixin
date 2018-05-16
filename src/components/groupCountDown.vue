<template>
    <div class="countDown">
        剩余{{time}}
    </div>
</template>

<script>
    export default {
        props: ['endTime'],
        name: "countDown",
        data() {
            return {
                now: 0
            }
        },
        mounted() {
            let self = this;
            setInterval(function () {
                self.now = new Date().getTime() / 1000
            }, 1000);
        },
        computed: {
            time() {
                return this.format(this.endTime - this.now)
            }
        },
        methods: {
            format(time) {
                let day = Math.floor(time / 86400)
                let hour = Math.floor(time / 3600 % 24)
                let min = Math.floor(time / 60 % 60)
                let sec = Math.floor(time % 60)
                day = day < 10 ? "0" + day : day;
                hour = hour < 10 ? "0" + hour : hour;
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;
                return day + ':' + hour + ':' + min + ':' + sec;
            }
        }
    }
</script>

<style scoped>

</style>
