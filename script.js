
let isTimerRunning=false;

function stopTimer() {
    clearInterval(timer); 
    isTimerRunning = false;}



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
    if (isTimerRunning){
        stopTimer();
    }
});

shortBreakBtn.addEventListener('click', function() {
    timerMode = "short";
    setTimeShort();
    if(isTimerRunning){
        stopTimer();
    }
});

longBreakBtn.addEventListener('click', function() {
    timerMode = "long";
    setTimeLong();
    if (isTimerRunning){
        stopTimer();
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

// TOGGLE BUTTON
document.addEventListener('DOMContentLoaded', function() {
    const h1Element = document.querySelector('.headtit');
    const h2Elements = document.querySelectorAll('.headtit'); 
    const navele = document.querySelector('.navigator');

    const toggleCheckbox = document.querySelector('.bb8-toggle__checkbox');
    const informationSection = document.querySelector('.information');

    toggleCheckbox.addEventListener('change', function() {
        if (toggleCheckbox.checked) {
            navele.style.backgroundColor='#131316'
            h1Element.style.color = 'rgba(148, 116, 235, 0.849)';
            h2Elements.forEach(function(h2Element) {
                h2Element.style.color = 'rgba(148, 116, 235, 0.849)';
            });
            informationSection.style.color = '#ffffff';
            informationSection.style.backgroundColor = '#131316';
        } else {
            navele.style.backgroundColor= '#ffffff'
            h1Element.style.color = 'rgb(100, 61, 136)';
            h2Elements.forEach(function(h2Element) {
                h2Element.style.color = 'rgb(100, 61, 136)';
            });
            informationSection.style.color = '#131316';
            informationSection.style.backgroundColor = '#ffffff';
        }
    });
});


// Function to add a task

let doesTaskExist = false;

function addTask() {
    var taskInput = document.querySelector('.input');
    var taskName = taskInput.value.trim();
    
    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }

    var taskList = document.getElementById("taskList");
    var taskItem = document.createElement("li");
    taskItem.innerHTML = ` 
    <input type="checkbox" onchange="toggleTask(this)">
    <div id="checklist">
        <span class="taskname">${taskName}</span> 
        <button class="removebtn" onclick="removeTask(this)">Remove</button> 
    </div>
    `;
    taskList.appendChild(taskItem);

    taskInput.value = ""; // Clear input field after adding task
}

document.querySelector('.input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

const defaultText = document.querySelector('.default-text').style;

if(doesTaskExist==true){
    defaultText.display = none;
} else {
    defaultText.display = block;
}

// Function to remove a task
function removeTask(button) {
    var taskItem = button.closest('li'); // Find the closest <li> ancestor of the button
    if (taskItem) {
        taskItem.remove(); // Remove the <li> element
    }
}

// Function to toggle task completion
function toggleTask(checkbox) {
    var taskItem = checkbox.parentNode;
    var taskName = taskItem.querySelector('span');
    if (checkbox.checked) {
        taskName.style.textDecoration = "line-through";
    } else {
        taskName.style.textDecoration = "none";
    }
}
