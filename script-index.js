const dificuldadeSelect = document.getElementById('dificuldade');
const rankingList = document.getElementById('ranking-list');

dificuldadeSelect.addEventListener('change', atualizarRanking);

function atualizarRanking() {
    const dificuldade = dificuldadeSelect.value;
    const ranking = JSON.parse(localStorage.getItem(`ranking_${dificuldade}`)) || [];
    rankingList.innerHTML = '';

    ranking.forEach((item, i) => {
        const li = document.createElement('li');
        li.innerText = `${i + 1}º - ${item.nome}: ${item.pontos} pontos`;
        rankingList.appendChild(li);
    });
}

// Carregar ranking inicial (Fácil por padrão)
window.onload = () => {
    dificuldadeSelect.value = 'facil';
    atualizarRanking();
};
