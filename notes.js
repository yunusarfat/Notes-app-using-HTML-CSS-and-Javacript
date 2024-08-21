const notescontain = document.querySelector(".notes-contain");
const createbtn = document.querySelector(".btn");

// Load and show notes from localStorage
function shownotes() {
  notescontain.innerHTML = localStorage.getItem("notes") || "";
  setUpNoteEvents();
}

// Save notes to localStorage
function updatestorage() {
  localStorage.setItem("notes", notescontain.innerHTML);
}

// Set up events for all current notes
function setUpNoteEvents() {
  const notes = document.querySelectorAll(".input-box");

  notes.forEach((note) => {
    note.onkeyup = function () {
      updatestorage();
    };

    // Set up delete button events
    const deleteBtn = note.querySelector("img");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", (e) => {
        e.target.parentElement.remove();
        updatestorage();
      });
    }
  });
}

// Create a new note
createbtn.addEventListener("click", () => {
  let writingbox = document.createElement("p");
  let img = document.createElement("img");
  writingbox.className = "input-box";
  writingbox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";
  notescontain.appendChild(writingbox).appendChild(img);

  // Add events for the new note
  writingbox.onkeyup = function () {
    updatestorage();
  };

  img.addEventListener("click", (e) => {
    e.target.parentElement.remove();
    updatestorage();
  });

  updatestorage(); // Update storage after creating a new note
});

// Initialize notes on page load
shownotes();
