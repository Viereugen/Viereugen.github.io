// ------- Mario's Dungeon -------- //
// ------- Variablen -------- //
let monsterHolder = "monsterHoldingCell"; // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.
let highScore = 0; // Speichert den Highscore
let givingUpButtonExists = false; // Checken ob ein givingUpButton existiert
// Ein paar globale Variablen, welche den Spieler darstellen.
let playerName = "Mario"; // Stellt den Spieler-Namen dar.
let playerXP = 0; // Stellt die gesammelte Erfahrung des Spielers dar.
let playerXPperLevel = 500; // Stellt die XP dar, die man braucht um ein Level zu steigen
let playerMoney = 200; // Stellt das gesammelte Geld des Spielers dar
let playerItem = "Allmächtiges Schwert"; // Stellt das Item des Spielers dar
let playerHealthPoints = 100; // Stellt die Health-Points des Spielers dar.
// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.
let MonsterType = ["Holz", "Wasser", "Rentner", "Metall", "Feuer", "Mini", "Idioten", "Vampir", "Baby", "Alkoholiker", "Schwächling"]; // length = 11, da 11 Einträge. Von 0-10.    //Wurde von "Prefix" zu "Typ" umfunktioniert    
let monsterName = ["Ratte", "Spinne", "Käfer", "Hund", "Student", "Gremlin", "Roboter", "Geist"]; // length = 8, da 8 Einträge. Von 0-7.        
let suffix = [" des Verderbens", " aus der Hölle", " des Grauens", " mit Rheuma", " aus Furtwangen", " mit Minderwertigkeits-Komplexen", " vom Dorf", " aus der Wüste", " aus dem Wald", " aus Mordor", " des Todes"]; // length = 11, da hier 11 Einträge sind. Von 0-10.
let monsterModifers = ["Stark", "Schwach", "Pleite", "Reich", "Bier-Connoisseur", "Verfehlt häufig", "Müde", "Nervig", "Verwirrt", "Linkshänder", "Harmlos"]; // Eine Reihe von zufälligen "Verstärkern" für das Monster. length = 11 VOn 0-10
let items = ["Flammenwerfer", "Fön", "IPhone", "Magnet", "Wasserpistole", "Fliegenklatsche", "Buch", "Knoblauch", "Schnuller", "Alkoholfreies-Bier", "Allmächtiges Schwert"]; //Eine Reihe von zufälligen "Verstärkern" für das Monster. leghth = 11 Von 0-10.
let monsterIcons = ["imgs/MonsterIcon1.png", "imgs/MonsterIcon2.png", "imgs/MonsterIcon3.png", "imgs/MonsterIcon4.png", "imgs/MonsterIcon5.png", "imgs/MonsterIcon6.png", "imgs/MonsterIcon7.png", "imgs/MonsterIcon8.png", "imgs/MonsterIcon9.png", "imgs/MonsterIcon10.png",
    "imgs/MonsterIcon11.png", "imgs/MonsterIcon12.png", "imgs/MonsterIcon13.png", "imgs/MonsterIcon14.png", "imgs/MonsterIcon15.png", "imgs/MonsterIcon16.png", "imgs/MonsterIcon17.png", "imgs/MonsterIcon18.png", "imgs/MonsterIcon19.png", "imgs/MonsterIcon20.png",
    "imgs/MonsterIcon21.png", "imgs/MonsterIcon22.png", "imgs/MonsterIcon23.png", "imgs/MonsterIcon24.png", "imgs/MonsterIcon25.png", "imgs/MonsterIcon26.png", "imgs/MonsterIcon27.png", "imgs/MonsterIcon28.png", "imgs/MonsterIcon29.png", "imgs/MonsterIcon30.png"]; // Eine Reihe von zufälligen Bildern für das Monster. length = 30 Von 0-29
// -- Initialisierung für viele/variable Anzahl an Monster --
let monsterArray = []; // Das Haupt-Array wurde erstellt und initialisiert!
console.log(monsterArray);
// ----------- Funktionen ----------- //
// Generelle onload-funktion um Event-Listener zum Dokument hinzuzufügen
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonsters, false);
    updatePlayer();
    console.log("Seite & Event-listener wurden geladen");
};
// Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.
// Ruft eine Funktion auf, welche das das HTML erneuert
function generateMonsters() {
    if (playerMoney >= 40) { // Genug Geld?
        playerMoney -= 40; // 40$ werden vom Geld abgezogen
        updatePlayer();
        for (let i = getRNGNumber(3); i < 3; i++) { // 🗹 Änderung Nr.1 in "generateMonster" -> Führt die generierung 1-3 mal durch
            let newMonsterType = generateMonsterType(); // Eigens-gebaute Funktion, welche einen String zurück gibt.
            let newMonsterModifier = generateMonsterModifer(); // Eigens-gebaute Funktion, welche ein String-Array zurück gibt.
            let newMonsterName = generateMonsterName(newMonsterType); // Eigens-gebaute Funktion, welche einen String zurück gibt. -> Nutzt den Mnster-Typ als Prefix
            let newMonsterHitPoints = generateMonsterHitPoints(newMonsterModifier); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
            let newMonsterXP = generateMonsterXP(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
            let newMonsterMoney = generateMonsterMoney(newMonsterType, newMonsterModifier); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt. -> Nutzt den Monster-Typ und Monster-Mod für um manchen Monstern mehr/weniger Geld zu geben
            let newMonsterItem = generateMonsterItem(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
            let newMonsterIcon = generateMonsterIcon(); // Eigens-gebaute Funktion, welche einen String zurück gibt.
            let newMonster = {
                monsterType: newMonsterType,
                monsterName: newMonsterName,
                monsterHitPoints: newMonsterHitPoints,
                monsterExperience: newMonsterXP,
                monsterModifier: newMonsterModifier,
                monsterMoney: newMonsterMoney,
                monsterItem: newMonsterItem,
                monsterIcon: newMonsterIcon
            };
            monsterArray.push(newMonster); // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 
        }
        updateHTML(); // 🗹 Änderung Nr.2 in "generateMonster" -> Refresh HTML Funktion wird aufgerufen
    }
    else { // Nicht genug Geld!
        window.alert("Du hast nicht genug Geld!");
        givingUpButtonSwitch(true);
    }
}
// Generiert oder Erstellt einen givingUpButton 
// Der Parameter(OnOrOff) gibt an ob der Button an- oder ausgeschaltet werden soll
function givingUpButtonSwitch(OnOrOff) {
    if (OnOrOff == true && givingUpButtonExists == false) { // Generiere den Button falls er nicht nicht existiert
        let givingUpButton = document.createElement("BUTTON");
        givingUpButton.setAttribute("id", "givingUpButton");
        givingUpButton.innerHTML = "Aufgeben?";
        document.getElementById("buttonsDiv").appendChild(givingUpButton);
        givingUpButton.addEventListener("click", killPlayer); // Gib <button> einen Event-Listener der eine Funktion ausführt die den Spieler tötet
        console.log("Selbstmord-Button erstellt");
        givingUpButtonExists = true;
    }
    if (OnOrOff == false && givingUpButtonExists == true) { // Lösche den Button falls er existiert
        givingUpButtonExists = false;
        document.getElementById("buttonsDiv").removeChild(document.getElementById("givingUpButton"));
    }
}
// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden.
// Parameter gibt die Nummer des neuen Monsters an
function monsterGenerateHTML(monsterCount) {
    // 🗹 Änderung Nr.1&3 in "monsterGenerateHTML"-> Alle Attribute in HTML generieren & Operator "monsterCount" statt "monsterArray.length" benutzen
    let holdingDiv = document.createElement("div"); // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + monsterCount); // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster"); // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv); // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"
    let monsterName = document.createElement("p"); // Generiere einen <p>
    monsterName.innerHTML = monsterArray[monsterCount - 1].monsterName; // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterMod = document.createElement("p"); // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[monsterCount - 1].monsterModifier[0] + " & " + monsterArray[monsterCount - 1].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterStats = document.createElement("p"); // Generiere einen <p>
    monsterStats.innerHTML = monsterArray[monsterCount - 1].monsterHitPoints + " HP | " + monsterArray[monsterCount - 1].monsterExperience + " XP | " + monsterArray[monsterCount - 1].monsterMoney + " $"; // Inhalt des <p>: Monster-Item des letzten Monsters im Array.
    holdingDiv.appendChild(monsterStats); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterImg = document.createElement("img"); // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", monsterArray[monsterCount - 1].monsterIcon); // Wurde geändert da man jetzt auf ein Bild aus dem monsterIcon-Array zugreift
    monsterImg.setAttribute("alt", "Schreckliches Monster"); // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg); // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)
    let monsterItem = document.createElement("p"); // Generiere einen <p>
    monsterItem.innerHTML = "Mit " + monsterArray[monsterCount - 1].monsterItem; // Inhalt des <p>: Monster-Item des letzten Monsters im Array.
    holdingDiv.appendChild(monsterItem); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterBtn = document.createElement("BUTTON"); // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!"; // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn); // Füge den Button zu dem holding-div hinzu.
    monsterBtn.addEventListener('click', function () { fightMonster(monsterCount); }, false); // Wenn das Monster erstellt wird erhält die fightMonster-Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.                       
}
// Führt die Funktion monsterGenerateHTML() für jedes Monster im monsterArray aus
function monsterGenerateHTMLAll() {
    for (let i = 1; i <= monsterArray.length; i++) { // Generiere jedes Monster in monsterArray[]
        monsterGenerateHTML(i);
    }
}
// Löscht alle Children von "monsterHoldingCell" aus dem HTML
function clearMonsterCell() {
    let monsterAnzeige = document.getElementById("monsterHoldingCell");
    let children = monsterAnzeige.children;
    let childCount = children.length;
    for (let i = 0; i < childCount; i++) { // Schleife die alle children in der monsterAnzeige abtastet
        if (monsterAnzeige.firstElementChild != null) // Nur ausführen falls schon die monster ANzeige schon children hat
            monsterAnzeige.removeChild(monsterAnzeige.firstElementChild); // Lösche bei jedem durchgang das "firstChild"
    }
}
// Führt Funktionen clearMonsterCell() und dann monsterGenerateHTMLAll() aus
function updateHTML() {
    clearMonsterCell();
    monsterGenerateHTMLAll();
    getMonsterCount();
    console.log("Anzahl der Monster: " + getMonsterCount());
}
// Wird für den Zugriff auf eine zufällige Stelle in einem Array aufgerufen.
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber) {
    return Math.floor(Math.random() * _maxNumber);
}
// Wird für den Monster-Typ aufgerufen.
// Liefert einen String zurück.
function generateMonsterType() {
    return MonsterType[getRNGNumber(MonsterType.length)];
}
// Wird für die Erstellung der Monster-Modifizierer aufgerufen.
// Liefert ein Array mit zwei Einträgen zurück.
function generateMonsterModifer() {
    let tempMonsterMod = []; // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod; // Gebe das hier zusammengesetzte Array wieder zurück.
}
// Diese Funktion gibt einen zusammengewürfelten Namen zurück.
// Liefert einen zusammengesetzten String zurück.                            
function generateMonsterName(Prefix) {
    // Monster-Prefix
    let generatedMonsterName = Prefix + "-"; // Der Name wird deklariert. Er beginnt mit dem Typ und einem Bindestrich
    // Monster-Mittelname
    let rngNumber = getRNGNumber(monsterName.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag                                 
    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    return generatedMonsterName;
}
// Wird für die Monster-Hitpoints aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHitPoints(modCheck) {
    let tempMonsterHP = 20 + getRNGNumber(11); // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 10 zurück.
    if ((modCheck[0] == "Stark") || (modCheck[1] == "Stark")) // Einige Modifikationen bei bestimmentn Monster-Mods
        tempMonsterHP += 10;
    if ((modCheck[0] == "Schwach") || (modCheck[1] == "Schwach"))
        tempMonsterHP -= 10;
    if ((modCheck[0] == "Harmlos") || (modCheck[1] == "Harmlos"))
        tempMonsterHP = 0;
    return tempMonsterHP;
}
// Wird für die Erstellung der Monster-XP aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 700) + 200 zurück.
    let tempMonsterXP = 200 + getRNGNumber(701);
    return tempMonsterXP;
}
// Wird für die Erstellung des Monster-Moneys aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterMoney(typeCheck, modCheck) {
    let tempMonsterMoney = 50 + getRNGNumber(51); // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 50) + 50 zurück.
    // Einige Modifikationen bei bestimmentn Monster-Mods
    if ((modCheck[0] == "Pleite") || (modCheck[1] == "Pleite"))
        tempMonsterMoney -= 50;
    if ((modCheck[0] == "Reich") || (modCheck[1] == "Reich"))
        tempMonsterMoney += 50;
    return tempMonsterMoney;
}
// Wird für die Erstellung der Monster-Items aufgerufen
// Liefert einen String zurück.
function generateMonsterItem() {
    let rngNumber = getRNGNumber(items.length); // Diese Funktion gibt einen zufälligen String aus dem Items-Array zurück.
    return items[rngNumber];
}
// Wird für die Erstellung der Monster-Icons aufgerufen
// Liefert einen String zurück.
function generateMonsterIcon() {
    let rngNumber = getRNGNumber(monsterIcons.length); // Diese Funktion gibt einen zufälligen Bild-Pfad zurück.
    return monsterIcons[rngNumber];
}
// Aufgerufen, wenn man auf den Button klickt.
// Der Spieler kämpft gegen das entsprechende Monster.
function fightMonster(index) {
    if (Math.random() < 0.8) { // Gewinnchance ist 80%
        playerXP += monsterArray[index - 1].monsterExperience; // Spieler bekommt die XP des besiegten Monsters.
        playerMoney += monsterArray[index - 1].monsterMoney; // Spieler bekommt das Geld des besiegten Monsters.
        playerItem = monsterArray[index - 1].monsterItem; // Spieler tauscht sein Item gegen das des besiegten Monsters.
        console.log("Das Monster wurde besiegt!\n\n+ " + monsterArray[index - 1].monsterMoney + " $\n+ " + monsterArray[index - 1].monsterExperience + " XP\n+ " + "Neues Item: " + playerItem);
        monsterArray.splice(index - 1, 1); // 🗹 Änderung Nr.1 in "fightMonster" -> Löscht das bekämpfte Monster aus dem monsterArray
        givingUpButtonSwitch(false);
    }
    else {
        playerMoney -= 20; // Der Spieler verliert Geld
        playerHealthPoints -= monsterArray[index - 1].monsterHitPoints; // Der Spieler verliert HealthPoints in höhe der HitPoints des Monsters
        window.alert("Du hast den Kampf verloren\n- 40$\n- " + monsterArray[index - 1].monsterHitPoints + "HP");
    }
    updatePlayer();
    updateHTML(); // 🗹 Änderung Nr.2 in "fightMonster" -> Ruft updateHTML() auf
}
//Gibt die Anzahl an Monstern zurück
function getMonsterCount() {
    return monsterArray.length;
}
//Tötet den Spieler
function killPlayer() {
    playerHealthPoints = 0;
    updatePlayer();
}
// Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
function updatePlayer() {
    let tempLevel = Math.floor(playerXP / playerXPperLevel) + 1; // Spieler-Level = XP / XPproLevel
    document.getElementById("xpCounter").innerHTML = "Player-Level: " + tempLevel + " (XP: " + playerXP + " / " + tempLevel * playerXPperLevel + ")"; // Baue den String für die Spieler-Info zusammen
    document.getElementById("playerHPCounter").innerHTML = "HP: " + playerHealthPoints;
    document.getElementById("moneyCounter").innerHTML = "Geld: " + playerMoney;
    document.getElementById("itemHolder").innerHTML = "Item: " + playerItem;
    if (tempLevel >= 10) // Win-Condition                                  
        winTheGame();
    if (playerHealthPoints < 1) // Lose-Condition
        loseTheGame();
}
// Aufgerufen falls Win-Condition erfüllt sind
function winTheGame() {
    window.alert("!!!GLÜCKWUNSCH!!!\n!!!DU HAST GEWONNEN!!!\nDu hast dabei: " + playerMoney + "$ gesammelt!");
    if (playerMoney > highScore) { // Falls ein neuer Highscore erreicht wurde
        highScore = playerMoney; // Speicher neuen Highscore
        document.getElementById("highscoreDisplay").innerHTML = "Highscore: " + highScore + " $"; // Schreib neuen Highscore in HTML
    }
    //Variablen-Reset um eine neue Runde zu spielen
    playerXP = 0;
    playerMoney = 200;
    playerItem = "Allmächtiges Schwert";
    playerHealthPoints = 100;
    monsterArray = [];
    givingUpButtonSwitch(false);
    updatePlayer();
    updateHTML();
}
// Aufgerufen falls Lose-Conditions erfüllt sind
function loseTheGame() {
    window.alert("Du bist leider gestorben.");
    //Variablen-Reset um eine neuer Runde zu spielen                              
    playerXP = 0;
    playerMoney = 200;
    playerItem = "Allmächtiges Schwert";
    playerHealthPoints = 100;
    monsterArray = [];
    givingUpButtonSwitch(false);
    updatePlayer();
    updateHTML();
}
// ----------- Zusatz Funktion ----------- //
let drinksCounter = 1;
function getränkeVerteilen() {
    console.log("Array vorher:"); // Konsolenausgabe vorher
    console.log(monsterModifers);
    monsterModifers.push("Hatte " + drinksCounter + " Kaffee");
    monsterModifers.push("Hatte " + drinksCounter + " Bier");
    console.log("Array danach:"); // Konsolenausgabe danach
    console.log(monsterModifers);
    drinksCounter++;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//# sourceMappingURL=script.js.map