<template>
    <li :class="mode">
        <slot></slot>
    </li>
</template>

<script>
export default {
    props: ['mode']
}
</script>

<style scoped>
li{
    border-radius: 100px;
    margin: 0 0.5rem;
    padding: 0.5rem;
    min-width: 7rem;
    text-align: center;
    background-color: rgb(226, 195, 255);
}
.chemistry{
    background-color: rgb(70, 18, 100);
    color: white;
}
.chemistry-unselected{
    border: 2px solid;
    border-color: rgb(70, 18, 100);
    background-color: white;
    color: black;
}
.physics{
    background-color: rgb(199, 45, 135);
    color: white;
}
.physics-unselected{
    border: 2px solid;
    border-color: rgb(199, 45, 135);
    background-color: white;
    color: black;
}
.mathematics{
    background-color: rgb(130, 74, 182);
    color: white;
}
.mathematics-unselected{
    border: 2px solid;
    border-color: rgb(130, 74, 182);
    background-color: white;
    color: black;
}
.biology{
    background-color: rgb(226, 195, 255);
}
.biology-unselected{
    border: 2px solid;
    border-color: rgb(226, 195, 255);
    background-color: white;
    color: black;
}
</style>