public static var savedLastTime : boolean = false;
public static var shouldReset : boolean = false;

function OnGUI() {
	if (CameraFollow.FIRSTPERSON) {
		if (FoodText.nextBox != null) {
			if (FoodText.nextBox.isSaving()) {
				guiText.text = FoodText.nextBox.savingSaying();
				guiText.pixelOffset.x = (Screen.width / 2) - (FoodText.nextBox.savingSaying().length * 19);
			} else {
				var timeLeft : int = parseInt((FoodText.nextBox.numArray[FoodText.nextBox.numCurrentlyOn] - (Time.time - FoodText.nextBox.lastTime)) + 1);
				if (timeLeft > 0) {
					guiText.text = "Count: " + timeLeft + " + " + Player.leftover;
				} else if (timeLeft >= -Player.leftover) {
					guiText.text = "Count: 0 + " + (Player.leftover + timeLeft);	
				} else {
					if ((timeLeft + Player.leftover) >= -9) {
						guiText.text = "Count: " + (timeLeft + Player.leftover) + " + " + 0;
					} else {
						shouldReset = true;	
					}
				}	
			}
		} else {
			guiText.text = "Count: 0";
		}
	} else {
		guiText.text = "";	
	}
	if (FoodText.nextBox == null || !FoodText.nextBox.isSaving()) {
		guiText.pixelOffset.x = Screen.width - 304;
	}
	guiText.pixelOffset.y = Screen.height - 38;
}