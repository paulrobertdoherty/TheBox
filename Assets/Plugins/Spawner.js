var player : GameObject;

function Start() {
	UnityEngine.Object.Instantiate(player, transform.position, transform.rotation);
	CameraFollow.FIRSTPERSON = false;
}

static function onGameStart() {
	CameraFollow.FIRSTPERSON = true;
	CameraFollow.target = GameObject.Find("Player(Clone)").transform;
}