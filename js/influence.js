const Influence = function(f, strength) {
    let angle = Math.random();
    let angleSpeed = 0.3;

    this.getStrength = () => {
        return strength;
    };

    this.sample = x => {
        return f.sample((x + angle) % 1);
    };

    this.update = timeStep => {
        angle += angleSpeed * timeStep;

        f.update(timeStep);
    };
};