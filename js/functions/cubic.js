const Cubic = function() {
    const phases = Cubic.PHASES_MIN + Math.round((Cubic.PHASES_MAX - Cubic.PHASES_MIN) * Math.random());
    const noise = cubicNoiseConfig(Math.random(), phases);
    const ySpeed = Cubic.SPEED_MIN + (Cubic.SPEED_MAX - Cubic.SPEED_MIN) * Math.random();
    const power = Cubic.POWER_MIN + (Cubic.POWER_MAX - Cubic.POWER_MIN) * Math.random();
    let y = 0;

    this.update = timeStep => {
        y += ySpeed * timeStep;
    };

    this.sample = x => {
        return Math.pow(cubicNoiseSample2(noise, 1 + x * phases, y), power);
    };
};

Cubic.PHASES_MIN = 3;
Cubic.PHASES_MAX = 9;
Cubic.SPEED_MIN = 0.3;
Cubic.SPEED_MAX = 2;
Cubic.POWER_MIN = 1;
Cubic.POWER_MAX = 1.7
;