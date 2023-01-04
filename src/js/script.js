const player1Hand = document.querySelector('.hand--first')
const player1Score = document.querySelector('.score--first')
const player2Hand = document.querySelector('.hand--second')
const player2Score = document.querySelector('.score--second')
const playBtn = document.querySelector('.play-btn')

const handsArray = ['✊', '🤚', '✌️']

const functions = () => {
    createRandomHand()
    gameMechanism()
}

const createRandomHand = () => {
	const randomNum = Math.floor(Math.random() * 3)
	const randomNum2 = Math.floor(Math.random() * 3)

	player1Hand.textContent = handsArray[randomNum]
	player2Hand.textContent = handsArray[randomNum2]
}
let score1 = 0
let score2 = 0

const gameMechanism = () => {
	// const player1ScoreNum = parseInt(player1Score.textContent)
	// const player2ScoreNum = parseInt(player2Score.textContent)

	if (player1Hand.textContent === handsArray[0] && player2Hand.textContent === handsArray[1]) score2++
	else if (player1Hand.textContent === handsArray[0] && player2Hand.textContent === handsArray[2]) score1++
	else if (player1Hand.textContent === handsArray[1] && player2Hand.textContent === handsArray[0]) score1++
	else if (player1Hand.textContent === handsArray[1] && player2Hand.textContent === handsArray[2]) score2++
	else if (player1Hand.textContent === handsArray[2] && player2Hand.textContent === handsArray[0]) score1++
	else if (player1Hand.textContent === handsArray[2] && player2Hand.textContent === handsArray[1]) score2++

player1Score.textContent=score1
player2Score.textContent=score2
}

playBtn.addEventListener('click', functions)
