let numberOfQuestions = 0;
let numberOfLevels = 0;

let your_ids_array = JSON.parse(localStorage.getItem("your_ids"));

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

// Verifica as informações do quiz
function verifyQuizzInfo(classPageA, classPageB){
    const quizzTitleInput = document.querySelector(".quizz-title").value;
    const quizzURLInput = document.querySelector(".quizz-url").value;
    numberOfQuestions = document.querySelector(".quizz-num-questions").value;
    numberOfLevels = document.querySelector(".quizz-num-levels").value;
    let control = 0;

    if(quizzTitleInput.length < 20 || quizzTitleInput.length > 65)
        alert("Título do Quizz deve ter entre 20 e 65 caracteres");   
    else control++;
    if(!verifyURL(quizzURLInput))
        alert("Formato de URL inválido");   
    else control++;
    if(numberOfQuestions < 3 )
        alert("São necessárias no mínimo 3 perguntas");   
    else control++;
    if(numberOfLevels < 2)
        alert("São necessários no mínimo 2 níveis");   
    else control++;

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
        <div class="question" style="height: 825px">
            <p>Pergunta 1</p>
            <div class="question-input" style="padding-top: 20px">
                <input class="quizz-input question-title" type="text" placeholder="Texto da pergunta"/>
                <input class="quizz-input question-color" type="text" placeholder="Cor de fundo da pergunta"/>
                <p>Resposta correta</p>
                <input class="quizz-input correct-answer-text" type="text" placeholder="Resposta correta"/>
                <input class="quizz-input correct-answer-img" type="text" placeholder="URL da imagem"/>
                <p>Respostas incorreta</p>
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
                    <p>Pergunta ${i}</p>
                    <ion-icon name="create-outline" onclick="editQuestion(this, '.question-input', 'edit-question')"></ion-icon>
                </div>
                <div class="question-input hide">
                    <input class="quizz-input question-title" type="text" placeholder="Texto da pergunta"/>
                    <input class="quizz-input question-color" type="text" placeholder="Cor de fundo da pergunta"/>
                    <p>Resposta correta</p>
                    <input class="quizz-input correct-answer-text" type="text" placeholder="Resposta correta"/>
                    <input class="quizz-input correct-answer-img" type="text" placeholder="URL da imagem"/>
                    <p>Respostas incorreta</p>
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
        alert("A cor deve ser escrita em formato hexadecimal");
    }
    else if(correctAnswerText === ""){
        alert("Preencha o campo da Resposta Correta");
    }
    else if(!verifyURL(correctAnswerImg)){
        alert("Url inválida");
    }
    else if(numberOfIncorrectAnswers === 0){
        alert("Preencha o campo das respostas incorretas");
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
        <div class="level" style="height: 316px">
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
            <div class="level">
                <div class="level-header">
                    <p>Nível ${i}</p>
                    <ion-icon name="create-outline" onclick="editQuestion(this, '.level-input', 'edit-level')"></ion-icon>
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
        alert("Digite uma URL válida");
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

// ♥ SOPHIA ♥ start

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

        for(let j = 0; j < your_ids_array.length; j++){
            if(quizzes[i].id === your_ids_array[j]){
                renderQuizz(span_your_quizzes, img, title, id);
                isYourQuizz = true;
            }
            else{

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

    //render banner
    document.querySelector("body").innerHTML += 
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

        document.querySelector(".quizz-page-questions-box").innerHTML += 
        `
        <div class="quizz-page-question">
            <div>
                <p class="question-title" id="question${i}">${questionTitle}</p>
                <div class="quizz-page-answers-box spawn"></div>
            </div>
        </div>
        `;
        document.getElementById('question' + i).style.backgroundColor =  questionColor;

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