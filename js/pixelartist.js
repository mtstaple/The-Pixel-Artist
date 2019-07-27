const sizePicker = document.getElementById('size-picker');
const canvas = document.getElementById('pixel-canvas');
const draw = document.getElementById('pencil');
const erase = document.getElementById('eraser');
const fill = document.getElementById('fill');
const clearGrid = document.getElementById('reset');


function makeGrid() {
  let gridHeight = document.getElementById('input-height').value;
  let gridWidth = document.getElementById('input-width').value;
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
    }
  // Creates rows and cells
  for (let i = 1; i <= gridHeight; i++) {
    let gridRow = document.createElement('tr');
    canvas.appendChild(gridRow);
    for (let j = 1; j <= gridWidth; j++) {
      let gridCell = document.createElement('td');
      gridRow.appendChild(gridCell);
      // Fills cells on mousedown hold, not click
      gridCell.addEventListener('mousedown', function() {
        const color = document.getElementById('color-picker').value;
        this.style.backgroundColor = color;
        $('.form-control').css("background-color", color);
     });
   }
 }
}

makeGrid()

// This event creates a new grid and clears any existing grid on submit
sizePicker.addEventListener('submit', function(e) {
  e.preventDefault();
  makeGrid();
});

// Clears or resets canvas to blank slate
clearGrid.addEventListener('click', function() {
  makeGrid();
});

// Double click on cell to remove color without changing to erase tool
canvas.addEventListener('dblclick', e => {
  e.target.style.backgroundColor = null;
});


// Get the div container element
const artTools = document.getElementById('art-tools');

// Get all tools with class="canvas-tools" inside the div container
const tools = artTools.getElementsByClassName('canvas-tools');

// Loop through the art-tools and add the active class to the current/clicked tool
for (let i = 0; i < tools.length; i++) {
  tools[i].addEventListener('click', function() {
    let current = document.getElementsByClassName('active');

      // If there's no active class
      if (current.length > 0) {
        current[0].className = current[0].className.replace(' active', '');
      }

      // Add the active class to the current/clicked tool
      this.className += ' active';
  });
}


// Allows filling multiple cells by dragging
let down = false;   // Mousedown tracking

// Detects mousedown and mouseup on canvas
canvas.addEventListener('mousedown', function(e) {
	down = true;
	canvas.addEventListener('mouseup', function() {
		down = false;
	});

  // Disables drawing when mouse exits the canvas border
  canvas.addEventListener('mouseleave', function() {
    down = false;
  });

  canvas.addEventListener('mouseover', function(e) {
    // Defines color within function to check if color changed
    const color = document.getElementById('color-picker').value;
    // When mousedown on canvas, cells are colored
  	if (down) {
      // Fixes filling of entire canvas
      if (e.target.tagName === 'TD') {
      	e.target.style.backgroundColor = color;
      }
    }
  });
});


// Paint bucket fill tool to color entire canvas
fill.addEventListener('click', function(e) {
  e.preventDefault();
  const color = document.getElementById('color-picker').value;
  canvas.querySelectorAll('td').forEach(td => td.style.backgroundColor = color);
});


// Allows for drag and single-cell erasing upon clicking 'erase' button
erase.addEventListener('click', function() {
  // Erase while dragging, not single click
  canvas.addEventListener('mousedown', function(e) {
  	down = true;
  	canvas.addEventListener('mouseup', function() {
  		down = false;
  	});
    // Stops erasing when mouse leaves canvas
    canvas.addEventListener('mouseleave', function() {
      down = false;
    });
    canvas.addEventListener('mouseover', function(e) {
      // When mousedown on canvas, cells are erased
    	if (down) {
        // Fixes erasing of entire canvas
        if (e.target.tagName === 'TD') {
        	e.target.style.backgroundColor = null;
        }
      }
    });
  });
    // Single cell erasing
    canvas.addEventListener('mousedown', function(e) {
      e.target.style.backgroundColor = null;
  });
});


// Return to drawing / coloring
draw.addEventListener('click', function() {
  canvas.addEventListener('mousedown', function(e) {
  	down = true;
  	canvas.addEventListener('mouseup', function() {
  		down = false;
  	});
    // Stops cells from being colored when mouse leaves canvas
    canvas.addEventListener('mouseleave', function() {
      down = false;
    });
    canvas.addEventListener('mouseover', function(e) {
      const color = document.getElementById('color-picker').value;
      // When mousedown on canvas, cells are colored
    	if (down) {
        // Fixes coloring of entire canvas
        if (e.target.tagName === 'TD') {
        	e.target.style.backgroundColor = color;
        }
      }
    });
  });
    // Single cell coloring
    canvas.addEventListener('mousedown', function(e) {
      if (e.target.tagName !== 'TD') return;
      const color = document.getElementById('color-picker').value;
      e.target.style.backgroundColor = color;
  });
});
