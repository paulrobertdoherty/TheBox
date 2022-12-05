static var FIRSTPERSON : boolean = false;
static var target : Transform = null;
var oTarget : Transform;

function Update () {
	if (FIRSTPERSON) {
		//set to first person
		transform.position = target.position;
		transform.rotation = target.rotation;
	} else {
		//spin camera around in a set location
		if (target != null) {
			transform.position = oTarget.position;
			transform.rotation = oTarget.rotation;
			target = null;
		}
		transform.Rotate(new Vector3(0, 1, 0), Time.deltaTime * 5);
	}
}