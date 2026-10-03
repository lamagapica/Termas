:root {
--mint: #3e6b52;
--gold: #c5a059;
--dark: #1a1110;
--card-bg: rgba(255, 255, 255, 0.92);
}

{
box-sizing: border-box;
margin: 0;
padding: 0;
}

body {
font-family: 'Lora', serif;
background: #110c0b;
color: #2c2523;
padding: 1rem;
display: flex;
justify-content: center;
}

main {
max-width: 640px;
width: 100%;
display: flex;
flex-direction: column;
gap: 1rem;
}

header {
background: var(--card-bg);
padding: 1.25rem;
border-radius: 12px;
border: 1px solid var(--gold);
}

.top {
display: flex;
justify-content: space-between;
margin-bottom: 0.5rem;
}

.chip {
font-family: 'Cinzel', serif;
font-size: 0.75rem;
font-weight: 700;
background: #e5d3b3;
padding: 0.25rem 0.5rem;
border-radius: 4px;
}

h1 {
font-family: 'Cinzel', serif;
font-size: 1.8rem;
margin-bottom: 1rem;
color: var(--dark);
}

.path {
display: flex;
align-items: center;
justify-content: space-between;
position: relative;
}

.node {
width: 28px;
height: 28px;
border-radius: 50%;
background: #ccc;
display: flex;
align-items: center;
justify-content: center;
font-size: 0.8rem;
font-weight: bold;
z-index: 2;
}

.node.on, .node.now {
background: var(--gold);
color: #fff;
}

.bar {
position: absolute;
top: 50%;
left: 0;
right: 0;
height: 4px;
background: #ddd;
transform: translateY(-50%);
z-index: 1;
}

#fill {
display: block;
height: 100%;
background: var(--gold);
transition: width 0.3s ease;
}

.card {
background: var(--card-bg);
padding: 1.25rem;
border-radius: 12px;
border: 1px solid #d4c5b3;
}

.tabs {
display: flex;
gap: 0.5rem;
margin-bottom: 1rem;
}

.tab {
flex: 1;
padding: 0.6rem;
font-family: 'Cinzel', serif;
font-size: 0.75rem;
font-weight: 700;
border: 1px solid var(--gold);
background: transparent;
cursor: pointer;
border-radius: 6px;
}

.tab[aria-selected="true"] {
background: var(--gold);
color: #fff;
}

.view {
display: none;
}

.view.on {
display: block;
}

/* Ajustes del Visor y Slider */
.stage {
position: relative;
width: 100%;
height: 380px;
background: #000;
border-radius: 8px;
overflow: hidden;
}

.layer {
position: absolute;
inset: 0;
background-size: cover;
background-position: center;
background-repeat: no-repeat;
}

#after {
clip-path: inset(0 0 0 50%);
}

.tag {
position: absolute;
top: 10px;
background: var(--dark);
color: #fff;
font-size: 0.65rem;
padding: 0.2rem 0.5rem;
border-radius: 4px;
border: 1px solid var(--gold);
}

.knob {
position: absolute;
top: 0;
bottom: 0;
left: 50%;
width: 2px;
background: #fff;
transform: translateX(-50%);
pointer-events: none;
z-index: 5;
}

.knob b {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background: #fff;
color: #000;
padding: 4px 8px;
border-radius: 12px;
font-size: 0.7rem;
}

#rng {
position: absolute;
inset: 0;
width: 100%;
height: 100%;
opacity: 0;
cursor: ew-resize;
z-index: 6;
}

.hint {
font-size: 0.85rem;
margin-top: 0.75rem;
color: #666;
text-align: center;
}

.mission h2 {
font-family: 'Cinzel', serif;
font-size: 1.1rem;
margin-bottom: 0.5rem;
}

.q {
font-weight: 600;
margin: 1rem 0 0.5rem;
}

.ans {
display: flex;
gap: 0.5rem;
}

.big {
width: 60px;
text-align: center;
font-size: 1.2rem;
padding: 0.4rem;
border: 1px solid #ccc;
border-radius: 6px;
}

.btn {
flex: 1;
background: var(--mint);
color: #fff;
border: none;
border-radius: 6px;
font-family: 'Cinzel', serif;
font-weight: bold;
cursor: pointer;
}

.msg {
color: #a00;
font-size: 0.85rem;
margin-top: 0.5rem;
}

.win {
display: none;
text-align: center;
}

.win.on {
display: block;
}

.key {
font-size: 3rem;
font-family: 'Cinzel', serif;
color: var(--gold);
margin: 0.5rem 0;
}

.shake {
animation: shake 0.3s ease;
}

@keyframes shake {
0%, 100% { transform: translateX(0); }
20%, 60% { transform: translateX(-6px); }
40%, 80% { transform: translateX(6px); }
}

/* Ajuste visual para Pannellum */
.pnm-container {
border-radius: 8px;
}
