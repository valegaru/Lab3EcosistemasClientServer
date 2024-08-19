document.getElementById('player-form').addEventListener('submit', createUser);

async function createUser(event) {
	event.preventDefault();
	renderLoadingState();
	try {
		const playerName = document.getElementById('player-name').value;
		const move = document.querySelector('input[name="move"]:checked').value;
		const player = {
			name: playerName,
			move: move,
			profilePicture: 'https://avatar.iran.liara.run/public/13', // if you want to generate random images for user profile go to this link:
		};
		const response = await fetch('http://localhost:5050/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', // Specify the content type as JSON
			},
			body: JSON.stringify(player), // Convert the data to a JSON string
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderData();
		console.log(response);
	} catch (error) {
		renderErrorState();
	}
}

function renderErrorState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>The game already has 2 players.</p>';
	console.log('The game already has 2 players.');
}

function renderLoadingState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function renderData(data) {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	const div = document.createElement('div');
	div.className = 'item';
	div.innerHTML = 'Player created';
	container.appendChild(div);
}
