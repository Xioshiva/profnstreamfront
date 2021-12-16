<template>
    <div class="top_navbar">
        <div class="class_information">
            <p class="Title">Introduction à l'électrodynamique</p>
            <p> par </p>
            <p class="Author">Mr.Pump</p>
        </div>
        <div class="user_information">
            <p class="Timer"> 4:59 </p>
            <p class="credit"> 0,00</p>
        </div>
    </div> 
</template>

<style>

.top_navbar {
    overflow: hidden;
    background-color: purple;
    display: flex;
    justify-content: space-between;
}

.class_information{
    display: flex;
    color: white;
}
.class_information p {
    margin: 0px 0px 0px 0px;
    padding: 1vh 1vh 1vh 1vh;
}

.user_information {
    display: flex;
    color: white;
}

.Title {
  font-weight: bold;
  text-decoration: underline;
  font-size: 4vh;
}

.Author {
    bottom: 0;
    text-decoration: underline;
}






</style>