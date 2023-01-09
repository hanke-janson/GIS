// 火焰特效
export class fireEffect {
  /**
   *
   * @param {viewer对象} viewer
   * @param {粒子位置} position
   * @param {粒子大小} particleSize
   * @param {粒子系统的存活时间} lifetime
   * @param {发射器半径} radius
   * @param {效果是否循环} loop
   */
  constructor(viewer, position, particleSize, lifetime, radius, loop) {
    this.viewer = viewer;
    this.viewModel = {
      imageSize: 0.0,
      // 数值越大， 火苗越密
      emissionRate: 20.0,
      minimumParticleLife: 1,
      maximumParticleLife: 6,
      minimumSpeed: 1.0, //粒子发射的最小速度
      maximumSpeed: 4.0, //粒子发射的最大速度
      startScale: 1.0,
      endScale: 3.0,
      //粒子系统发射粒子的时间（秒）
      lifetime: lifetime,
      particleSize: particleSize,
      loop: loop,
    };
    this.radius = radius;
    this.emitterModelMatrix = new Cesium.Matrix4();
    this.translation = new Cesium.Cartesian3();
    this.rotation = new Cesium.Quaternion();
    this.hpr = new Cesium.HeadingPitchRoll();
    this.trs = new Cesium.TranslationRotationScale();
    this.scene = this.viewer.scene;
    this.particleSystem = "";
    this.entity = this.viewer.entities.add({
      //选择粒子放置的坐标
      position: position,
    });
    this.init();
  }

  init() {
    const _this = this;
    this.viewer.clock.shouldAnimate = true;
    this.viewer.scene.globe.depthTestAgainstTerrain = false;
    this.viewer.trackedEntity = this.entity;
    var particleSystem = this.scene.primitives.add(
      new Cesium.ParticleSystem({
        image: "Explosion/fire.png", //生成所需粒子的图片路径
        //粒子在生命周期开始时的颜色
        startColor: Cesium.Color.RED.withAlpha(0.9),
        //粒子在生命周期结束时的颜色
        endColor: new Cesium.Color(0.8, 0.6, 0, 0.1),
        //粒子在生命周期开始时初始比例
        startScale: _this.viewModel.startScale,
        //粒子在生命周期结束时比例
        endScale: _this.viewModel.endScale,
        //粒子发射的最小速度
        minimumParticleLife: _this.viewModel.minimumParticleLife,
        //粒子发射的最大速度
        maximumParticleLife: _this.viewModel.maximumParticleLife,
        speed: 10.0,
        //粒子质量的最小界限
        minimumSpeed: _this.viewModel.minimumSpeed,
        //粒子质量的最大界限
        maximumSpeed: _this.viewModel.maximumSpeed,
        //以像素为单位缩放粒子图像尺寸
        imageSize: new Cesium.Cartesian2(
          _this.viewModel.particleSize,
          _this.viewModel.particleSize
        ),
        //每秒发射的粒子数
        emissionRate: _this.viewModel.emissionRate,
        //设置粒子的大小是否以米或像素为单位
        sizeInMeters: true,
        loop: _this.viewModel.loop ? _this.viewModel.loop : true,
        //系统的粒子发射器
        emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(_this.radius)), //BoxEmitter 盒形发射器，ConeEmitter 锥形发射器，SphereEmitter 球形发射器，CircleEmitter圆形发射器
      })
    );
    this.particleSystem = particleSystem;
    this.preUpdateEvent();
  }

  //场景渲染事件
  preUpdateEvent() {
    let _this = this;
    this.viewer.scene.preUpdate.addEventListener(function (scene, time) {
      //发射器地理位置
      _this.particleSystem.modelMatrix = _this.computeModelMatrix(
        _this.entity,
        time
      );
      //发射器局部位置
      _this.particleSystem.emitterModelMatrix = _this.computeEmitterModelMatrix();
      // 将发射器旋转
      if (_this.viewModel.spin) {
        _this.viewModel.heading += 1.0;
        _this.viewModel.pitch += 1.0;
        _this.viewModel.roll += 1.0;
      }
    });
  }

  computeModelMatrix(entity, time) {
    return entity.computeModelMatrix(time, new Cesium.Matrix4());
  }

  computeEmitterModelMatrix() {
    this.hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, this.hpr);
    this.trs.translation = Cesium.Cartesian3.fromElements(
      -4.0,
      0.0,
      1.4,
      this.translation
    );
    this.trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(
      this.hpr,
      this.rotation
    );

    return Cesium.Matrix4.fromTranslationRotationScale(
      this.trs,
      this.emitterModelMatrix
    );
  }

  removeEvent() {
    this.viewer.scene.preUpdate.removeEventListener(this.preUpdateEvent, this);
    this.emitterModelMatrix = undefined;
    this.translation = undefined;
    this.rotation = undefined;
    this.hpr = undefined;
    this.trs = undefined;
  }

  //移除粒子特效
  remove() {
    () => {
      return this.removeEvent();
    }; //清除事件
    this.viewer.scene.primitives.remove(this.particleSystem); //删除粒子对象
    this.viewer.entities.remove(this.entity); //删除entity
  }
}
