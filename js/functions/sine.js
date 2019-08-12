const Sine = function() {
    const phases = Sine.PHASES_MIN + Math.round((Sine.PHASES_MAX - Sine.PHASES_MIN) * Math.pow(Math.random(), Sine.PHASE_POWER));
    const power = Sine.POWER_MIN + (Sine.POWER_MAX - Sine.POWER_MIN) * Math.random();

    this.update = timeStep => {

    };

    this.sample = x => {
        return Math.pow(Math.sin(x * phases * Math.PI * 2) * 0.5 + 0.5, power);
    };
};

Sine.PHASES_MIN = 1;
Sine.PHASES_MAX = 11;
Sine.POWER_MIN = 0.7;
Sine.POWER_MAX = 1.3;
Sine.PHASE_POWER = 3;