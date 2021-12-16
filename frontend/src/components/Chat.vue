<template>
    <div class="Chat">
        <div class="Messages">
            <p>message1</p>
            <p>message2</p>
            <p>message3</p>
        </div>
        <form class="submitMessage">
            <div class="input">
                <br>
                <textarea
                    id="message"
                    type="text"
                    @keydown.enter="submitForm"
                    v-model="text"
                    placeholder="Écrivez votre message..."
                />
              <button class="submit-button" type="submit">
                  <img :src="send" alt="" />
              </button>
            </div>
            <br>
        </form>
    </div>
</template>

<style scoped>
.Chat {
    background-color: #fff;
    width: 385px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 48px);
    float: right;
}

button.chat {
  background-color: #000;
  border: #000;
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

input[type="submit"] {
    margin-left: -50px;
    height: 20px;
    width: 50px;
}

.input textarea {
  width: 100%;
  padding: 20px;
  border-radius: 25px;
  background: #E0E0E0;
  border: #000;
  resize: none;
  font-family: "Ropa Sans", sans-serif;
  font-size: 20px;
  padding-bottom: 12px;
}
.input textarea::placeholder {
  position: absolute;
  left: 0;
  top: 20px;
  font-family: "Ropa Sans", sans-serif;
  font-size: 16px;
  padding: 0 20px;
}

form {
  border-bottom: 10px solid #c8d1dc;
}
.submit-button {
  padding: 20px;
  margin: 16px 14px 0 350px;
  border: #000;
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