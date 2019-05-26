////////////////////TS-Aufgabe_01////////////////////
//Ich hoffe Alles ist verständlich und ich habe nicht zu viel rumgespielt.
//Ich wollte Alles mal ausprobieren.
//Es sollten jedoch alle Aufgaben erfüllt sein.                                                                     
////////////////////DEKLARATIONEN////////////////////
let AktuelleZahl = 0; //Zahl die aktuell Eingegeben wird                  // 🗹 Mindestanforderung Nr.10
let Zwischenspeicher = 0; //Speichert die erst eingegebene Zahl
let OperatorGeklickt = false; //Wurde ein Operator geklickt?                      // 🗹 Optionales Ziel Nr.3
let OperatorTyp = ""; //Welcher Operator wurde geklickt?
console.log("/////////////// Dieser Check kommt vor dem Laden ///////////////"); // 🗹 Mindestanforderung Nr.1                             
////////////////////Beim Laden die Event-Listener erzeugen////////////////////
window.onload = function () {
    console.log("/////////////// Dieser Check kommt nach dem Laden ///////////////");
    document.getElementById("Taste0").addEventListener("click", function () { ZifferTasteGeklickt(0); });
    document.getElementById("Taste1").addEventListener("click", function () { ZifferTasteGeklickt(1); });
    document.getElementById("Taste2").addEventListener("click", function () { ZifferTasteGeklickt(2); });
    document.getElementById("Taste3").addEventListener("click", function () { ZifferTasteGeklickt(3); });
    document.getElementById("Taste4").addEventListener("click", function () { ZifferTasteGeklickt(4); });
    document.getElementById("Taste5").addEventListener("click", function () { ZifferTasteGeklickt(5); });
    document.getElementById("Taste6").addEventListener("click", function () { ZifferTasteGeklickt(6); });
    document.getElementById("Taste7").addEventListener("click", function () { ZifferTasteGeklickt(7); });
    document.getElementById("Taste8").addEventListener("click", function () { ZifferTasteGeklickt(8); });
    document.getElementById("Taste9").addEventListener("click", function () { ZifferTasteGeklickt(9); });
    document.getElementById("Taste+").addEventListener("click", function () { OperatorTasteGeklickt("+"); });
    document.getElementById("Taste-").addEventListener("click", function () { OperatorTasteGeklickt("-"); });
    document.getElementById("Taste*").addEventListener("click", function () { OperatorTasteGeklickt("*"); });
    document.getElementById("Taste/").addEventListener("click", function () { OperatorTasteGeklickt("/"); });
    document.getElementById("ErgebnisTaste").addEventListener("click", ErgebnisTasteGedrückt);
    document.getElementById("ResetTaste").addEventListener("click", Reset);
    document.getElementById("GeradeZahlTaste").addEventListener("click", CheckGeradeZahl); // 🗹 Mindestanforderung Nr.4
    CreateNewButton(); // 🗹 Mindestanforderung Nr.3
};
////////////////////TASCHENRECHNER////////////////////
//Wenn eine Ziffer geklickt wird
function ZifferTasteGeklickt(Ziffer) {
    AktuelleZahl = AktuelleZahl * 10 + Ziffer; //Neue Ziffer an die richtige Dezimalstelle schreiben
    if (OperatorGeklickt == true) { //Ausgabe
        document.getElementById("Anzeige").innerHTML = Zwischenspeicher + " " + OperatorTyp + " " + AktuelleZahl;
    }
    else {
        document.getElementById("Anzeige").innerHTML = "" + AktuelleZahl;
    }
    console.log("/////////////// TASTE '" + Ziffer + "' GEDRÜCKT ///////////////"); //Kontrollausgaben
    console.log("AktuelleZahl: " + AktuelleZahl);
    console.log("");
}
//Wenn '+','-','*', oder '/' geklickt wird
function OperatorTasteGeklickt(GedrückterOperator) {
    if (OperatorGeklickt == false) { //Nur beim ersten Operator-Klick auführen
        OperatorGeklickt = true;
        Zwischenspeicher = AktuelleZahl; //Speichert die erste Eingabe
        AktuelleZahl = 0; //Reset AktuelleZahl für die zweite Eingabe
        OperatorTyp = GedrückterOperator; //Merke den gewählten OperatorTyp
        document.getElementById("Anzeige").innerHTML = Zwischenspeicher + " " + OperatorTyp; //Ausgabe
        console.log("/////////////// TASTE '" + OperatorTyp + "' GEDRÜCKT ///////////////");
        console.log("OperatorGeklicktt: " + OperatorGeklickt);
        console.log("OperatorTyp: '" + OperatorTyp + "'");
    }
    else {
        console.log("//////////////// OPERATOR WURDE BEREITS FESTGELEGT ///////////////");
    }
    console.log("");
}
//Wenn '=' geklickt wird
function ErgebnisTasteGedrückt() {
    console.log("/////////////// TASTE 'ERGEBNIS'GEDRÜCKT ///////////////");
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
    console.log("");
}
//Funktionen die simple Rechnungen durchführen
function Addition(x, y) { let z = x + y; return z; }
function Subtraktion(x, y) { let z = x - y; return z; }
function Multiplikation(x, y) { let z = x * y; return z; }
function Division(x, y) { let z = x / y; return z; }
//Gerade Zahlen Test
function CheckGeradeZahl() {
    if (AktuelleZahl != 0) {
        if (AktuelleZahl % 2 == 0) {
            document.getElementById("GeradeZahlTaste").innerHTML = "Die Zahl ist gerade";
        }
        else {
            document.getElementById("GeradeZahlTaste").innerHTML = "Die Zahl ist ungerade";
        }
        console.log("//////////////// ES WURDE GECHECKT OB ZAHL GERADE IST ///////////////");
    }
    else {
        console.log("//////////////// KEINE GÜLTIGE ZAHL AUF DER ANZEIGE ///////////////");
    }
    console.log("");
}
//Wenn 'RESET' geklickt wird
function Reset() {
    OperatorTyp = ""; //Reset alle Variablen + Anzeige
    AktuelleZahl = 0;
    Zwischenspeicher = 0;
    OperatorGeklickt = false;
    document.getElementById("Anzeige").innerHTML = "-----------------------------------";
    document.getElementById("GeradeZahlTaste").innerHTML = "Ist das eine Gerade Zahl?";
    console.log("/////////////// TASTE 'RESET' GEDRÜCKT ///////////////");
    console.log("OperatorGeklickt: " + OperatorGeklickt);
    console.log("OperatorTyp: '" + OperatorTyp + "'");
    console.log("ZwischenSpeicher: " + Zwischenspeicher);
    console.log("AktuelleZahl: " + AktuelleZahl);
    console.log("");
}
////////////////////ERSTELLT TESTRECHNUNGS-BUTTON MIT EVENT-LISTENER////////////////////
function CreateNewButton() {
    let ButtonCounter = 0; //Zählt wie oft der neue Button gedrückt wird
    let NeuesDiv = document.createElement("div"); //Erzeugt neues <div>                               // 🗹 Mindestanforderung Nr.9
    let NeuerButton = document.createElement("button"); //Erzeugt neuen <Button>
    document.body.appendChild(NeuesDiv); //Neues <div> ist child von <body>
    NeuesDiv.appendChild(NeuerButton); //Neuer <button> ist child von <div>
    NeuerButton.addEventListener("click", TestFunktion); //Gibt neuem Button einen Event-Listener
    NeuerButton.innerHTML = "Ich wurde über TypeSkript erstellt und wurde " + ButtonCounter + "-mal geklickt<br>" +
        "Wenn du mich klickst ändere ich meine Klasse und gib einige Ergebnisse in der Konsole aus";
    console.log("/////////////// Der Neue Button wurder erstellt ///////////////");
    console.log("");
    //Funktion für Testrechnungen und Klassenänderung
    function TestFunktion() {
        let Z1 = 1; //Einige Deklarationen
        let Z2 = 2;
        let Wort1 = "Das ist ein Satz. ";
        let Wort2 = "Das ist ein weiterer Satz. "; // 🗹 Mindestanforderung Nr.6
        Z1 = 5; //Neuer Wert für deklarierte Variable               // 🗹 Mindestanforderung Nr.7
        NeuerButton.className = "GeklickterButton"; //Ändert die Klasse                                 // 🗹 Mindestanforderung Nr.5
        ButtonCounter += 1;
        NeuerButton.innerHTML = "Ich wurde über TypeSkript erstellt und wurde " + ButtonCounter + "-mal geklickt<br>" +
            "Meine neue Klasse ist " + NeuerButton.className;
        console.log("/////////////// TESTRECHNUNGS ERGEBNISSE: ///////////////");
        console.log('Meine neue Klasse ist "' + NeuerButton.className + '"');
        console.log(Wort1 + Wort2); //string+string                         
        console.log(Wort1 + Z1); //string+number
        console.log(Z1 + Z2); //number+number                                     // 🗹 Mindestanforderung Nr.8
        console.log("");
    }
}
//# sourceMappingURL=script.js.map