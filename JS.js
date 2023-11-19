let playerScore = 0;
let computerScore = 0;

function startGame() {
    const playerName = document.getElementById('playerName').value;
    if (!playerName) {
        alert('Будь ласка, введіть своє ім\'я.');
        return;
    }

    const playerCards = getRandomCards();
    const computerCards = getRandomCards();

    const playerSum = calculateSum(playerCards);
    const computerSum = calculateSum(computerCards);

    document.getElementById('result').innerHTML = `${playerName}: ${getCardImages(playerCards, playerSum)}, Комп'ютер: ${getCardImages(computerCards, computerSum)}`;

    if (playerSum > computerSum) {
        playerScore++;
    } else if (playerSum < computerSum) {
        computerScore++;
    }

    document.getElementById('score').innerHTML = `Рахунок: ${playerName}: ${playerScore}, Комп'ютер: ${computerScore}`;

    if (playerScore === 3 || computerScore === 3) {
        const winner = playerScore === 3 ? playerName : "Комп'ютер";
        alert(`Гра завершена! ${winner} переміг!`);
        playGif(winner);
        resetGame();
    }
}

function playGif(winner) {
    const gifContainer = document.createElement('div');
    gifContainer.style.position = 'fixed';
    gifContainer.style.top = '50%';
    gifContainer.style.left = '50%';
    gifContainer.style.transform = 'translate(-50%, -50%)';

    const gifImage = document.createElement('img');
    gifImage.style.width = '300px'; // Змініть розмір гіфки за потребою
	const resultText = document.createElement('div');
    resultText.style.fontWeight = 'bold';
    resultText.style.fontSize = '24px';
    resultText.style.marginTop = '10px';

    if (winner === 'Комп\'ютер') {
        gifImage.src = '2dR9.gif'; // Замініть шлях на шлях до гіфки для перемоги комп'ютера
		 resultText.innerText = 'Ти програв';
    } else {
        gifImage.src = '3abC.gif'; // Замініть шлях на шлях до гіфки для перемоги гравця
		resultText.innerText = 'Ти виграв';
    }

    gifContainer.appendChild(gifImage);
    document.body.appendChild(gifContainer);
	gifContainer.appendChild(resultText);
    document.body.appendChild(gifContainer);

    setTimeout(() => {
        document.body.removeChild(gifContainer);
    }, 3000); // Гіфка буде виводитись 3 секунди, змініть за потребою
}
function getRandomCards() {
    const cards = [6, 7, 8, 9, 10, 'Валет', 'Дама', 'Король', 'Туз'];
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomCard = cards[randomIndex];

    return [randomCard];
}

function calculateSum(cards) {
    let sum = 0;

    for (let card of cards) {
        sum += calculateCardValue(card);
    }

    return sum;
}

function calculateCardValue(card) {
    if (card === 'Валет' || card === 'Дама' || card === 'Король') {
        return 2;
    } else if (card === 'Туз') {
        return 11;
    } else {
        return parseInt(card, 10);
    }
}

function getCardImages(cards) {
    const imagePath = 'https://raw.githubusercontent.com/Egor-Wizard/Frontend-LB9/main/imege/'; // ваш шлях до зображень
    const images = {
        '6': '6.png',
        '7': '7.png',
        '8': '8.png',
        '9': '9.png',
        '10': '10.png',
        'Валет': 'jack.jpg',
        'Дама': 'queen.jpg',
        'Король': 'king.jpg',
        'Туз': 'ace.jpg'
    };

    const cardsHtml = cards.map(card => {
        const cardImage = `<img src="${imagePath}${images[card]}" alt="${card}">`;
        const cardSum = `<div class="card-sum">${calculateCardValue(card)}</div>`;
        return `<div class="card">${cardImage}${cardSum}</div>`;
    }).join('');

    return cardsHtml;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('playerName').value = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('score').innerHTML = '';
}
