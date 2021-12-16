<template>
    <div class="Chat">
        <div class="Messages">
            <p>message1</p>
            <p>message2</p>
            <p>message3</p>
        </div>
        <form class="submitMessage">
            <div class="input">
                <label for="message">Type a message...</label>
                <br>
                <textarea
                    id="message"
                    type="text"
                    @keydown.enter="submitForm"
                    v-model="text"
                    placeholder="Type a message..."
                />
            </div>
            <br>
            <button class="submit-button" type="submit">
                <img :src="send" alt="" />
            </button>
        </form>
    </div>
</template>

<style scoped>
.Chat {
    background-color: #fff;
    width: 300px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 48px);
    float: right;
}

button.chat {
  background-color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 16px 0 0 16px;
  padding: 16px 14px 13px 18px;
}
.Messages {
    flex: 1;
    padding-right: 32px;
    padding-bottom: 180%;
}
input {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
}


.input textarea {
  width: 100%;
  border: none;
  resize: none;
  font-family: "Ropa Sans", sans-serif;
  font-size: 16px;
}
.input textarea::placeholder {
  font-family: "Ropa Sans", sans-serif;
  font-size: 16px;
}

form {
  border-bottom: 2px solid #c8d1dc;
}
.submit-button {
  padding: 4px;
  margin: 0 0 0 16px;
  border: none;
}

.chat-message {
  color: #121a24;
  text-align: left;
  font-size: 14px;
  line-height: 18px;
  margin: 0 0 20px;
}

@media screen and (max-width: 700px) {
  .Chat {
    width: calc(100% - 104px);
    right: calc((100% + 56px) * -1);
  }
}
</style>