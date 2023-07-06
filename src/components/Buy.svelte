<script>
// @ts-nocheck

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
    <Card cardName="cellar" click={clickEve} />

        
    <button class="Merchant" on:click={clickEve}>
        <Card cardName= "merchant" />
    </button>
    <button class="Militia" on:click={clickEve}>
        <Card cardName= "militia" />
    </button>
    <button class="mine" on:click={clickEve}>
        <Card cardName= "mine" />
    </button>
    <button class="workshop" on:click={clickEve}>
        <Card cardName= "workshop" />
    </button>
</div>
<div class= "actionBottom">
    <button class="market" on:click={clickEve}>
        <Card cardName= "market" />
    </button>
    <button class="moat" on:click={clickEve}>
        <Card cardName= "moat" />
    </button>
    <button class="remodel" on:click={clickEve}>
        <Card cardName= "remodel" />
    </button>
    <button class="smithy" on:click={clickEve}>
        <Card cardName= "smithy" />
    </button>
    <button class="village" on:click={clickEve}>
        <Card cardName= "village" />
    </button>
</div>
<div class= "treasureAndVictory">
    <!-- treasure -->
    <button class="copper" on:click={clickEve}>
        <Card cardName= "copper" />
    </button>
    <button class="silver" on:click={clickEve}>
        <Card cardName= "silver" />
    </button>
    <button class="gold" on:click={clickEve}>
        <Card cardName= "gold" />
    </button>
    <!-- victory -->
    <button class="estate" on:click={clickEve}>
        <Card cardName= "estate" />
    </button>
    <button class="duchy" on:click={clickEve}>
        <Card cardName= "duchy" />
    </button>
    <button class="province" on:click={clickEve}>
        <Card cardName= "province" />
    </button>
</div>
<!-- <Card cardName= cards.cellar.image /> -->
<!-- {#each cards as card}
    <button>
        {card}.image
    </button>
{/each}     -->
<!-- <script>
    let items = ['Apple', 'Banana', 'Orange'];
  </script>
  
  <ul>
    {#each items as item}
      <li>{item}</li>
    {/each}
  </ul> -->