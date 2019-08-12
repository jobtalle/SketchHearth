const Blob = function(makeInfluence) {
    const influences = [];
    let strengthMultiplier = 0;
    let transitionTimer = Blob.TRANSITION_TIMER_MIN;
    let transition = 0;
    let transitioning = false;

    const sample = x => {
        let sample = 0;

        for (let i = 0; i < influences.length; ++i) {
            if (i === 0)
                sample += influences[i].sample(x) * influences[i].getStrength() * getInfluenceMultiplierFirst();
            else if (i === influences.length - 1)
                sample += influences[i].sample(x) * influences[i].getStrength() * getInfluenceMultiplierLast();
            else
                sample += influences[i].sample(x) * influences[i].getStrength();
        }

        return sample * strengthMultiplier;
    };

    const getInfluenceMultiplierFirst = () => {
        return Math.cos(transition * Math.PI) * 0.5 + 0.5;
    };

    const getInfluenceMultiplierLast = () => {
        if (transitioning === false)
            return 1;

        return 1 - getInfluenceMultiplierFirst();
    };

    this.update = timeStep => {
        if (transitioning) if ((transition += timeStep) > 1) {
            transition = 0;
            transitioning = false;
            influences.shift();
        }

        if ((transitionTimer -= timeStep) < 0) {
            transitionTimer = Blob.TRANSITION_TIMER_MIN + (Blob.TRANSITION_TIMER_MAX - Blob.TRANSITION_TIMER_MIN) * Math.random();
            transition = 0;

            influences.push(makeInfluence(false));
            transitioning = true;
        }

        let totalStrength = 0;

        for (let i = 0; i < influences.length; ++i) {
            influences[i].update(timeStep);

            if (i === 0)
                totalStrength += influences[i].getStrength() * getInfluenceMultiplierFirst();
            else if (i === influences.length - 1)
                totalStrength += influences[i].getStrength() * getInfluenceMultiplierLast();
            else
                totalStrength += influences[i].getStrength();
        }

        strengthMultiplier = 1 / totalStrength;
    };

    this.draw = (context, x, y, inset, radius) => {
        const step = Math.PI * 2 / Blob.PRECISION;
        let xm = x + inset + radius * sample(0);
        let ym = y;

        context.beginPath();
        context.moveTo(xm, ym);

        for (let i = 1; i < Blob.PRECISION; ++i) {
            const r = inset + radius * sample(i / Blob.PRECISION);
            const lx = x + Math.cos(i * step) * r;
            const ly = y + Math.sin(i * step) * r;

            xm += lx;
            ym += ly;
            context.lineTo(lx, ly);
        }

        const gradient = context.createRadialGradient(
            xm / Blob.PRECISION,
            ym / Blob.PRECISION,
            0,
            x,
            y,
            radius);

        gradient.addColorStop(0, Blob.COLORS[0]);
        gradient.addColorStop(1, Blob.COLORS[1]);

        context.fillStyle = gradient;

        context.closePath();
        context.fill();
    };

    for (let i = 0; i < Blob.INFLUENCES; ++i)
        influences.push(makeInfluence(true));
};

Blob.PRECISION = 300;
Blob.INFLUENCES = 3;
Blob.TRANSITION_TIME = 3.5;
Blob.TRANSITION_TIMER_MIN = Math.max(Blob.TRANSITION_TIME, 4);
Blob.TRANSITION_TIMER_MAX = 6;
Blob.COLORS = [
    "#e1b135",
    "#c42b17"
];