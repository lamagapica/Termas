const KEY = "termas";
const ORDER = ["almazara", "termas", "basilica"];
const ST = "vareia_pistas";

const $ = s => document.querySelector(s);

const load = () => {
    try {
        return JSON.parse(localStorage.getItem(ST)) || {};
    } catch (e) {
        return {};
    }
};

const save = (k, v) => {
    try {
        const d = load();
        d[k] = v;
        localStorage.setItem(ST, JSON.stringify(d));
    } catch (e) {}
};

const done = () => Object.keys(load()).length;

/* Progreso */
function paint() {
    const n = done();
    $("#trophies").textContent = "REGISTROS " + n + "/3";
    $("#fill").style.width = (KEY === "campamento" ? 100 : (n / 3 * 100)) + "%";
}
paint();

/* Sonido */
let ac;
function beep(f, d = .12, t = "square") {
    try {
        ac = ac || new AudioContext();
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = t;
        o.frequency.value = f;
        g.gain.value = .08;
        o.connect(g);
        g.connect(ac.destination);
        o.start();
        o.stop(ac.currentTime + d);
    } catch (e) {}
}

const fanfare = () => [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => beep(f, .18), i * 120));

/* Confeti */
function confetti(n = 90) {
    const c = ["#c5a059", "#9e472a", "#3e6b52", "#e5d3b3", "#fff"];
    for (let i = 0; i < n; i++) {
        const e = document.createElement("i");
        e.className = "confetti";
        e.style.left = Math.random() * 100 + "vw";
        e.style.background = c[i % 5];
        e.style.animationDuration = (1.8 + Math.random() * 2) + "s";
        e.style.animationDelay = Math.random() * .6 + "s";
        document.body.appendChild(e);
        setTimeout(() => e.remove(), 4500);
    }
}

/* Pestañas */
const tabs = document.querySelectorAll(".tab");
tabs.forEach((b, i) => b.onclick = () => {
    $(".tabs").dataset.t = i;
    tabs.forEach((x, j) => x.setAttribute("aria-selected", i === j));
    document.querySelectorAll(".view").forEach((v, j) => v.classList.toggle("on", i === j));
    beep(i ? 660 : 440, .08);
});

/* Slider comparativo */
$("#rng").oninput = e => {
    const v = e.target.value;
    $("#after").style.clipPath = `inset(0 0 0 ${v}%)`;
    $(".knob").style.left = v + "%";
};

/* Visor 360 */
let currentX = 0, drag = false, lx = 0;
const pano = $("#pano");

pano.onpointerdown = e => {
    drag = true;
    lx = e.clientX;
    pano.setPointerCapture(e.pointerId);
};

pano.onpointermove = e => {
    if (drag) {
        const dx = e.clientX - lx;
        currentX += dx * 1.5;
        lx = e.clientX;
        pano.style.backgroundPositionX = currentX + "px";
    }
};

pano.onpointerup = pano.onpointercancel = () => drag = false;

pano.onkeydown = e => {
    if (e.key === "ArrowLeft") {
        currentX += 60;
        pano.style.backgroundPositionX = currentX + "px";
    }
    if (e.key === "ArrowRight") {
        currentX -= 60;
        pano.style.backgroundPositionX = currentX + "px";
    }
};

/* Estaciones 1-3 */
if (KEY !== "campamento") {
    const A = 3;
    const ok = () => {
        $(".win").classList.add("on");
        $("#form").style.display = "none";
        confetti();
        fanfare();
        $(".win").scrollIntoView({ behavior: "smooth" });
    };

    if (load()[KEY] !== undefined) {
        ok();
        confetti(0);
    }

    const check = () => {
        const v = $("#ans").value.trim();
        if (+v === A && v !== "") {
            save(KEY, A);
            paint();
            ok();
        } else {
            $("#form").classList.remove("shake");
            void $("#form").offsetWidth;
            $("#form").classList.add("shake");
            $("#msg").textContent = "Respuesta no válida. Consulte nuevamente el texto histórico.";
            beep(150, .3, "sawtooth");
        }
    };

    $("#go").onclick = check;
    $("#ans").onkeydown = e => {
        if (e.key === "Enter") check();
    };
} else {
    /* Candado */
    const ins = [...document.querySelectorAll(".lock input")], CODE = "2354";
    const saved = load();

    ORDER.forEach((k, i) => {
        if (saved[k] !== undefined) setTimeout(() => {
            ins[i].value = saved[k];
            ins[i].classList.add("f");
            beep(400 + i * 120, .08);
        }, 500 + i * 450);
    });

    ins.forEach((el, i) => {
        el.oninput = () => {
            el.value = el.value.replace(/\D/g, "").slice(-1);
            if (el.value && ins[i + 1]) ins[i + 1].focus();
        };
        el.onkeydown = e => {
            if (e.key === "Backspace" && !el.value && ins[i - 1]) ins[i - 1].focus();
            if (e.key === "Enter") open();
        };
    });

    function open() {
        const c = ins.map(i => i.value).join("");
        if (c === CODE) {
            $("#lockbox").style.display = "none";
            $(".win").classList.add("on");
            $("#chest").textContent = "🏛️";
            setTimeout(() => $("#chest").textContent = "📜", 600);
            confetti(180);
            fanfare();
            setInterval(() => confetti(40), 1800);
            $(".win").scrollIntoView({ behavior: "smooth" });
        } else {
            $("#lockbox").classList.remove("shake");
            void $("#lockbox").offsetWidth;
            $("#lockbox").classList.add("shake");
            $("#msg").textContent = c.length < 4 ? "Ingrese la totalidad de los dígitos requeridos." : "Combinación incorrecta. Verifique los registros obtenidos.";
            beep(150, .3, "sawtooth");
        }
    }

    $("#go").onclick = open;
}