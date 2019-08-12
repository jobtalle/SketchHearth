const Blob = function(makeInfluence) {
    const influences = [];
    let color = Blob.COLORS[0];
    let strengthMultiplier = 0;
    let transitionTimer = 0;
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

            influences.push(makeInfluence());
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

    this.draw = (context, x, y, radius) => {
        const step = Math.PI * 2 / Blob.PRECISION;

        context.fillStyle = color;
        context.beginPath();
        context.moveTo(x + radius * sample(0), y);

        for (let i = 1; i < Blob.PRECISION; ++i) {
            const r = radius * sample(i / Blob.PRECISION);

            context.lineTo(
                x + Math.cos(i * step) * r,
                y + Math.sin(i * step) * r);
        }

        context.closePath();
        context.fill();
    };

    for (let i = 0; i < Blob.INFLUENCES; ++i)
        influences.push(makeInfluence());
};

Blob.PRECISION = 300;
Blob.INFLUENCES = 2;
Blob.TRANSITION_TIME = 2;
Blob.TRANSITION_TIMER_MIN = 3;
Blob.TRANSITION_TIMER_MAX = 8;
Blob.COLORS = [
    "#c42b17",
    "#c46720",
    "#e1b135"
];