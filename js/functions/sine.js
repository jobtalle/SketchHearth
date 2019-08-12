const Sine = function() {
    const phases = Sine.PHASES_MIN + Math.round((Sine.PHASES_MAX - Sine.PHASES_MIN) * Math.random());

    this.update = timeStep => {

    };

    this.sample = x => {
        return Math.sin(x * phases * Math.PI * 2) * 0.5 + 0.5;
    };
};

Sine.PHASES_MIN = 1;
Sine.PHASES_MAX = 11;