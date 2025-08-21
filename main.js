const listaJogos = [
    {name: "Termo", link: "https://term.ooo"},
    {name: "Angle", link: "https://angle.wtf"},
    {name: "Globle", link: "https://globle-game.com/"},
    {name: "Nerdle", link: "https://nerdlegame.com/"},
    {name: "Flagle", link: "https://www.flagle.io/"},
    {name: "Conexo", link: "https://conexo.ws/pt/"},
    {name: "Letroso", link: "https://letroso.com/pt/"},
    {name: "Palavras cruzadas", link: "https://g1.globo.com/jogos/palavras-cruzadas/"},
    {name: "Travle", link: "https://travle.earth/"},
    {name: "Soletra", link: "https://g1.globo.com/jogos/soletra/"}
];

const jogos = JSON.parse(localStorage.getItem("jogos") || "[]");
if (!jogos || !jogos[0] || !jogos[0].name) {
    listaJogos.forEach(jogo => {
        jogos.push({name: jogo.name, link:jogo.link, state: false});
    });
}

function carregarJogos() {
    jogos.forEach(jogo => {
        const container = document.getElementById("Jogos");
        const template = document.getElementById("jogo-template");
        const clone = template.content.cloneNode(true);
        const divJogo = clone.querySelector(".jogo");
        divJogo.dataset.estado = jogo.state ? "resolvido" : "pendente";
        const botao = clone.querySelector(".botao-jogo");
        botao.textContent = jogo.name;
        botao.addEventListener("click", () => {
            jogo.state = true;
            localStorage.setItem("jogos", JSON.stringify(jogos));
            sortJogos();
            const novaAba = window.open("", "_blank");
            novaAba.location.href = jogo.link;
        });
        container.appendChild(clone);
    });
}

sortJogos();

function sortJogos() {
    jogos.sort((a, b) => {
        if (a.state === b.state) return 0;
        if (a.state) return 1;
        return -1;
    });
    const container = document.getElementById("Jogos");
    container.innerHTML = "";
    carregarJogos();
}