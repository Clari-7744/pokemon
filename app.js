// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

const container = document.querySelector("#container");
const inp = document.getElementById("pokemonNum");
const baseURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const info = { /*shown: [], notShown: [],*/ all: [], last: 0 }
const mons = [];

clearPage(true);
fetchMons();

async function fetchMons() {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=2000`).then(res => res.json());
    mons.push(...data.results);
    for (let i = 1; i <= 898; i++) { info.all.push(i); }
    for (let i = 10001; i <= 10228; i++) { info.all.push(i); }
}

function showMon(num) {
    if (!num) return alert('Something went wrong.');
    clearPage();
    console.log("Showing: " + num);
    inp.value = "";
    const monData = mons.find(el => parseInt(el.url.split('/')[6]) == num);
    console.log(num, monData, info.last);
    info.last = num;

    if (isNaN(num) || num < 1 || num > 898 && num < 10001 || num > 10228) {
        return alert("Please enter a valid number");
    }
    /*if (info.shown.includes(num)) {
        return alert("Already shown");
    }*/

    const pokemon = document.createElement("div");
    pokemon.classList.add("pokemon");
    pokemon.number = num;
    const label = document.createElement("span");
    let name = monData.name ? monData.name.split('-').map(str => str[0].toUpperCase() + str.slice(1)).join(' - ') : "Name Not Found";
    label.innerText = `#${num}: ${name}`;
    const newImg = document.createElement("img");
    newImg.src = `${baseURL}${num}.png`;

    pokemon.appendChild(newImg);
    pokemon.appendChild(label);
    /*info.shown.push(num);
    info.notShown.splice(info.notShown.indexOf(num), 1);*/
    let before;
    for (let c of container.children) {
        if (c.number > num) {
            before = c;
            break;
        }
    }
    container.insertBefore(pokemon, before);
    console.log(info.last);
};
function onShow() {
    showMon(parseInt(inp.value));
}
function showRandom() {
    let rand = Math.floor(Math.random() * info.all.length) + 1;
    showMon(info.all[rand]);
}
function showAll() {
    for (let i of Object.values(info.all)) {
        showMon(i);
    }
}

function clearPage(button = false) {
    container.innerHTML = "";
    if (button) {
        /*info.shown = [];
        info.notShown = info.all; */
    }
}
function next() {
    showMon(info.all[info.all.indexOf(info.last) + 1]);
}
function previous() {
    showMon(info.all[info.all.indexOf(info.last) - 1]);
}

document.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        onShow();
    }
});
