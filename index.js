const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Token del Bot de Telegram
const telegramToken = process.env.TELEGRAM_TOKEN
// ID del Canal de Telegram (puede empezar con @)
const telegramChannel = process.env.TELEGRAM_CHANNEL_ID

app.use(bodyParser.json());

app.post('/sendSignal', (req, res) => {
    // Aquí procesas el mensaje de TradingView. Ajusta según tus datos recibidos.
    const message = `Señal de Trading: ${req.body.message}`;

    // Enviar mensaje al canal de Telegram
    axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        chat_id: telegramChannel,
        text: message
    })
    .then(response => {
        console.log('Mensaje enviado con éxito');
        res.send('Ok');
    })
    .catch(error => {
        console.error('Error enviando mensaje a Telegram', error);
        res.status(500).send('Error');
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);

});



