<template>
  <div class="Chat">
    <div class="Messages"></div>
    <div class="submitMessage">
      <textarea
        id="message"
        type="text"
        @keydown.enter="submitForm"
        v-model="text"
        placeholder="Écrivez votre message..."
      />
      <button class="submit-button" type="submit" @click="sendMessage()">
        Chat
      </button>
    </div>
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
      var msg = document.getElementById("message").value;
      document.getElementById("message").value = "";

      var roomID = "roomID";
      var userID = id;
      socket.emit("chat message", { msg: msg, roomID: roomID, userID: userID });
      document.getElementsByClassName("Messages")[0].innerHTML +=
        "<p>" + userID + ": " + msg + "</p>";
    },
  },
});
</script>



<style scoped>
.Chat {
  background-color: #fff;
  width: 20.2%;
  display: inline-block;
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
  display: flex;
  flex-direction: column;
  height: 20%;
}

.submitMessage textarea {
  background-color: #e0e0e0;
  border-color: #000;
  border-radius: 2%;
  resize: none;
  font-family: "Ropa Sans", sans-serif;
}
.submitMessage button {
  margin-top: 2%;
  border-radius: 2%;
  height: 20%;
  width: 30%;
  background-color: #6f30a0;
  color: white;
}
</style>