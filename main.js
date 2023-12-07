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

function cubicBezierPath(t) {
    const x1 = 0, x2 = 250, x3 = 20, x4 = 400;
    const y1 = 0, y2 = 5, y3 = 375, y4 = 400;

    const pointX = cubicBezier(x1, x2, x3, x4, t);
    const pointY = cubicBezier(y1, y2, y3, y4, t);
    
    return {"pointX": pointX, "pointY": pointY};
}

function flowerMotion(x, y, deg) {
    const flower = document.querySelector(".flower-test");
    flower.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg)`;
}

// Animates a petal falling on the screen
// Based on: https://javascript.info/js-animation#structured-animation
function animate(duration) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeLine = ((time - start) / duration); // timeLine goes from 0 to 1
        if (timeLine > 1) {
            timeLine = 1;
        } else if (timeLine < 0) {
            timeLine = 0;
        }

        let rotate = (cubicBezier(0, 0.84, 0.44, 1, timeLine)) * 360;

        let frame = cubicBezier(0, 0.84, 0.44, 1, timeLine)// Find where the current frame is on the timeline
        let {pointX, pointY} = cubicBezierPath(frame); 

        flowerMotion(pointX, pointY, rotate); // Render frame

        (timeLine < 1) ? requestAnimationFrame(animate) : console.log("Animation done"); // Go to next frame
    });
}

animate(3000);
