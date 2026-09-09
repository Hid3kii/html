// =========================================================
// 📅 EDITE AQUI A DATA SUGERIDA (formato: "AAAA-MM-DD")
// Exemplo: "2026-09-20"
const DATA_SUGERIDA = "2026-09-12";
// =========================================================

const questionContainer = document.getElementById("question-container");
const scheduleContainer = document.getElementById("schedule-container");
const successContainer = document.getElementById("success-container");

const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");
const mensagemFuga = document.getElementById("mensagem-fuga");

const dataSugeridaTexto = document.getElementById("data-sugerida-texto");
const inputData = document.getElementById("input-data");
const inputHorario = document.getElementById("input-horario");
const btnConfirmar = document.getElementById("btn-confirmar");

const comprovanteData = document.getElementById("comprovante-data");
const comprovanteHorario = document.getElementById("comprovante-horario");

// ---------------------------------------------------------
// Utilidade: formata "AAAA-MM-DD" para "dia da semana, dd/mm/aaaa"
// ---------------------------------------------------------
function formatarData(dataISO) {
    // Evita bug de fuso horário criando a data como local, não UTC
    const [ano, mes, dia] = dataISO.split("-").map(Number);
    const data = new Date(ano, mes - 1, dia);

    const diasSemana = [
        "domingo", "segunda-feira", "terça-feira",
        "quarta-feira", "quinta-feira", "sexta-feira", "sábado"
    ];

    const diaSemana = diasSemana[data.getDay()];
    const diaFormatado = String(dia).padStart(2, "0");
    const mesFormatado = String(mes).padStart(2, "0");

    return `${diaSemana}, ${diaFormatado}/${mesFormatado}/${ano}`;
}

function formatarHorario(horario) {
    return horario; // já vem como "HH:MM" do input type="time"
}

// ---------------------------------------------------------
// Frases engraçadinhas quando clica em NÃO
// ---------------------------------------------------------
const frasesFuga = [
    "Tenta de novo...",
    "Tem certeza?",
    "O Nelson vai ficar triste...",
    "Última chance!"
];
let fugaIndex = 0;

btnNo.addEventListener("mouseenter", moverBotaoNao);
btnNo.addEventListener("click", (e) => {
    e.preventDefault();
    moverBotaoNao();
});

function moverBotaoNao() {
    mensagemFuga.textContent = frasesFuga[fugaIndex % frasesFuga.length];
    fugaIndex++;

    const maxX = 80;
    const maxY = 40;
    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 2 - 1) * maxY;

    btnNo.style.position = "relative";
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
}

// ---------------------------------------------------------
// Clique em SIM: vai para a tela de agendamento
// ---------------------------------------------------------
btnYes.addEventListener("click", () => {
    dataSugeridaTexto.textContent = formatarData(DATA_SUGERIDA);

    // Impede escolher uma data alternativa no passado
    const hoje = new Date();
    const hojeISO = hoje.toISOString().split("T")[0];
    inputData.min = hojeISO;

    questionContainer.classList.add("hidden");
    scheduleContainer.classList.remove("hidden");
});

// ---------------------------------------------------------
// Clique em Confirmar: valida horário e mostra o comprovante
// ---------------------------------------------------------
btnConfirmar.addEventListener("click", () => {
    if (!inputHorario.value) {
        alert("Escolha um horário para confirmar o encontro!");
        return;
    }

    // Se a pessoa escolheu uma data alternativa, usa ela.
    // Caso contrário, mantém a data sugerida.
    const dataFinalISO = inputData.value ? inputData.value : DATA_SUGERIDA;

    comprovanteData.textContent = formatarData(dataFinalISO);
    comprovanteHorario.textContent = formatarHorario(inputHorario.value);

    scheduleContainer.classList.add("hidden");
    successContainer.classList.remove("hidden");
});
