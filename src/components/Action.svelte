<script>
    import DraggableIcon from './DraggableIcon.svelte';
  
    let dropped = false;
  
    function handleDragEnter(event) {
      event.preventDefault();
      event.target.classList.add('drag-over');
    }
  
    function handleDragLeave(event) {
      event.target.classList.remove('drag-over');
    }
  
    function handleDragOver(event) {
      event.preventDefault();
    }
  
    function handleDrop(event) {
      event.preventDefault();
      event.target.classList.remove('drag-over');
      dropped = true;
    }
  </script>
  
  <div
    class="container"
    class:dropped
    on:dragenter={handleDragEnter}
    on:dragleave={handleDragLeave}
    on:dragover={handleDragOver}
    on:drop={handleDrop}
  >
    <DraggableIcon />
    <img src="/src/images/cellar.jpg" alt="cellar">
  </div>
  
  <style>
    /* ... previous styles ... */
    .container.dropped {
      background-color: lightgray;
    }
  
    .container.drag-over {
      border-color: blue;
    }
  </style>
  