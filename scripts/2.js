object.animations = [];
var distance = Math.sqrt(
    Math.pow((object.position.z), 2) +
    Math.pow((object.position.y), 2)
);
var actualRotation = Math.atan2(object.position.z, object.position.y);

var animationPosition = new BABYLON.Animation(
    "animationPositionX",
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
            object.position.x,
            Math.cos(actualRotation + stepAngle) * distance,
            Math.sin(actualRotation + stepAngle) * distance
        )
    });
}
animationPosition.setKeys(animationKeys);

object.animations.push(animationPosition);

var animationRotation = new BABYLON.Animation(
    "animationRotation",
    "rotation.x",
    speed,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
);

animationKeys = [
    {frame: 0, value: (object.rotation.x)},
    {frame: 100, value: (object.rotation.x + angle)}
];
animationRotation.setKeys(animationKeys);

object.animations.push(animationRotation);

scene.beginAnimation(object, 0, 100, false);