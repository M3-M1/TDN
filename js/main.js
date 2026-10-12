(() => {
"use strict";
const $ = (s) => document.querySelector(s);
const pasta = "assets/imagens/cartas/";
const dados = {perguntas:{quantidade:48,nome:"Carta de Perguntas"},farao:{quantidade:8,nome:"Carta do Faraó"},pragas:{quantidade:8,nome:"Praga do Egito"}};
let cartaAtual=null;
const modal=$("#modal-carta"), carta=$("#carta-3d");
function tirarCarta(tipo){
 ultimoFoco=document.activeElement;
 const numero=1+Math.floor(Math.random()*dados[tipo].quantidade);
 cartaAtual={tipo,numero};
 carta.classList.toggle("evento",tipo!=="perguntas");
 const arquivo=String(numero).padStart(2,"0")+".webp";
 $("#carta-verso").src=`${pasta}${tipo}/verso.png`;
 $("#carta-frente").src=`${pasta}${tipo}/${arquivo}`;
 $("#carta-frente").alt=`${dados[tipo].nome}, número ${numero}`;
 $("#titulo-carta").textContent=dados[tipo].nome;
 $("#instrucoes-carta").textContent="Toque na carta para revelar seu destino.";

 carta.classList.remove("virada","revelando");
 modal.classList.remove("oculto");
 document.body.style.overflow="hidden";
 carta.focus();
 requestAnimationFrame(()=>requestAnimationFrame(()=>{carta.classList.add("revelando","virada");atualizarInstrucao(true);}));
}
function atualizarInstrucao(virada){
 carta.setAttribute("aria-label",virada?"Ver o verso da carta":"Revelar a carta");
 $("#instrucoes-carta").textContent=virada?(cartaAtual.tipo==="perguntas"?"Acertou? Avance 2 casas. Toque para ver o verso.":"Siga a instrução da carta. Toque para ver o verso."):"Toque para revelar a carta.";
}
function virarCarta(){carta.classList.remove("revelando");atualizarInstrucao(carta.classList.toggle("virada"));}
function fechar(mod){mod.classList.add("oculto");if($("#modal-carta").classList.contains("oculto")&&$("#modal-ajuda").classList.contains("oculto")) document.body.style.overflow="";}
document.querySelectorAll("[data-baralho]").forEach(alvo=>{
 alvo.addEventListener("click",()=>tirarCarta(alvo.dataset.baralho));
 alvo.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();tirarCarta(alvo.dataset.baralho);}});
});

carta.addEventListener("click",virarCarta);
carta.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();virarCarta();}});
document.querySelectorAll("[data-fechar]").forEach(b=>b.addEventListener("click",()=>fechar(modal)));
document.querySelectorAll("[data-fechar-ajuda]").forEach(b=>b.addEventListener("click",()=>fechar($("#modal-ajuda"))));
$("#abrir-ajuda").addEventListener("click",()=>{ultimoFoco=document.activeElement;$("#modal-ajuda").classList.remove("oculto");document.body.style.overflow="hidden";});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){fechar(modal);fechar($("#modal-ajuda"));}});
const inicio=$("#abertura"),jogo=$("#jogo");
for(let i=0;i<24;i++){const grao=document.createElement("span");grao.className="grao";grao.setAttribute("aria-hidden","true");grao.style.setProperty("--x",`${Math.cos(i)*170}px`);grao.style.setProperty("--y",`${Math.sin(i)*80}px`);grao.style.setProperty("--atraso",`${i/24*1.8}s`);$("#iniciar").append(grao);}
let ultimoFoco=null;
const observador=new MutationObserver(()=>{const aberto=[modal,$("#modal-ajuda")].find(m=>!m.classList.contains("oculto"));if(aberto){if(!ultimoFoco)ultimoFoco=document.activeElement;$("#jogo").inert=true;(aberto===modal?carta:aberto.querySelector("button")).focus();}else{$("#jogo").inert=false;if(ultimoFoco){ultimoFoco.focus();ultimoFoco=null;}}});
[modal,$("#modal-ajuda")].forEach(m=>observador.observe(m,{attributes:true,attributeFilter:["class"]}));
document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const aberto=[modal,$("#modal-ajuda")].find(m=>!m.classList.contains("oculto"));if(!aberto)return;const focos=[...aberto.querySelectorAll('button,[tabindex="0"]')];const primeiro=focos[0],ultimo=focos.at(-1);if(e.shiftKey&&document.activeElement===primeiro){e.preventDefault();ultimo.focus();}else if(!e.shiftKey&&document.activeElement===ultimo){e.preventDefault();primeiro.focus();}});

// A finite canvas animation keeps individual grains crisp without a blurred overlay.
const tela=$("#tempestade"),ctx=tela.getContext("2d");
let animacaoTempestade=0;
function iniciarTempestade(){
 if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 cancelAnimationFrame(animacaoTempestade);
 const w=innerWidth,h=innerHeight,dpr=Math.min(devicePixelRatio||1,2);
 tela.width=w*dpr;tela.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
 const particulas=Array.from({length:Math.min(4600,Math.floor(w*h/180))},()=>({x:Math.random()*w*1.6-w*1.4,y:Math.random()*h,r:.6+Math.random()*2.6,v:2+Math.random()*3,t:Math.random()*6.28}));
 let inicioTempo;
 function frame(tempo){
  if(inicioTempo===undefined)inicioTempo=tempo;
  const t=(tempo-inicioTempo)/1000;
  ctx.clearRect(0,0,w,h);
  for(const p of particulas){
   const x=p.x+t*w*p.v*.5,y=p.y+Math.sin(t*5+p.t)*18;
   ctx.fillStyle=p.r>2?"#9d693d":"#f3cc8b";ctx.globalAlpha=Math.min(1,t*2)*.85;
   ctx.fillRect(x,y,p.r*(1+t*2),p.r);
  }
  ctx.globalAlpha=1;
  if(t<2.1)animacaoTempestade=requestAnimationFrame(frame);else ctx.clearRect(0,0,w,h);
 }
 animacaoTempestade=requestAnimationFrame(frame);
}
$("#iniciar").addEventListener("click",()=>{
 if(inicio.classList.contains("saindo"))return;
 inicio.classList.add("saindo");
 iniciarTempestade();
 setTimeout(()=>{inicio.classList.add("oculto");jogo.classList.remove("oculto");window.scrollTo(0,0);$("#abrir-ajuda").focus();},matchMedia("(prefers-reduced-motion: reduce)").matches?50:2100);
});
$("#voltar-inicio").addEventListener("click",e=>{e.preventDefault();jogo.classList.add("oculto");inicio.classList.remove("oculto","saindo");window.scrollTo(0,0);});
function modoDado(){let digital=$('input[name="modoDado"]:checked').value==="digital";$("#area-dado").classList.toggle("oculto",!digital);}
document.querySelectorAll('input[name="modoDado"]').forEach(i=>i.addEventListener("change",modoDado));
modoDado();
let lancando=false;
$("#lancar-dado").addEventListener("click",()=>{
 if(lancando)return;lancando=true;
 const cubo=$("#dado-cubo"), botao=$("#lancar-dado");
 cubo.classList.add("rolando");botao.disabled=true;
 $("#resultado-dado").textContent="Lançando o dado...";
 let contador=0;
 const interval=setInterval(()=>{cubo.textContent=String(1+Math.floor(Math.random()*6));contador++;if(contador>=12){clearInterval(interval);const valor=1+Math.floor(Math.random()*6);cubo.textContent=String(valor);cubo.classList.remove("rolando");$("#resultado-dado").textContent=`Resultado: ${valor}`;botao.disabled=false;lancando=false;}},90);
});
const casas=[
["🔵 Casa neutra","Nada acontece. Continue sua jornada."],
["❓ Casa das perguntas","Retire uma carta de Perguntas. Se acertar, avance 2 casas."],
["👑 Casa do Faraó","Retire uma carta do Faraó e receba o benefício indicado."],
["🩸 Casa das Pragas","Retire uma carta de Pragas e cumpra a penalidade."],
["🏜️ Entrada do Deserto","Siga pelo caminho alternativo através do deserto."],
["🌪️ Tempestade de areia","Volte 2 casas.","deserto"],
["☀️ Calor intenso","Volte 4 casas em direção ao Nilo.","deserto"],
["🐍 Cobras","Volte 1 casa.","deserto"],
["🦂 Escorpiões","Volte 3 casas.","deserto"],
["❓ Pergunta no deserto","Use o mesmo baralho de Perguntas. Acertou? Avance 2 casas.","deserto"],
["🔵 Retorno ao Nilo","Retorne ao caminho principal.","deserto"],
["🔺 As Três Pirâmides","Fim do percurso! O primeiro jogador a chegar vence.","final"]
];
const container=$("#casas");
for(const [nome,descricao,tipo] of casas){
 const article=document.createElement("article");article.className="casa "+(tipo||"");
 const titulo=document.createElement("strong");titulo.textContent=nome;
 const p=document.createElement("p");p.textContent=descricao;
 article.append(titulo,p);container.append(article);
}
})();
