const Blob = function() {
    const influences = [new Influence(new Cubic(), 1)];
    let color = "#c43f30";
    let strengthMultiplier = 0;

    const sample = x => {
        let sample = 0;

        for (const influence of influences)
            sample += influence.sample(x) * influence.getStrength();

        return sample * strengthMultiplier;
    };

    this.update = timeStep => {
        let totalStrength = 0;

        for (const influence of influences) {
            influence.update(timeStep);

            totalStrength += influence.getStrength();
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
};

Blob.PRECISION = 300;