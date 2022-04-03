<template>
    <div class="top_navbar">
        <div class="class_information">
            <p class="Title">Introduction à l'électrodynamique</p>
            <p class="par"> par </p>
            <p class="Author">Mr.Pump</p>
        </div>
        <div class="user_information">
            <p class="Timer"></p>
            <Icon class="myCoinIcon" icon="fa-solid:coins" />
            <p id="credit"></p>
        </div>
    </div> 
</template>
<script>
import { Icon } from '@iconify/vue2'
import swal from 'sweetalert2'
//import Stream from './Stream.vue'
  
export default {
    components: {
        Icon,
    },
}

const myHeader = new Headers({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    //'Access-Control-Allow-Origin': 'http://localhost:8081',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});


function toHHMMSS(time) {
    var sec_num = time; // don't forget the second param
    var minutes = Math.floor(sec_num / 60);
    var seconds = time - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}

async function getTime(userID, streamID){
    return fetch("http://localhost:8080/timer/"+ streamID +"/" + userID,{ method: 'get', headers: myHeader})
        .then(res=>{
            return res.json().then(o=>o["timer"])
        });
}

async function debitUser(userID, streamID){
    return fetch("http://localhost:8080/payment/"+ streamID +"/" + userID,{ method: 'get', headers: myHeader})
        .then(res=>{
            return res.json().then(o=>o["credits"])
        });
}

var credits = 7;

function updateClock(time){
    document.getElementById("credit").textContent = credits;
    document.getElementsByClassName("Timer")[0].innerHTML = toHHMMSS(time);
}

function userHasCredit(userID){
    console.log(userID);
    return false;
}

getTime("testman", "roomID").then(a=>{
    console.log("getTime Res:"  + a);
    var time = Math.floor(Math.max(a,0)/1000)
    updateClock(Math.floor(time));
    if(time > 0){
        var timerInterval = 
            window.setInterval(function(){
                time -=1;
                updateClock(Math.floor(time));
        }, 1000);   
    }else{
        clearInterval(timerInterval);
        if(!userHasCredit("testman")){
            swal.fire({
                title: 'Periode gratuite terminée',
                text: "Souhaitez-vous utiliser vos crédits pour continuer le cours ?",
                icon: "warning",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonColor: '#993bbb',
                confirmButtonText: 'Continuer',
                denyButtonText: `Quitter`,
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    debitUser(2, 1).then(res => {
                    credits = res;
                    if(credits >= 0){ // tester si le user a assez de crédit et si c'est le cas, on le débit
                        swal.fire({
                            icon: 'success',
                            title: 'Merci',
                            text: 'Vous avez été débité de 1 crédit',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 2000
                        })
                        document.getElementById("credit").textContent = credits;
                    } else {
                        swal.fire({
                            icon: 'error',
                            title: 'Echec',
                            text: 'Vous n\'avez pas assez de crédit pour continuer le cours',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 2000
                        })
                        // rediriger vers la page d'accueil
                    }
                    this.$root.$emit('clearSourceEvent')
                    this.$router.push('acceuil')
                    });
                } else if (result.isDenied) {
                    // rediriger vers la page d'accueil
                    this.$root.$emit('clearSourceEvent')
                    this.$router.push('acceuil')
                }
            })
            //location.reload();
        }
    }
});

</script>

<style>

.swal2-title, .swal2-text {
  font-family: Courier New, monospace;
}

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
    font-size: 2vh;
}

p {
    font-size: 2vh;
}

.user_information {
    display: flex;
    color: white;
    margin-right: 5vh;
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

.user_information #credit {
    margin: auto;
    padding: 1vh 2vh 0vh 1vh;
    font-size: 3vh;
}

@media only screen and (max-width: 810px){
    .top_navbar {
        display: inline-block;
    }
    .class_information .Title {
        font-size: 2vh;
    }
    .class_information .par {
        font-size: 1vh;
    }
    .class_information .Author {  
        font-size: 1vh;
    }
    .user_information .Timer {
        margin: 0vh 1vh 0vh 8vh;
        font-size: 2vh;
    }
    .user_information .Credit {
        padding: 0vh 0vh 0vh 0vh;
        margin: 0vh 0vh 0vh 1vh;
        font-size: 3vh;
    }
    .myCoinIcon {
        margin: 0vh 0vh 0vh 12vh;
        padding: 0vh 0vh 0vh 0vh;
        font-size: 3vh;
    }
    
}
</style>