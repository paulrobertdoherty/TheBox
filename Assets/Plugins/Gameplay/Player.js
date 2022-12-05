private var food : int = 0;

static var timeInEndCollision : int = 0;
static var collidingWithEndCollision : boolean = false;

public static var ammoSound : AudioSource = null;
public static var waterSound : AudioSource = null;
public static var leftover : int = 0;

function OnTriggerEnter(collision : Collider) {
	if (collision.CompareTag("Food")) {
		if (collision.gameObject.GetComponent(Box).num1 == collision.gameObject.GetComponent(Box).num2 && collision.gameObject.GetComponent(Box).num2 == collision.gameObject.GetComponent(Box).num3) {	
			food++;
			ammoSound.Play();
			FoodText.nextBox = collision.gameObject.GetComponent(Box).GetComponent(Box).nextBox;
			FPSWalker.lastPlaceHitBox = transform.position;
		
			CountText.savedLastTime = collision.gameObject.GetComponent(Box).num1 != 0 && collision.gameObject.GetComponent(Box).num2 != 0 && collision.gameObject.GetComponent(Box).num3 != 0;
		
			UnityEngine.Object.Destroy(collision.gameObject.GetComponent(Box));	
		}
	}
	if (collision.CompareTag("Water")) {
		waterSound.Play();
	}
	collidingWithEndCollision = collision.CompareTag("End Collision Box");
}

function initSound() {
	var aSources = GetComponents(AudioSource);
	ammoSound = aSources[0];
	waterSound = aSources[1];
}

function Start() {
	if (ammoSound == null || waterSound == null) {
		initSound();
	}
}

function Update() {
	if (Input.GetKey(KeyCode.Escape)) {
		Screen.lockCursor = false;
	}
	FoodText.FOOD = food;
	if (collidingWithEndCollision && MainMenu.isInGame) {
		if (timeInEndCollision == 0) {
			timeInEndCollision = Time.realtimeSinceStartup;
		} else if (Time.realtimeSinceStartup - timeInEndCollision >= 10) {
			CameraFollow.FIRSTPERSON = false;
			timeInEndCollision = 0;
			MainMenu.startedPlayingSound = false;
			collidingWithEndCollision = false;
		}
	} else {
		timeInEndCollision = 0;	
	}
}