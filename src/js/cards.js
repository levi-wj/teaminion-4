import { drawCardsForCurrentPlayer, addAction, addBuy, addMoney, getWhichTurnPlayer, merchantSkill, discardCards, pushPlayerDataToDB } from "./model/game";
import PickerWindow from '../components/PickerWindow.svelte';

export const cardList = [
    // Treasure cards
    {
        name: "Copper",
        cost: 0,
        type: "treasure",
        value: 1,
        quantity: 60,
        image: "/src/images/copper.jpg"
    },
    {
        name: "Silver",
        cost: 3,
        type: "treasure",
        value: 2,
        quantity: 40,
        image: "/src/images/silver.jpg"
    },
    {
        name: "Gold",
        cost: 6,
        type: "treasure",
        value: 3,
        quantity: 30,
        image: "/src/images/gold.jpg"
    },

    // Victory cards
    {
        name: "Estate",
        cost: 2,
        type: "victory",
        value: 1,
        quantity: 24,
        image: "/src/images/estate.jpg"
    },
    {
        name: "Duchy",
        cost: 5,
        type: "victory",
        value: 3,
        quantity: 12,
        image: "/src/images/duchy.jpg"
    },
    {
        name: "Province",
        cost: 8,
        type: "victory",
        value: 6,
        quantity: 12,
        image: "/src/images/province.jpg"
    },

    // Action cards
    { // 6
        name: "Cellar",
        cost: 2,
        type: "action",
        quantity: 10,
        image: "/src/images/cellar.jpg",
        action: () => {
            const playerData = getWhichTurnPlayer();

            //action +1
            addAction();

            function discardAndDraw(discardedCards) {
                // Discard all selected cards
                discardCards(discardedCards);

                // Draw as many cards as we discarded
                drawCardsForCurrentPlayer(discardedCards.length);

                // Update DB with new player data
                pushPlayerDataToDB();
            }

            // Create a window to pick cards to discard
            new PickerWindow({
                // Create the window as a child of the root <html> element
                target: document.documentElement,
                props: {
                    windowTitle: 'Discard any number of cards',
                    cardsToShow: playerData.hand,
                    // This function will get called when all the cards have been picked
                    finishPickingEvent: discardAndDraw,
                }
            });
        },
    },
    { // 7
        name: "Market",
        cost: 5,
        type: "action",
        quantity: 10,
        image: "/src/images/market.jpg",
        action: () => {
            //card +1
            drawCardsForCurrentPlayer(1);
            //action +1
            addAction();
            // buy+1
            addBuy();
            // money+1
            addMoney();
        },
    },
    { // 8
        name: "Merchant",
        cost: 3,
        type: "action",
        quantity: 10,
        image: "/src/images/merchant.jpg",
        action: () => {
            // card +1
            drawCardsForCurrentPlayer(1)
            // action +1 
            addAction();
            // option: the first time you play a silver this turn money+=1
            merchantSkill();
        }
    },
    { // 9
        name: "Militia",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "/src/images/militia.jpg",
        action: () => {
            // money +2
            for(let i = 0; i < 2; i++){
                addMoney();
            }
            
            // other players' cards discards down to 3 cards in hand
        }
    },
    { // 10
        name: "Mine",
        cost: 5,
        type: "action",
        quantity: 10,
        image: "/src/images/mine.jpg",
        action: () => {
            // trash a treasure card
            // copper -> silver
            // silver -> gold
        }
    },
    { // 11
        name: "Moat",
        cost: 2,
        type: "action",
        quantity: 10,
        image: "/src/images/moat.jpg",
        action: () => {
            // card +2
            drawCardsForCurrentPlayer(2)
            // shield from other players' attack
        }
    },
    { // 12
        name: "Remodel",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "/src/images/remodel.jpg",
        action: () => {
            //trash 'A' card
            // gain a card(up to 'A'cost +2)
        }
    },
    { // 13
        name: "Smithy",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "/src/images/smithy.jpg",
        action: () => {
            drawCardsForCurrentPlayer(3)
        },
    },
    { // 14
        name: "Village",
        cost: 3,
        type: "action",
        quantity: 10,
        image: "/src/images/village.jpg",
        action: () => {
            // card + 1
            drawCardsForCurrentPlayer(1)
            // action + 2
            for (let i = 0; i< 2; i++){
                addAction();
            }
        }
    },
    { // 15
        name: "Workshop",
        cost: 3,
        type: "action",
        quantity: 10,
        image: "/src/images/workshop.jpg",
        action: () => {
            //get card up to 4costs (x buy)
        }
    },
];

export const getCardID = (cardName) => {
    return cardList.findIndex(card => card.name === cardName);
}

const copperID = getCardID('Copper');
const estateID = getCardID('Estate');
const smithyID = getCardID('Smithy');
const marketID = getCardID('Market');
const silverID = getCardID('Silver');
const merchantID = getCardID('Merchant');
const cellarID = getCardID('Cellar');

export const startingDeck = [
     // Seven Coppers
    copperID, copperID, copperID, copperID, copperID, copperID, copperID,
    // Three Estates
    estateID, estateID, estateID,
];

// export const startingDeck = [
//     // Seven Coppers
//    cellarID, cellarID, cellarID, cellarID, cellarID, cellarID, copperID,
//    // Three Estates
//    estateID, estateID, estateID,
// ];

export const getQuantities = () => {
    const quantities = [];

    cardList.forEach(card => {
        quantities.push(card.quantity);
    });

    return quantities;
}