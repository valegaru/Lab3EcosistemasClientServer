document.getElementById('fetch-button').addEventListener('click', fetchData);

let count = 10; //el contador comienza en 10 segundos

function updateCounter() {
	const counterElement = document.getElementById('counter');
	if (counterElement) {
		counterElement.textContent = `Time left: ${count} seconds`;
	}
}

function startTimer() {
	const interval = setInterval(() => {
		if (count === 0) {
			count = 10; // Resetear el contados cada 10 segundos
			fetchData(); // y hacer fetch
		}
		updateCounter();
		count--;
	}, 1000);//el contados se actualiza cada segundo
}

async function fetchData() {
	renderLoadingState();
	try {
		const response = await fetch('http://localhost:5050/users');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderData(data);
	} catch (error) {
		console.error(error);
		renderErrorState();
	}
}

function renderErrorState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Failed to load data</p>';
	console.log('Failed to load data');
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

	if (data.players.length === 2) {
		data.players.forEach((item) => {
			const div = document.createElement('div');
			div.className = 'item';
			div.innerHTML = item.name;
			div.innerHTML = `<img src="${item.profilePicture}" /><p>${item.name} chose ${item.move}</p>`;
			container.appendChild(div);
		});

		// El resultado solo puede verse si los dos jugadores ya mandaron su nombre y movimiento
		const resultDiv = document.createElement('div');
		resultDiv.className = 'item';
		resultDiv.innerHTML = `<h2>Result: ${data.players[0].result}</h2>`;
		container.appendChild(resultDiv);
	} else {
		container.innerHTML = '<p>Waiting for both players to join...</p>';
	}
}

//comienza el contador cuando la pagina carga
startTimer();
