//MARIOS'S DUNGEON
// ------- Variablen -------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Variablen: I (1 / einer)                 //Alle Fehler gefunden!
let monsterHolder = "monsterHoldingCell"; // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.
let highScore = 0; // Speichert den Highscore
let givingUpButtonCheck = false; // Um zu checken ob ein givingUpButton existiert
// Ein paar globale Variablen, welche den Spieler darstellen.
let playerName = "Mario"; // Stellt den Spieler-Namen dar.
let playerXP = 0; //FEHLER 1 GEFUNDEN!: Anfangswert wurde festgelegt    // Stellt die gesammelte Erfahrung des Spielers dar.
let playerXPperLevel = 500; // Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.
let playerMoney = 200; // Stellt das gesammelte Geld des Spielers dar
let playerItem = "Allmächtiges Schwert"; // Stellt das Item des Spielers dar
let playerHealthPoints = 100; // Stellt die Health-Points des Spielers dar.
// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.
let type = ["Holz", "Wasser", "Rentner", "Metall", "Feuer", "Mini", "Idioten", "Vampir", "Baby", "Alkoholiker", "Schwächling"]; // length = 11, da 11 Einträge. Von 0-10.    //Wurde von "Prefix" zu "Typ" umfunktioniert    
let monsterName = ["Ratte", "Spinne", "Käfer", "Hund", "Student", "Gremlin", "Roboter", "Geist"]; // length = 8, da 8 Einträge. Von 0-7.         // 🗹 Mindestanforderung Nr.5
let suffix = [" des Verderbens", " aus der Hölle", " des Grauens", " mit Rheuma", " aus Furtwangen", " mit Minderwertigkeits-Komplexen", " vom Dorf", " aus der Wüste", " mit Schnupfen", " mit Depressionen", " des Todes"]; // length = 11, da hier 11 Einträge sind. Von 0-10.
let monsterModifers = ["Super stark", "Super schwach", "Super arm", "Super reich", "Bier-Connoisseur", "Verfehlt häufig", "Müde", "Ist nervig", "Verwirrt", "Hat Schnupfen", "Freundlich"]; // Eine Reihe von zufälligen "Verstärkern" für das Monster. length = 11 VOn 0-10
let items = ["Flammenwerfer", "Fön", "IPhone", "Magnet", "Wasserpistole", "Fliegenklatsche", "Buch", "Knoblauch", "Schnuller", "Alkoholfreies-Bier", "Allmächtiges Schwert"]; //Eine Reihe von zufälligen "Verstärkern" für das Monster. leghth = 11 Von 0-10.
let monsterIcons = ["imgs/MonsterIcon1.png", "imgs/MonsterIcon2.png", "imgs/MonsterIcon3.png", "imgs/MonsterIcon4.png", "imgs/MonsterIcon5.png", "imgs/MonsterIcon6.png", "imgs/MonsterIcon7.png", "imgs/MonsterIcon8.png", "imgs/MonsterIcon9.png", "imgs/MonsterIcon10.png",
    "imgs/MonsterIcon11.png", "imgs/MonsterIcon12.png", "imgs/MonsterIcon13.png", "imgs/MonsterIcon14.png", "imgs/MonsterIcon15.png", "imgs/MonsterIcon16.png", "imgs/MonsterIcon17.png", "imgs/MonsterIcon18.png", "imgs/MonsterIcon19.png", "imgs/MonsterIcon20.png",
    "imgs/MonsterIcon21.png", "imgs/MonsterIcon22.png", "imgs/MonsterIcon23.png", "imgs/MonsterIcon24.png", "imgs/MonsterIcon25.png", "imgs/MonsterIcon26.png", "imgs/MonsterIcon27.png", "imgs/MonsterIcon28.png", "imgs/MonsterIcon29.png", "imgs/MonsterIcon30.png"]; // Eine Reihe von zufälligen Bildern für das Monster. length = 20 VOn 0-19
// -- Initialisierung für viele/variable Anzahl an Monster --
let monsterArray = []; // Das Haupt-Array wurde erstellt und initialisiert!
console.log(monsterArray); // Gebe das Monster-Array einmal zu beginn aus. Es sollte leer sein.
// ----------- Funktionen ----------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Funktionen: IIIII (5 / fünf)             // Alle Fehler gefunden!
// Generelle onload-funktion um Event-Listener zum Dokument hinzuzufügen
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
    updatePlayer(); // Zu Anfang wird durch eine Funktion ein HTML-Element mit Inhalt befüllt.
};
//console.log(document.getElementById("monsterSpawner").innerHTML);             //FEHLER 1 GEFUNDEN!:  Ziemlich unnötige consolen Ausgabe die Ich mal auskommentiert habe 
// Die Hauptfunktion, um ein Monster zu erstellen. Wird von einem Button ausgerufen.
// Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.
// Ruft eine Funktion auf, welche dann das entsprechende HTML erzeugt.
function generateMonster() {
    if (playerMoney >= 10) // Nur ausführen wenn noch genug Geld vorhanden ist (Neue Monster kosten 20$)
     {
        playerMoney -= 20; // 20$ werden vom Geld abgezogen
        updatePlayer();
        let newMonsterType = generateMonsterType(); // Eigens-gebaute Funktion, welche einen String zurück gibt.
        let newMonsterModifier = generateMonsterModifer(); // Eigens-gebaute Funktion, welche ein String-Array zurück gibt.
        let newMonsterName = generateMonsterName(newMonsterType); // Eigens-gebaute Funktion, welche einen String zurück gibt.
        let newMonsterHitPoints = generateMonsterHitPoints(newMonsterModifier); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterXP = generateMonsterXP(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterMoney = generateMonsterMoney(newMonsterType, newMonsterModifier); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterItem = generateMonsterItem(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterIcon = generateMonsterIcon(); // Eigens-gebaute Funktion, welche einen String zurück gibt.    // 🗹 Mindestanforderung Nr. 4
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
        console.log("XP vom neuen Monster: " + monsterArray[monsterArray.length - 1].monsterExperience +
            ", Geld vom neuen Monster: " + monsterArray[monsterArray.length - 1].monsterMoney); //FEHLER 3 GEFUNDEN!: So geändert dass es die XP des neuen Monsters ausgibt // Man kann nur auf Array-Teile zugreifen, welche definiert sind. -1 ist nicht definitiert (und wird es auch nie sein).
        monsterGenerateHTML(); // Triggere die Generierung von HTML
    }
    else {
        window.alert("Du hast nicht genug Geld!"); // Alert falls nicht genug Geld vorhanden ist
        if (givingUpButtonCheck == false) { // Nur einen givigUpButton erstellen falls es noch keinen gibt
            givingUpButtonCheck = true;
            let givingUpButton = document.createElement("BUTTON"); // Generiere einen <buton> mit dem man Aufgeben kann
            givingUpButton.setAttribute("id", "givingUpButton");
            givingUpButton.innerHTML = "Aufgeben";
            document.getElementById("buttonsDiv").appendChild(givingUpButton); // Füge den <button> dem <main> Element dazu
            givingUpButton.addEventListener("click", killPlayer); // Gib <button> einen Event-Listener der eine Funktion ausführt die den Spieler tötet
            console.log("Selbstmord-Button erstellt");
        }
    }
}
// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
function monsterGenerateHTML() {
    let holdingDiv = document.createElement("div"); // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + monsterArray.length); // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster"); // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv); // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"
    let monsterName = document.createElement("p"); // Generiere einen <p>
    monsterName.innerHTML = monsterArray[monsterArray.length - 1].monsterName; // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterMod = document.createElement("p"); // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[monsterArray.length - 1].monsterModifier[0] + ", " + monsterArray[monsterArray.length - 1].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterItem = document.createElement("p"); // Generiere einen <p>
    monsterItem.innerHTML = "Item: " + monsterArray[monsterArray.length - 1].monsterItem; // Inhalt des <p>: Monster-Item des letzten Monsters im Array.
    holdingDiv.appendChild(monsterItem); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterImg = document.createElement("img"); // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", monsterArray[monsterArray.length - 1].monsterIcon); // Wurde geändert da man jetzt auf ein Bild aus dem monsterIcon-Array zugreift
    monsterImg.setAttribute("alt", "Schreckliches Monster"); // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg); // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)
    let monsterBtn = document.createElement("BUTTON"); // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!"; // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn); // Füge den Button zu dem holding-div hinzu.
    let monsterCount = monsterArray.length; // Die aktuelle Anzahl vorhandener Monster, zudem auch die neue Zahl für das Monster-Array.
    console.log("Aktuelle Anzahl an Monstern: " + monsterCount);
    monsterBtn.addEventListener(// Füge dem Monster eine Funktion hinzu.
    'click', function () {
        fightMonster(monsterCount); // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
    }, false); // Ignoriert das false.
}
// Wird für den Zugriff auf eine zufällige Stelle in einem Array aufgerufen.
// [x] Optionale Aufgabe: verkleinere diesen Code auf eine Zeile mit nur einem Semikolon!
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber) {
    return Math.floor(Math.random() * _maxNumber); // 🗹 Optionales Ziel Nr.1
    //let rngNumber : number = Math.random();                                   // Macht folgendes: Generiere eine zufällige Komma-Zahl zwischen 0 - 1.
    //rngNumber = rngNumber * _maxNumber;                                       // Multipliziere diese Zahl mit der Länge des entsprechenden Array (hier: _maxNumber, ein Parameter, siehe in der runden Klammer der Funktion).
    //rngNumber = Math.floor(rngNumber);                                        // Floore diese Zahl, damit diese nun Ganzzahlig ist.
    //rngNumber = 0;                                                            //FEHLER 4 GEFUNDEN! // Diese Zeile ist einer der drei(!?) Fehler in den Funktionen. Ich bin mal so frei und vermerke das hier. Einfach löschen und alles wird besser.
    //return rngNumber;                                                         // Gebe diese Zahl zurück, Funktion kann ähnlich einer Variable in Rechnungen genutzt werden.
}
// Wird für den Monster-Typ aufgerufen.
// Liefert einen String zurück.
function generateMonsterType() {
    return type[getRNGNumber(type.length)];
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
// Wird für die Monster-generierung verwendet!
// Liefert einen zusammengesetzten String zurück.                               // Leicht geändert durch die umfunktion von "Prefix" zu "Type"
function generateMonsterName(Prefix) {
    let generatedMonsterName = Prefix + "-"; //Der Name wird deklariert. Er beginnt mit dem Typ und einem Bindestrich
    // Monster-Mittelname
    let rngNumber = getRNGNumber(monsterName.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag
    //generatedMonsterName += monsterName[0];                                   //FEHLER 5 GEFUNDEN!: Keine Ahnung was hier versucht wurde, aber es funktioniert so nicht
    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    // 🗹 Mindestanforderung Nr.6
    return generatedMonsterName;
}
// Wird für die Monster-Hitpoints aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHitPoints(modCheck) {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 10 zurück.
    let tempMonsterHP = 10 + getRNGNumber(11); // Da HP jetzt als Hit-Points genutzt werden, wurde der Wert ein wenig angepasst
    switch (modCheck[0] || modCheck[1]) { // Einige Modifikationen bei bestimmentn Monster-Mods
        case "Super stark":
            tempMonsterHP += 10;
            break;
        case "Super schwach":
            tempMonsterHP -= 10;
            break;
        case "Freundlich":
            tempMonsterHP = 0;
            break;
    }
    return tempMonsterHP;
}
// Wird für die Erstellung der Monster-XP aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 900) + 100 zurück.
    let tempMonsterXP = 100 + getRNGNumber(901); // Wert wurde angepasst     // 🗹 Mindestanforderung Nr. 7
    return tempMonsterXP;
}
// Wird für die Erstellung des Monster-Moneys aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterMoney(typeCheck, modCheck) {
    let tempMonsterMoney = 200 + getRNGNumber(101); // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 100) + 200 zurück.
    switch (typeCheck) { //Einige Modifikationen bei bestimmentn Monster-Typen
        case "Schwächling":
            tempMonsterMoney = 100;
            break;
        case "Rentner":
            tempMonsterMoney += 100;
            break;
    }
    switch (modCheck[0] || modCheck[1]) { //Einige Modifikationen bei bestimmentn Monster-Mods
        case "Super arm":
            tempMonsterMoney -= 100;
            break;
        case "Super reich":
            tempMonsterMoney += 100;
            break;
    }
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
    //console.log("Spieler kämpft gegen Monster und gewinnt!");                 // Ohne Logik mit if/else ist so etwas wie ein Kampf nicht leicht umzusetzen.
    //console.log("Das Monster weigert sich zu verschwinden.");                 // Wird nächste Stunde erweitert. --> (Hab mich schonmal dran versucht)
    if ( // Falls der Spieler das richtige Item hat gewinnt er den Kampf
    playerItem == items[0] && monsterArray[index - 1].monsterType == type[0] || // Ich bin mir sicher das geht 100% eleganter aber ich komm nicht darauf wie man es lösen könnte ohne den Code grundlegend zu ändern.
        playerItem == items[1] && monsterArray[index - 1].monsterType == type[1] ||
        playerItem == items[2] && monsterArray[index - 1].monsterType == type[2] ||
        playerItem == items[3] && monsterArray[index - 1].monsterType == type[3] ||
        playerItem == items[4] && monsterArray[index - 1].monsterType == type[4] ||
        playerItem == items[5] && monsterArray[index - 1].monsterType == type[5] ||
        playerItem == items[6] && monsterArray[index - 1].monsterType == type[6] ||
        playerItem == items[7] && monsterArray[index - 1].monsterType == type[7] ||
        playerItem == items[8] && monsterArray[index - 1].monsterType == type[8] ||
        playerItem == items[9] && monsterArray[index - 1].monsterType == type[9] ||
        playerItem == "Allmächtiges Schwert" || monsterArray[index - 1].monsterType == "Schwächling") //"Allmächtige Schwert" besiegt alle Typen. "Schwächling" kann mit allen Items besiegt werden.
     {
        playerXP += monsterArray[index - 1].monsterExperience; // index ist in diesem Fall die Länge des Arrays - allerdings zählt der Computer beginnend von null, nicht eins! Deshalb _index-1.
        playerMoney += monsterArray[index - 1].monsterMoney; // Spieler bekommt das Geld des besiegten Monsters.
        playerItem = monsterArray[index - 1].monsterItem; // Spieler tauscht sein Item gegen das des besiegten Monsters.
        window.alert("Das Monster wurde besiegt!\nAlle anderen Monster sind geflohen!"); //🗹 Optionales Ziel Nr. 2
        console.log(playerName + " + " + monsterArray[index - 1].monsterMoney + "Geld");
        console.log(playerName + " + " + monsterArray[index - 1].monsterExperience + "XP");
        console.log(playerName + " hat das jetzt das Item: " + playerItem);
        monsterArray = []; // monsterArray wird geleert
        document.getElementById("monsterHoldingCell").innerHTML = ""; // HTML wird geleert
        if (givingUpButtonCheck == true) { // Lösche den givingUpButton falls er existiert
            givingUpButtonCheck = false;
            document.getElementById("buttonsDiv").removeChild(document.getElementById("givingUpButton"));
        }
    }
    else // Falls der Spieler nicht das richtige Item hat verliert er den Kampf
     {
        playerMoney -= 40; // Der Spieler verliert Geld
        playerHealthPoints -= monsterArray[index - 1].monsterHitPoints; // Der Spieler verliert HealthPoints in höhe der HitPoints des Monsters
        window.alert("Du kannst " + monsterArray[index - 1].monsterType + "-Monster nicht mit einer/einem " + playerItem + " besiegen.\nDu nimmst " + monsterArray[index - 1].monsterHitPoints + " Schaden und verlierst 40$");
    }
    updatePlayer();
}
//Aufgerufen wenn der Spieler Aufgibt
function killPlayer() {
    playerHealthPoints = 0;
    updatePlayer();
}
// Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
function updatePlayer() {
    let tempLevel = Math.floor(playerXP / playerXPperLevel) + 1; // Spieler-Level = XP / XPproLevel
    document.getElementById("xpCounter").innerHTML = "Player-Level: " + tempLevel + " (XP: " + playerXP + " / " + playerXPperLevel + ")"; // Baue den String für die Spieler-Info zusammen
    document.getElementById("playerHPCounter").innerHTML = "HP: " + playerHealthPoints;
    document.getElementById("moneyCounter").innerHTML = "Geld: " + playerMoney;
    document.getElementById("itemHolder").innerHTML = "Item: " + playerItem;
    if (tempLevel >= 10) { // Spieler hat gewonnen!                                    
        winTheGame();
    }
    if (playerHealthPoints < 1) { // Spieler hat verloren.
        loseTheGame();
    }
    //console.log("Spieler: " + playerName + " hat nun Level " + tempLevel + " mit " + playerXP + " (" + playerXPperLevel + " pro Level)"); // Spieler-Level in der Konsole.
}
// Aufgerufen falls Win-Conditions erfüllt sind
function winTheGame() {
    window.alert("!!!GLÜCKWUNSCH!!!\n!!!DU HAST GEWONNEN!!!\nDu hast dabei: " + playerMoney + "$ gesammelt!");
    if (playerMoney > highScore) { // Fals ein neuer Highscore erreicht wurde
        highScore = playerMoney;
        document.getElementById("highscoreDisplay").innerHTML = "Highscore: " + highScore + " $"; // Schreib neuen Highscore in HTML
    }
    //Variablen-Reset um eine neuer Runde zu spielen
    playerXP = 0;
    playerMoney = 100;
    playerItem = "Allmächtiges Schwert";
    playerHealthPoints = 100;
    document.getElementById("monsterHoldingCell").innerHTML = "";
    monsterArray = [];
    if (givingUpButtonCheck == true) { // Lösche den givingUpButton falls er existiert
        givingUpButtonCheck = false;
        document.getElementById("buttonsDiv").removeChild(document.getElementById("givingUpButton"));
    }
    updatePlayer();
}
// Aufgerufen falls Lose-Conditions erfüllt sind
function loseTheGame() {
    window.alert("Du bist leider gestorben.");
    //Variablen-Reset um eine neuer Runde zu spielen                              
    playerXP = 0;
    playerMoney = 100;
    playerItem = "Allmächtiges Schwert";
    playerHealthPoints = 100;
    document.getElementById("monsterHoldingCell").innerHTML = "";
    monsterArray = [];
    console.log("Spieler: " + playerName + " ist gestorben");
    if (givingUpButtonCheck == true) { // Lösche den givingUpButton falls er existiert
        givingUpButtonCheck = false;
        document.getElementById("buttonsDiv").removeChild(document.getElementById("givingUpButton"));
    }
    updatePlayer();
}
//🗹 Aufgabe: Weitere zu implementierende Funktionen-->                         
let drinksCounter = 1;
function getränkeVerteilen() {
    console.log("Array vorher:"); // Konsolenausgabe vorher
    console.log(monsterModifers);
    monsterModifers.push("Hatte " + drinksCounter + " Kaffee");
    monsterModifers.push("Hatte " + drinksCounter + " Bier");
    console.log("Array danach:"); // Konsolenausgabe danach
    console.log(monsterModifers);
    drinksCounter += 1;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//----------CHEAT-SHEET----------//
//
//  Welche Monster kann man wie besiegen?:
//
//  Jedes Monster wird mit dem "Allmächtigen Schwert" besiegt
//  Jedes Item kann Monster vom Typ "Schwächling" besiegen
//  "Holz"          -->  "Flammenwerfer"
//  "Wasser"        -->  "Fön" 
//  "Rentner        -->  "IPhone" 
//  "Metall"        -->  "Magnet" 
//  "Feuer"         -->  "Wasserpistole"
//  "Mini"          -->  "Fliegenklatsche"
//  "Idioten"       -->  "Buch"
//  "Vampir"        -->  "Knoblauch"
//  "Baby"          -->  "Schnuller"
//  "Alkoholiker"
//
//
//  SONDERFÄLLE:
//
//  Typ "Rentner"        --> +100$
//  Typ "Schwächling"    --> -100$
//  Mod "Super reich"    --> +100$
//  Mod "Super arm"      --> -100$
//
//  Mod "Super schwach"  --> -10 HitPoints
//  Mod "Super stark"    --> +10 HitPoints
//  Mod "Freundlich"     -->   0 HitPoints
//# sourceMappingURL=script.js.map