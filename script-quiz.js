// Elementos DOM
const startBtn = document.getElementById('start');
const dificuldadeSelect = document.getElementById('dificuldade');
const perguntaEl = document.getElementById('pergunta');
const opcoesEl = document.getElementById('opcoes');
const pontuacaoEl = document.getElementById('pontuacao');
const timerEl = document.getElementById('timer');
const somAcerto = document.getElementById('som-acerto');
const somErro = document.getElementById('som-erro');

let dificuldade = 'facil';
let questoes = [];
let questaoAtual = 0;
let pontos = 0;
let tempo = 15;
let intervalo;
let totalQuestoes = 0;

// Perguntas
const perguntas = {
  facil: [
    { pergunta: "Qual animal é comumente vacinado contra a raiva?", opcoes: ["Gato", "Tartaruga", "Peixe", "Papagaio"], resposta: "Gato" },
    { pergunta: "O que é um cão SRD?", opcoes: ["Sem Registro de Doença", "Sem Raça Definida", "Saudável Recém-Diagnosticado", "Super Rápido e Dócil"], resposta: "Sem Raça Definida" },
    { pergunta: "Qual desses é um felino?", opcoes: ["Cachorro", "Cavalo", "Gato", "Porquinho-da-índia"], resposta: "Gato" },
    { pergunta: "Qual sentido é mais aguçado nos cães?", opcoes: ["Visão", "Paladar", "Tato", "Olfato"], resposta: "Olfato" },
    { pergunta: "Qual dessas aves é frequentemente tratada em clínicas veterinárias?", opcoes: ["Papagaio", "Águia", "Coruja", "Urubu"], resposta: "Papagaio" },
    { pergunta: "O que significa a sigla 'CV' em clínicas?", opcoes: ["Centro de Vacinação", "Clínica Veterinária", "Consulta Visual", "Cuidado de Vida"], resposta: "Clínica Veterinária" },
    { pergunta: "Qual desses é um parasita externo?", opcoes: ["Verme", "Carrapato", "Giárdia", "Toxoplasma"], resposta: "Carrapato" },
    { pergunta: "Qual desses animais é um roedor?", opcoes: ["Coelho", "Gato", "Cachorro", "Cavalo"], resposta: "Coelho" },
    { pergunta: "O que é zoonose?", opcoes: ["Doença só de animais", "Doença transmissível entre humanos", "Doença que passa de animal para humano", "Doença só de plantas"], resposta: "Doença que passa de animal para humano" },
    { pergunta: "Qual é o nome do exame de imagem que mostra os ossos?", opcoes: ["Ultrassom", "Tomografia", "Endoscopia", "Raio-X"], resposta: "Raio-X" },
    { pergunta: "Qual profissional pode aplicar vacinas em animais?", opcoes: ["Farmacêutico", "Veterinário", "Biólogo", "Agrônomo"], resposta: "Veterinário" },
    { pergunta: "O que o veterinário analisa no hemograma?", opcoes: ["Níveis de hormônio", "Células do sangue", "Temperatura corporal", "Frequência cardíaca"], resposta: "Células do sangue" }
  ],
  medio: [
    { pergunta: "O que é parvovirose?", opcoes: ["Doença respiratória", "Infecção de ouvido", "Doença viral gastrointestinal", "Alergia alimentar"], resposta: "Doença viral gastrointestinal" },
    { pergunta: "Qual desses animais é ruminante?", opcoes: ["Porco", "Cavalo", "Boi", "Coelho"], resposta: "Boi" },
    { pergunta: "A esporotricose é causada por:", opcoes: ["Bactéria", "Vírus", "Fungo", "Protozoário"], resposta: "Fungo" },
    { pergunta: "Qual estrutura é responsável pela filtração no rim?", opcoes: ["Nefrônio", "Alvéolo", "Axônio", "Glândula"], resposta: "Nefrônio" },
    { pergunta: "Qual vacina é obrigatória por lei em cães no Brasil?", opcoes: ["Gripe canina", "Raiva", "Leishmaniose", "Parvovirose"], resposta: "Raiva" },
    { pergunta: "A leptospirose é transmitida principalmente por:", opcoes: ["Carrapatos", "Fezes de gato", "Urina de rato", "Água contaminada por cães"], resposta: "Urina de rato" },
    { pergunta: "O exame 'coproparasitológico' serve para detectar:", opcoes: ["Parasitas intestinais", "Doenças respiratórias", "Fraturas", "Tumores"], resposta: "Parasitas intestinais" },
    { pergunta: "A função da bile é:", opcoes: ["Regular o açúcar no sangue", "Digestionar gorduras", "Transportar oxigênio", "Controlar o ritmo cardíaco"], resposta: "Digestionar gorduras" },
    { pergunta: "Qual desses medicamentos é um anti-inflamatório?", opcoes: ["Ivermectina", "Amoxicilina", "Prednisona", "Metronidazol"], resposta: "Prednisona" },
    { pergunta: "A anestesia inalatória usa principalmente:", opcoes: ["Gás", "Injeção", "Líquido oral", "Pomada"], resposta: "Gás" },
    { pergunta: "O que é um animal exótico?", opcoes: ["Animal de grande porte", "Animal selvagem", "Animal que não é nativo do país", "Animal com cor incomum"], resposta: "Animal que não é nativo do país" },
    { pergunta: "A profilaxia é:", opcoes: ["Diagnóstico precoce", "Tratamento intensivo", "Prevenção de doenças", "Curativo externo"], resposta: "Prevenção de doenças" }
  ],
  dificil: [
    { pergunta: "Qual o nome da bactéria causadora da brucelose?", opcoes: ["Brucella abortus", "E. coli", "Salmonella spp.", "Pasteurella multocida"], resposta: "Brucella abortus" },
    { pergunta: "A doença de Aujeszky afeta principalmente:", opcoes: ["Cães", "Suínos", "Aves", "Equinos"], resposta: "Suínos" },
    { pergunta: "O ciclo estral das cadelas ocorre, em média, a cada:", opcoes: ["1 mês", "3 meses", "6 meses", "12 meses"], resposta: "6 meses" },
    { pergunta: "A babesiose é transmitida por:", opcoes: ["Mosquito", "Carrapato", "Pulga", "Fezes contaminadas"], resposta: "Carrapato" },
    { pergunta: "Qual estrutura do coração recebe sangue venoso do corpo?", opcoes: ["Ventrículo esquerdo", "Átrio esquerdo", "Átrio direito", "Aorta"], resposta: "Átrio direito" },
    { pergunta: "A encefalopatia espongiforme bovina é também conhecida como:", opcoes: ["Febre do Nilo", "Raiva bovina", "Doença da vaca louca", "Aftosa"], resposta: "Doença da vaca louca" },
    { pergunta: "O agente causador da cinomose é:", opcoes: ["Bactéria", "Protozoário", "Fungo", "Vírus"], resposta: "Vírus" },
    { pergunta: "Qual o princípio ativo do antiparasitário 'Revolution'?", opcoes: ["Ivermectina", "Milbemicina", "Selamectina", "Fipronil"], resposta: "Selamectina" },
    { pergunta: "O exame 'ultrassonografia abdominal' é indicado para observar:", opcoes: ["Ossos", "Sistema nervoso", "Órgãos internos moles", "Pele"], resposta: "Órgãos internos moles" },
    { pergunta: "Qual é a frequência cardíaca média de um gato adulto saudável?", opcoes: ["60-100 bpm", "120-160 bpm", "140-220 bpm", "220-280 bpm"], resposta: "140-220 bpm" },
    { pergunta: "O termo 'iatrogênico' se refere a:", opcoes: ["Doença infecciosa", "Erro causado pelo tratamento", "Transmissão genética", "Doença de origem desconhecida"], resposta: "Erro causado pelo tratamento" },
    { pergunta: "O sistema porta-hepático está relacionado a qual órgão?", opcoes: ["Rins", "Estômago", "Fígado", "Coração"], resposta: "Fígado" }
  ]
};

// Inicializar quiz
startBtn.addEventListener('click', iniciarQuiz);

function iniciarQuiz() {
  dificuldade = dificuldadeSelect.value;
  questoes = embaralhar([...perguntas[dificuldade]]);
  questaoAtual = 0;
  pontos = 0;
  totalQuestoes = questoes.length;
  pontuacaoEl.innerText = `Pontos: ${pontos}`;
  mostrarPergunta();
}

function mostrarPergunta() {
  if (questaoAtual >= questoes.length) {
    encerrarQuiz();
    return;
  }

  const q = questoes[questaoAtual];
  perguntaEl.innerText = q.pergunta;
  opcoesEl.innerHTML = '';

  q.opcoes.forEach(opcao => {
    const btn = document.createElement('button');
    btn.innerText = opcao;
    btn.addEventListener('click', () => escolherOpcao(opcao, q.resposta, btn));
    opcoesEl.appendChild(btn);
  });

  tempo = 15;
  timerEl.innerText = `Tempo: ${tempo}`;
  clearInterval(intervalo);
  intervalo = setInterval(() => {
    tempo--;
    timerEl.innerText = `Tempo: ${tempo}`;
    if (tempo <= 0) {
      clearInterval(intervalo);
      escolherOpcao(null, q.resposta);
    }
  }, 1000);
}

function escolherOpcao(selecionada, correta, botao = null) {
  clearInterval(intervalo);

  const botoes = opcoesEl.querySelectorAll('button');
  botoes.forEach(b => {
    if (b.innerText === correta) b.classList.add('correta');
    else if (b.innerText === selecionada) b.classList.add('errada');
    b.disabled = true;
  });

  if (selecionada === correta) {
    pontos++;
    pontuacaoEl.innerText = `Pontos: ${pontos}`;
    somAcerto.play();
  } else {
    somErro.play();
  }

  setTimeout(() => {
    questaoAtual++;
    mostrarPergunta();
  }, 1500);
}

function encerrarQuiz() {
  clearInterval(intervalo);
  const nome = prompt("Digite seu nome para o ranking:");
  if (nome) {
    const chaveRanking = `ranking_${dificuldade}`;
    const ranking = JSON.parse(localStorage.getItem(chaveRanking)) || [];

    ranking.push({ nome, pontuacao: pontos });
    ranking.sort((a, b) => b.pontuacao - a.pontuacao);
    localStorage.setItem(chaveRanking, JSON.stringify(ranking));
  }
  alert(`Quiz concluído! Sua pontuação foi: ${pontos}/${totalQuestoes}`);
  window.location.href = "index.html";
}


function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}
