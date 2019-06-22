// ----------------- Mario's Dungeon ------------------ //


// ----------------- Interface ------------------ //

interface Monster {
    monsterType: string; //Typ de Monsters, und damit auch seine Schwäche
    monsterModifier: string[]; // Monster-Verstärker. Diese sind in diesem Fall nur Text! (Da hier einfacher Zufall für die Auswahl genutzt wird, kann der gleiche Eintrag auch doppelt vorkommen)
    monsterName: string; // Name des Monsters
    monsterHitPoints: number; // Stärke des Monsters
    monsterExperience: number; // Erfahrungspunkte bei besiegen des Monsters
    monsterLevel: number; // Level des Monsters
    monsterMoney: number; // Geld bei besiegen des Monsters                  
    monsterItem: string; // Item welches der Spieler erhält bei besiegen des Monsters         
    monsterIcon: string; // Bild des Monsters    
    monsterHealthPoints: number; // 🗹 OPTIONALES ZIEL Nr.1+2 -->// Lebenspunkte des Monsters                                      
}







// ----------------- Variablen ------------------ //

let monsterHolder: string = "monsterHoldingCell";                               // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.
let highScore: number = 0;                                                      // Speichert den Highscore
let givingUpButtonExists: boolean = false;                                      // Checken ob ein givingUpButton existiert

// Ein paar globale Variablen, welche den Spieler darstellen.
let playerName: string = "Mario";                                               // Stellt den Spieler-Namen dar.
let playerXP: number = 0;                                                       // Stellt die gesammelte Erfahrung des Spielers dar.
let playerXPperLevel: number = 500;                                             // Stellt die XP dar, die man braucht um ein Level zu steigen
let playerLevel: number = 1;                                                    // 🗹 VARIABLE Nr.1 zugefügt  --> Stellt das Level des Spielers dar.
let playerMoney: number = 200;                                                  // Stellt das gesammelte Geld des Spielers dar
let playerItem: string = "Allmächtiges Schwert";                                // Stellt das Item des Spielers dar
let playerHealthPoints: number = 100;                                           // Stellt die Health-Points des Spielers dar.

// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.
let MonsterType: string[] = ["Holz", "Wasser", "Rentner", "Metall", "Feuer", "Mini", "Idioten", "Vampir", "Baby", "Alkoholiker", "Schwächling"]; // length = 11, da 11 Einträge. Von 0-10.    //Wurde von "Prefix" zu "Typ" umfunktioniert    
let monsterName: string[] = ["Ratte", "Spinne", "Käfer", "Hund", "Student", "Gremlin", "Roboter", "Geist"]; // length = 8, da 8 Einträge. Von 0-7.        
let suffix: string[] = [" des Verderbens", " aus der Hölle", " des Grauens", " mit Rheuma", " aus Furtwangen", " mit Minderwertigkeits-Komplexen", " vom Dorf", " aus der Wüste", " aus dem Wald", " aus Mordor", " des Todes"]; // length = 11, da hier 11 Einträge sind. Von 0-10.
let monsterModifers: string[] = ["Stark", "Schwach", "Pleite", "Reich", "Bier-Connoisseur", "Verfehlt häufig", "Müde", "Nervig", "Verwirrt", "Linkshänder", "Harmlos"]; // Eine Reihe von zufälligen "Verstärkern" für das Monster. length = 11 VOn 0-10
let items: string[] = ["Flammenwerfer", "Fön", "IPhone", "Magnet", "Wasserpistole", "Fliegenklatsche", "Buch", "Knoblauch", "Schnuller", "Alkoholfreies-Bier", "Allmächtiges Schwert"]; //Eine Reihe von zufälligen "Verstärkern" für das Monster. leghth = 11 Von 0-10.
let monsterIcons: string[] = ["imgs/MonsterIcon1.png", "imgs/MonsterIcon2.png", "imgs/MonsterIcon3.png", "imgs/MonsterIcon4.png", "imgs/MonsterIcon5.png", "imgs/MonsterIcon6.png", "imgs/MonsterIcon7.png", "imgs/MonsterIcon8.png", "imgs/MonsterIcon9.png", "imgs/MonsterIcon10.png",
"imgs/MonsterIcon11.png", "imgs/MonsterIcon12.png", "imgs/MonsterIcon13.png", "imgs/MonsterIcon14.png", "imgs/MonsterIcon15.png", "imgs/MonsterIcon16.png", "imgs/MonsterIcon17.png", "imgs/MonsterIcon18.png", "imgs/MonsterIcon19.png", "imgs/MonsterIcon20.png",
"imgs/MonsterIcon21.png", "imgs/MonsterIcon22.png", "imgs/MonsterIcon23.png", "imgs/MonsterIcon24.png", "imgs/MonsterIcon25.png", "imgs/MonsterIcon26.png", "imgs/MonsterIcon27.png", "imgs/MonsterIcon28.png", "imgs/MonsterIcon29.png", "imgs/MonsterIcon30.png"]; // Eine Reihe von zufälligen Bildern für das Monster. length = 30 Von 0-29

// -- Initialisierung für viele/variable Anzahl an Monster --
let monsterArray: Monster[] = [];                                               // Das Haupt-Array wurde erstellt und initialisiert!
console.log(monsterArray); 







// ---------------------- Funktionen --------------------- //

// Generelle onload-funktion um Event-Listener zum Dokument hinzuzufügen
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonsters, false);
    document.getElementById("fightAllButton").addEventListener("click", fightAllMonsters, false);
    document.getElementById("fightWeakButton").addEventListener("click", fightAllWeakMonsters, false);
    document.getElementById("fightWeakestButton").addEventListener("click", fightWeakestMonster, false);
    updatePlayer(0);
    console.log("Seite & Event-listener wurden geladen");
}

// Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.
function generateMonsters() {
    if (playerMoney >= 10) {                                                    // Genug Geld?

        playerMoney -= 10;                                                      // Geld wird bezahlt
        updatePlayer(0);

        for (let i: number = getRNGNumber(3); i < 3; i++) {                     // Führt die generierung 1-3 mal durch

            let newMonsterType: string = generateMonsterType();                 // Eigens-gebaute Funktion, welche einen String zurück gibt.
            let newMonsterModifier: string[] = generateMonsterModifer();        // Eigens-gebaute Funktion, welche ein String-Array zurück gibt.
            let newMonsterName: string = generateMonsterName(newMonsterType);   // Eigens-gebaute Funktion, welche einen String zurück gibt. -> Nutzt den Mnster-Typ als Prefix
            let newMonsterHitPoints: number = generateMonsterHitPoints(newMonsterModifier); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
            let newMonsterXP: number = generateMonsterXP();                     // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
            let newMonsterMoney: number = generateMonsterMoney(newMonsterType, newMonsterModifier); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt. -> Nutzt den Monster-Typ und Monster-Mod für um manchen Monstern mehr/weniger Geld zu geben
            let newMonsterItem: string = generateMonsterItem();                 // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
            let newMonsterIcon: string = generateMonsterIcon();                 // Eigens-gebaute Funktion, welche einen String zurück gibt.
            let newMonsterLevel: number = generateMonsterLevel();               // 🗹 VARIABLE Nr.2 zugefügt  --> Eigens-gebaute Funktion, welche eine Nummer (0-10) zurück gibt.
            let newMonsterHealthpoints: number = generateMonsterHealthpoints(); 

            let newMonster: Monster = {                                         // Monster wird erstellt.
                monsterType: newMonsterType,
                monsterName: newMonsterName,
                monsterHitPoints: newMonsterHitPoints,
                monsterExperience: newMonsterXP,
                monsterModifier: newMonsterModifier,
                monsterMoney: newMonsterMoney,
                monsterItem: newMonsterItem,
                monsterIcon: newMonsterIcon,
                monsterLevel: newMonsterLevel,
                monsterHealthPoints: newMonsterHealthpoints
            };
            monsterArray.push(newMonster);                                      // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 
        }
        updateHTML();                                                           // Refresh HTML Funktion wird aufgerufen

    } else { // Nicht genug Geld!
        window.alert("Du hast nicht genug Geld!");
        givingUpButtonSwitch(true);     
    }
}







// ----------------- Funktionen die Monster-Atribute generieren ------------------- //

// Wird für den Monster-Typ aufgerufen.
// Liefert einen String zurück.
function generateMonsterType(): string                                          // Diese Funktion gibt einen Zufälligen Monster-Typ zurück
{
    return MonsterType[getRNGNumber(MonsterType.length)];
}

// Wird für die Erstellung der Monster-Modifizierer aufgerufen.
// Liefert ein Array mit zwei Einträgen zurück.
function generateMonsterModifer(): string[] 
{
    let tempMonsterMod: string[] = [];                                          // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)];  // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)];  // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod;                                                      // Gebe das hier zusammengesetzte Array wieder zurück.
}

// Diese Funktion gibt einen zusammengewürfelten Namen zurück.
// Liefert einen zusammengesetzten String zurück.                            
function generateMonsterName(Prefix: string): string                            // Der Funktion wird der Monster-Typ als Parameter mitgegeben, um diesen als Prefix zu benutzen>
{
    // Monster-Prefix
    let generatedMonsterName: string = Prefix + "-";                            // Der Name wird deklariert. Er beginnt mit dem Typ und einem Bindestrich

    // Monster-Mittelname
    let rngNumber = getRNGNumber(monsterName.length);                           // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber];                             // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag                                 

    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length);                                    // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber];                                  // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.

    return generatedMonsterName;
}

// Wird für die Monster-Hitpoints aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHitPoints(modCheck: string[]): number 
{
    let tempMonsterHP: number = 20 + getRNGNumber(11);                          

    // Einige Modifikationen bei bestimmentn Monster-Mods
    if ((modCheck[0] == "Stark") || (modCheck[1] == "Stark"))                  
    tempMonsterHP += 10;
    
    if ((modCheck[0] == "Schwach") || (modCheck[1] == "Schwach"))
    tempMonsterHP -= 10;
    
    if ((modCheck[0] == "Harmlos") || (modCheck[1] == "Harmlos"))
    tempMonsterHP = 0;

    return tempMonsterHP;
}

// Wird für die Erstellung der Monster-XP aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP(): number {
    return 200 + getRNGNumber(701);
}

// Wird für die Erstellung des Monster-Levels aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterLevel(): number {
   return getRNGNumber(11);
}

// Wird für die Erstellung des Monster-Moneys aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterMoney(typeCheck: string, modCheck: string[]): number {
    let tempMonsterMoney: number = 50 + getRNGNumber(51);                       

    // Einige Modifikationen bei bestimmentn Monster-Mods
    if ((modCheck[0] == "Pleite") || (modCheck[1] == "Pleite"))                
    tempMonsterMoney -= 50;
    
    if ((modCheck[0] == "Reich") || (modCheck[1] == "Reich")) 
    tempMonsterMoney += 50;
    
    return tempMonsterMoney;
}

// Wird für die Erstellung der Monster-Items aufgerufen
// Liefert einen String zurück.
function generateMonsterItem(): string {
    return items[getRNGNumber(items.length)];                                   
}

// Wird für die Erstellung der Monster-Icons aufgerufen
// Liefert einen String zurück.
function generateMonsterIcon(): string {
    return monsterIcons[getRNGNumber(monsterIcons.length)];                     
}

// Wird für die Erstellung der Monster-HealthPoints aufgerufen
// Liefert eine Number zurück.
function generateMonsterHealthpoints() : number
{
    return 20 + getRNGNumber(61);
}







// ----------------- Funktionen für das bekämpfen von Monstern ------------------- //

// Aufgerufen, wenn man auf den Button klickt.
// Der Spieler kämpft gegen das entsprechende Monster.
function fightMonster(index: number) 
{
    console.log("Kampf gegen Monster Nr: " +(index + 1));
    if (monsterArray[index].monsterLevel <= playerLevel)                        // 🗹 Änderung in dieser FUNKTION Nr.1
    { // Kampf gewonnen                                                         // 🗹 Änderung in dieser FUNKTION Nr.3
        monsterArray[index].monsterHealthPoints -= 20;                          // Monster nimmt -20HP Schaden
        if (monsterArray[index].monsterHealthPoints < 1)                        
        { //Das Monster stirbt
            updatePlayer(monsterArray[index].monsterExperience);                // 🗹 Änderung in dieser FUNKTION Nr.4 --> Spieler bekommt die MonsterXP zugerechnet
            playerMoney += monsterArray[index].monsterMoney;                    // Spieler bekommt das Geld des besiegten Monsters.
            playerItem = monsterArray[index].monsterItem;                       // Spieler tauscht sein Item gegen das des besiegten Monsters.
            console.log("Gewonnen: +" + monsterArray[index].monsterMoney + " $ , +" + monsterArray[index].monsterExperience + " XP , " + "Item: " + playerItem);
            monsterArray.splice(index, 1);                                      // Löscht das bekämpfte Monster aus dem monsterArray 
        }
        givingUpButtonSwitch(false);
    }
    else { //Kampf verloren                                                     // 🗹 Änderung in dieser FUNKTION Nr.2
        updatePlayer(0 - monsterArray[index].monsterExperience);                // 🗹 Änderung in dieser FUNKTION Nr.4 --> Spieler bekommt die MonsterXP abgezogen (negativer parameter)
        playerMoney -= 10;                                                      // Spieler verliert Geld
        playerHealthPoints -= monsterArray[index].monsterHitPoints;             // Spieler verliert HealthPoints in höhe der HitPoints des Monsters
        console.log("Verloren: -10$ ,  -"+monsterArray[index].monsterExperience+"XP , -"+monsterArray[index].monsterHitPoints+" HP");
    }
    updatePlayer(0);
    updateHTML();                                                              
}

// Bekämpft alle Monster
function fightAllMonsters()                                                     // 🗹 FUNKTION Nr.1 zugefügt
{
    for(let i:number=monsterArray.length-1; i >= 0; i--){
        fightMonster(i);
    }
}

// Bekäpft alle Monster deren Level <= dem Spieler-Level sind
function fightAllWeakMonsters()                                                 // 🗹 FUNKTION Nr.2 zugefügt
{
    for(let i:number=monsterArray.length-1; i >= 0; i--){
        if (monsterArray[i].monsterLevel <= playerLevel)
        fightMonster(i);
    }
}

// Bekämpft Monster mit dem geringsten Level 
function fightWeakestMonster()                                                  // 🗹 FUNKTION Nr.3 zugefügt
{
    let tempWeakestMonsterNr : number = 0;

    for(let i:number = 0; i < monsterArray.length; i++){
        if(monsterArray[i].monsterLevel < monsterArray[tempWeakestMonsterNr].monsterLevel)
        tempWeakestMonsterNr = i;
    }
    fightMonster(tempWeakestMonsterNr);
}







// ----------------- Funktionen die den Status des Spielers verändern ------------------- //

// Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
function updatePlayer(XPChange: number) // 🗹 Änderung in dieser FUNKTION Nr.1 --> Parameter gibt an um wie viel sich die XP des Spielers verändern sollen. Parameter kann positiv oder negativ sein          
{      
    if (playerXP + XPChange > 0)                                                // 🗹 Änderung in dieser FUNKTION Nr.2 --> XP werden geändert, falls sie nicht unter 0 fallen                                                
    playerXP += XPChange;
    else 
    playerXP = 0;
    
    playerLevel = Math.floor(playerXP / playerXPperLevel) + 1;                  // 🗹 Änderung in dieser FUNKTION Nr.4 --> Berechnung des neuen Spieler-Levels

    if (playerLevel == 20)                                                      // 🗹 Änderung in dieser FUNKTION Nr.3 --> Win-Condition
    winTheGame();
    
    if (playerHealthPoints < 1)                                                 // Lose-Condition
    loseTheGame();

    document.getElementById("xpCounter").innerHTML = "Player-Level: " + playerLevel + " (XP: " + playerXP + " / " + playerLevel * playerXPperLevel + ")"; 
    document.getElementById("playerHPCounter").innerHTML = "HP: " + playerHealthPoints;
    document.getElementById("moneyCounter").innerHTML = "Geld: " + playerMoney;
    document.getElementById("itemHolder").innerHTML = "Item: " + playerItem;
}

// Aufgerufen falls Win-Condition erfüllt sind
function winTheGame() 
{
    window.alert("!!!GLÜCKWUNSCH!!!\n!!!DU HAST GEWONNEN!!!\nDu hast dabei: " + playerMoney + "$ gesammelt!");

    if (playerMoney > highScore) {                                              // Falls ein neuer Highscore erreicht wurde
        highScore = playerMoney;                                                // Highscore entspricht dem gesammelten Geld
        document.getElementById("highscoreDisplay").innerHTML = "Highscore: " + highScore + " $"; 
    }

    playerXP = 0;                                                               // Variablen-Reset um eine neue Runde zu spielen
    playerLevel = 1;
    playerMoney = 200;
    playerItem = "Allmächtiges Schwert";
    playerHealthPoints = 100;
    monsterArray = [];
    givingUpButtonSwitch(false);
    updatePlayer(0);
    updateHTML()
}

// Aufgerufen falls Lose-Conditions erfüllt sind
function loseTheGame()                                                          // You just lost THE GAME btw.
{
    window.alert("Du bist leider gestorben.");

    playerXP = 0;                                                               // Variablen-Reset um eine neuer Runde zu spielen                              
    playerMoney = 200;
    playerItem = "Allmächtiges Schwert";
    playerHealthPoints = 100;
    monsterArray = [];
    givingUpButtonSwitch(false);
    updatePlayer(0);
    updateHTML();
}

//Tötet den Spieler
function killPlayer()  
{
    playerHealthPoints = 0;
    updatePlayer(0);
}







// ----------------- Funktionen für das HTML ------------------- //

// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden.
// Parameter gibt die Nummer des neuen Monsters an
function monsterGenerateHTML(monsterNr: number)                                 // Neuer Operator vom typ "number"
{
    let holdingDiv: HTMLElement = document.createElement("div");                // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + (monsterNr+1));                   // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster");                                // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv);             // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"

    let monsterName: HTMLElement = document.createElement("p");                 // Generiere einen <p>
    monsterName.innerHTML = monsterArray[monsterNr].monsterName;                // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName);                                        // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

    let monsterMod: HTMLElement = document.createElement("p");                  // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[monsterNr].monsterModifier[0] + " & " + monsterArray[monsterNr].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod);                                         // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

    //let monsterStats: HTMLElement = document.createElement("p");              // Generiere einen <p>
    //monsterStats.innerHTML = monsterArray[monsterCount - 1].monsterHitPoints + " HP | " + monsterArray[monsterCount - 1].monsterExperience + " XP | " + monsterArray[monsterCount - 1].monsterMoney + " $"; // Inhalt des <p>: Monster-Item des letzten Monsters im Array.
    //holdingDiv.appendChild(monsterStats);                                     // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

    let monsterItem: HTMLElement = document.createElement("p");                 // Generiere einen <p>
    monsterItem.innerHTML = "Mit " + monsterArray[monsterNr].monsterItem;       // Inhalt des <p>: Monster-Item des letzten Monsters im Array.
    holdingDiv.appendChild(monsterItem);                                        // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

    let monsterImg: HTMLElement = document.createElement("img");                // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", monsterArray[monsterNr].monsterIcon);        // Wurde geändert da man jetzt auf ein Bild aus dem monsterIcon-Array zugreift
    monsterImg.setAttribute("alt", "Schreckliches Monster");                    // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg);                                         // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)

    let monsterLvl: HTMLElement = document.createElement("p");                  // Generiere einen <p>
    monsterLvl.innerHTML = "Level: " + monsterArray[monsterNr].monsterLevel;    // Inhalt des <p>: Monster-Item des letzten Monsters im Array.
    holdingDiv.appendChild(monsterLvl);                                         // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

    let monsterHealthBar: HTMLElement = document.createElement("p");            // Generiere einen <p>
    holdingDiv.appendChild(monsterHealthBar);                                   // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    monsterHealthBar.style.backgroundColor = "green";                           // Füge Stylings zu dem Balken hinzu
    monsterHealthBar.style.fontSize = "0.9em";
    monsterHealthBar.style.textAlign = "left";
    monsterHealthBar.style.borderRadius = "5px";
    monsterHealthBar.style.margin = "0% 10% 0% 10%";
    monsterHealthBar.innerHTML = monsterArray[monsterNr].monsterHealthPoints+"";
    monsterHealthBar.style.width = monsterArray[monsterNr].monsterHealthPoints + "%"; // 🗹 OPTIONALES ZIEL Nr.3 --> Die Breite des Balkens entspricht den Healthpoints in %.
    
    let monsterBtn: HTMLElement = document.createElement("BUTTON");             // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!";                                // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn);                                         // Füge den Button zu dem holding-div hinzu.

    monsterBtn.addEventListener('click', function() {fightMonster(monsterNr);},false); // Wenn das Monster erstellt wird erhält die fightMonster-Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.                       
}

// Führt die Funktion monsterGenerateHTML() für jedes Monster im monsterArray aus
function monsterGenerateHTMLAll()                                               
{
    for (let i: number = 0; i < monsterArray.length; i++) {  
        monsterGenerateHTML(i);
    }
}

// Löscht alle Children von "monsterHoldingCell" aus dem HTML
function clearMonsterCell()                                                    
{
    let monsterAnzeige: HTMLElement = document.getElementById("monsterHoldingCell");
    let children: HTMLCollection = monsterAnzeige.children;
    let childCount: number = children.length;

    for (let i: number = 0; i < childCount; i++) {                              // Schleife die alle children in der monsterAnzeige abtastet
        if (monsterAnzeige.firstElementChild != null)                           // Nur ausführen falls schon die monster ANzeige schon children hat
            monsterAnzeige.removeChild(monsterAnzeige.firstElementChild);       // Lösche bei jedem durchgang das "firstChild"
    }
}

// Führt Funktionen clearMonsterCell() und dann monsterGenerateHTMLAll() aus
function updateHTML()                                                          
{
    clearMonsterCell();
    monsterGenerateHTMLAll();
    console.log("Anzahl der Monster: " + getMonsterCount());
}







// ----------------- Diverse weiter Funktionen ------------------- //

// Wird für den Zugriff auf eine zufällige Stelle in einem Array aufgerufen.
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber: number): number {
    return Math.floor(Math.random() * _maxNumber);
}

// Generiert oder Erstellt einen givingUpButton 
function givingUpButtonSwitch(OnOrOff: boolean) // Der Parameter gibt an ob der Button an- oder ausgeschaltet werden soll
{                               
    if (OnOrOff == true && givingUpButtonExists == false) {                     // Generiere den Button falls er nicht nicht existiert
        let givingUpButton: HTMLElement = document.createElement("BUTTON");     
        givingUpButton.setAttribute("id", "givingUpButton");                    
        givingUpButton.innerHTML = "Aufgeben?";                                 
        document.getElementById("buttonsDiv").appendChild(givingUpButton);      
        givingUpButton.addEventListener("click", killPlayer);                   // Gib <button> einen Event-Listener der eine Funktion ausführt die den Spieler tötet
        console.log("Selbstmord-Button erstellt");

        givingUpButtonExists = true;
    }

    if (OnOrOff == false && givingUpButtonExists == true) {                     // Lösche den Button falls er existiert
        givingUpButtonExists = false;
        document.getElementById("buttonsDiv").removeChild(document.getElementById("givingUpButton"));
    }
}

//Gibt die Anzahl an Monstern zurück
function getMonsterCount()                                                      
{
    return monsterArray.length;
}

// Pusht 2 neue Strings in das monsterModifers-Array
let drinksCounter: number = 1;
function getränkeVerteilen()                                                    
{
    console.log("Array vorher:");                                               // Konsolenausgabe vorher
    console.log(monsterModifers);
    monsterModifers.push("Hatte " + drinksCounter + " Kaffee");
    monsterModifers.push("Hatte " + drinksCounter + " Bier");
    console.log("Array danach:");                                               // Konsolenausgabe danach
    console.log(monsterModifers);

    drinksCounter++;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////