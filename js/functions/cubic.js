const Cubic = function() {
    const phases = 4;
    const noise = cubicNoiseConfig(Math.random(), phases);
    let y = 0;
    let ySpeed = 2;

    this.update = timeStep => {
        y += ySpeed * timeStep;
    };

    this.sample = x => {
        return cubicNoiseSample2(noise, 1 + x * phases, y);
    };
};