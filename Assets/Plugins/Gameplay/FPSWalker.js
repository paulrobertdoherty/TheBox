var speed = 6.0;
var jumpSpeed = 4.0;
var gravity = 20.0;

public static var lastPlaceHitBox : Vector3 = new Vector3(0, 0, 0);
public static var leftoverContender : int = 0;

private var moveDirection = Vector3.zero;
private var grounded : boolean = false;
private var inWater : boolean = false;

function FixedUpdate() {
	if (MainMenu.isInGame) {
		if (grounded || inWater) {
			// We are grounded, so recalculate movedirection directly from axes
			moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
			moveDirection = transform.TransformDirection(moveDirection);
		
			//move, but only if you can
			if (FoodText.nextBox == null || FoodText.nextBox.isAbleToCollect()) {
				if (moveDirection.x == 0 && moveDirection.z == 0 && lastPlaceHitBox != null) {
					lastPlaceHitBox = transform.position;
				}
			
				if (inWater) {
					moveDirection *= speed / 2;
				} else {
					moveDirection *= speed;
				}
		
				if (Input.GetButton("Jump")) {
					moveDirection.y = jumpSpeed;
				}
				
				if (moveDirection.x != 0 || moveDirection.z != 0) {
					if (FoodText.nextBox != null) {
						leftoverContender = -1 * parseInt((FoodText.nextBox.numArray[FoodText.nextBox.numCurrentlyOn] - (Time.time - FoodText.nextBox.lastTime)) + 1);	
					}
				}
			} else if (FoodText.nextBox != null && (moveDirection.x != 0 || moveDirection.z != 0)) {
				transform.position = lastPlaceHitBox;
				moveDirection.x = 0;
				moveDirection.z = 0;
			}
		}
		if (inWater) {
			//apply water gravity and fog
			moveDirection.y -= (gravity / 2) * Time.deltaTime;
			RenderSettings.fog = true;
		} else {
			//apply normal gravity and no fog
			moveDirection.y -= gravity * Time.deltaTime;
			RenderSettings.fog = false;
		}
	
		//relock mouse is click while not locked
		if (!Screen.lockCursor && Input.GetButton("Click") && MainMenu.isInGame && Input.mousePosition.y <= Screen.height - 30) {
			Screen.lockCursor = true;
		}
	
		// Move the controller
		var controller : CharacterController = GetComponent(CharacterController);
		var flags = controller.Move(moveDirection * Time.deltaTime);
		grounded = (flags & CollisionFlags.CollidedBelow) != 0;
		inWater = transform.position.y <= 25;
	}
}

function Start() {
	Camera.main.GetComponent(CameraFollow).target = transform;
	Screen.lockCursor = false;
}

@script RequireComponent(CharacterController)