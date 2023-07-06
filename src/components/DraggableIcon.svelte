<script>
    let dragging = false;
  
    function handleDragStart(event) {
      dragging = true;
      event.dataTransfer.setData('text/plain', ''); // Required for Firefox
    }
  
    function handleDragEnd() {
      dragging = false;
    }
  </script>
  
  <svg
    class="icon"
    
    on:dragstart={handleDragStart}
    on:dragend={handleDragEnd}
  >
    <!-- Your icon SVG markup goes here -->
    <img src="/src/images/cellar.jpg" alt="cellar">
  </svg>
  
  <style>
    .icon {
      width: 24px;
      height: 24px;
      cursor: move;
    }
  </style>
  