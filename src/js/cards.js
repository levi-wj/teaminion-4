export const cardList = {
    // Treasure cards
    copper: {
        name: "Copper",
        cost: 0,
        type: "treasure",
        value: 1,
        quantity: 60,
        image: "copper.jpg"
    },
    silver: {
        name: "Silver",
        cost: 3,
        type: "treasure",
        value: 2,
        quantity: 40,
        image: "silver.jpg"
    },
    gold: {
        name: "Gold",
        cost: 6,
        type: "treasure",
        value: 3,
        quantity: 30,
        image: "gold.jpg"
    },

    // Victory cards
    estate: {
        name: "Estate",
        cost: 2,
        type: "victory",
        value: 1,
        quantity: 24,
        image: "estate.jpg"
    },
    duchy: {
        name: "Duchy",
        cost: 5,
        type: "victory",
        value: 3,
        quantity: 12,
        image: "duchy.jpg"
    },
    province: {
        name: "Province",
        cost: 8,
        type: "victory",
        value: 6,
        quantity: 12,
        image: "province.jpg"
    },

    // Action cards
    cellar: {
        name: "Cellar",
        cost: 2,
        type: "action",
        quantity: 10,
        image: "cellar.jpg"
    },
    market: {
        name: "Market",
        cost: 5,
        type: "action",
        quantity: 10,
        image: "market.jpg"
    },
    merchant: {
        name: "Merchant",
        cost: 3,
        type: "action",
        quantity: 10,
        image: "merchant.jpg"
    },
    militia: {
        name: "Militia",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "militia.jpg"
    },
    mine: {
        name: "Mine",
        cost: 5,
        type: "action",
        quantity: 10,
    },
    moat: {
        name: "Moat",
        cost: 2,
        type: "action",
        quantity: 10,
        image: "moat.jpg"
    },
    remodel: {
        name: "Remodel",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "remodel.jpg"
    },
    smithy: {
        name: "Smithy",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "smithy.jpg"
    },
    village: {
        name: "Village",
        cost: 3,
        type: "action",
        quantity: 10,
        image: "village.jpg"
    },
    workshop: {
        name: "Workshop",
        cost: 3,
        type: "action",
        quantity: 10,
        image: "workshop.jpg"
    },
}

export const getQuantities = () => {
    const quantities = {};
    Object.keys(cardList).forEach(card => {
        quantities[card] = cardList[card].quantity;
    });
    return quantities;
}