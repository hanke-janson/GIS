var particleSystems = [];

function addParticleSystem(tag, psType, position, config) {
    switch (psType) {
        case "rain": //天气-雨
            break;
        case "snow": //天气-雪
            break;
        case "fire": //天气-火焰
            break;
        case "smoke": //天气-烟雾
            break;
    }
}


function cleanAllParticleSystem() {
    for (let index = 0; index < particleSystems.length; index++) {
        var element = particleSystems[index];
        if (element && element instanceof Cesium.ParticleSystem && !element.isDestroyed()) {
            element.destroyed();
        }
    }
}


















function createParticleSystems(options, systemsArray) {
    var length = options.numberOfSystems;
    for (var i = 0; i < length; ++i) {
        scratchAngleForOffset = Math.PI * 2.0 * i / options.numberOfSystems;
        scratchOffset.x += options.baseRadius * Math.cos(scratchAngleForOffset);
        scratchOffset.y += options.baseRadius * Math.sin(scratchAngleForOffset);

        var emitterModelMatrix = Cesium.Matrix4.fromTranslation(scratchOffset, matrix4Scratch);
        var color = Cesium.Color.fromRandom(options.colorOptions[i % options.colorOptions.length]);
        var force = forceFunction(options, i);

        var item = viewer.scene.primitives.add(new Cesium.ParticleSystem({
            image: getImage(),
            startColor: color,
            endColor: color.withAlpha(0.0),
            particleLife: 3.5,
            speed: 0.00005,
            imageSize: new Cesium.Cartesian2(15.0, 15.0),
            emissionRate: 30.0,
            emitter: new Cesium.CircleEmitter(0.1),
            bursts: [],
            lifetime: 0.1,
            forces: force,
            modelMatrix: particlesModelMatrix,
            emitterModelMatrix: emitterModelMatrix
        }));
        systemsArray.push(item);
    }
}