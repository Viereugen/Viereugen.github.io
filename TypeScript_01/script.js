//Ich hoffe Alles ist verständlich und ich habe nicht zu viel rumgespielt.
//Ich wollte alles mal ausprobieren.
//Es sollten jedoch alle Aufgaben erfüllt sein.
////////////////////DEKLARATIONEN////////////////////
let AktuelleZahl = 0; //Zahl die aktuell Eingegeben wird
let Zwischenspeicher = 0; //Speichert die erste eingegebene Zahl
let OperatorGeklickt = false; //Speichert ob Operator-Taste bereits gedrückt wurde
let OperatorTyp = ""; //Speichert welcher Operator geklickt wurde
console.log('Dieser Check kommt vor dem Laden');
////////////////////Beim Laden die Event-Listener erzeugen////////////////////
window.onload = function () {
    console.log('Dieser Check kommt nach dem Laden');
    console.log("");
    document.getElementById("Taste0").addEventListener("click", function () { ZifferTasteGedrückt(0); });
    document.getElementById("Taste1").addEventListener("click", function () { ZifferTasteGedrückt(1); });
    document.getElementById("Taste2").addEventListener("click", function () { ZifferTasteGedrückt(2); });
    document.getElementById("Taste3").addEventListener("click", function () { ZifferTasteGedrückt(3); });
    document.getElementById("Taste4").addEventListener("click", function () { ZifferTasteGedrückt(4); });
    document.getElementById("Taste5").addEventListener("click", function () { ZifferTasteGedrückt(5); });
    document.getElementById("Taste6").addEventListener("click", function () { ZifferTasteGedrückt(6); });
    document.getElementById("Taste7").addEventListener("click", function () { ZifferTasteGedrückt(7); });
    document.getElementById("Taste8").addEventListener("click", function () { ZifferTasteGedrückt(8); });
    document.getElementById("Taste9").addEventListener("click", function () { ZifferTasteGedrückt(9); });
    document.getElementById("Taste+").addEventListener("click", function () { OperatorTasteGedrückt("+"); });
    document.getElementById("Taste-").addEventListener("click", function () { OperatorTasteGedrückt("-"); });
    document.getElementById("Taste*").addEventListener("click", function () { OperatorTasteGedrückt("*"); });
    document.getElementById("Taste/").addEventListener("click", function () { OperatorTasteGedrückt("/"); });
    document.getElementById("ErgebnisTaste").addEventListener("click", ErgebnisTasteGedrückt);
    document.getElementById("ResetTaste").addEventListener("click", Reset);
    document.getElementById("GeradeZahlTaste").addEventListener("click", CheckGeradeZahl);
    CreateNewButton(); //Starte Funktion die Neue HTML Elemente erzeugt
};
////////////////////TASCHENRECHNER////////////////////
//Wenn eine Ziffer geklickt wird
function ZifferTasteGedrückt(A) {
    AktuelleZahl = AktuelleZahl * 10 + A; //Schreibt neue Ziffern an die richtige Dezimalstelle
    if (OperatorGeklickt == true) { //Ausgabe
        document.getElementById("Anzeige").innerHTML = Zwischenspeicher + " " + OperatorTyp + " " + AktuelleZahl;
    }
    else {
        document.getElementById("Anzeige").innerHTML = "" + AktuelleZahl;
    }
    console.log("///////////////TASTE " + A + " GEDRÜCKT///////////////"); //Kontrollausgaben
    console.log("Zwischenspeicher: " + Zwischenspeicher);
    console.log("AktuelleZahl: " + AktuelleZahl);
    console.log("Das steht in OperatorGedrückt: " + OperatorGeklickt);
    console.log("");
}
//Wenn +,-,*, oder / geklickt wird
function OperatorTasteGedrückt(GedrückterOperator) {
    if (OperatorGeklickt == false) { //Nur beim ersten Operator-Klick auführen
        OperatorGeklickt = true;
        Zwischenspeicher = AktuelleZahl; //Speicher die erste Eingabe
        AktuelleZahl = 0; //Resets die AktuelleZahl für die zweite Eingabe
        OperatorTyp = GedrückterOperator; //Merke den gewählten OperatorTyp
        document.getElementById("Anzeige").innerHTML = Zwischenspeicher + " " + OperatorTyp; //Ausgabe
        console.log("///////////////TASTE " + OperatorTyp + " GEDRÜCKT///////////////");
        console.log("Das steht in OperatorGedrückt: " + OperatorGeklickt);
        console.log("Das steht in OperatorTyp: " + OperatorTyp);
        console.log("Das steht in ZwischenSpeicher: " + Zwischenspeicher);
        console.log("Das steht in AktuelleZahl: " + AktuelleZahl);
        console.log("");
    }
    console.log("////////////////OPERATOR WURDE BEREITS FESTGELEGT///////////////");
    console.log("");
}
//Wenn "=" geklickt wird
function ErgebnisTasteGedrückt() {
    switch (OperatorTyp) {
        case "+":
            AktuelleZahl = Addition(Zwischenspeicher, AktuelleZahl);
            break;
        case "-":
            AktuelleZahl = Subtraktion(Zwischenspeicher, AktuelleZahl);
            break;
        case "*":
            AktuelleZahl = Multiplikation(Zwischenspeicher, AktuelleZahl);
            break;
        case "/":
            AktuelleZahl = Division(Zwischenspeicher, AktuelleZahl);
            break;
        default: console.log("NOCH KEINEN OPERATOR GEWÄHLT!");
    }
    OperatorGeklickt = false;
    OperatorTyp = "";
    Zwischenspeicher = 0;
    document.getElementById("Anzeige").innerHTML = "" + AktuelleZahl; //Ausgabe
    console.log("///////////////ERGEBNIS-TASTE GEDRÜCKT///////////////");
    console.log("Das steht in OperatorGedrückt: " + OperatorGeklickt);
    console.log("Das steht in AktuelleZahl: " + AktuelleZahl);
    console.log("");
}
//Wenn "CC" geklickt wird
function Reset() {
    OperatorTyp = ""; //Reset alle Variablen und die Taschenrechner-Anzeige
    AktuelleZahl = 0;
    Zwischenspeicher = 0;
    OperatorGeklickt = false;
    document.getElementById("Anzeige").innerHTML = '--------------------';
    console.log("///////////////TASTE RESET GEDRÜCKT///////////////");
    console.log("Das steht in OperatorGedrückt: " + OperatorGeklickt);
    console.log("Das steht in OperatorTyp: " + OperatorTyp);
    console.log("Das steht in ZwischenSpeicher: " + Zwischenspeicher);
    console.log("Das steht in AktuelleZahl: " + AktuelleZahl);
    console.log("");
}
//Funktionen die simple Rechnungen durchführen
function Addition(x, y) {
    let z = x + y;
    return z;
}
function Subtraktion(x, y) {
    let z = x - y;
    return z;
}
function Multiplikation(x, y) {
    let z = x * y;
    return z;
}
function Division(x, y) {
    let z = x / y;
    return z;
}
//Gerade Zahlen Test
function CheckGeradeZahl() {
    if (AktuelleZahl != 0) {
        if (AktuelleZahl % 2 == 0) {
            document.getElementById("GeradeZahlTaste").innerHTML = "Die Zahl ist gerade";
        }
        else {
            document.getElementById("GeradeZahlTaste").innerHTML = "Die Zahl ist ungerade";
        }
        console.log("////////////////ES WURDE GECHECKT OB ZAHL GERADE IST///////////////");
    }
    else {
        console.log("////////////////KEINE GÜLTIGE ZAHL AUF DER ANZEIGE///////////////");
    }
    console.log("");
}
////////////////////ERSTELLT TESTRECHNUNGS-BUTTON MIT EVENT-LISTENER////////////////////
function CreateNewButton() {
    let ButtonCounter = 0; //Zählt wie oft der neue Button gedrückt wird
    let NeuesDiv = document.createElement("div"); //Erzeugt neues <div>
    let NeuerButton = document.createElement("button"); //Erzeugt neuen <Button>
    document.body.appendChild(NeuesDiv); //Neues <div> ist child von <body>
    NeuesDiv.appendChild(NeuerButton); //Neuer <button> ist child von <div>
    NeuerButton.addEventListener("click", TestFunktion); //Gibt neuem Button einen Event-Listener
    NeuerButton.innerHTML = "Ich wurde über TypeSkript erstellt und wurde " + ButtonCounter + "-mal geklickt<br>Wenn du mich klickst ändere ich meine Klasse und gib die Ergebnisse einiger Rechnungen in der Konsole aus";
    console.log("///////////////Der Neue Button wurder erstellt///////////////");
    function TestFunktion() {
        let Z1 = 1; //Einige Deklarationen
        let Z2 = 2;
        let Wort1 = "Das ist ein Satz.";
        let Wort2 = "Das ist ein weiterer Satz.";
        NeuerButton.className = "GeklickterButton"; //Ändert die Klasse des neuen Buttons zu "GeklickterButton"
        ButtonCounter += 1;
        NeuerButton.innerHTML = "Ich wurde über TypeSkript erstellt und wurde " + ButtonCounter + "-mal geklickt<br>Meine neue Klasse ist " + NeuerButton.className;
        console.log("///////////////TESTRECHNUNGS ERGEBNISSE:///////////////");
        console.log("Meine neue Klasse ist \"" + NeuerButton.className + "\"");
        console.log(Wort1 + Wort2); //string+string
        console.log(Wort1 + Z1); //string+number
        console.log(Z1 + Z2); //number+number
        console.log("");
    }
}
//# sourceMappingURL=script.js.map