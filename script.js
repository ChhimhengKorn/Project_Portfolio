// Initialize AOS (Animate On Scroll)
AOS.init();

// Theme Toggle Functionality
const toggleBtn = document.querySelector('.toggle-theme');
const htmlEl = document.documentElement;

function setTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Toggle theme on button click
toggleBtn.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Typing Effect for Phrases
const phrases = ["Welcome to TechX", "Code. Create. Connect."];
let i = 0, j = 0, currentPhrase = [], isDeleting = false;
const typedText = document.getElementById("typed-text");

function typeLoop() {
  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
      typedText.textContent = currentPhrase.join("");
    }

    if (isDeleting && j > 0) {
      currentPhrase.pop();
      j--;
      typedText.textContent = currentPhrase.join("");
    }

    if (j === phrases[i].length && !isDeleting) {
      isDeleting = true;
      setTimeout(typeLoop, 1200); // Pause before deleting
      return;
    }

    if (j === 0 && isDeleting) {
      isDeleting = false;
      i = (i + 1) % phrases.length; // Move to the next phrase
    }
  }
  setTimeout(typeLoop, isDeleting ? 40 : 100); // Typing speed
}

typeLoop(); // Start the typing effect

// Live Code Editor and Preview
const editor = document.getElementById("code-editor");
const preview = document.getElementById("preview");

editor.addEventListener("input", () => {
  const content = editor.value;
  const previewDoc = preview.contentDocument || preview.contentWindow.document;
  previewDoc.open();
  previewDoc.write(content);
  previewDoc.close();
});

// Trigger initial load for the editor
editor.dispatchEvent(new Event("input"));