const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

const DECKS={
  perguntas:{
    label:'Cartas de perguntas',
    back:'assets/cards/perguntas/verso.png',
    fronts:Array.from({length:48},(_,i)=>`assets/cards/perguntas/carta-${String(i+1).padStart(2,'0')}.png`)
  },
  pragas:{
    label:'Pragas do Egito',
    back:'assets/cards/pragas/verso.png',
    fronts:Array.from({length:8},(_,i)=>`assets/cards/pragas/carta-${String(i+1).padStart(2,'0')}.png`)
  },
  farao:{
    label:'Cartas do Faraó',
    back:'assets/cards/farao/verso.png',
    fronts:Array.from({length:8},(_,i)=>`assets/cards/farao/carta-${String(i+1).padStart(2,'0')}.png`)
  }
};

const bags={};
let lastDeck='perguntas';

function shuffle(source){
  const a=[...source];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}
function nextCard(deck){
  if(!bags[deck]||bags[deck].length===0) bags[deck]=shuffle(DECKS[deck].fronts);
  return bags[deck].pop();
}

function renderDecks(){
  $('#decks').innerHTML=Object.entries(DECKS).map(([key,deck])=>`
    <button class="deck" data-deck="${key}" aria-label="Sortear ${deck.label}">
      <div class="stack">
        <img class="stack-card" src="${deck.back}" alt="">
        <img class="stack-card" src="${deck.back}" alt="">
        <img class="stack-card" src="${deck.back}" alt="${deck.label}">
      </div>
      <div class="deck-title">${deck.label}</div>
    </button>
  `).join('');
  $$('.deck').forEach(btn=>btn.addEventListener('click',()=>drawCard(btn.dataset.deck)));
}

function drawCard(deck){
  lastDeck=deck;
  const front=nextCard(deck);
  $('#cardBack').src=DECKS[deck].back;
  $('#cardFront').src=front;

  const inner=$('#cardInner');
  inner.classList.remove('animate');
  void inner.offsetWidth;
  inner.classList.add('animate');
  $('#drawn').classList.add('show');
}

$('#again').addEventListener('click',()=>drawCard(lastDeck));
$('#close').addEventListener('click',()=>$('#drawn').classList.remove('show'));
$('#drawn').addEventListener('click',e=>{if(e.target.id==='drawn')$('#drawn').classList.remove('show')});
addEventListener('keydown',e=>{if(e.key==='Escape')$('#drawn').classList.remove('show')});

function scrollToId(id){document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'})}

$('#enter').addEventListener('click',()=>{
  const intro=$('#intro');
  intro.classList.add('opening');
  setTimeout(()=>{
    intro.classList.add('hidden');
    $('#app').classList.add('ready');
  },1450);
});

const diceMap={
  1:['c'],
  2:['tl','br'],
  3:['tl','c','br'],
  4:['tl','tr','bl','br'],
  5:['tl','tr','c','bl','br'],
  6:['tl','tr','ml','mr','bl','br']
};
function setDice(v){
  Object.keys({tl:1,tr:1,ml:1,c:1,mr:1,bl:1,br:1}).forEach(pos=>{
    $('#dice .'+pos).classList.toggle('show',diceMap[v].includes(pos));
  });
  $('#dice').setAttribute('aria-label','Dado mostrando '+v);
  $('#diceText').textContent='Resultado: '+v;
}
function rollDice(){
  const v=1+Math.floor(Math.random()*6);
  const d=$('#dice');
  d.classList.remove('roll');
  void d.offsetWidth;
  setDice(v);
  d.classList.add('roll');
}

/* pré-carrega as cartas para a animação não mostrar flash */
Object.values(DECKS).forEach(deck=>{
  [deck.back,...deck.fronts].forEach(src=>{const img=new Image();img.src=src});
});

renderDecks();
setDice(1);
