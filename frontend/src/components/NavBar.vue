<template>
    <div class="top_navbar">
        <div class="class_information">
            <p class="Title">Introduction à l'électrodynamique</p>
            <p> par </p>
            <p class="Author">Mr.Pump</p>
        </div>
        <div class="user_information">
            <p class="Timer"> 4 : 59 </p>
            <Icon class="myCoinIcon" icon="fa-solid:coins" />
            <p class="Credit"> 0,00</p>
        </div>
    </div> 
</template>
<script>
import { Icon } from '@iconify/vue2'

export default {
    components: {
        Icon,
    },
}
</script>

<style>

.top_navbar {
    overflow: hidden;
    background-color: #6f30a0;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
    z-index: 1;
}

.class_information{
    display: flex;
    color: white;
}
.class_information p {
    margin: 0px 0px 0px 0px;
    padding: 1vh 0vh 1vh 1vh;
    margin-top: auto;
    opacity: 0.5;
}

.class_information .Title {
  font-weight: bold;
  text-decoration: underline;
  font-size: 4vh;
  opacity: 1;
}

.class_information .Author {
    text-decoration: underline;
}

.user_information {
    display: flex;
    color: white;
}

.user_information .Timer{
    color: #12ff00;
    background-color: #993bbb;
    border-style: solid;
    border-radius: 2vh;
    border-color: #12ff00;
    padding: 1vh 2vh 0vh 2vh;
    margin: auto;
    font-size: 3vh;
}
.myCoinIcon {
    margin: auto;
    padding: 1vh 1vh 1vh 2vh;
    font-size: 3vh;
}

.user_information .Credit {
    margin: auto;
    padding: 1vh 2vh 0vh 1vh;
    font-size: 3vh;
}

</style>