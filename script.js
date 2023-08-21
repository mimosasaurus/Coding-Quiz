const startButton = document.getElementById("start-btn")
const testContainterElement = document.getElementById('test-container')
const questionContainer = document.getElementById("jsquestion")
const answerBtn1 = document.getElementById("a1")
const answerBtn2 = document.getElementById("a2")
const answerBtn3 = document.getElementById("a3")
const answerBtn4 = document.getElementById("a4")
const countdownContainter = document.getElementById("countdown")
startButton.addEventListener('click', startQuiz)
var countdown
var questionIndex = 0
var NextQuestion = null
var currentQuestion
// add questions
var questions = [
    {
        question: "What is 'var' shorthand for?",
         answer: [
            { text: "Variety", correct: false},
            { text: "Variance", correct: false},
            { text: "Variable", correct: true},
            { text: "Varicose", correct: false},
    ]},

    {
        question: "What does a boolean give you?",
        answer: [
            {text: "True/False responses", correct: true},
            {text: "A string", correct: false},
            {text: "An overwhelming sense of existential dread", correct: false},
            {text: "It creates a hyruleanlink", correct: false},
    ]},

    {
        question: "What does Javascript do for a website?",
        answer: [
            {text: "Adds functionality", correct: true},
            {text: "Adds style to the html", correct: false},
            {text: "Gives the website a shot of caffine", correct: false},
            {text: "Automatically collects user data", correct: false},
    ]},

    {
        question: "What is the correct tag for adding Javascript to an html document?",
        answer: [
            {text: "<var>", correct: false},
            {text: "<java>", correct: false},
            {text: "<script>", correct: true},
            {text: "<link>", correct: false},
    ]},
    
    {
        question: "What year was Javascript invented?",
        answer: [
            {text: "2001", correct: false},
            {text: "1995", correct: true},
            {text: "1990", correct: false},
            {text: "1985", correct: false},
    ]},
]
//add timer function
function timer(callback, delay) {
    var id, started, remaining = delay, running

    this.start = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }

    this.pause = function() {
        running = false
        clearTimeout(id)
        remaining -= new Date() - started
    }


    this.getTimeLeft = function() {
        if (running) {
            this.pause()
            this.start()
        }

        return remaining
    }

    this.getStateRunning = function() {
        return running
    }

    this.start()
}// created by user2039981 on Stack Overflow https://stackoverflow.com/questions/3144711/find-the-time-left-in-a-settimeout
function setNextQuestion(){
    currentQuestion = questions[questionIndex]
    questionContainer.innerText=currentQuestion.question
    answerBtn1.innerText=currentQuestion.answer[0].text
    answerBtn2.innerText=currentQuestion.answer[1].text
    answerBtn3.innerText=currentQuestion.answer[2].text
    answerBtn4.innerText=currentQuestion.answer[3].text
    console.log(questions)
    return currentQuestion  

}
//begin quiz
function startQuiz () {
    console.log('Begin!')
    countdown=new timer(function(){
        console.log
    }, 5*60*1000)
    answerBtn1.addEventListener("click", function(){
        correct=checkAnswer(0)
    })
    answerBtn2.addEventListener("click", function(){
        correct=checkAnswer(1)
    })
    answerBtn3.addEventListener("click", function(){
        correct=checkAnswer(2)
    })
    answerBtn4.addEventListener("click", function(){
        correct=checkAnswer(3)
    })
    countdown.start()
    setInterval(function(){
        console.log(countdown.getTimeLeft())
        let timeLeft=countdown.getTimeLeft()
        let minutes=Math.floor(timeLeft/1000/60)
        let seconds=Math.floor(
            (timeLeft-(minutes*60*1000))/1000)
        countdownContainter.innerHTML= minutes + ":" + seconds
    }, 1000)
    currentQuestion = setNextQuestion()
    testContainterElement.classList.remove("hide")
    startButton.classList.add("hide")
}
//subtract time for wrong answer
function checkAnswer(index){
    let correct= currentQuestion.answer[index].correct
    questions[questionIndex].correct=correct
    if (!correct){
        countdown.pause()
        let timeRemaining = countdown.getTimeLeft()
        timeRemaining -= 1*60*1000 //subtract 1 min
        countdown=new timer(function(){
            console.log
        }, timeRemaining)
        
        
    }
    questionIndex++
    if (questionIndex >= questions.length){
        console.log(questions)
        //reached end of quiz
    }
    else {setNextQuestion()}
}



