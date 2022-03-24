<template>
    <div class="coding">
        <p>页面正在开发中...</p>
        <div class="btn" @click="$router.replace({ path: '/' })">
            返回首页
        </div>
    </div>
</template>

<script>

export default {
  name: "coding"
};
</script>

<style scoped>
.coding p{
    text-align: center;
    margin-top: 3rem;
}
.btn {
    color: #fff;
    background-color: #ef4c4c;
    font-size: 16px;
    padding: 0.16rem;
    border-radius: 25px;
    text-align: center;
    width: 2.4rem;
    margin: 0 auto;
    margin-top: 1rem;
}
</style>
