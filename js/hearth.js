const Hearth = function(canvas) {
    const blob = new Blob();

    this.update = timeStep => {
        blob.update(timeStep);
    };

    this.draw = context => {
        const x = canvas.width * 0.5;
        const y = canvas.height * 0.5;

        blob.draw(
            context,
            x,
            y,
            Math.min(x, y) - Hearth.OFFSET);
    };
};

Hearth.OFFSET = 64;