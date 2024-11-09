// Making a 4 point bezier curve. 
// The math for this from: https://javascript.info/bezier-curve
// P = ((1−t)^3 * a) + (3 * (1−t)^2 * t * b) + (3 * (1−t) * t^2 * c) + (t^3 * d)
function cubicBezier(p, t) {
    const point1 = Math.pow((1 - t), 3) * p[0];
    const point2 = 3 * Math.pow((1 - t), 2) * t * p[1];
    const point3 = 3 * (1 - t) * Math.pow(t, 2) * p[2];
    const point4 = Math.pow(t, 3) * p[3];
    return (point1 + point2 + point3 + point4);
}

// 3 point curve
function quadBezier(p1, p2, p3, t) {
    const point1 = (Math.pow((1 - t), 2)) * p1;
    const point2 = 2 * (1 - t) * t * p2;
    const point3 = (Math.pow(t, 2)) * p3;
    return point1 + point2 + point3;
}

// Based on the frame, returns the coordinates of an object on a bezier path
// The path is determined by the x and y points 
function cubicBezierPath(xPoints, yPoints, frame) {

    const pointX = cubicBezier(xPoints, frame);
    const pointY = cubicBezier(yPoints, frame);

    return { "x": pointX, "y": pointY };
}

function randomMax(max) {
    return (Math.random() * max).toFixed(2);
}

function randomMinMax(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function randomIntMax(max) {
    return Math.floor(Math.random() * max);
}

function randomIntMinMax(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Creates a bezier path for objects to follow.
 * @returns The x and y points of a bezier curve path
 */
function createPath() {
    const width = window.innerWidth;
    const widthFifth = width / 5;
    const widthThird = (width / 3) + 20;
    const widthHalf = width / 2;
    const widthOver = width + 10;
    const height = window.innerHeight;
    const heightThird = height / 3;
    const heightHalf = height / 2;

    // Coordinates for bezier path, the values are window pixel coordinates
    const xPoints = [
        randomMinMax(-100, widthThird), // Start between 100px to the left and 1/3 of the window
        randomMinMax(widthThird, widthHalf),
        randomMax(width),
        randomMinMax(widthFifth, widthOver) // Land between the last 2/3 of the window and 100px to the right
    ];

    const yPoints = [
        randomMinMax(-45, heightThird),// Start between 45px above the window height and 1/3 of the window height
        randomMax(heightHalf),
        randomMinMax(heightHalf, height),
        height
    ];

    return { xPoints: xPoints, yPoints: yPoints };
}

function createTimer(duration) {
    const timer = {
        duration: duration, // Duration in milliseconds
        complete: false,
    };
    return timer;
}

// Based on: https://javascript.info/js-animation#structured-animation
// Needs to have duration
function animate(animationElement) {
    let start;
    
    window.requestAnimationFrame((timeStamp) => {
        start = timeStamp;
        innerAnimate(timeStamp, animationElement, createTimer(randomIntMax(10000)));
    });

    function innerAnimate(timeStamp, aniSettings, timer) {
        let frame

        if (timer.complete) {
            frame = ((timeStamp - start) / aniSettings.duration); // frame values: 0 - 1

            if (frame > 1 && aniSettings.loop) {
                start = timeStamp;
                frame = 0;
                aniSettings.randomizeSettings();
            } else if (frame > 1 && !aniSettings.loop) {
                frame = 1;
            }

            aniSettings.render(frame);

        } else {
            frame = ((timeStamp - start) / timer.duration);
            if (frame > 1) {
                timer.complete = true;
                start = timeStamp;
                frame = 0;
            }
        }
        
        if (frame < 1) {
            window.requestAnimationFrame((timeStamp) => {
                innerAnimate(timeStamp, aniSettings, timer); // Go to next frame
            });
        }
    }
}

// Creates a flower or petal element with randomized images.
// Places the img on the screen
// Returns image object
function generateImg(type) {
    const image = {
        duration: randomIntMinMax(3000, 5000),
        loop: true,
        path: createPath(),
        pathTiming: [0, randomMax(0.5), randomMinMax(0.4, 0.85), 1],
        rotationTiming: [randomMinMax(-2, 2), randomMinMax(-2, 2), randomMinMax(-2, 2), randomMinMax(-2, 2)],
        imgHTML: createImgHTML(type),
        render(time) {
            let rotate = cubicBezier(this.rotationTiming, time); // Just the x value of a bezier curve
            let r = rotate * 360;

            let pathPoint = cubicBezier(this.pathTiming, time);
            let { x, y } = cubicBezierPath(this.path.xPoints, this.path.yPoints, pathPoint);

            this.imgHTML.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
            if (time >= 1) this.imgHTML.remove();
        },
        randomizeSettings() {
            this.path = createPath();
            this.pathTiming = [0, randomMax(0.5), randomMinMax(0.4, 0.85), 1];
            this.rotationTiming = [randomMinMax(-2, 2), randomMinMax(-2, 2), randomMinMax(-2, 2), randomMinMax(-2, 2)]
        }
    };

    return image;
}

function createImgHTML(type) {
    const src = [`./SVG/${type}Dark.svg`, `./SVG/${type}Med.svg`, `./SVG/${type}Light.svg`];
    imgHTML = new Image();

    let height;
    if (type === "flower") {
        height = randomIntMinMax(3.5, 5) + "%";
    } else if (type === "petal") {
        height = randomIntMinMax(2, 2.65) + "%";
    }

    imgHTML.id = `${type}${randomIntMax(10)}`;
    imgHTML.classList.add(type);
    imgHTML.style["z-index"] = `${randomIntMax(10)}`;
    imgHTML.style.height = height;
    imgHTML.src = `${src[randomIntMax(src.length)]}`;
    
    document.querySelector(".cherry_tree").insertAdjacentElement("afterbegin", imgHTML);

    return imgHTML;
}


for (let x = 0; x < 5; x++) {
    const flower = generateImg("flower");
    animate(flower);
}

for (let x = 0; x < 30; x++) {
    const petal = generateImg("petal");
    animate(petal);
}
