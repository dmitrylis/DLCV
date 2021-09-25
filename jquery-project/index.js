let gameSequence = []
let userSequence = []

let buttons = ["green", "red", "yellow", "blue"]

$(document).keypress(function() {
  if (gameSequence.length === 0) {
    newGame()
  }
})

$("#level-title").click(function() {
  if (gameSequence.length === 0) {
    newGame()
  }
})

function newGame() {
  gameSequence = []
  userSequence = []

  nextRound()
}

function nextRound() {
  const index = Math.floor(Math.random() * 4)

  gameSequence.push(buttons[index])
  $("#level-title").text("Level " + gameSequence.length)

  $(`.${buttons[index]}`).click()
}

function fail() {
  $("#level-title").text("Game Over, Press Any Key to Restart")
  playSound(`sounds/wrong.mp3`)

  gameSequence = []
  userSequence = []
}

function playSound(file) {
  const audio = new Audio(file)
  audio.play()
}

function compareArrays(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

$(".btn").click(function(eventData) {
  if (gameSequence.length === 0) {
    // round is not yet started or already finished
    return
  }

  const clickedButton = eventData.target
  $(clickedButton).fadeOut().fadeIn()
  playSound(`sounds/${clickedButton.id}.mp3`)

  if (typeof eventData.originalEvent !== "undefined") {
    // user clicks button
    userSequence.push(clickedButton.id)

    if (userSequence.length < gameSequence.length) { // check every user click
      if (compareArrays(userSequence, gameSequence.slice(0, userSequence.length))) {
        // everything is okay for now, do nothing
      } else {
        fail()
      }
    } else if (userSequence.length === gameSequence.length) { // checking the last step of round
      if (compareArrays(userSequence, gameSequence)) {
        userSequence = []

        setTimeout(() => {
          if (gameSequence.length !== 0) {
            nextRound()
          }
        }, 2000)
      } else {
        fail()
      }
    } else { // user is stupid
      fail()
    }
  } else {
    // game clicks button
    // do nothing
  }
})
