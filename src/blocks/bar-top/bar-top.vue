<template>
    <div class="bar-top">
        <div class="bar-top__wrapper">
            <div class="bar-top__body">
                <p class="bar-top__title">Тикеты</p>
                <div class="bar-top__icons">
                    <div class="bar-top__icon">
                        <img
                            :src="getStaticUrl('ico-alert.svg')"
                            alt=""
                            class="bar-top__ico"
                        />
                    </div>
                    <div class="bar-top__icon">
                        <img
                            :src="getStaticUrl('ico-user.svg')"
                            alt=""
                            class="bar-top__ico"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BarTop"
};
</script>

<style lang="less" src="./bar-top.less"></style>
