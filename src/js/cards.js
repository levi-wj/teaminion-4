import { drawCardsForCurrentPlayer, addAction, addBuy, addMoney, getWhichTurnPlayer, merchantSkill, discardCards, pushPlayerDataToDB, trashCards, gainCard, doActionOnOtherPlayers, getLocalPlayer, playerHasCardInHand, getFilteredCardListByValue, getCardsLeft, pushGameDataToDB } from "./model/game";
import PickerWindow from '../components/PickerWindow.svelte';
import { playerID } from "./firebase";

export const cardList = [
    // Treasure cards
    {
        name: "Copper",
        cost: 0,
        type: "treasure",
        value: 1,
        quantity: 60,
        image: "/src/images/copper.webp"
    },
    {
        name: "Silver",
        cost: 3,
        type: "treasure",
        value: 2,
        quantity: 40,
        image: "/src/images/silver.webp"
    },
    {
        name: "Gold",
        cost: 6,
        type: "treasure",
        value: 3,
        quantity: 30,
        image: "/src/images/gold.webp"
    },

    // Victory cards
    {
        name: "Estate",
        cost: 2,
        type: "victory",
        value: 1,
        quantity: 24,
        image: "/src/images/estate.webp"
    },
    {
        name: "Duchy",
        cost: 5,
        type: "victory",
        value: 3,
        quantity: 12,
        image: "/src/images/duchy.webp"
    },
    {
        name: "Province",
        cost: 8,
        type: "victory",
        value: 6,
        quantity: 12,
        image: "/src/images/province.webp"
    },

    // Action cards
    { // 6
        name: "Cellar",
        cost: 2,
        type: "action",
        quantity: 10,
        image: "/src/images/cellar.webp",
        action: () => {
            const playerData = getWhichTurnPlayer();

            //action +1
            addAction();

            function discardAndDraw(discardedCards) {
                // Discard all selected cards
                discardCards(playerID, discardedCards);

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
        image: "/src/images/market.webp",
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
        image: "/src/images/merchant.webp",
        action: () => {
            // card +1
            drawCardsForCurrentPlayer(1)
            // action +1 
            addAction();
            // option: the first time you play a silver this turn money+=1
        },
        afterActionPhase: () => {
            // console.log("you made it dad!")
            // why, justyn, why （；へ：）
            merchantSkill();
        }
    },
    { // 9
        name: "Militia",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "/src/images/militia.webp",
        action: () => {
            // money +2
            for(let i = 0; i < 2; i++){
                addMoney();
            }
            pushPlayerDataToDB();
        },
        otherPlayersAction: () => {
            let player = getLocalPlayer();
            const discardCount = Math.abs(3 - player.hand.length);

            function discardAndUpdate(pickedCards) {
                let newHand = discardCards(playerID, pickedCards);
                pushPlayerDataToDB(playerID, { hand: newHand });
            }

            if (!playerHasCardInHand(player, getCardID('Moat'))) {
                if (discardCount > 0) {
                    new PickerWindow({
                        // Create the window as a child of the root <html> element
                        target: document.documentElement,
                        props: {
                            windowTitle: 'Discard down to 3 cards in hand',
                            cardsToShow: player.hand,
                            // This function will get called when all the cards have been picked
                            finishPickingEvent: discardAndUpdate,
                            howManyCardsToPick: discardCount,
                            mandatory: true,
                        }
                    });
                }
            } else {
                // Show the user that they were protected by a Moat
            }
        }
    },
    { // 10
        name: "Mine",
        cost: 5,
        type: "action",
        quantity: 10,
        image: "/src/images/mine.webp",
        action: () => {
            // trash a treasure card
            // copper -> silver
            // silver -> gold
            const playerData = getWhichTurnPlayer();
            function trashAndUpgrade(list) {
                if (list.length > 0) {
                    const trashCard = list[0].cardID;
                    trashCards(list);
                    if (trashCard === getCardID("Copper")) {
                        gainCard(getCardID("Silver"));
                    } else if (trashCard === getCardID("Silver")) {
                        gainCard(getCardID("Gold"));
                    }
                    pushPlayerDataToDB();
                }
            }
            new PickerWindow({
                // Create the window as a child of the root <html> element
                target: document.documentElement,
                props: {
                    windowTitle: 'Pick a treasure to upgrade',
                    cardsToShow: playerData.hand.filter(cardID => {
                        const cardData = cardList[cardID];
                        return (cardData.type == "treasure" && cardData.value !== 3)
                    }),
                    // This function will get called when all the cards have been picked
                    finishPickingEvent: trashAndUpgrade,
                    howManyCardsToPick: 1,
                }
            });
        }
    },
    { // 11
        name: "Moat",
        cost: 2,
        type: "action",
        quantity: 10,
        image: "/src/images/moat.webp",
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
        image: "/src/images/remodel.webp",
        action: () => {
            //trash 'A' card
            // gain a card(up to 'A'cost +2)
            const playerData = getWhichTurnPlayer();

            function trashAndGain(list) {
                if (list.length > 0) {
                    // Trash the card
                    const trashCard = list[0].cardID;
                    trashCards(list);

                    // Show the user a window to pick a card to gain
                    new PickerWindow({
                        target: document.documentElement,
                        props: {
                            windowTitle: 'Pick a card to gain',
                            // Filter the cards down to the ones that cost less than the card we trashed + 2
                            cardsToShow: getFilteredCardListByValue(cardList[trashCard].cost + 2),
                            finishPickingEvent: (list) => {
                                gainCard(list[0].cardID);
                                pushPlayerDataToDB();
                            },
                            howManyCardsToPick: 1,
                            mandatory: true,
                        }
                    });
                }
            }

            new PickerWindow({
                target: document.documentElement,
                props: {
                    windowTitle: 'Pick a card to trash',
                    cardsToShow: playerData.hand,
                    finishPickingEvent: trashAndGain,
                    howManyCardsToPick: 1,
                }
            });
        }
    },
    { // 13
        name: "Smithy",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "/src/images/smithy.webp",
        action: () => {
            drawCardsForCurrentPlayer(3)
        },
    },
    { // 14
        name: "Village",
        cost: 3,
        type: "action",
        quantity: 10,
        image: "/src/images/village.webp",
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
        image: "/src/images/workshop.webp",
        action: () => {
            // get card up to 4costs (x buy)
            new PickerWindow({
                // Create the window as a child of the root <html> element
                target: document.documentElement,
                props: {
                    windowTitle: 'Chose one card',
                    cardsToShow: getFilteredCardListByValue(4),
                    finishPickingEvent: (pickedCards) => {
                        pickedCards.forEach(card => {
                            gainCard(card.cardID);
                        });
                        pushPlayerDataToDB();
                    },
                    howManyCardsToPick: 1,
                    mandatory: true,
                }
            });
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
const mineID = getCardID('Mine');
const militiaID = getCardID('Militia');
const workshopID = getCardID('Workshop');
const remodelID = getCardID('Remodel');


export const startingDeck = [
    // Seven Coppers
    remodelID, remodelID, remodelID, remodelID, remodelID, remodelID, remodelID,
    // Three Estates
    cellarID, cellarID, cellarID,
];

// export const startingDeck = [
//     // Seven Coppers
//    copperID, copperID, copperID, copperID, copperID, copperID, copperID,
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