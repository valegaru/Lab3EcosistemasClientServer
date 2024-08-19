const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

const db = {
	players: [],
};

app.get('/users', (request, response) => {
	response.send(db);
});

app.post('/user', (request, response) => {
	const { body } = request;
  const existingPlayer = db.players.find(player => player.name === body.name);

  if (existingPlayer) {
		existingPlayer.move = body.move;
	} else {
		if (db.players.length >= 2) {
			return response.status(400).send({ message: 'The game already has 2 players.' });
		}
		db.players.push(body);
  }

	if (db.players.length === 2) {
		const result = determineWinner(db.players[0], db.players[1]);

		db.players[0].result = result;
		db.players[1].result = result;

		response.status(201).send({ ...body, result });

		setTimeout(() => {
			db.players = [];
		}, 10000); // limpiar a los 10 segundos
	} else {
		response.status(201).send(body); // We return the same object received and also I send a code 201 which means an object was created
	}
});

app.listen(5050, () => {
	console.log(`Server is running on http://localhost:${5050}`);
});


function determineWinner(player1, player2) {
	const move1 = player1.move;
	const move2 = player2.move;

	if (move1 === move2) {
		return 'draw';
	}

	if (
		(move1 === 'rock' && move2 === 'scissors') ||
		(move1 === 'scissors' && move2 === 'paper') ||
		(move1 === 'paper' && move2 === 'rock')
	) {
		return `${player1.name} wins!`;
	}

	return `${player2.name} wins!`;
}
