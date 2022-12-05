public var lastTime : int = 0;
public var numCurrentlyOn = 0;
public var numArray = new Array();
public var initTime : int = 0;

private var canCollect : boolean = false;
private var saving : boolean = true;

var num1 : int = 0;
var num2 : int = 0;
var num3 : int = 0;
var nextBox : Box = null;
var saying : String = null;

function Update() {
	//if this box is the current counting box
	if (FoodText.nextBox == this) {
		if (initTime == 0) {
			initTime = Time.time;	
		}
		
		//if has been 30 seconds since started counting
		if (Time.time - initTime >= 7 || (num1 == 0 && num2 == 0 && num3 == 0)) {
			//start timer
			if (saving) {
				lastTime = Time.time;	
			}
			
			//set not saving
			saving = false;
			
			//if has been a second since update
			if ((Time.time - lastTime) + Player.leftover >= numArray[numCurrentlyOn]) {
				//alows block to be collected
				canCollect = true;
		
				//if it has been one second or more
				if (CountText.shouldReset || ((Time.time - lastTime) + Player.leftover >= numArray[numCurrentlyOn] + 1 && (num1 == 0 && num2 == 0 && num3 == 0))) {
					//set new time
					lastTime = Time.time;
		
					//do timer count
					if (numCurrentlyOn < 2) {
						numCurrentlyOn++;
					} else {
						numCurrentlyOn = 0;
					}
					
					//reset
					Player.leftover = FPSWalker.leftoverContender;
					CountText.shouldReset = false;
					
					//do addition stuff
					numArray[numCurrentlyOn] -= Player.leftover;
					
					if (numCurrentlyOn == 0) {
						numArray[numCurrentlyOn + 1] += Player.leftover;
						numArray[numCurrentlyOn + 2] += Player.leftover;
						
						if (numArray[numCurrentlyOn + 1] > 9) {
							numArray[numCurrentlyOn + 1] -= 10;
						}
						if (numArray[numCurrentlyOn + 2] > 9) {
							numArray[numCurrentlyOn + 2] -= 10;
						}
					} else if (numCurrentlyOn == 1) {
						numArray[numCurrentlyOn + 1] += Player.leftover;
						numArray[numCurrentlyOn - 1] += Player.leftover;
						
						if (numArray[numCurrentlyOn + 1] > 9) {
							numArray[numCurrentlyOn + 1] -= 10;
						}
						if (numArray[numCurrentlyOn - 1] > 9) {
							numArray[numCurrentlyOn - 1] -= 10;
						}
					} else {
						numArray[numCurrentlyOn - 1] += Player.leftover;
						numArray[numCurrentlyOn - 2] += Player.leftover;
						
						if (numArray[numCurrentlyOn - 1] > 9) {
							numArray[numCurrentlyOn - 1] -= 10;
						}
						if (numArray[numCurrentlyOn - 2] > 9) {
							numArray[numCurrentlyOn - 2] -= 10;
						}	
					}
				}
			} else {
				canCollect = false;
			}
		}
	}
}

//returns next box, which is passed to the player, and then to FoodText
function getNextBox() : Box {
	return nextBox;
}

//put numbers in to array for usage and start lastTime
function Start() {
	numArray[0] = num1;
	numArray[1] = num2;
	numArray[2] = num3;
}

function OnDestroy() {
	saving = true;
	canCollect = false;
	lastTime = 0;
	numCurrentlyOn = 0;
	numArray = new Array();
	initTime = 0;
}

function savingSaying() : String {
	return saying;	
}

function isAbleToCollect() : boolean {
	return canCollect;
}

function isSaving() : boolean {
	return saving;
}