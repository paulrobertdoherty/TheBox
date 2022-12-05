function Update () {
	if (!MainMenu.isInGame) {
		guiText.text = "Pointlessness";	
	} else {
		guiText.text = "";	
	}
}