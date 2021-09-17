// hardkeys handling
document.addEventListener("keydown", e => {
  playSound(e.code)
  buttonAnimationDown(e.code)
})

document.addEventListener("keyup", e => {
  buttonAnimationUp(e.code)
})

// ui buttons handling
const drumButtons = document.querySelectorAll(".drum")
for (const btn of drumButtons) {
  btn.addEventListener("mousedown", e => {
    playSound(e.target.classList[0])
    buttonAnimationDown(e.target.classList[0])
  })

  btn.addEventListener("mouseup", e => {
    buttonAnimationUp(e.target.classList[0])
  })
}

// functions
function playSound(key) {
  switch (key) {
    case "KeyW": (new Audio('sounds/tom-1.mp3')).play(); break
    case "KeyA": (new Audio('sounds/tom-2.mp3')).play(); break
    case "KeyS": (new Audio('sounds/tom-3.mp3')).play(); break
    case "KeyD": (new Audio('sounds/tom-4.mp3')).play(); break
    case "KeyJ": (new Audio('sounds/crash.mp3')).play(); break
    case "KeyK": (new Audio('sounds/kick-bass.mp3')).play(); break
    case "KeyL": (new Audio('sounds/snare.mp3')).play(); break
    default: break;
  }
}

function buttonAnimationDown(key) {
  document.querySelector(`.${key}`).classList.add("pressed")
}

function buttonAnimationUp(key) {
  document.querySelector(`.${key}`).classList.remove("pressed")
}
