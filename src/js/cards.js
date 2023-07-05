export const cardList = {
    // Treasure cards
    copper: {
        name: "Copper",
        cost: 0,
        type: "treasure",
        value: 1,
        quantity: 60,
        image: "/src/images/copper.jpg"
    },
    silver: {
        name: "Silver",
        cost: 3,
        type: "treasure",
        value: 2,
        quantity: 40,
        image: "/src/images/silver.jpg"
    },
    gold: {
        name: "Gold",
        cost: 6,
        type: "treasure",
        value: 3,
        quantity: 30,
        image: "/src/images/gold.jpg"
    },

    // Victory cards
    estate: {
        name: "Estate",
        cost: 2,
        type: "victory",
        value: 1,
        quantity: 24,
        image: "/src/images/estate.jpg"
    },
    duchy: {
        name: "Duchy",
        cost: 5,
        type: "victory",
        value: 3,
        quantity: 12,
        image: "/src/images/duchy.jpg"
    },
    province: {
        name: "Province",
        cost: 8,
        type: "victory",
        value: 6,
        quantity: 12,
        image: "/src/images/province.jpg"
    },

    // Action cards
    cellar: {
        name: "Cellar",
        cost: 2,
        type: "action",
        quantity: 10,
        image: "/src/images/cellar.jpg"
    },
    market: {
        name: "Market",
        cost: 5,
        type: "action",
        quantity: 10,
        image: "/src/images/market.jpg"
    },
    merchant: {
        name: "Merchant",
        cost: 3,
        type: "action",
        quantity: 10,
        image: "/src/images/merchant.jpg"
    },
    militia: {
        name: "Militia",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "/src/images/militia.jpg"
    },
    mine: {
        name: "Mine",
        cost: 5,
        type: "action",
        quantity: 10,
        image: "/src/images/mine.jpg",
    },
    moat: {
        name: "Moat",
        cost: 2,
        type: "action",
        quantity: 10,
        image: "/src/images/moat.jpg"
    },
    remodel: {
        name: "Remodel",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "/src/images/remodel.jpg"
    },
    smithy: {
        name: "Smithy",
        cost: 4,
        type: "action",
        quantity: 10,
        image: "/src/images/smithy.jpg"
    },
    village: {
        name: "Village",
        cost: 3,
        type: "action",
        quantity: 10,
        image: "/src/images/village.jpg"
    },
    workshop: {
        name: "Workshop",
        cost: 3,
        type: "action",
        quantity: 10,
        image: "/src/images/workshop.jpg"
    },
}

export const getQuantities = () => {
    const quantities = {};
    Object.keys(cardList).forEach(card => {
        quantities[card] = cardList[card].quantity;
    });
    return quantities;
}
