function init() {
    let w = document.body.clientWidth;
    let h = document.body.clientHeight;
    let canvas = document.getElementById('bg-box');
    if (typeof canvas.getContext === 'undefined') {
        return;
    }
    let ctx = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = h;
    let points = [];
    for (let i = 0; i < 200; i++) {
        points.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 5 + 0.1,
            opacity: Math.random()*0.4 + 0.1,
            vx: 0.5 - Math.random() * 1,
            vy: 0.5 - Math.random() * 1,
            vo: 0.01 - Math.random() * 0.02
        });
    }
    // let mouseX = null;
    // let mouseY = null;
    // document.body.addEventListener('mousemove', function (e) {
    //     mouseX = e.offsetX;
    //     mouseY = e.offsetY;
    // })
    window.requestAnimationFrame(draw);

    function draw() {
        // ctx.fillStyle = 'rgba(238,238,238,0.5)';
        // ctx.fillRect(0, 0, w, h);
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            ctx.save();
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = `rgba(255,255,255,${point.opacity})`;
            // ctx.fillStyle = `rgba(32,55,79,${point.opacity})`;
            ctx.fill();
            ctx.restore();
            if (point.x + point.vx > w || point.x + point.vx < 0) {
                point.vx = -point.vx;
            }
            if (point.y + point.vy > h || point.y + point.vy < 0) {
                point.vy = -point.vy;
            }
            if (point.opacity + point.vo > 0.5 || point.opacity + point.vo < 0) {
                point.vo = -point.vo;
            }
            point.x += point.vx;
            point.y += point.vy;
            point.opacity += point.vo;
            points[i] = point;
        }
        window.requestAnimationFrame(draw);
    }

}