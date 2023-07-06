<script>
    import Card from "./Card.svelte"

    function getRandomElement(array) {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }
    
    
  </script>
  
  <button on:click={() => console.log(getRandomElement(['apple', 'banana', 'orange']))}>
    Draw
    <img src="/src/images/back.jpeg" alt="cards">
  </button>
  