let numberOfQuestions = 0;
let numberOfLevels = 0;

// ♥ SOPHIA ♥ start
//declarando variaveis para guardar fora das funções os valores que serão enviados

//para o objeto a postar:
let quizzTitle = '';
let quizzImgURL = '';
let answers = [];

//colocar quizzes na tela
    //quizzes do usuario
    //todos os quizzes
    getQuizzes();
    let quizzInfo = {}; // Array com as informações do quiz
    let questionsArray = []; // Array com as perguntas
    let levels = []; 

// ♥ SOPHIA ♥ end


// Passar para a página seguinte
function nextPage(classPageA, classPageB){
    const pageA = document.querySelector(classPageA);
    const pageB = document.querySelector(classPageB);

    pageA.classList.add("hide");
    pageB.classList.remove("hide");
}

// Verifica se a URL passada é válida
function verifyURL(url){
    const re = new RegExp('^((https?:)?\\/\\/)?'+ // protocol
    '(?:\\S+(?::\\S*)?@)?' + // authentication
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locater

    if (re.test(url)) return true;
    else return false;
}

// Verifica se a cor está em formato Hexadecimal
function verifyHexadecimal(color){
    const re = new RegExp(/^#[0-9A-Fa-f]{6}$/);

    if(re.test(color)) return true;
    else return false;
}

// Verifica as informações do quiz
function verifyQuizzInfo(classPageA, classPageB){
    const quizzTitle = document.querySelector(".quizz-title").value;
    const quizzURL = document.querySelector(".quizz-url").value;
    numberOfQuestions = document.querySelector(".quizz-num-questions").value;
    numberOfLevels = document.querySelector(".quizz-num-levels").value;
    let control = 0;

    if(quizzTitle.length < 20 || quizzTitle.length > 65)
        alert("Título do Quizz deve ter entre 20 e 65 caracteres");   
    else control++;
    if(!verifyURL(quizzURL))
        alert("Formato de URL inválido");   
    else control++;
    if(numberOfQuestions < 3 )
        alert("São necessárias no mínimo 3 perguntas");   
    else control++;
    if(numberOfLevels < 2)
        alert("São necessários no mínimo 2 níveis");   
    else control++;

    quizzInfo = {
        quizzTitle,
        quizzURL
    }
    console.log(numberOfQuestions);

    if(control === 4){
        nextPage(classPageA, classPageB);
        createQuestions();
    }
}

function createQuestions(){
    const questionsDiv = document.querySelector(".questions");

    for (let i = 0; i < numberOfQuestions; i++) {
       questionsDiv.innerHTML +=`
            <div class="question">
                <p>Pergunta ${i+1}</p>
                <input class="quizz-input question-title" type="text" placeholder="Texto da pergunta"/>
                <input class="quizz-input question-color" type="text" placeholder="Cor de fundo da pergunta"/>
                <p>Resposta correta</p>
                <input class="quizz-input correct-answer-text" type="text" placeholder="Resposta correta"/>
                <input class="quizz-input correct-answer-img" type="text" placeholder="URL da imagem"/>
                <p>Respostas incorreta</p>
                <div class="incorrect-answers">
                    <div>
                        <input class="quizz-input incorrect-answer-text-1" type="text" placeholder="Resposta incorreta 1"/>
                        <input class="quizz-input incorrect-answer-img-1" type="text" placeholder="URL da imagem 1"/>
                    </div>
                    <div>
                        <input class="quizz-input incorrect-answer-text-2" type="text" placeholder="Resposta incorreta 2"/>
                        <input class="quizz-input incorrect-answer-img-2" type="text" placeholder="URL da imagem 2"/>
                    </div>
                    <div>
                        <input class="quizz-input incorrect-answer-text-3" type="text" placeholder="Resposta incorreta 3"/>
                        <input class="quizz-input incorrect-answer-img-3" type="text" placeholder="URL da imagem 3"/>
                    </div>
                </div>
            </div>`;
    }
}

function verifyQuestions(classPageA, classPageB){
    const questions = document.querySelectorAll(".question");
    let count = 0;

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if(verifyQuestion(question)) count++; 
    }
    if(count === questions.length) nextPage(classPageA, classPageB);
}

function verifyQuestion(question) {   
    const questionTitle = question.querySelector(".question-title").value;
    const questionColor = question.querySelector(".question-color").value;
    const correctAnswerText = question.querySelector(".correct-answer-text").value;
    const correctAnswerImg = question.querySelector(".correct-answer-img").value;
    const incorrectAnswers = question.querySelector(".incorrect-answers");
    let numberOfIncorrectAnswers = 0;
    let incorrectAnswersArray = [];
    let answersArray = [];
    let objectQuestion = {};
    let objectAnswer = {};
    let control = false;

    for (let i = 0; i < incorrectAnswers.children.length; i++) {
        const incorrectAnswer = incorrectAnswers.children[i];
        if(incorrectAnswer.children[0].value !== ""){
            objectAnswer = {
                title: incorrectAnswer.children[0].value,
                image: incorrectAnswer.children[1].value,
                isCorrectAnswer: false
            };
            incorrectAnswersArray.push(objectAnswer);
            numberOfIncorrectAnswers++;
        }
    }

    for (let i = 0; i < numberOfIncorrectAnswers; i++)
        answersArray.push(incorrectAnswersArray[i]);

    answersArray.push({
        title: correctAnswerText,
        image: correctAnswerImg,
        isCorrectAnswer: true
        }
    );

    questionsArray.push({
        title: questionTitle,
        color: questionColor,
        answers: answersArray
    });

    if((questionTitle.length < 20) ||
        (!verifyHexadecimal(questionColor)) ||
        (correctAnswerText === "") ||
        (!verifyURL(correctAnswerImg)) ||
        (numberOfIncorrectAnswers === 0))
            alert("Digite as informações corretamente");
    else control = true;
    return control;
}


// ♥ SOPHIA ♥ start

//ARMAZENAR QUIZZES DO USUÁRIO (POST)
//armazenar objeto
function storeQuizz() {
    //axios post
}

function getQuizzes() {
    //get quizzes from axios
    const pAllQuizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    pAllQuizzes.then(processQuizzes)
}
function processQuizzes(response){
    const quizzes = response.data;
    const nQuizzes = quizzes.length;
    //percorrer lista de quizzes e imprimir a preview de cada um
    for(let i = 0; i < nQuizzes; i++){
        const image = quizzes[i].image;
        const title = quizzes[i].title;
        const id = quizzes[i].id;
        renderQuizz(image, title, id);
    }
    //pra quizzes do usuario, filtrar. mas isso é um problema pra sophia do futuro.
}
const span = document.querySelector('span');
function renderQuizz(img, title, id) {
    span.innerHTML +=
    `
    <div class="quizz-preview" id="${id}" onclick="takeThisQuizz(this)">
        <img src="${img}" alt="quizz preview">
        <p>${title}</p>
    </div>
    `;
    
    //onclick directs user to that quizz
}

function takeThisQuizz(quizz) {
    const thisQuizzID = quizz.id;
    //get the id of the specific quizz
        //(stored as id in the div holding the preview)
    //axios.get that biassh
    const pQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${thisQuizzID}`);
    pQuizz.then(renderThisQuizz);

    //hide home, show quizz page
    document.querySelector(".home").classList.add("hide");
    document.querySelector(".quizz-page").classList.remove("hide");
}

function renderThisQuizz(response) {
    let quizz = response.data;
    let questions = quizz.questions;
    let nQuestions = questions.length;
    let title = quizz.title;
    let imageURL = quizz.image;
    console.log(imageURL);

    //render banner
    document.querySelector("body").innerHTML += 
    `
        <div class="banner">
            <p>${title}</p>
        </div>
    `;

    document.querySelector(".banner").style.background = `"url('${imageURL}')"`;
    document.querySelector(".banner p").innerHTML = `${title}`;
    //render questions
    for(let i = 0; i < nQuestions; i++){
        let questionTitle = questions[i].title;
        let questionColor = questions[i].color;

        document.querySelector(".quizz-page-questions-box").innerHTML += 
        `
        <div class="quizz-page-question">
        <div>
            <p class="question-title">${questionTitle}</p>
            <div class="quizz-page-answers-box spawn"></div>
        </div>
    </div>
        `;
        document.querySelector(".question-title").style.backgroundColor = `'${questionColor}'`
        //render answers for each question
        for(let j = 0; j < questions[i].answers.length; j++) {
            let answerText = questions[i].answers[j].text;
            let answerImageURL = questions[i].answers[j].image;
            let correctAnswer = questions[i].answers[j].isCorrectAnswer;
            //the info on the correct answer is stored in the img's class.
            //SARAH, cheque aqui quando for fazer o comportamento das perguntas
            
            document.querySelector(".spawn").innerHTML += 
            `
            <div class="quizz-page-answer">
                <img src='${answerImageURL}' alt="" class="${correctAnswer}">
                <p><strong>${answerText}</strong></p>
            </div>
            `;

            //remove class spawn on the last question
            if(j == questions[i].answers.length - 1){
                document.querySelector(".spawn").classList.remove("spawn");
            }
        }
    }
}

// ♥ SOPHIA ♥ end