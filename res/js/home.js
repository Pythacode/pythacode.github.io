const conts = Array.from(document.getElementsByClassName('container'))

function vecteurUnitaire(x, y) {
  const norm = Math.sqrt(x * x + y * y);
  return { x: x / norm, y: y / norm };
}

function map(value, a, b, c, d) {
  return c + (value - a) * (d - c) / (b - a);
}

let mouseX = 0;
let mouseY = 0;

function handlePosition(x, y, cont) {

    const rect = cont.getBoundingClientRect()
        
    const hw = rect.width  / 2;
    const hh = rect.height / 2;

    const Bx = (x - rect.x)-hw
    const By = -((y - rect.y)-hh)

    const n = 2 * Math.sqrt(hw ** 2 + hh ** 2)

    const AB = Math.hypot(Bx, By);
    const r = 10000 / AB;
    const s = map(Math.min(0.3, r / AB), 0, 0.3, 0.06, 0.3);

    const angB = Math.atan2(By, Bx);

    const m1 = Math.tan(angB - s);
    const m2 = Math.tan(angB + s);

    const u1 = vecteurUnitaire(1, m1)
    const u2 = vecteurUnitaire(1, m2)

    const s1 = Math.sign(u1.x*Bx + u1.y*By);
    const s2 = Math.sign(u2.x*Bx + u2.y*By);

    const p1 = { x: n*s1*u1.x, y: n*s1*u1.y };
    const p2 = { x: n*s2*u2.x, y: n*s2*u2.y };


    cont.style.setProperty("--P1x", (hw + p1.x) + 'px');
    cont.style.setProperty("--P1y", (hh - p1.y) + 'px');
    cont.style.setProperty("--P2x", (hw + p2.x) + 'px');
    cont.style.setProperty("--P2y", (hh - p2.y) + 'px');
}

conts.forEach((cont) => {
    cont.addEventListener('mousemove', (e) => {
        mouseX = e.x;
        mouseY = e.y;
        handlePosition(e.x, e.y, cont)            
    })
    document.addEventListener('scroll', () => {
        handlePosition(mouseX, mouseY + cont.scrollTop, cont)            
    })
})
