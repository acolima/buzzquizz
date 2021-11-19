// ♥ SOPHIA ♥ start
//declarando variaveis para guardar fora das funções os valores que serão enviados

//para o objeto a postar:
let quizzTitle = '';
let quizzImgURL = '';
let questions = [];
let answers = [];
let levels = [];

//colocar quizzes na tela
    //quizzes do usuario
    //todos os quizzes
    getQuizzes();

// ♥ SOPHIA ♥ end


// Passar para a página seguinte
// Dina fez isso em uma aula do acelera aí
function nextPage(classPageA, classPageB) {
    const pageA = document.querySelector(classPageA);
    const pageB = document.querySelector(classPageB);

    pageA.classList.add("hide");
    pageB.classList.remove("hide");
}

function verifyQuizzInfo(classPageA, classPageB) {
    const inputTitle = document.querySelector(".quizz-title").value;
    const inputURL = document.querySelector(".quizz-url").value;
    const inputNumberOfQuestions = document.querySelector(".quizz-num-questions").value;
    const inputNumberOfLevels = document.querySelector(".quizz-num-levels").value;
    let control = 0;

    if (inputTitle.length < 20 || inputTitle.length > 65)
        alert("Título do Quizz deve ter entre 20 e 65 caracteres");
    else control++;
    if (!verifyURL(inputURL))
        alert("Formato de URL inválido");
    else control++;
    if (inputNumberOfQuestions < 3)
        alert("São necessárias no mínimo 3 perguntas");
    else control++;
    if (inputNumberOfLevels < 2)
        alert("São necessários no mínimo 2 níveis");
    else control++;

    if (control === 4)
        nextPage(classPageA, classPageB);
}

function verifyURL(url) {
    var re = new RegExp("^((http(s?):\/\/(www.)?[a-zA-Z0-9]+.com\/)|(magnet:\?xt=urn:btih:))")

    var term = url

    if (re.test(term)) return true;
    else return false;
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
        renderQuizz(image,title);
    }
    //pra quizzes do usuario, filtrar. mas isso é um problema pra sophia do futuro.
}
const span = document.querySelector('span');
function renderQuizz(img, title) {
    span.innerHTML +=
    `
    <div class="quizz-preview">
        <img src="${img}" alt="imagem teste">
        <p>${title}</p>
    </div>
    `;
    //!!! falta o link para o quizz!!!
    
    //onclick directs user to that quizz
}

// ♥ SOPHIA ♥ end