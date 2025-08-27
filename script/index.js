
const services = [
  { id: 'nat',  icon: '🚨', bn: 'জাতীয় জরুরি নম্বর', en: 'National Emergency Number', number: '999', category: 'All' },
  { id: 'pol',  icon: '👮', bn: 'পুলিশ হেল্পলাইন', en: 'Police Helpline Number', number: '999', category: 'Police' },
  { id: 'fire', icon: '🔥', bn: 'ফায়ার সার্ভিস', en: 'Fire Service Number', number: '999', category: 'Fire' },
  { id: 'amb',  icon: '🚑', bn: 'অ্যাম্বুলেন্স সেবা', en: 'Ambulance Service', number: '1994-999999', category: 'Health' },
  { id: 'wom',  icon: '👩‍👧', bn: 'নারী ও শিশু হেল্পলাইন', en: 'Women & Child Helpline', number: '109', category: 'Help' },
  { id: 'anti', icon: '🛡️', bn: 'দুর্নীতি দমন হেল্পলাইন', en: 'Anti-Corruption Helpline', number: '106', category: 'Govt.' }
];

// ---------------- State ----------------
let heartCount = 0;
let coins = 100;
let copyCount = 0;
const callHistory = [];

// ---------------- DOM refs ----------------
const cardSection = document.getElementById('cardSection');
const cardTemplate = document.getElementById('cardTemplate');
const heartCountEl = document.getElementById('heartCount');
const coinCountEl = document.getElementById('coinCount');
const copyCountEl = document.getElementById('copyCount');
const historyList = document.getElementById('historyList');
const historyEmpty = document.getElementById('historyEmpty');
const clearHistoryBtn = document.getElementById('clearHistory');

// ---------------- Utils ----------------
function createCard(service) {
  const node = cardTemplate.content.firstElementChild.cloneNode(true);
  node.dataset.id = service.id;
  node.querySelector('.iconWrap').textContent = service.icon;
  node.querySelector('.englishName').textContent = service.en;
  node.querySelector('.bengaliName').textContent = service.bn;
  node.querySelector('.phoneNumber').textContent = service.number;
  node.querySelector('.category').textContent = service.category;

  // set dataset for easy access
  node.dataset.number = service.number;
  node.dataset.name = service.en;

  return node;
}

function renderCards() {
  cardSection.innerHTML = '';
  const frag = document.createDocumentFragment();
  services.forEach(svc => frag.appendChild(createCard(svc)));
  cardSection.appendChild(frag);
}

function formatExactTime(date = new Date()) {
  // e.g., 2025-08-27 11:36:58 AM — using locale parts for clarity
  const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const datePart = date.toLocaleDateString(undefined, optionsDate);
  const timePart = date.toLocaleTimeString(undefined, { hour12: true });
  return `${datePart} ${timePart}`;
}

function addHistory(name, number) {
  const time = formatExactTime(new Date());
  callHistory.unshift({ name, number, time });

  // update UI
  if (historyEmpty) historyEmpty.style.display = 'none';
  const item = document.createElement('div');
  item.className = 'p-3 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3';
  item.innerHTML = `\n    <div>\n      <div class="font-medium text-slate-900">${escapeHtml(name)}</div>\n      <div class="text-xs text-slate-500">${escapeHtml(number)}</div>\n    </div>\n    <div class="text-xs text-slate-400">${escapeHtml(time)}</div>\n  `;
  historyList.prepend(item);
}

function clearHistoryUI() {
  callHistory.length = 0;
  historyList.innerHTML = '';
  const placeholder = document.createElement('div');
  placeholder.id = 'historyEmpty';
  placeholder.className = 'text-sm text-slate-400';
  placeholder.textContent = 'No call history yet.';
  historyList.appendChild(placeholder);
}

function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Robust copy helper: try Clipboard API then fallback to textarea copy
async function copyNumberToClipboard(text) {
  // Ensure this is called in direct response to a user gesture (it will be, since we call on click)
  if (!text) return false;

  // Try native Clipboard API first
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // If Clipboard API is blocked by policy (NotAllowedError), fall back below
      console.warn('Clipboard API failed, falling back to textarea method:', err);
    }
  }

  // Fallback: textarea + document.execCommand('copy') — works in many environments
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    // Move textarea off-screen
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(ta);
    return successful;
  } catch (err) {
    console.error('Fallback copy failed:', err);
    return false;
  }
}

// ---------------- Event handling (delegation) ----------------
// Use event delegation on cardSection — works for dynamic elements too
cardSection.addEventListener('click', async (ev) => {
  const favBtn = ev.target.closest('.favoriteBtn');
  if (favBtn) {
    // heart/favorite clicked
    heartCount += 1;
    heartCountEl.textContent = heartCount;
    // change icon to solid
    favBtn.textContent = '💖';
    return;
  }

  const copyBtn = ev.target.closest('.copyBtn');
  if (copyBtn) {
    const card = copyBtn.closest('[data-number]');
    if (!card) return;
    const number = card.dataset.number;

    // perform copy with fallback
    const ok = await copyNumberToClipboard(number);
    if (ok) {
      copyCount += 1;
      copyCountEl.textContent = copyCount;
      alert(`Copied: ${card.dataset.name} — ${number}`);
    } else {
      alert('Unable to copy number to clipboard in this environment. Please select and copy manually.');
    }
    return;
  }

  const callBtn = ev.target.closest('.callBtn');
  if (callBtn) {
    const card = callBtn.closest('[data-number]');
    if (!card) return;
    const name = card.dataset.name;
    const number = card.dataset.number;

    if (coins < 20) {
      alert('Not enough coins — each call costs 20 coins.');
      return;
    }

    // Deduct coins and update UI
    coins -= 20;
    coinCountEl.textContent = coins;

    // Show calling alert (simulation)
    alert(`Calling ${name} at ${number}...`);

    // Add to history with exact time
    addHistory(name, number);
    return;
  }
});

// Clear history button
clearHistoryBtn.addEventListener('click', () => {
  if (callHistory.length === 0) {
    clearHistoryUI();
    return;
  }
  const ok = confirm('Clear all call history?');
  if (!ok) return;
  clearHistoryUI();
});

// ---------------- Init ----------------
renderCards();
heartCountEl.textContent = heartCount;
coinCountEl.textContent = coins;
copyCountEl.textContent = copyCount;