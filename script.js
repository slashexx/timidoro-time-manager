
let isTimerRunning=false;

function stopTimer() {
    clearInterval(timer); // Clear the interval
    isTimerRunning = false; // Update the state
}



const display = document.getElementById('display');
const pomodoroBtn = document.querySelector('.pomodoro');
const shortBreakBtn = document.querySelector('.shortbrk');
const longBreakBtn = document.querySelector('.longbrk');
const beginBtn = document.querySelector('.begin');


document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('main').style.display = 'none';

    setTimeout(function() {
        document.querySelector('.spinner-container').style.display = 'none';
        document.querySelector('main').style.display = 'block';
    }, 2000);

    setTimeout(function() {
        document.querySelector('.spinner-container').style.display = 'none';
        var mainContent = document.querySelector('.main-content');
        mainContent.style.display = 'block';
        mainContent.style.animation = 'fade-in 1s ease-in-out';
        document.body.classList.add('background-fade');
    }, 2000);

    const textContainers = document.querySelectorAll('.animated-text');
    let hasScrolled = false;

    window.addEventListener('scroll', function() {
        if (!hasScrolled && isScrolledIntoView(textContainers[0])) {
            textContainers.forEach(function(container) {
                container.classList.add('animate-in');
            });
            hasScrolled = true;
        }
    });

    function isScrolledIntoView(elem) {
        var rect = elem.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;
        var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }
});

function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if(timerMode=="pomo"){
    document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - Focus !`;
    } else if (timerMode=="short") {
        document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - Relax!`;    
    } else {
        document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - Take it easy!`; 
    }

    if (time <= 0) {
        clearInterval(timer);
        beginBtn.disabled = false;
        alert("Time's up!");
    } else {
            time--;
        }
} 

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true; // Update the state
        timer = setInterval(updateDisplay, 1000); // Start the timer
        // beginBtn.disabled = true; // Disable the "Begin" button
    }
}

let timerMode = "pomo"

function setTimePomo() {
    time = 25 * 60;
    display.textContent = "25:00";
}


function setTimeShort() {
    time = 5 * 60;
    display.textContent = "05:00";
}

function setTimeLong() {
    time = 15 * 60;
    display.textContent = "15:00";
}

beginBtn.addEventListener('click', startTimer);


pomodoroBtn.addEventListener('click', function() {
    timerMode = "pomo";
    setTimePomo();
    if (!isTimerRunning) {
        startTimer();
    } else {
        stopTimer();
        startTimer();
    }
});

shortBreakBtn.addEventListener('click', function() {
    timerMode = "short";
    setTimeShort();
    if (!isTimerRunning) {
        startTimer();
    } else {
        stopTimer();
        startTimer();
    }
});

longBreakBtn.addEventListener('click', function() {
    timerMode = "long";
    setTimeLong();
    if (!isTimerRunning) {
        startTimer();
    } else {
        stopTimer();
        startTimer();
    }
});



// TEXT ANIMATIONS 
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);

        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        // } else{
        //     entry.target.classList.remove('show');
        // }
    })
})

const hiddenElements = document.querySelectorAll('.hidden')

hiddenElements.forEach((el) => observer.observe(el))