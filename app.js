const c=document.querySelector("canvas"),ctx=c.getContext("2d");
let W,H,pts=[];
function resize(){
 const d=devicePixelRatio||1;
 W=c.width=innerWidth*d;H=c.height=innerHeight*d;
 c.style.width=innerWidth+"px";c.style.height=innerHeight+"px";
 pts=Array.from({length:Math.min(160,Math.floor(innerWidth/7))},()=>({
   x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.2,s:Math.random()*.8+.15
 }));
}
resize();addEventListener("resize",resize);
function draw(){
 ctx.clearRect(0,0,W,H);
 for(const p of pts){
  p.y-=p.s;if(p.y<0)p.y=H;
  ctx.beginPath();ctx.arc(p.x,p.y,p.r*p.s,0,Math.PI*2);
  ctx.fillStyle="rgba(36,75,61,.24)";ctx.fill();
 }
 requestAnimationFrame(draw);
}
draw();
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("show")),{threshold:.1});
document.querySelectorAll(".reveal").forEach(e=>io.observe(e));
document.querySelectorAll(".tilt").forEach(card=>{
 card.addEventListener("mousemove",e=>{
  const r=card.getBoundingClientRect();
  const rx=-(e.clientY-r.top-r.height/2)/22;
  const ry=(e.clientX-r.left-r.width/2)/22;
  card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
 });
 card.addEventListener("mouseleave",()=>card.style.transform="");
});
const sel=document.querySelector("#estimateType"),out=document.querySelector("#estimateValue");
if(sel&&out)sel.addEventListener("change",()=>{
 const m={maintenance:"$250–$750",kitchen:"$3,500+",bathroom:"$4,000+",exterior:"$1,500+",renovation:"Custom"};
 out.textContent=m[sel.value]||"$—";
});
