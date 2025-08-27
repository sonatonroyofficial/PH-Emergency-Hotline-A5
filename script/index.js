
        let heartCount = 0;
        let coinCount = 100;
        let copyCount = 0;

        const heartEl = document.querySelector('#heartCount span');
        const coinEl = document.querySelector('#coinCount span');
        const copyEl = document.querySelector('#copyCount span');
        const historyList = document.querySelector('#historyList');

        function addHeartListeners() {
            document.querySelectorAll('.heartBtn').forEach(btn => {
                btn.onclick = () => {
                    heartCount++;
                    heartEl.textContent = heartCount;
                }
            });
        }
        function addCopyListeners() {
            document.querySelectorAll('.copyBtn').forEach(btn => {
                btn.onclick = (e) => {
                    const card = e.target.closest('.bg-white');
                    const number = card.querySelector('p.text-xl').textContent;
                    navigator.clipboard.writeText(number).then(() => {
                        copyCount++;
                        copyEl.textContent = copyCount;
                        alert('Number copied: ' + number);
                    });
                }
            });
        }
        function addCallListeners() {
            document.querySelectorAll('.callBtn').forEach(btn => {
                btn.onclick = (e) => {
                    const card = e.target.closest('.bg-white');
                    const name = card.querySelector('h2').textContent;
                    const number = card.querySelector('p.text-xl').textContent;
                    if (coinCount < 20) {
                        alert('Not enough coins to make a call.');
                        return;
                    }
                    coinCount -= 20;
                    coinEl.textContent = coinCount;
                    alert(`Calling ${name} at ${number}`);
                    const time = new Date().toLocaleTimeString();
                    const li = document.createElement('li');
                    li.textContent = `${name} - ${number} (${time})`;
                    historyList.prepend(li);
                }
            });
        }

        addHeartListeners();
        addCopyListeners();
        addCallListeners();

        document.getElementById('clearHistory').addEventListener('click', () => {
            historyList.innerHTML = '';
        });
  