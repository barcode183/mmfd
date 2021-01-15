UI.AddHotkey(["Config", "SUBTAB_MGR", "Scripts", "SHEET_MGR", "Keys", "JS Keybinds"], "Fake Duck", "");
UI.AddSubTab( ["Config", "SUBTAB_MGR"], "FD amount");
UI.AddSubTab( ["Config", "SUBTAB_MGR"], "Offset");
UI.AddSliderInt( ["Config", "FD amount", "FD amount"], "Duck amount", 1, 100 );
UI.AddSliderInt( ["Config", "FD amount", "FD amount"], "Stand amount", 1, 100 );
UI.AddSliderInt( ["Config", "Offset", "Offset"], "Y level", 1, 1080 );

var fdHeight;

function FakeDuck() {
    var cmd = UserCMD.GetButtons();
    var standHeight = UI.GetValue(["Config", "FD amount", "FD amount", "Stand amount"]);
    var crouchHeight = UI.GetValue(["Config", "FD amount", "FD amount", "Duck amount"]);
    standHeight/=100;
    crouchHeight/=100;
    //If key is held do ducking 
    if(UI.GetValue(["Config", "SUBTAB_MGR", "Scripts", "SHEET_MGR", "Keys", "JS Keybinds", "Fake Duck"])) {
        var duckAmount = Entity.GetProp(Entity.GetLocalPlayer(), "CCSPlayer", "m_flDuckAmount");
        if(UserCMD.Choke(), duckAmount <= standHeight) {
            fdHeight = 1;
        }
        if(duckAmount >= crouchHeight && (fdHeight = 0, UserCMD.Send()), fdHeight) {
            UserCMD.SetButtons(4 | cmd)
        } else UserCMD.SetButtons(cmd | 1 << 22)
    } else {
        UserCMD.SetButtons(cmd | 1 << 22)
    }
}

function Test(){
    if (Entity.IsAlive(Entity.GetLocalPlayer())){
        var customFont = Render.AddFont("Tahomabd", 14, 800);
        var Y = UI.GetValue(["Config", "Offset", "Offset", "Y level"]);
        var duck=Entity.GetProp(Entity.GetLocalPlayer(), "CCSPlayer", "m_flDuckAmount");
        var standHeight = UI.GetValue(["Config", "FD amount", "FD amount", "Stand amount"]);
        var crouchHeight = UI.GetValue(["Config", "FD amount", "Duck amount"]);
        standHeight/=100;
        crouchHeight/=100;
        Render.String(10, Y, 0, "standHeight: ", [152, 255, 152, 255], customFont);
        Render.String(10, Y+15, 0, "crouchHeight: ", [152, 255, 152, 255], customFont);
        Render.String(10, Y+30, 0, "fdHeight: ", [152, 255, 152, 255], customFont);
        Render.String(125, Y, 0, standHeight.toString(), [255, 255, 255, 255], customFont);
        Render.String(125, Y+15, 0, crouchHeight.toString(), [255, 255, 255, 255], customFont);
        Render.String(100, Y+30, 0, duck.toString(), [255, 255, 255, 255], customFont);
    }
}

Cheat.RegisterCallback("Draw", "Test");
Cheat.RegisterCallback("CreateMove", "FakeDuck");
