<template>
    <div class="countDown">
        <div class="time"><span>{{str}}</span> <button>待领</button></div>
    </div>
</template>

<script>
    export default {
        name: "countDown",
        props:['endTime','index'],
        data() {
            return {
                str:'00:00:00'
            }
        },
        mounted() {
            let endTime = this.endTime;
            let h = 23;
            let m = 59;
            let s = 59;
            setInterval(()=>{
                endTime--;
                if (endTime>0) {
                    h = Math.floor(endTime/3600);
                    m = Math.floor(endTime%3600/60);
                    s = Math.floor(endTime%60);
                    h = h<10?'0'+h:h;
                    m = m<10?'0'+m:m;
                    s = s<10?'0'+s:s;
                    this.str = h+':'+m+':'+s;
                } else {
                    this.str = '00:00:00'
                    this.$emit('countDownOut',this.index)
                }
            },1000)
        }
    }
</script>

<style scoped lang="scss">
    .countDown {
        margin-top: 10px;
        div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-content: center;
            box-sizing: content-box;
            -webkit-border-radius: 40px;
            -moz-border-radius: 40px;
            border-radius: 40px;
            border: 2px solid #105cf6;
            span {
                color: #666;
                padding: 0 10px;
            }
            button {
                background-color: #105cf6;
                color: #fff;
                padding: 0 10px;
                -webkit-border-radius: 40px;
                -moz-border-radius: 40px;
                border-radius: 40px;
            }
        }
    }
</style>
