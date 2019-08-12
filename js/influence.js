const Influence = function(f, strength) {
    const angleSpeed = Influence.ANGLE_SPEED_MIN + (Influence.ANGLE_SPEED_MAX - Influence.ANGLE_SPEED_MIN) * Math.random();
    let angle = Math.random();

    this.getStrength = () => {
        return strength;
    };

    this.sample = x => {
        return f.sample((x + angle) % 1);
    };

    this.update = timeStep => {
        angle += angleSpeed * timeStep;

        if (angle < 0)
            angle += 1;

        f.update(timeStep);
    };
};

Influence.ANGLE_SPEED_MIN = -0.3;
Influence.ANGLE_SPEED_MAX = 0.3;