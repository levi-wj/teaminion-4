import { drawCardsForCurrentPlayer } from "./model/game";

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
        image: "/src/images/cellar.jpg"
    },
    { // 7
        name: "Market",
        cost: 5,
        type: "action",
        quantity: 10,
        image: "/src/images/market.jpg"
    },
    { // 8
        name: "Merchant",
        cost: 3,
        type: "action",
        quantity: 10,
        image: "/src/images/merchant.jpg"
    },
    { // 9
        name: "Militia",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "/src/images/militia.jpg"
    },
    { // 10
        name: "Mine",
        cost: 5,
        type: "action",
        quantity: 10,
        image: "/src/images/mine.jpg",
    },
    { // 11
        name: "Moat",
        cost: 2,
        type: "action",
        quantity: 10,
        image: "/src/images/moat.jpg"
    },
    { // 12
        name: "Remodel",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "/src/images/remodel.jpg"
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
        image: "/src/images/village.jpg"
    },
    { // 15
        name: "Workshop",
        cost: 3,
        type: "action",
        quantity: 10,
        image: "/src/images/workshop.jpg"
    },
];

const getCardID = (cardName) => {
    return cardList.findIndex(card => card.name === cardName);
}

const copperID = getCardID('Copper');
const estateID = getCardID('Estate');
const smithyID = getCardID('Smithy')
// export const startingDeck = [
//      // Seven Coppers
//     copperID, copperID, copperID, copperID, copperID, copperID, copperID,
//     // Three Estates
//     estateID, estateID, estateID,
// ];

export const startingDeck = [
    // Seven Coppers
   smithyID, smithyID, smithyID, smithyID, smithyID, smithyID, smithyID,
   // Three Estates
   estateID, estateID, estateID,
];

export const getQuantities = () => {
    const quantities = [];

    cardList.forEach(card => {
        quantities.push(card.quantity);
    });

    return quantities;
}


// 작성해봦
// export스벨트(cardName)에 보내 -> 그럼 그게 크기 조정 및 변화를 줘서 ui로 보내줘