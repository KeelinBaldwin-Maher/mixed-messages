// Making a 4 point bezier curve. 
// The math for this from: https://javascript.info/bezier-curve
// P = ((1−t)^3 * a) + (3 * (1−t)^2 * t * b) + (3 * (1−t) * t^2 * c) + (t^3 * d)
function cubicBezier(p1, p2, p3, p4, t) {
    const point1 = Math.pow((1 - t), 3) * p1;
    const point2 = 3 * Math.pow((1 - t), 2) * t * p2;
    const point3 = 3 * (1 - t) * Math.pow(t, 2) * p3;
    const point4 = Math.pow(t, 3) * p4;
    return point1 + point2 + point3 + point4;
}

// 3 point curve
function quadBezier(p1, p2, p3, t) {
    const point1 = (Math.pow((1 - t), 2)) * p1;
    const point2 = 2 * (1 - t) * t * p2;
    const point3 = (Math.pow(t, 2)) * p3;
    return point1 + point2 + point3;
}

// Finds the coordinates of the object on a cubic bezier curve 
function cubicBezierPath(xPoints, yPoints, f) {
    const [x1, x2, x3, x4] = xPoints;
    const [y1, y2, y3, y4] = yPoints;

    const pointX = cubicBezier(x1, x2, x3, x4, f);
    const pointY = cubicBezier(y1, y2, y3, y4, f);

    return { "pointX": pointX, "pointY": pointY };
}

// Animates single petal falling on the screen, randomizes path and rotation
// Based on: https://javascript.info/js-animation#structured-animation
function animate(imgId, duration) {
    let start = performance.now();

    // Frame timing
    const [f1, f2, f3, f4] = [0, Math.random().toFixed(2), Math.random().toFixed(2), 1];

    // Coordinates for bezier path, goes point 1 -> point 4
    // values are for pixels    
    const xPoints = [(Math.random() * (window.innerWidth / 2)),
    (Math.random() * window.innerWidth).toFixed(2),
    (Math.random() * window.innerWidth).toFixed(2),
    (Math.random() * (window.innerWidth - (window.innerWidth / 3)) + (window.innerWidth / 3)).toFixed(2)]; // Path will not end in the first third of the screen

    const yPoints = [-45, (Math.random() * window.innerHeight).toFixed(2),
    (Math.random() * window.innerHeight).toFixed(2), window.innerHeight];

    // Rotation timing
    const [r1, r2, r3, r4] = [0, Math.random().toFixed(2), Math.random().toFixed(2), 1];

    requestAnimationFrame(function animate(time) {
        let timeLine = ((time - start) / duration) > 1 ? 1 :
            ((time - start) / duration) < 0 ? 0 : ((time - start) / duration);
        // timeLine needs to go from 0 to 1

        let frame = cubicBezier(f1, f2, f3, f4, timeLine); // frame timing
        let { pointX, pointY } = cubicBezierPath(xPoints, yPoints, frame); // frame position

        let rotate = (cubicBezier(r1, r2, r3, r4, timeLine)) * 360;

        flowerMotion(imgId, pointX, pointY, rotate);

        (timeLine < 1) ? requestAnimationFrame(animate) : console.log(``); // Go to next frame
    });
}

// Renders the current position and rotation of flower or petal
function flowerMotion(imgId, x, y, r) {
    const flower = document.querySelector(`#${imgId}`);
    flower.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
}

// Creates an array of flower elements with lengths 4 - 10 and randomized images.
// Places the images on the screen
// Returns an array of flower ids
function generateFlowers() {
    const flowers = new Array(Math.floor(Math.random() * (11 - 4) + 4)); // Array length between 4 and 10
    const flowerSrc = [`./SVG/flowerDark.svg`, `./SVG/flowerMed.svg`, `./SVG/flowerLight.svg`];

    const flowerIds = new Array(flowers.length);

    for (let i = 0; i < flowers.length; i++) {
        flowerIds[i] = `flower${i}`;
        flowers[i] = `<img id="flower${i}" class="flower"` +
            `style="z-index: ${Math.floor(Math.random() * 10)}"` +
            `src="${flowerSrc[Math.floor(Math.random() * flowerSrc.length)]}"></img>`;
    }

    for (const flower of flowers) {
        document.querySelector(".cherry_tree").insertAdjacentHTML("afterbegin", flower);
    }

    return flowerIds;
}

// Creates an array of petal img elements with lengths 4 - 10 and randomized images.
// Places the images on the screen
// Returns array of petal ids
function generatePetals() {
    const petals = new Array(Math.floor(Math.random() * (11 - 4) + 4)); // Array length between 4 and 10
    const petalSrc = [`./SVG/petalDark.svg`, `./SVG/petalMed.svg`, `./SVG/petalLight.svg`];

    const petalIds = new Array(petals.length);

    for (let i = 0; i < petals.length; i++) {
        petalIds[i] = `petal${i}`;
        petals[i] = `<img id="${petalIds[i]}" class="petal"` +
            `style="z-index: ${Math.floor(Math.random() * 10)}"` +
            `src="${petalSrc[Math.floor(Math.random() * petalSrc.length)]}"></img>`;
    }

    for (const petal of petals) {
        document.querySelector(".cherry_tree").insertAdjacentHTML("afterbegin", petal);
    }

    return petalIds;
}

function petalsAndFlowersAnimation() {
    const petalIds = generatePetals(); // Array of petal img ids
    for (const imgId of petalIds) {
        const timeOut = Math.floor(Math.random() * (5000 - 1000) + 1000);
        const duration = Math.floor(Math.random() * (5000 - 1000) + 1000);
        setTimeout(animate(imgId, duration), timeOut);
    }

    const flowerIds = generateFlowers();
    for (const imgId of flowerIds) {
        const timeOut = Math.floor(Math.random() * (5000 - 1000) + 1000);
        const duration = Math.floor(Math.random() * (5000 - 1000) + 1000);
        setTimeout(animate(imgId, duration), timeOut);
    }

    setTimeout(() => {// Remove petals and flowers
        for (const imgId of petalIds) {
            console.log(document.querySelector(`#${imgId}`).style.zIndex);
            document.querySelector(`#${imgId}`).remove();
        }
        for (const imgId of flowerIds) {
            console.log(document.querySelector(`#${imgId}`).style.zIndex);
            document.querySelector(`#${imgId}`).remove();
        }
    }, 6000);
}



