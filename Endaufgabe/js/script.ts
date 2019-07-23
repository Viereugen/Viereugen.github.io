
interface card {
    specialProperty: string;   
    cardValue: number;
    cardColor: string;    
}

let playerHandArray: card[] = [];
let compHandArray: card[] = [];
let deckArray: card[] = [];
let discardPileArray: card[] = [];

let playersTurn: boolean = true;
let showCompHand: boolean = false;

window.onload = function () {
    document.getElementById("rulesButton").addEventListener("click", turnOverlayOn, false);
    document.getElementById("overlay").addEventListener("click", turnOverlayOff, false);
    generateNewDeck();
    shuffleDeck();
    dealCards();
    updateHTML();
}




////////////////////////////////////////////////////////////////////////////////////////////////////

function generateNewDeck() {
    let newCardValue: number;            
    let newCardColor: string;
    let newSpecialProperty: string = "none";  


    for(let i:number=1; i<=9; i++){
        for(let j:number=0; j<4; j++){
            newCardValue=i;
            switch(j){
                case 0: newCardColor = "red"; break;
                case 1: newCardColor = "blue"; break;
                case 2: newCardColor = "yellow"; break;
                case 3: newCardColor = "green"; break;
            }
            let newCard: card = {                                         
                specialProperty: "none",
                cardValue: newCardValue,
                cardColor: newCardColor
            };
            deckArray.push(newCard);
        }                                  
    }

    for(let k:number=0; k<4; k++){
        switch(k){
            case 0: case 1: newSpecialProperty = "Plus 2"; break;
            case 2: case 3: newSpecialProperty = "Plus 4"; break;
        }
        let newCard: card = {                                         
            specialProperty: newSpecialProperty,
            cardValue: 10,
            cardColor: "all"
        };
        deckArray.push(newCard);
    }        
}

function shuffleDeck(){
    deckArray.sort(function(a, b){
        return 0.5 - Math.random()
    });
}

function dealCards(){

    for(let i:number=0; i<7; i++){
        compHandArray.push(deckArray[0]);
        deckArray.splice(0,1);
        playerHandArray.push(deckArray[0]);
        deckArray.splice(0,1);
    }

    discardPileArray.push(deckArray[0]);
    deckArray.splice(0,1);
}








//////////////////////////////////////////////////////////////////////////////////////////////////

function generatePlayerHandHTML(CardNr:number){
    let cardDiv: HTMLElement = document.createElement("div");              
    cardDiv.setAttribute("id", "playerCard" + (CardNr + 1));                  
    cardDiv.setAttribute("class", "card");    
    cardDiv.addEventListener('click', function () { playCard(CardNr, playersTurn); }, false); 
    document.getElementById("playerHand").appendChild(cardDiv);                        
   
    let tempCardValue: string = playerHandArray[CardNr].cardValue + "";
    switch(playerHandArray[CardNr].specialProperty){
        case "Plus 2": tempCardValue = "+2"; break;
        case "Plus 4": tempCardValue = "+4"; break;
    }

    let cardValueP1: HTMLElement = document.createElement("p");               
    cardValueP1.innerHTML = tempCardValue +""; 
    cardValueP1.setAttribute("class", playerHandArray[CardNr].cardColor);
    cardDiv.appendChild(cardValueP1);  

    let cardValueP2: HTMLElement = document.createElement("p");               
    cardValueP2.innerHTML = tempCardValue +""; 
    cardValueP2.setAttribute("class", playerHandArray[CardNr].cardColor);
    cardDiv.appendChild(cardValueP2);            
}
function generateCompHandHTML(CardNr:number){

    if(!showCompHand){
        let cardDiv: HTMLElement = document.createElement("div");              
        cardDiv.setAttribute("id", "compCard" + (CardNr + 1));                  
        cardDiv.setAttribute("class", "hiddenCard");     
        document.getElementById("compHand").appendChild(cardDiv);  

    }else{

        let tempCardValue: string = compHandArray[CardNr].cardValue + "";
        switch(compHandArray[CardNr].specialProperty){
            case "Plus 2": tempCardValue = "+2"; break;
            case "Plus 4": tempCardValue = "+4"; break;
        }
        let cardDiv: HTMLElement = document.createElement("div");              
        cardDiv.setAttribute("id", "compCard" + (CardNr + 1));                  
        cardDiv.setAttribute("class", "card");     
        document.getElementById("compHand").appendChild(cardDiv);    
        

        let cardValueP1: HTMLElement = document.createElement("p");               
        cardValueP1.innerHTML = tempCardValue +""; 
        cardValueP1.setAttribute("class", compHandArray[CardNr].cardColor);
        cardDiv.appendChild(cardValueP1);  

        let cardValueP2: HTMLElement = document.createElement("p");               
        cardValueP2.innerHTML = tempCardValue +""; 
        cardValueP2.setAttribute("class", compHandArray[CardNr].cardColor);
        cardDiv.appendChild(cardValueP2);   
    }
}
function generateDiscardPileHTML(CardNr:number){

    let tempCardValue: string = discardPileArray[CardNr].cardValue + "";
    switch(discardPileArray[CardNr].specialProperty){
        case "Plus 2": tempCardValue = "+2"; break;
        case "Plus 4": tempCardValue = "+4"; break;
    }

    let cardDiv: HTMLElement = document.createElement("div");              
    cardDiv.setAttribute("id", "discardPile" + (CardNr + 1));                  
    cardDiv.setAttribute("class", "card");     
    cardDiv.style.left = CardNr*5+230 + "px";
    cardDiv.style.transform = "rotate("+ (Math.random()*31 -20) +"deg)";
    document.getElementById("playArea").appendChild(cardDiv);    
    
    let cardValueP1: HTMLElement = document.createElement("p");               
    cardValueP1.innerHTML = tempCardValue +""; 
    cardValueP1.setAttribute("class", discardPileArray[CardNr].cardColor);
    cardDiv.appendChild(cardValueP1);  

    let cardValueP2: HTMLElement = document.createElement("p");               
    cardValueP2.innerHTML = tempCardValue +""; 
    cardValueP2.setAttribute("class", discardPileArray[CardNr].cardColor);
    cardDiv.appendChild(cardValueP2);   
}
function generateDeckHTML(){
    let cardDiv: HTMLElement = document.createElement("div");              
    cardDiv.setAttribute("id", "topDeckCard");                  
    cardDiv.setAttribute("class", "hiddenCard");     
    cardDiv.addEventListener('click', function () { drawCard(playersTurn); }, false); 
    document.getElementById("deckArea").appendChild(cardDiv);                        
}

function generateAllHTML() {
    for (let i: number = 0; i < compHandArray.length; i++) {
        generateCompHandHTML(i);
    }
    for (let j: number = 0; j < playerHandArray.length; j++) {
        generatePlayerHandHTML(j);
    }
    for (let k: number = 0; k < discardPileArray.length; k++) {
        generateDiscardPileHTML(k);
    }
    generateDeckHTML();
}

function clearAllHTML() {
    let divToEmpty: HTMLElement = document.getElementById("playerHand");
    let children: HTMLCollection = divToEmpty.children;
    let childCount: number = children.length;
    for (let i: number = 0; i < childCount; i++) {                           
        if (divToEmpty.firstElementChild != null)                          
        divToEmpty.removeChild(divToEmpty.firstElementChild);       
    }

    divToEmpty = document.getElementById("compHand");
    children = divToEmpty.children;
    childCount = children.length;
    for (let i: number = 0; i < childCount; i++) {                           
        if (divToEmpty.firstElementChild != null)                          
        divToEmpty.removeChild(divToEmpty.firstElementChild);       
    }

    divToEmpty = document.getElementById("deckArea");
    children = divToEmpty.children;
    childCount = children.length;
    for (let i: number = 0; i < childCount; i++) {                           
        if (divToEmpty.firstElementChild != null)                          
        divToEmpty.removeChild(divToEmpty.firstElementChild);       
    }

    divToEmpty = document.getElementById("playArea");
    children = divToEmpty.children;
    childCount = children.length;
    for (let i: number = 0; i < childCount; i++) {                           
        if (divToEmpty.firstElementChild != null)                          
        divToEmpty.removeChild(divToEmpty.firstElementChild);       
    }
}

function updateHTML(){
    clearAllHTML();
    generateAllHTML();
}

/////////////////////////////////////////////////////////////////////////////////////////////

function playCard (playedCardNr:number, tempPlayersTurn:boolean){

    if (tempPlayersTurn==true){

        if ((playerHandArray[playedCardNr].cardValue==discardPileArray[discardPileArray.length-1].cardValue) ||
            (playerHandArray[playedCardNr].cardColor==discardPileArray[discardPileArray.length-1].cardColor) ||
            (discardPileArray[discardPileArray.length-1].specialProperty!= "none")||
            (playerHandArray[playedCardNr].specialProperty!= "none")){

            useSpecialProperty(playerHandArray[playedCardNr],playersTurn);

            discardPileArray.push(playerHandArray[playedCardNr]);
            playerHandArray.splice(playedCardNr,1);

            updateHTML();
            if (playerHandArray.length<1){endGame(true);}
            else{setTimeout(computersTurn,500);}
        }
    }

    else{
        if ((compHandArray[playedCardNr].cardValue==discardPileArray[discardPileArray.length-1].cardValue) ||
            (compHandArray[playedCardNr].cardColor==discardPileArray[discardPileArray.length-1].cardColor) ||
            (discardPileArray[discardPileArray.length-1].specialProperty != "none")||
            (compHandArray[playedCardNr].specialProperty!= "none")){

            useSpecialProperty(compHandArray[playedCardNr],playersTurn);


            discardPileArray.push(compHandArray[playedCardNr]);
            compHandArray.splice(playedCardNr,1);

            updateHTML();
            if (compHandArray.length<1){endGame(false);}
            playersTurn=true;
        }
    }
    
}

function drawCard(tempPlayersTurn: boolean){
    if(deckArray.length<1){
        refillDeck();
        updateHTML();
    }

    if (tempPlayersTurn==true){
        playerHandArray.push(deckArray[0]);
        deckArray.splice(0,1);
        setTimeout(computersTurn,500);
    }else{
        compHandArray.push(deckArray[0]);
        deckArray.splice(0,1);
        playersTurn=true;
    }
    
    updateHTML();
}

function computersTurn(){
    playersTurn = false;
    for(let i:number=0; (i<compHandArray.length) && (playersTurn==false); i++){
        playCard(i,playersTurn);
    }
    if(playersTurn==false)
        drawCard(playersTurn);

    playersTurn=true;
}

function endGame(wonTheGame:boolean){
    if(wonTheGame){
        alert("!!!!! GLÜCKWUNSCH !!!!!\n!!!!! DU HAST GEWONNEN !!!!!\n\nNochmal spielen?")
    }else{
        alert("Du hst leider verloren.\n\nNochmal spielen?")
    }

    while(compHandArray.length>0) {compHandArray.pop();}
    while(playerHandArray.length>0) {playerHandArray.pop();}
    while(deckArray.length>0) {deckArray.pop();}
    while(discardPileArray.length>0) {discardPileArray.pop();}
    playersTurn = true;
    generateNewDeck();
    shuffleDeck();
    dealCards();
    updateHTML();
}

function refillDeck(){
    let topCard:card = discardPileArray[discardPileArray.length-1];

    while(discardPileArray.length>0){
        deckArray.push(discardPileArray[discardPileArray.length-1])
        discardPileArray.pop();
    }
    discardPileArray.push(topCard);
    shuffleDeck();
}

function useSpecialProperty(tempCard:card, tempPlayersTurn:boolean){
    if(tempPlayersTurn){        
        switch(tempCard.specialProperty){
            case "Plus 2":
                for(let i:number=0; i<2; i++){
                compHandArray.push(deckArray[0]);
                deckArray.splice(0,1);
                }
            break;
            case "Plus 4":
                for(let i:number=0; i<4; i++){
                    compHandArray.push(deckArray[0]);
                    deckArray.splice(0,1);
                    if(deckArray.length<1)refillDeck();
                }
            break;
        }
    }else{
        switch(tempCard.specialProperty){
            case "Plus 2":
                for(let i:number=0; i<2; i++){
                playerHandArray.push(deckArray[0]);
                deckArray.splice(0,1);
                }
            break;
            case "Plus 4":
                for(let i:number=0; i<4; i++){
                    playerHandArray.push(deckArray[0]);
                    deckArray.splice(0,1);
                }
            break;
        }
    }
    updateHTML();
}



function flipCompHand(){
    showCompHand = !showCompHand;
    updateHTML();
}

function turnOverlayOn(){
    document.getElementById("overlay").style.display = "block";
}
function turnOverlayOff(){
    document.getElementById("overlay").style.display = "none";
}
