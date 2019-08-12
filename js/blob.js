const Blob = function() {
    let color = "#c44033";

    const sample = f => {
        return 0.5;
    };

    this.update = timeStep => {

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