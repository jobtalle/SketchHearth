const wrapper = document.getElementById("wrapper");
const canvas = document.getElementById("renderer");
const hearth = new Hearth(canvas);
let lastDate = new Date();

const resize = () => {
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
};

const update = timeStep => {
    hearth.update();

    const context = canvas.getContext("2d");

    hearth.draw(context);
};

const loopFunction = () => {
    const date = new Date();

    update((date - lastDate) * 0.001);
    requestAnimationFrame(loopFunction);

    lastDate = date;
};

window.onresize = resize;

resize();
requestAnimationFrame(loopFunction);