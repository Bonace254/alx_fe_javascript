4                       script.js
  const category = catEl.value.trim() || 'Uncategorized';

  if (!text) return;

  quotes.push({ text, category });
  textEl.value = '';
  catEl.value = '';

  // show the new quote immediately
  displayRandomQuote();
}

// --- Boot ---
window.addEventListener('DOMContentLoaded', () => {
  // show a random quote when page loads
  displayRandomQuote();
  document.getElementById('newQuote').addEventListener('click', displayRandomQu>
});




