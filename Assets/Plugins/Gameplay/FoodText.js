static var FOOD : int = 0;
public static var nextBox : Box = null;

function OnGUI () {
	var newText : String = "Boxes: " + FOOD;
	
	//Only display boxes GUI if in game
	if (CameraFollow.FIRSTPERSON) {
		guiText.text = newText;
	} else {
		guiText.text = "";	
	}
	guiText.pixelOffset.x = (Screen.width / 2) - (newText.length * 38);
	guiText.pixelOffset.y = (Screen.height / 2) - 76;
}