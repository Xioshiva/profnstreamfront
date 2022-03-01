const assert = require('assert')
const fetch = require("node-fetch")

function getTimer(idUtilisateur, idStream) {
    var data = JSON.stringify({"idUtilistateur": idUtilisateur, "idStream": idStream, "firstTime": true});
    let timer;
    fetch('http://localhost:8091/api', {
        credentials: "same-origin",
        mode: "same-origin",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: data
    }).then(resp => {
        if (resp.status === 200) return resp.json()
        else {
            console.log("Status: " + resp.status)
            return Promise.reject("server")
        }
    }).then(dataJson => {
        timer = JSON.parse(dataJson)
        return timer;
    }).catch(err => {
        if (err === "server") return
        console.log(err)
    })
}

function updateStatus(idUtilisateur, idStream, status) {
    var data = JSON.stringify({"idUtilistateur": idUtilisateur, "idStream": idStream, "firstTime": false});
    fetch('http://localhost:8091/api', {
        credentials: "same-origin",
        mode: "same-origin",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: data
    }).then(resp => {
        return resp.status
    })
}



describe('Test requetes Backend API for Token', () => {
    it('arrive aux Stream', () => {
        timer = getTimer(3, 4);
        assert.notEqual(timer, null);
    });
    it('quitter stream', () => {
        reqStatus = updateStatus(3,4, false);
        assert.equal(reqStatus, 200);
    });
});