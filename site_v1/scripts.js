const http = require('http');
const fs = require('fs');

window.onload = function() {
    let card_1_body = getElementById('card_1_body');
    card_1_body.innerHTML = '<textarea class="card-description" maxlength="400" placeholder="Опис картки">hello wrld</textarea>';
}