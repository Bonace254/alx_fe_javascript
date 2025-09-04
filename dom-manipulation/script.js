'use strict';

const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "If you're going through hell, keep going.", category: "Perseverance" },
  { text: "Be yourself; everyone else is already taken.", category: "Humor" },
  { text: "We accept the love we think we deserve.", category: "Love" },
];

const categories = new Set(quotes.map(q => q.category));

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) node.setAttribute(k, v);
  }
  for (const child of children.flat()) {
    if (child == null) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

function renderQuote(quote) {
  const container = $('#quoteDisplay');
  const block = el('blockquote', {},
    el('p', {}, quote.text),
    el('footer', {}, `#${quote.category}`)
  );
  container.replaceChildren(block);
}

function getFilteredQuotes() {
  const select = $('#categorySelect');
  const sel = select ? select.value : 'all';
  if (!select || sel === 'all') return quotes;
  return quotes.filter(q => q.category === sel);
}

function showRandomQuote() {
  const list = getFilteredQuotes();
  if (list.length === 0) {
    renderQuote({ text: 'No quotes yet for this category. Add one below!', category: '—' });
    return;
  }
  const idx = Math.floor(Math.random() * list.length);
  renderQuote(list[idx]);
}

function createAddQuoteForm() {
  const section = el('section', { id: 'addQuoteSection' });
  const form = el('form', { id: 'addQuoteForm' },
    el('input', { id: 'newQuoteText', type: 'text', placeholder: 'Enter a new quote', required: true }),
    el('input', { id: 'newQuoteCategory', type: 'text', placeholder: 'Enter quote category', required: true }),
    el('button', { type: 'submit' }, 'Add Quote')
  );

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addQuote();
    form.reset();
  });

  section.appendChild(form);
  return section;
}

function addQuote() {
  const textEl = $('#newQuoteText');
  const catEl = $('#newQuoteCategory');
  if (!textEl || !catEl) return;
  const text = textEl.value.trim();
  const category = catEl.value.trim() || 'Uncategorized';
  if (!text) return;

  quotes.push({ text, category });
  categories.add(category);

  showRandomQuote();
}

window.addQuote = addQuote;

window.addEventListener('DOMContentLoaded', () => {
  showRandomQuote();
  $('#newQuote').addEventListener('click', showRandomQuote);
  document.body.appendChild(createAddQuoteForm());
});

