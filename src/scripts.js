// Passar para a página seguinte
// Dina fez isso em uma aula do acelera aí
function nextPage(classPageA, classPageB){
    const pageA = document.querySelector(classPageA);
    const pageB = document.querySelector(classPageB);

    pageA.classList.add("hide");
    pageB.classList.remove("hide");
}

function verifyQuizzInfo(classPageA, classPageB){
    const inputTitle = document.querySelector(".quizz-title").value;
    const inputURL = document.querySelector(".quizz-url").value;
    const inputNumberOfQuestions = document.querySelector(".quizz-num-questions").value;
    const inputNumberOfLevels = document.querySelector(".quizz-num-levels").value;
    let control = 0;

    if(inputTitle.length < 20 || inputTitle.length > 65)
        alert("Título do Quizz deve ter entre 20 e 65 caracteres");   
    else control++;
    if(!verifyURL(inputURL))
        alert("Formato de URL inválido");   
    else control++;
    if(inputNumberOfQuestions < 3 )
        alert("São necessárias no mínimo 3 perguntas");   
    else control++;
    if(inputNumberOfLevels < 2)
        alert("São necessários no mínimo 2 níveis");   
    else control++;

    if(control === 4) 
        nextPage(classPageA, classPageB);
}

function verifyURL(url){
    var re = new RegExp("^((http(s?):\/\/(www.)?[a-zA-Z0-9]+.com\/)|(magnet:\?xt=urn:btih:))")

    var term = url

    if (re.test(term)) return true;
    else return false;
}