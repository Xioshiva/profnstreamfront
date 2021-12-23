<template>
    <div class="Chat">
        <div class="Messages">
            <p>message2</p>

            
        </div>
        <div class="submitMessage">
            <textarea
                id="message"
                type="text"
                @keydown.enter="submitForm"
                v-model="text"
                placeholder="Écrivez votre message..."
            />
            <button class="submit-button" type="submit">
                Chat
            </button>
        </div>
    </div>
</template>

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
    border:3 solid #6f30a0;
}

.Messages {
    height: 80%;
    overflow: auto
}

.submitMessage {
    display: flex;
    flex-direction: column;
    height: 20%;
}

.submitMessage textarea {
    background-color: #E0E0E0;
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