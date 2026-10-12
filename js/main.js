(() => {
"use strict";
const $ = (s) => document.querySelector(s);
const pasta = "assets/imagens/cartas/";
const dados = {perguntas:{quantidade:48,nome:"Carta de Perguntas"},farao:{quantidade:8,nome:"Carta do Faraó"},pragas:{quantidade:8,nome:"Praga do Egito"}};
let cartaAtual=null;
const gabarito={"01":"D","02":"B","03":"C","04":"D","05":"C","06":"A","07":"D","08":"B","09":"B","10":"D","11":"D","12":"C","13":"C","14":"A","15":"D","16":"B","17":"D","18":"C","19":"D","20":"A","21":"D","22":"C","23":"A","24":"D","25":"C","26":"A","27":"B","28":"D","29":"A","30":"B","31":"C","32":"D","33":"A","34":"B","35":"A","36":"C","37":"B","38":"C","39":"A","40":"C","41":"A","42":"D","43":"A","44":"B","45":"C","46":"A","47":"C","48":"D"};
const caixasRespostas={"01":{"x":31.058,"y":63.63,"width":38.279,"height":3.432},"02":{"x":28.091,"y":62.97,"width":44.016,"height":3.762},"03":{"x":31.058,"y":61.584,"width":37.784,"height":3.432},"04":{"x":29.179,"y":70.495,"width":41.741,"height":3.432},"05":{"x":29.377,"y":64.032,"width":41.642,"height":3.36},"06":{"x":29.278,"y":67.787,"width":41.642,"height":3.36},"07":{"x":29.08,"y":60.277,"width":41.741,"height":3.36},"08":{"x":29.08,"y":67.787,"width":41.543,"height":3.36},"09":{"x":29.377,"y":55.731,"width":41.642,"height":3.36},"10":{"x":29.278,"y":67.787,"width":41.642,"height":3.36},"11":{"x":29.08,"y":57.51,"width":41.741,"height":3.36},"12":{"x":29.278,"y":66.601,"width":41.642,"height":3.36},"13":{"x":31.157,"y":59.802,"width":38.081,"height":3.432},"14":{"x":31.058,"y":59.802,"width":38.18,"height":3.432},"15":{"x":30.959,"y":59.802,"width":38.18,"height":3.432},"16":{"x":30.861,"y":63.564,"width":38.081,"height":3.498},"17":{"x":31.058,"y":59.684,"width":38.279,"height":3.426},"18":{"x":31.157,"y":53.755,"width":37.982,"height":3.426},"19":{"x":30.861,"y":55.929,"width":38.279,"height":3.426},"20":{"x":30.861,"y":59.684,"width":38.081,"height":3.426},"21":{"x":31.058,"y":51.779,"width":38.279,"height":3.426},"22":{"x":31.058,"y":59.289,"width":38.081,"height":3.426},"23":{"x":30.861,"y":66.798,"width":38.18,"height":3.426},"24":{"x":29.377,"y":70.29,"width":40.158,"height":4.084},"25":{"x":30.564,"y":67.589,"width":39.07,"height":3.426},"26":{"x":30.366,"y":59.684,"width":39.268,"height":3.426},"27":{"x":30.465,"y":55.929,"width":38.971,"height":3.426},"28":{"x":30.267,"y":63.439,"width":39.169,"height":3.426},"29":{"x":30.465,"y":63.366,"width":39.268,"height":3.432},"30":{"x":30.465,"y":60.99,"width":38.971,"height":3.432},"31":{"x":30.465,"y":60.99,"width":38.971,"height":3.432},"32":{"x":30.267,"y":57.228,"width":39.169,"height":3.432},"33":{"x":30.465,"y":54.851,"width":39.268,"height":3.432},"34":{"x":30.465,"y":61.188,"width":38.971,"height":3.432},"35":{"x":30.267,"y":63.564,"width":39.268,"height":3.432},"36":{"x":30.267,"y":62.376,"width":39.07,"height":3.432},"37":{"x":30.663,"y":67.327,"width":38.872,"height":3.432},"38":{"x":30.564,"y":59.802,"width":38.971,"height":3.432},"39":{"x":30.267,"y":52.277,"width":39.268,"height":3.432},"40":{"x":30.267,"y":56.04,"width":39.07,"height":3.432},"41":{"x":30.465,"y":59.881,"width":39.268,"height":3.426},"42":{"x":30.465,"y":63.636,"width":39.07,"height":3.426},"43":{"x":30.267,"y":56.126,"width":39.268,"height":3.426},"44":{"x":30.267,"y":56.126,"width":39.07,"height":3.426},"45":{"x":30.564,"y":60.079,"width":39.07,"height":3.426},"46":{"x":30.366,"y":60.079,"width":39.268,"height":3.426},"47":{"x":30.465,"y":52.569,"width":38.971,"height":3.426},"48":{"x":30.267,"y":60.079,"width":39.169,"height":3.426}};
const modal=$("#modal-carta"), carta=$("#carta-3d");
function tirarCarta(tipo){
 ultimoFoco=document.activeElement;
 const numero=1+Math.floor(Math.random()*dados[tipo].quantidade);
 cartaAtual={tipo,numero};
 const mascara=$("#mascara-resposta"),botaoResposta=$("#verificar-resposta");
 const caixa=tipo==="perguntas"?caixasRespostas[String(numero).padStart(2,"0")]:null;
 mascara.classList.toggle("oculto",!caixa);
 const imagemFrente=$("#carta-frente");
 if(caixa){
  const topo=caixa.y-.4,fundo=caixa.y+caixa.height+8.1;
  // Exclude the printed answer pixels from the image itself as it is rendered.
  imagemFrente.style.clipPath=`polygon(evenodd,0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,12% ${topo}%,12% ${fundo}%,88% ${fundo}%,88% ${topo}%,12% ${topo}%)`;
 }else imagemFrente.style.clipPath="none";
 mascara.classList.add("oculto");
 $("#resposta-conferida").classList.add("oculto");$("#resposta-conferida").textContent="";
 botaoResposta.classList.add("oculto");botaoResposta.textContent="Verificar resposta";botaoResposta.setAttribute("aria-expanded","false");
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
 $("#verificar-resposta").classList.toggle("oculto",!virada||cartaAtual.tipo!=="perguntas");
 if(!virada)$("#resposta-conferida").classList.add("oculto");
 carta.setAttribute("aria-label",virada?"Ver o verso da carta":"Revelar a carta");
 $("#instrucoes-carta").textContent=virada?"Toque para ver o verso":"Toque para revelar a carta";
}
$("#verificar-resposta").addEventListener("click",()=>{
 const resposta=$("#resposta-conferida"),botao=$("#verificar-resposta");
 const mostrar=resposta.classList.contains("oculto");
 resposta.textContent="Resposta correta: "+gabarito[String(cartaAtual.numero).padStart(2,"0")]+".";
 resposta.classList.toggle("oculto",!mostrar);
 botao.setAttribute("aria-expanded",String(mostrar));botao.textContent=mostrar?"Ocultar resposta":"Verificar resposta";
});
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
Promise.all([...inicio.querySelectorAll(".ornamento img")].map(imagem=>imagem.decode().catch(()=>{}))).then(()=>inicio.classList.add("ornamentos-prontos"));
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
 const particulas=Array.from({length:Math.min(4600,Math.floor(w*h/180))},()=>({x:Math.random(),y:Math.random()*h,r:.6+Math.random()*2.6,v:2+Math.random()*3,t:Math.random()*6.28}));
 let inicioTempo;
 function frame(tempo){
  if(inicioTempo===undefined)inicioTempo=tempo;
  const t=(tempo-inicioTempo)/1000;
  ctx.clearRect(0,0,w,h);
  for(const p of particulas){
   const frente=t*w*1.45;
   const x=frente-p.x*w*.95,y=p.y+Math.sin(t*5+p.t)*18;
   ctx.fillStyle=p.r>2?"#9d693d":"#f3cc8b";ctx.globalAlpha=Math.min(1,t*2)*.85;
   ctx.fillRect(x,y,p.r*(1+t*2),p.r);
  }
  ctx.globalAlpha=1;
  if(t<1.95)animacaoTempestade=requestAnimationFrame(frame);else ctx.clearRect(0,0,w,h);
 }
 animacaoTempestade=requestAnimationFrame(frame);
}
$("#iniciar").addEventListener("click",()=>{
 if(inicio.classList.contains("saindo"))return;
 inicio.classList.add("saindo");
 const reduzido=matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(!reduzido)setTimeout(()=>{inicio.classList.add("tempestade-ativa");iniciarTempestade();},1800);
 setTimeout(()=>{inicio.classList.add("oculto");jogo.classList.remove("oculto");window.scrollTo(0,0);$("#abrir-ajuda").focus();},matchMedia("(prefers-reduced-motion: reduce)").matches?50:3800);
});
$("#voltar-inicio").addEventListener("click",e=>{e.preventDefault();jogo.classList.add("oculto");inicio.classList.remove("oculto","saindo","tempestade-ativa");window.scrollTo(0,0);});
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
