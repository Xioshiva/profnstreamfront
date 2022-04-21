<template>
  <div>
    <img :src="imageSource" width="40" height="120" :style="CollapseMovmChat" class="Collapsebtn" v-on:click="collapse"/>    
    <collapse-transition dimension="width" :duration="0">
    <div class="ComponentChat" v-show="isOpen">
      <div class="Messages"></div>
      <div class="submitMessage">
        <textarea
          id="message"
          type="text" 
          @keypress.enter="sendMessage()"
          v-model="text"
          placeholder="Écrivez votre message..."
        />
        <img src="../assets/btn_send.png" width="40" height="40" class="btn_send" v-on:click="sendMessage()" />
        <input type="checkbox" id="question" name="subscribe">
        <label for="subscribeNews">question</label>
      </div>
      <label>{{ checked }}</label>
    </div>
    </collapse-transition>
  </div>
</template>

<script>
import { CollapseTransition } from "@ivanv/vue-collapse-transition"
import { defineComponent } from "@vue/composition-api";
import { io } from "socket.io-client";
import swal from 'sweetalert2'

const socket = io("http://localhost:3000", {
  origin: "*",
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
socket.on("connect", () => {});

const myHeader = new Headers({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    //'Access-Control-Allow-Origin': 'http://localhost:8081',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});

var userID = makeid(5);
var array = [ makeid(5), makeid(5), makeid(5)];
var roomID = "roomID";

function lol(userID, streamID){
  console.log("hello");

  console.log("current userID = " + userID);
  var newProfUserID = 11;
  console.log("new userID = " + newProfUserID);
 
  var userToBan = 2;
  console.log("new userID to ban = " + userToBan);
  
  var newStreamID = 0;
  console.log("current streamID = " + streamID);
  console.log("new streamID = " + newStreamID);

  checkIfUserIsProf(newProfUserID).then(res => {
    if(res){
      swal.fire({
      position: 'center-end',
      target: document.getElementsByClassName("Messages"),
      width: document.getElementsByClassName("Messages")[0].clientWidth,
      text: "Que souhaitez-vous faire ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      denyButtonColor: '#993bbb',
      confirmButtonText: 'Bannir l\'utilisateur',
      denyButtonText: `Supprimer le message`,
      allowOutsideClick: false
    }).then((result) => {
          if (result.isConfirmed) {
            banUser(newStreamID, userToBan).then( res => {
              if(res == 200){
                swal.fire({
                  position: 'center-end',
                  target: document.getElementsByClassName("Messages"),
                  width: document.getElementsByClassName("Messages")[0].clientWidth,
                  text: 'Utilisateur banni!'
                })
              }
            });
          } else if (result.isDenied) {
              swal.fire({
                position: 'center-end',
                target: document.getElementsByClassName("Messages"),
                width: document.getElementsByClassName("Messages")[0].clientWidth,
                text: 'Message supprimé'
              })
            }
      });
    }
  });
}

window.lol = lol;

async function checkIfUserIsProf(userID){
    return fetch("http://localhost:8080/credential/" + userID,{ method: 'get', headers: myHeader})
        .then(res=>{
            return res.json().then(o=>o["credential"])
        });
}

async function banUser(streamID, userID){
    return fetch("http://localhost:8080/banned/add/" + streamID, + "/" + userID,{ method: 'get', headers: myHeader})
      .then(res=>{
            return res.status
        });
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
    return result;
}

socket.emit("init", {roomID: roomID, userID: userID});
socket.on("recieve message", (args) => {
  console.log("Recieved!");
  if(args["question"] == 1){
    console.log("Bonjour 1 " + userID + " - " + roomID);
    document.getElementsByClassName("Messages")[0].innerHTML =
    "<div> \
      <button onclick=\"lol(userID, roomID)\"> \
        <p style=\"font-weight:bolder;color:red;\" class=\"kek\">" + array[Math.floor(Math.random() * 3)] + ": " + "</p> \
        <p style=\"color:red;word-wrap:break-word;\" class=\"kek\">" + args["msg"] + "</p> \
      </button> \
    </div>" + 
    document.getElementsByClassName("Messages")[0].innerHTML;  
  } else {
    console.log("Bonjour 2 " + userID + " - " + roomID);
    document.getElementsByClassName("Messages")[0].innerHTML =
    "<div> \
      <button onclick=\"lol(userID, roomID)\"> \
        <p style=\"font-weight:bolder;\" class=\"kek\">" + array[Math.floor(Math.random() * 3)] + ": " + "</p> \
        <p style=\"word-wrap:break-word;\" class=\"kek\">" + args["msg"] + "</p> \
      </button> \
    </div>" + 
    document.getElementsByClassName("Messages")[0].innerHTML;
  }
});

export default defineComponent({
  components: {
    CollapseTransition,
  },
  data() {
    return {
      isOpen: true,
      imageSource: require('@/assets/collapse.png'),
      winWidth : 0
    }
  },  
  mounted() {
    this.winWidth = window.innerWidth;
    var test;
    window.onresize = () => {
      clearTimeout(test);
      test = setTimeout(this.resizeWidth, 1);
    }
  },
  destroyed() {
    window.onresize = null
  },
  methods: {
    sendMessage() {
      var msg = document.getElementById("message").value;
      document.getElementById("message").value = "";
      if (msg != "") {
        if(document.getElementById("question").checked){
          socket.emit("chat message", { msg: msg, roomID: "roomID", userID: "testman", question: 1});
        } else {
          socket.emit("chat message", { msg: msg, roomID: "roomID", userID: "testman", question: 0});
        }

        if(document.getElementById("question").checked){
          console.log("Bonjour 3 " + userID + " - " + roomID);
          document.getElementsByClassName("Messages")[0].innerHTML =
          "<div> \
            <button onclick=\"lol( + userID + ,  + roomID + )\" style=\"padding: 0; border: none; background: none;\"> \
              <span style=\"font-weight:bolder;color:red;\" class=\"kek\">" + array[Math.floor(Math.random() * 3)] + ": " + "</span>" +
              "<span style=\"color:red;word-wrap:break-word;\" class=\"kek\">" + msg + "</span> \
            </button>" +
          "</div>" + 
          document.getElementsByClassName("Messages")[0].innerHTML;
        }else {
          console.log("Bonjour 4 " + userID + " - " + roomID);
          document.getElementsByClassName("Messages")[0].innerHTML =
          "<div> \
            <button onclick=\"lol(userID, roomID)\" style=\"padding: 0; border: none; background: none;\"> \
              <span style=\"font-weight:bolder;\" class=\"kek\">" + array[Math.floor(Math.random() * 3)] + ": " + "</span>" +
              "<span style=\"word-wrap:break-word;\" class=\"kek\">" + msg + "</span> \
            </button>" +
          "</div>" + 
          document.getElementsByClassName("Messages")[0].innerHTML;
        }
      }
    },
    collapse: function() {
      this.isOpen = !this.isOpen
      if(this.isOpen) {
        this.imageSource = require('@/assets/collapse.png')
      }else {
        this.imageSource = require('@/assets/expand.png')
      }
      this.$emit('collapse', this.isOpen);
    },
    resizeWidth() {
      this.winWidth = window.innerWidth;
    }
  },
  computed : {
    CollapseMovmChat() {
      if(this.isOpen) { 
        if(this.winWidth < 810){
          return {
            top: '28%',
            right: '50%',
          };
        }else{
          return {
            top: '85%',
            right: '20.2%',
          };
        }
        
      }else {
        if(this.winWidth < 810) {
          return {
            top: '94%',
            right: '50%'
          }
        }else{
          return {
            top: '85%',
            right: '0%' 
          }
        }
      }
    },
  }
});
</script>

<style scoped>

.Collapsebtn {
  display: flex;
  flex-direction: column;
  top: 85%;
  position: fixed;
  height: 10%;
  width: 2%;
  z-index: 1;
}

.ComponentChat {
  background-color: #fff;
  width: 20.2%;
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  top: 7%;
  height: 100%;
  border: 3 solid #6f30a0;
  font-size: 2vh;
  z-index: 1;
}

.Messages {
  height: 80%;
  padding-left: 5px;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
}

.submitMessage {
  display: inline-block;
  flex-direction: column;
  height: 20%;
  background-color: #e0e0e0;
  padding-left: 1vh;
  height: 10vh;
  border-radius: 2vh;
  margin: 1vh;
}

.submitMessage textarea {
  background-color: #e0e0e0;
  border-radius: 2%;
  resize: none;
  font-family: "Ropa Sans", sans-serif;
  border-style: none; 
  border-color: Transparent; 
  overflow: auto;
  height: 3vh;
  width: 30vh;
  font-size: 2vh;

  border: none;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;
}

.submitMessage label {
  font-family: "Ropa Sans", sans-serif;
  color: #696969;
}

.btn_send{
  padding-top: 2vh;
  padding-left: 3vh;
  width: 4vh;
  height: 4vh;
}

#question{
  width: 2vh;
}

@media only screen and (max-width: 810px){
  .ComponentChat {
    top: 35%;
    width: 100%;
  }
  .Collapsebtn{
    transform: rotate(90deg);
    width: 7%
  }
  .Messages {
    height: 54%;
  }
  .btn_send {
    padding-left: 6vh;
  }
}

</style>