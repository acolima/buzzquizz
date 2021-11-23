let numberOfQuestions = 0;
let numberOfLevels = 0;

let your_ids_array = JSON.parse(localStorage.getItem("your_ids"));

if(your_ids_array !== null){
    layoutWithYourQuizzes();
}

// ♥ SOPHIA ♥ start
//declarando variaveis para guardar fora das funções os valores que serão enviados

    //quizzes do usuario
    //todos os quizzes

    //para o objeto a postar:
    getQuizzes();
    let quizzTitle = "";        // Título do quizz
    let quizzURL = "";          // Imagem do quizz
    let questionsArray = [];    // Array com as perguntas e as respostas
    let levelsArray = [];       // Array com os níveis
// ♥ SOPHIA ♥ end

function layoutWithYourQuizzes(){
        const your_quizzes = document.querySelector(".your-quizzes");
        your_quizzes.classList.remove("hide");
    
        const create_quizz = document.querySelector(".create-quizz");
        create_quizz.classList.add("hide");
    
        const add_circle = document.querySelector(".add-circle");
        add_circle.classList.remove("hide");
}

// Passar para a página seguinte
function nextPage(classPageA, classPageB){
    const pageA = document.querySelector(classPageA);
    const pageB = document.querySelector(classPageB);
    const quizzPage = document.querySelector(".quizz-page-questions-box");

    if (classPageA === ".home") {
      quizzPage.classList.add("hide");
    }

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

function showError(classInput, classError, errorMessage) {
    const input = document.querySelector(classInput);
    const error = document.querySelector(classError);
  
    input.classList.add("error");
    error.innerHTML = errorMessage;
}
  
function hideError(classInput, classError, errorMessage) {
    const input = document.querySelector(classInput);
    const error = document.querySelector(classError);
  
    input.classList.remove("error");
    error.innerHTML = errorMessage;
}

// Verifica as informações do quiz
function verifyQuizzInfo(classPageA, classPageB){
    const quizzTitleInput = document.querySelector(".quizz-title").value;
    const quizzURLInput = document.querySelector(".quizz-url").value;
    numberOfQuestions = document.querySelector(".quizz-num-questions").value;
    numberOfLevels = document.querySelector(".quizz-num-levels").value;
    let control = 0;

    if(quizzTitleInput.length < 20 || quizzTitleInput.length > 65)
        showError(".quizz-title", ".quizz-title-error", "Título do quizz deve ter entre 20 e 65 caracteres");
    else{
        hideError(".quizz-title", ".quizz-title-error", "");
        control++;
    }
    if(!verifyURL(quizzURLInput))
        showError(".quizz-url", ".quizz-url-error", "Formato de URL inválido");
    else{
        hideError(".quizz-url", ".quizz-url-error", "");
        control++;
    }
    if(numberOfQuestions < 3 )
        showError(".quizz-num-questions", ".quizz-num-questions-error", "São necessárias no mínimo 3 perguntas");
    else{
        hideError(".quizz-num-questions", ".quizz-num-questions-error", "");
        control++;
    }
    if(numberOfLevels < 2)
        showError(".quizz-num-levels", ".quizz-num-levels-error", "São necessários no mínimo 2 níveis");
    else{
        hideError(".quizz-num-levels", ".quizz-num-levels-error", "");
        control++;
    }

    quizzTitle = quizzTitleInput;
    quizzURL = quizzURLInput;

    if(control === 4){
        nextPage(classPageA, classPageB);
        createQuestions();
    }
}

function editQuestion(edit, classSelector, classBehavior) {
    const parentNodeEdit = edit.parentElement.parentElement;
    const divEdit = parentNodeEdit.querySelector(classSelector);
    divEdit.classList.toggle(classBehavior);
    divEdit.classList.toggle("hide");
}

function createQuestions(){
    const questionsDiv = document.querySelector(".questions");

    questionsDiv.innerHTML += `
        <div class="question" style="height: 825px" data-identifier="question">
            <h3>Pergunta 1</h3>
            <div class="question-input" style="padding-top: 20px">
                <input class="quizz-input question-title" type="text" placeholder="Texto da pergunta"/>
                <input class="quizz-input question-color" type="text" placeholder="Cor de fundo da pergunta"/>
                <h3>Resposta correta</h3>
                <input class="quizz-input correct-answer-text" type="text" placeholder="Resposta correta"/>
                <input class="quizz-input correct-answer-img" type="text" placeholder="URL da imagem"/>
                <h3>Respostas incorretas</h3>
                <div class="incorrect-answers">
                    <div>
                        <input class="quizz-input" type="text" placeholder="Resposta incorreta 1"/>
                        <input class="quizz-input" type="text" placeholder="URL da imagem 1"/>
                    </div>
                    <div>
                        <input class="quizz-input" type="text" placeholder="Resposta incorreta 2"/>
                        <input class="quizz-input" type="text" placeholder="URL da imagem 2"/>
                    </div>
                    <div>
                        <input class="quizz-input" type="text" placeholder="Resposta incorreta 3"/>
                        <input class="quizz-input" type="text" placeholder="URL da imagem 3"/>
                    </div>
                </div>
            </div>
        </div>
    `;

    for (let i = 2; i <= numberOfQuestions; i++) {
        questionsDiv.innerHTML += `
            <div class="question">
                <div class="question-header">
                    <h3>Pergunta ${i}</h3>
                    <ion-icon name="create-outline" onclick="editQuestion(this, '.question-input', 'edit-question')" data-identifier="expand"></ion-icon>
                </div>
                <div class="question-input hide">
                    <input class="quizz-input question-title" type="text" placeholder="Texto da pergunta"/>
                    <input class="quizz-input question-color" type="text" placeholder="Cor de fundo da pergunta"/>
                    <h3>Resposta correta</h3>
                    <input class="quizz-input correct-answer-text" type="text" placeholder="Resposta correta"/>
                    <input class="quizz-input correct-answer-img" type="text" placeholder="URL da imagem"/>
                    <h3>Respostas incorreta</h3>
                    <div class="incorrect-answers">
                        <div>
                            <input class="quizz-input" type="text" placeholder="Resposta incorreta 1"/>
                            <input class="quizz-input" type="text" placeholder="URL da imagem 1"/>
                        </div>
                        <div>
                            <input class="quizz-input" type="text" placeholder="Resposta incorreta 2"/>
                            <input class="quizz-input" type="text" placeholder="URL da imagem 2"/>
                        </div>
                        <div>
                            <input class="quizz-input" type="text" placeholder="Resposta incorreta 3"/>
                            <input class="quizz-input" type="text" placeholder="URL da imagem 3"/>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function correctArray(array, newArray, n) {
    let i = array.length - n;
    
    for (i; i < array.length; i++) {
        newArray.push(array[i]);
    }
}

let questionsArrayCorrect = [];
function verifyQuestions(classPageA, classPageB){
    const questions = document.querySelectorAll(".question");
    let count = 0;

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if(verifyQuestion(question)){
            questionsArrayCorrect.push(objectQuestion);
            count++; 
        }
    }

    if(count === questions.length){
        nextPage(classPageA, classPageB);
        correctArray(questionsArrayCorrect, questionsArray, numberOfQuestions);
        createLevels();
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

let objectQuestion = {};
function verifyQuestion(question) {   
    const questionTitle = question.querySelector(".question-title").value;
    const questionColor = question.querySelector(".question-color").value;
    const correctAnswerText = question.querySelector(".correct-answer-text").value;
    const correctAnswerImg = question.querySelector(".correct-answer-img").value;
    const incorrectAnswers = question.querySelector(".incorrect-answers");
    let numberOfIncorrectAnswers = 0;
    let incorrectAnswersArray = [];
    let answersArray = [];
    let objectAnswer = {};
    let control = false;

    for (let i = 0; i < incorrectAnswers.children.length; i++) {
        const incorrectAnswer = incorrectAnswers.children[i];
        if(incorrectAnswer.children[0].value !== ""){
            objectAnswer = {
                text: incorrectAnswer.children[0].value,
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
        text: correctAnswerText,
        image: correctAnswerImg,
        isCorrectAnswer: true
        }
    );
    
    answersArray.sort(comparador);
    
    if(questionTitle.length < 20){
        alert("Pergunta deve conter no mínimo 20 caracteres");
    }
    else if(!verifyHexadecimal(questionColor)){
        alert("Formato de cor inválido (deve ser hexadecimal)");
    }
    else if(correctAnswerText === ""){
        alert("Campo resposta correta não pode ser vazio");
    }
    else if(!verifyURL(correctAnswerImg)){
        alert("Formato de URL inválido");
    }
    else if(numberOfIncorrectAnswers === 0){
        alert("Pelo menos uma resposta incorreta deve ser preenchida");
    }
    else{
        objectQuestion = {
            title: questionTitle,
            color: questionColor,
            answers: answersArray
        };
        control = true;
    }
    return control;
}

function createLevels() {
    const levelsDiv = document.querySelector(".levels");

    /* Renderiza o primeiro nível*/
    levelsDiv.innerHTML += `
        <div class="level" style="height: 316px" data-identifier="level">
            <p>Nível 1</p>
            <div class="level-input" style="padding-top: 15px">
                <input class="quizz-input level-title" type="text" placeholder="Título do nível">
                <input class="quizz-input level-percentage" type="number" placeholder="% de acerto mínima">
                <input class="quizz-input level-url" type="text" placeholder="URL da imagem do nível" >
                <input class="quizz-input level-description" type="text" placeholder="Descrição do nível" >
            </div>
        </div>
    `;

    for (let i = 2; i <= numberOfLevels; i++) {
        levelsDiv.innerHTML += `
            <div class="level" data-identifier="level">
                <div class="level-header">
                    <p>Nível ${i}</p>
                    <ion-icon name="create-outline" onclick="editQuestion(this, '.level-input', 'edit-level')" data-identifier="expand"></ion-icon>
                </div>
                <div class="level-input hide">
                    <input class="quizz-input level-title" type="text" placeholder="Título do nível"/>
                    <input class="quizz-input level-percentage" type="number" placeholder="% de acerto mínima"/>
                    <input class="quizz-input level-url" type="text" placeholder="URL da imagem do nível"/>
                    <input class="quizz-input level-description" type="text" placeholder="Descrição do nível"/>
                </div>
            </div>
        `;
    }
}

let isPercentageZero = 0;
let objectLevel = {};
let levelsArrayCorrect = [];

function verifyLevels(classPageA, classPageB) {
    const levels = document.querySelectorAll(".level");   
    let count = 0;

    for (let i = 0; i < levels.length ; i++) {
        const level = levels[i];
        if(verifyLevel(level)){
            levelsArrayCorrect.push(objectLevel);
            count++;
        }
    }
    
    if(count === levels.length){
        nextPage(classPageA, classPageB);
        correctArray(levelsArrayCorrect, levelsArray, numberOfLevels);

        sendQuizz(quizzTitle, quizzURL, questionsArray, levelsArray);
    }
}

function verifyLevel(level) {
    const levelTitle = level.querySelector(".level-title").value;
    const levelPercentage = parseInt(level.querySelector(".level-percentage").value);
    const levelUrl = level.querySelector(".level-url").value;    
    const levelDescription = level.querySelector(".level-description").value;    
    let control = false;
    
    if(levelPercentage === 0){
        isPercentageZero++;
    }

    if(levelTitle.length < 10){
        alert("O título da pergunta deve ter, no mínimo, 10 caracteres");
    }
    else if(levelPercentage < 0 || levelPercentage > 100){
        alert("Porcentagem com número inválido");
    }
    else if(!verifyURL(levelUrl)){
        alert("Formato de URL inválido");
    }
    else if(levelDescription.length < 30){
        alert("Descrição do nível deve conter, no mínimo, 30 caracteres");
    }
    else if(isPercentageZero === 0){
        alert("Deve haver uma porcentagem com 0(zero)");
    }
    else{
        objectLevel = {
            title: levelTitle,
            image: levelUrl,
            text: levelDescription,
            minValue: levelPercentage
        }
        control = true;
    }
    return control;
}

function getQuizzes() {
    //get quizzes from axios
    const pAllQuizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    pAllQuizzes.then(processQuizzes)
}

function processQuizzes(response){
    const span_all_quizzes = document.querySelector('.list-all-quizzes');
    const span_your_quizzes = document.querySelector('.list-your-quizzes');
    
    const quizzes = response.data;
    const nQuizzes = quizzes.length;
    let isYourQuizz = false;
    
    //percorrer lista de quizzes e imprimir a preview de cada um
    for(let i = 0; i < nQuizzes; i++){
        
        const img = quizzes[i].image;
        const title = quizzes[i].title;
        const id = quizzes[i].id;
        
        if(your_ids_array !== null){
            for(let j = 0; j < your_ids_array.length; j++){
                if(quizzes[i].id === your_ids_array[j]){
                    renderQuizz(span_your_quizzes, img, title, id);
                    isYourQuizz = true;
                }
            }
        }
        if(!isYourQuizz){
            renderQuizz(span_all_quizzes, img, title, id);
        }
        isYourQuizz = false;
        
    }
}

function renderQuizz(span, img, title, id) {
    span.innerHTML +=
    `
    <div class="quizz-preview" id="${id}" onclick="takeThisQuizz(this)" data-identifier="quizz-card">
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
let thisQuizzLevels = [];
let nThisQuizzQuestions = 0;
let thisQuestionIdNumber = 0;
function renderThisQuizz(response) {
    let quizz = response.data;
    let questions = quizz.questions;
    let nQuestions = questions.length;
        nThisQuizzQuestions = nQuestions;
    let title = quizz.title;
    let imageURL = quizz.image;

    thisQuizzLevels = quizz.levels;

    //render banner
    document.querySelector(".quizz-page").innerHTML += 
    `
        <div class="banner">
            <p>${title}</p>
        </div>
        <div class="banner-overlay"></div>
    `;

    document.querySelector(".banner").style.background = "url(" + imageURL + ")";
    document.querySelector(".banner p").innerHTML = `${title}`;
    //render questions
    for(let i = 0; i < nQuestions; i++){
        let questionTitle = questions[i].title;
        let questionColor = questions[i].color;
        thisQuestionIdNumber = i;

        document.querySelector(".quizz-page-questions-box").innerHTML += 
        `
        <div class="quizz-page-question" data-identifier="question">
            <div>
                <div class="question-title" style="background-color: ${questionColor}">
                    <p id="question${i}">${questionTitle}</p>
                </div>
                <div class="quizz-page-answers-box spawn"></div>
            </div>
        </div>`;

        //render answers for each question 
        for(let j = 0; j < questions[i].answers.length; j++) {
            let answerText = questions[i].answers[j].text;
            let answerImageURL = questions[i].answers[j].image;
            let correctAnswer = questions[i].answers[j].isCorrectAnswer;
            //the info on the correct answer is stored in the img's class.
            //SARAH, cheque aqui quando for fazer o comportamento das perguntas
            
            document.querySelector(".spawn").innerHTML += 
            `
            <div class="quizz-page-answer" id="${correctAnswer}" onclick="selectAnswer(this)" data-identifier="answer">
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

function wrongAnswers(questionsAnswers, answer) {
    let notSelected = questionsAnswers.querySelectorAll("div:not(.selected)")

    for (let i = 0; i < notSelected.length; i++) {
        const element = notSelected[i];
        element.classList.add("not-selected")
    }
}

let correctCounter = 0;
let answeredCounter = 0;
function selectAnswer(selectedAnswer) {
    selectedAnswer.parentNode.style.color = '#FF4B4B';
    selectedAnswer.parentNode.querySelector('#true').style.color = '#009C22';
    let questionsAnswers = selectedAnswer.parentElement;

    //add to counter
    answeredCounter++;
    selectedAnswer.classList.add("selected");

    wrongAnswers(questionsAnswers, selectedAnswer);

    //contador de respostas corretas
    if(selectedAnswer.id == 'true') {
        correctCounter++;
    }
    if(answeredCounter == nThisQuizzQuestions) {
        setTimeout(() => {
            quizzResult(nThisQuizzQuestions, correctCounter, thisQuizzLevels)
          }, 2000)
    } else {
        let nextQuestionIdNumber = thisQuestionIdNumber + 1;
        setTimeout(() => {
            document.querySelector(`#question${nextQuestionIdNumber}`).scrollIntoView
        }, 2000)
    }
}

//SEND QUIZZ
function sendQuizz(title, image, questions, levels){
    //post to axios

    const object = {
        title,
        image,
        questions,
        levels
    }
    const pSend = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', object);

    pSend.then(sendQuizzSuccess);
    pSend.catch((error) => {
        console.log(error.response);
    });
}

function sendQuizzSuccess(response){
    nextPage('.loading-page', '.quizz-success')

    const imageSuccess = document.querySelector(".quizz-success-image");
    const titleSuccess = document.querySelector(".quizz-success-text");
    
    titleSuccess.innerHTML = quizzTitle;
    imageSuccess.style.background = "url(" + quizzURL + ")";

    const promisse = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promisse.then(saveIdQuizz);
}

function saveIdQuizz(response){
    let your_new_id = response.data[0].id;
    
    if(localStorage.getItem("your_ids") === null){    //se não houver nenhum quizz criado:
        const new_id = "[" + your_new_id + "]";       // -> pega id do novo quizz, coloca em formato de array
        localStorage.setItem("your_ids", new_id);     // -> armazena
        your_ids_array = JSON.parse(new_id);          // tranforma em object
    }
    else{
        const your_ids = localStorage.getItem("your_ids");         // pega ids armazenados (string)
        your_ids_array = JSON.parse(your_ids);                     // transforma em object
        your_ids_array.push(your_new_id);                          // add novo id
        const dadosSerializados = JSON.stringify(your_ids_array)   // transforma ele em string novamente
        localStorage.setItem("your_ids", dadosSerializados)        // armazena dados atualizados

    }

    getQuizzes();
}


//localStorage.removeItem("your_ids")
// colocar na home atualização


function backHome(classPageA, classPageB) {
    // volta para a página home
    nextPage(classPageA, classPageB);

    //precisa mostrar o quizz criado quando voltar para home
}
function quizzResult(totalQuestions,rightAnswers, levels) {
    
    //rightQuestions will be previously determined by a counter
    //calculate % 
    const score = Math.round((rightAnswers/totalQuestions)*100);
    let result = thisQuizzLevels[0];
    let resultNum = 0;
 
    for(let i = 0; i < levels.length; i++) {
        if(score >= thisQuizzLevels[i].minValue) {
            result = levels[i];
            resultNum = i;
        }
    }
    //get info of the right level
    const resultTitle = result.title;
    const resultImgURL = result.image;
    const resultText = result.text;
    //print results
    document.querySelector(".quizz-page-questions-box").innerHTML += 
    `
        <div class="quizz-page-result" data-identifier="quizz-result">
            <div>
                <div class="result-title">
                    <p >${score}% de acerto: ${resultTitle}</p>
                </div>    
                <div class="result-description-box">
                    <img src="${resultImgURL}" />
                    <div class="result-text">
                        <p >${resultText}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="result-buttons">
            <button class="restart" onclick="restartQuizz()">Reiniciar Quizz</button>
            <button class="go-home" onclick="goHome()">Voltar pra Home</button>
        </div>
        `;
    //scroll down to result element
    document.querySelector(".quizz-page-result").scrollIntoView({behavior: "smooth"});
    
}

function goHome() {
    const quizzPage = document.querySelector(".quizz-page");
    const homePage = document.querySelector(".home");
    
    quizzPage.innerHTML = "";
    homePage.classList.remove("hide");
    window.scrollTo(0, 0);
}

function restartQuizz() {
    //scroll to top
    window.scrollTo(0, 0);

    //reset answers
        

    //hide result box
    document.querySelector(".quizz-page-result").classList.add("hide");
        //assim
        //eu sei que isso vai fazer com que o resultado anterior ainda exista na página,
            //mas acho que não vai causar problemas
        //se causar problemas, criar uma quizz-page-result-box ao final
            //da criação de perguntas
            //e inserir o resultado ali
}