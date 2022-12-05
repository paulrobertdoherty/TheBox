var bBackground : Texture2D = null;

public static var isInGame : boolean = false;
public static var mouseSpeed : float = 7.5;

private var serverIP : String = "IP Here";
private var serverPort : String = "Port Here";
static var startedPlayingSound : boolean = false;
private var music : AudioSource = null;
private var style : GUIStyle = null;

private var inOptionMenu : boolean = false;
private var inAudioMenu : boolean = false;

//I don't know any better name for it
private var spaceAllowed : int = 50;

function OnGUI() {
	if (!startedPlayingSound) {
		music = GetComponent(AudioSource);
		music.Play();
		startedPlayingSound = true;
	} else if (Player.collidingWithEndCollision) {
		music.Stop();
	}
	if (!isInGame) {
		RenderSettings.fog = false;
		if (style == null) {
			setUpButtonStyle();
		}
		
		if (!inOptionMenu) {
			if (GUI.Button(new Rect((Screen.width / 2) - 150, (Screen.height / 2) - 80, 300, 30), "Play", style)) {
				isInGame = true;
				Spawner.onGameStart();
				Screen.lockCursor = true;
			}
			if (GUI.Button(new Rect((Screen.width / 2) - 150, (Screen.height / 2) - 50, 300, 30), "Options", style)) {
				inOptionMenu = true;
			}
			if (GUI.Button(new Rect((Screen.width / 2) - 150, (Screen.height / 2) - 20, 300, 30), "Quit", style)) {
				Application.Quit();	
			}
		} else {
			handleOptionMenuContents();
			
			if (GUI.Button(new Rect((Screen.width / 2) - 150, (Screen.height / 2) - spaceAllowed, 300, 30), "Back", style)) {
				inOptionMenu = false;
			}
		}
	} else {
		if (GUI.Button(new Rect(0, 0, 300, 30), "Main Menu (Esc)", style)) {
			isInGame = false;
			CameraFollow.FIRSTPERSON = false;
			CameraFollow.target = GameObject.Find("Main Menu Position").transform;
		}
	}
}

function setUpButtonStyle() {
	style = new GUIStyle(GUI.skin.button);
	style.alignment = TextAnchor.UpperCenter;
	style.fontSize = 18;
	style.normal.textColor = Color.white;
	style.normal.background = null;
	style.hover.textColor = Color.black;
	style.hover.background = bBackground;
	style.active.background = bBackground;
	style.active.textColor = Color.black;
}

function Update() {
	if (!isInGame) {
		Screen.lockCursor = false;
	}
}

function handleOptionMenuContents() {
	GUI.Label(new Rect((Screen.width / 2) - 150, (Screen.height / 2) - 80, 300, 30), "Music Volume");
	music.volume = GUI.HorizontalSlider(new Rect((Screen.width / 2) - 150, (Screen.height / 2) - 50, 300, 30), music.volume, 0.0, 1.0);	
		
	GUI.Label(new Rect((Screen.width / 2) - 150, (Screen.height / 2) - 20, 300, 30), "Sound Effects Volume");
	Player.ammoSound.volume = Player.waterSound.volume = GUI.HorizontalSlider(new Rect((Screen.width / 2) - 150, (Screen.height / 2) + 10, 300, 30), Player.waterSound.volume, 0.0, 1.0);
	
	GUI.Label(new Rect((Screen.width / 2) - 150, (Screen.height / 2) + 40, 300, 30), "Mouse Speed");
	mouseSpeed = GUI.HorizontalSlider(new Rect((Screen.width / 2) - 150, (Screen.height / 2) + 70, 300, 30), mouseSpeed, 0.1, 15.0);
		
	spaceAllowed = -100;
}