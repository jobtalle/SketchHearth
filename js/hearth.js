const Hearth = function(canvas) {
    const makeInfluence = initial => {
        return new Influence(
            initial ? new Hearth.FUNCTIONS[0]() : new Hearth.FUNCTIONS[Math.floor(Math.random() * Hearth.FUNCTIONS.length)](),
            Hearth.INFLUENCE_MIN + (Hearth.INFLUENCE_MAX - Hearth.INFLUENCE_MIN) * Math.random());
    };

    const blob = new Blob(makeInfluence);

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
            Hearth.INSET,
            Math.min(x, y) - Hearth.OFFSET - Hearth.INSET);
    };
};

Hearth.INSET = 64;
Hearth.OFFSET = 64;
Hearth.INFLUENCE_MIN = 0.5;
Hearth.INFLUENCE_MAX = 2;
Hearth.FUNCTIONS = [
    Cubic,
    Sine
];