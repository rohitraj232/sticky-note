function addSingleNote() {
    var noteValue = document.getElementById('sticky-note-input').value.trim();

    if (noteValue === '') {
        alert('Please enter a note.');
        return;
      }

    // Clear Input-Box
    document.getElementById('sticky-note-input').value = '';

    // new note 
    var newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.textContent = noteValue;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Note';
    deleteButton.classList.add('del-btn');
    deleteButton.onclick = function () {
      newNote.remove();
    };

    // Append button to note
    newNote.appendChild(deleteButton);

    // Add drag functionality
    addDragFunctionality(newNote);

    // add newNote to all-notes
    document.getElementById('all-notes').appendChild(newNote);
}

function addDragFunctionality(note) {
    let offsetX, offsetY;

    const move = (e) => {
        const parent = document.getElementById('all-notes'); 
        const parentRect = parent.getBoundingClientRect();
        const noteRect = note.getBoundingClientRect();

        // Calculate new position
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        // boundaries
        if (newLeft < parentRect.left) newLeft = parentRect.left;
        if (newTop < parentRect.top) newTop = parentRect.top;
        if (newLeft + noteRect.width > parentRect.right)
            newLeft = parentRect.right - noteRect.width;
        if (newTop + noteRect.height > parentRect.bottom)
            newTop = parentRect.bottom - noteRect.height;

        // Apply the new position
        note.style.position = 'absolute';
        note.style.left = `${newLeft - parentRect.left}px`;
        note.style.top = `${newTop - parentRect.top}px`;
    };

    note.addEventListener('mousedown', (e) => {
        offsetX = e.clientX - note.offsetLeft;
        offsetY = e.clientY - note.offsetTop;
        document.addEventListener('mousemove', move);
    });

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move);
    });
}

// Initialize existing notes if any
document.querySelectorAll('.note').forEach(addDragFunctionality);

