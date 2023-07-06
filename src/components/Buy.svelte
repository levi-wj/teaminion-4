<script>
    import { getQuantities, cardList } from "../js/cards";
    import Card from "./Card.svelte"
    
    let cards = [];
    cards = cardList;
    function clickEve(event) {
        // let btnName = event.target.class;
        const btnName = event.target.classList.value;
        console.log("the button is ", btnName);
    }
</script>


<div class= "actionTop">
    <Card cardName="cellar" click={clickEve} />
    <Card cardName="merchant" click={clickEve} />
    <Card cardName="militia" click={clickEve} />
    <Card cardName="mine" click={clickEve} />
    <Card cardName="workshop" click={clickEve} />    
</div>
<div class= "actionBottom">
    <Card cardName="market" click={clickEve} />
    <Card cardName="moat" click={clickEve} />
    <Card cardName="remodel" click={clickEve} />
    <Card cardName="smithy" click={clickEve} />
    <Card cardName="village" click={clickEve} />
</div>
<div class= "treasureAndVictory">
    <!-- treasure -->
    <Card cardName="copper" click={clickEve} />
    <Card cardName="silver" click={clickEve} />
    <Card cardName="gold" click={clickEve} />
    <!-- victory -->
    <Card cardName="estate" click={clickEve} />
    <Card cardName="duchy" click={clickEve} />
    <Card cardName="province" click={clickEve} />
</div>