<template>
  <div class="Chat">
    <div class="Messages"></div>
    <div class="submitMessage">
      <textarea
        id="message_content"
        type="text"
        @keydown.enter="submitForm"
        v-model="text"
        placeholder="Écrivez votre message..."
      />
      <img src="../assets/btn_send.png" width="40" height="40" class="btn_send" v-on:click="sendMessage()" />
      <input type="checkbox" id="question" name="subscribe">
      <label for="subscribeNews">question</label>
    </div>
    <label>{{ checked }}</label>
  </div>
</template>



<script>
import { defineComponent } from "@vue/composition-api";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000", {
  origin: "*",
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
socket.on("connect", () => {});

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

var id = makeid(5);

var roomID = "roomID";

socket.emit("init", roomID);

socket.on("recieve message", (args) => {
  console.log("Recieved!");
  document.getElementsByClassName("Messages")[0].innerHTML +=
    "<p>" + args["userID"] + ": " + args["msg"] + "</p>";
});
export default defineComponent({
  setup() {},
  methods: {
    sendMessage() {
      var msg = document.getElementById("message_content").value;
      msg.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          document.getElementsByClassName("btn_send").click();
        }
      });
      document.getElementById("message_content").value = "";
      if (msg != "") {
        var roomID = "roomID";
        var userID = id;
        socket.emit("chat message", { msg: msg, roomID: roomID, userID: userID });
        document.getElementsByClassName("Messages")[0].innerHTML +=
          "<p>" + userID + ": " + msg + "</p>";
      }
    },
  },
});

</script>



<style scoped>
.Chat {
  background-color: #fff;
  width: 20.2%;
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  top: 7%;
  height: 100%;
  border: 3 solid #6f30a0;
}

.Messages {
  height: 80%;
  overflow: auto;
}

.submitMessage {
  display: inline-block;
  flex-direction: column;
  height: 20%;
  background-color: #e0e0e0;
  padding-left: 10px;
  height: 90px;
  border-radius: 20px;
  margin: 10px;
}

.submitMessage textarea {
  background-color: #e0e0e0;
  border-radius: 2%;
  resize: none;
  font-family: "Ropa Sans", sans-serif;
  border-style: none; 
  border-color: Transparent; 
  overflow: auto;
  height: 30px;
  width: 280px;

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
  padding-top: 12px;
  padding-left: 20px;
}
</style>