<template>
  <div>
    <button :style="CollapseMovmChat" class="Collapsebtn" v-on:click="test" v-class="{active : isOpen}"> coucu </button>
    <collapse-transition dimension="width">
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
  components: {
    CollapseTransition,
  },
  data() {
    return {isOpen: true}
  },

  setup() {},
  methods: {
    sendMessage() {
      var msg = document.getElementById("message").value;
      document.getElementById("message").value = "";
      if (msg != "") {
        var roomID = "roomID";
        var userID = id;
        socket.emit("chat message", { msg: msg, roomID: roomID, userID: userID });
        document.getElementsByClassName("Messages")[0].innerHTML +=
          "<p class=\"kek\">" + userID + ": " + msg + "</p>";
      }
    },
    test: function() {
      this.isOpen = !this.isOpen
      this.$emit('isopen', this.isOpen);
    }
  },
  computed : {
    CollapseMovmChat() {
      if(this.isOpen) {
        return {
          right: '20.3%',
        };
      }else {
        return { 
          right: '0' 
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
  top: 7%;
  position: fixed;
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
  padding-left: 1vh;
  width: 4vh;
  height: 4vh;
}

.kek{
  padding-left: 10px;
  margin-left: 10px;
}

#question{
  width: 2vh;
}
</style>