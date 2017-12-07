
object.animations = [];
var distance = Math.sqrt(
    Math.pow((object.position.x), 2) +
    Math.pow((object.position.z), 2)
);
var actualRotation = Math.atan2(object.position.z, object.position.x);

var animationPosition = new BABYLON.Animation(
    "animationPosition",
    "position",
    speed,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
);
var animationKeys = [];
animationKeys.push({
    frame: 0,
    value: new BABYLON.Vector3(
        object.position.x,
        object.position.y,
        object.position.z
    )
});
for (var i = 1; i <= 100; i++) {
    var stepAngle = (angle / 100) * i;
    animationKeys.push({
        frame: i,
        value: new BABYLON.Vector3(
            Math.cos(actualRotation + stepAngle) * distance,
            object.position.y,
            Math.sin(actualRotation + stepAngle) * distance
        )
    });
}
animationPosition.setKeys(animationKeys);

object.animations.push(animationPosition);

var animationRotation = new BABYLON.Animation(
    "animationRotationY",
    "rotation.y",
    speed,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
);
animationKeys = [
    {frame: 0, value: (object.rotation.y)},
    {frame: 100, value: (object.rotation.y - angle)}
];
animationRotation.setKeys(animationKeys);

object.animations.push(animationRotation);

scene.beginAnimation(object, 0, 100, false, 1, function () {

});