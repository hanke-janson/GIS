//火焰特效， 不随视角缩放变化，有问题
export class fireEffect {
  /**
   *
   * @param {viewer对象} viewer
   * @param {粒子位置} position
   * @param {粒子大小} particleSize
   * @param {粒子系统的存活时间} lifetime
   * @param {效果是否循环} loop
   */
  constructor(viewer, position, particleSize, particleLife, lifetime, loop) {
    this.viewer = viewer;
    this.viewModel = {
      emissionRate: 5,
      particleLife: particleLife,
      minimumSpeed: 1.0, //粒子发射的最小速度
      maximumSpeed: 4.0, //粒子发射的最大速度
      startScale: 0.0,
      endScale: 10.0,
      particleSize: particleSize,
      loop: loop,
      lifetime: lifetime,
    };
    this.emitterModelMatrix = new Cesium.Matrix4();
    this.translation = new Cesium.Cartesian3();
    this.rotation = new Cesium.Quaternion();
    this.hpr = new Cesium.HeadingPitchRoll();
    this.trs = new Cesium.TranslationRotationScale();
    this.scene = this.viewer.scene;
    // 绑定粒子系统
    this.particleSystem = "";
    // 实体，效果位置
    this.entity = this.viewer.entities.add({
      position: position,
      // 朝向
      orientation: new Cesium.Transforms.headingPitchRollQuaternion(
        position,
        new Cesium.HeadingPitchRoll.fromDegrees(0, 0, 0)
      ),
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
        image: "Explosion/fire.png",
        //粒子在生命周期开始时的颜色
        startColor: Cesium.Color.RED.withAlpha(0.9),
        //粒子在生命周期结束时的颜色
        endColor: new Cesium.Color(0.8, 0.6, 0, 0.1),
        startScale: 1.0,
        endScale: 3.0,
        // 粒子存在时间，调高火越烧越高
        particleLife: _this.viewModel.particleLife,
        speed: 10.0,
          imageSize: new Cesium.Cartesian2(25, 25),
        // 数值越大，火苗越密
        emissionRate: 20.0,
        lifetime: _this.lifetime,
          loop: _this.loop,
        // 调节发射器半径
        emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(35.0)),
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

  // 由传入的位置和方向实时计算粒子系统的位置和方向。
  computeModelMatrix(entity, time) {
    // 实体位置
    var position = Cesium.Property.getValueOrUndefined(
      entity.position,
      time,
      new Cesium.Cartesian3()
    );
    // defined 如果对象已定义，则返回 true，否则返回 false。
    if (!Cesium.defined(position)) {
      return undefined;
    }
    // 实体朝向
    var orientation = Cesium.Property.getValueOrUndefined(
      entity.orientation,
      time,
      new Cesium.Quaternion()
    );
    if (!Cesium.defined(orientation)) {
      var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        position,
        undefined,
        new Cesium.Matrix4()
      );
    } else {
      modelMatrix = Cesium.Matrix4.fromRotationTranslation(
        Cesium.Matrix3.fromQuaternion(orientation, new Cesium.Matrix3()),
        position,
        new Cesium.Matrix4()
      );
    }
    return modelMatrix;
  }
  // 由粒子发射器相对于粒子系统坐标系原点的平移、旋转确定粒子发射器世界坐标和方向。
  computeEmitterModelMatrix() {
    this.hpr = Cesium.HeadingPitchRoll.fromDegrees(
      0.0,
      0.0,
      0.0,
      new Cesium.HeadingPitchRoll()
    );
    this.trs.translation = Cesium.Cartesian3.fromElements(
      2.5,
      4.0,
      1.0,
      new Cesium.Cartesian3()
    );
    this.trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(
      this.hpr,
      new Cesium.Quaternion()
    );
    return Cesium.Matrix4.fromTranslationRotationScale(
      this.trs,
      new Cesium.Matrix4()
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
