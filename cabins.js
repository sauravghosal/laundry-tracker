/* Cabin weights for the commercial productivity tracker. */
var CABINS = [
  { name: '1004 Rast Court', pounds: 30 },
  { name: '1145 Pinyon Circle', pounds: 40 },
  { name: '1165 Pinyon Circle', pounds: 230 },
  { name: '1509 Bald Eagle', pounds: 60 },
  { name: '1510 Bald Eagle', pounds: 30 },
  { name: '1512 Bald Eagle', pounds: 30 },
  { name: '2228 Woodcock Trl', pounds: 50 },
  { name: '2236 Woodcock', pounds: 60 },
  { name: '2251 Upper Middle Creek', pounds: 60 },
  { name: '2532 Bluff Mountain', pounds: 60 },
  { name: '2536 Bluff Mountain', pounds: 70 },
  { name: '2540 Bluff Mountain', pounds: 70 },
  { name: '2544 Bluff Mountain', pounds: 70 },
  { name: '2550 Bluff Mountain', pounds: 70 },
  { name: '615 Rainbow Road #2', pounds: 30 },
  { name: '615 Rainbow Road #3', pounds: 30 },
  { name: '706 Mountain Top', pounds: 20 },
  { name: '712 Mountain Top', pounds: 70 },
  { name: '722 Mountain Top', pounds: 90 },
  { name: '729 Mountain Top', pounds: 50 },
  { name: '737 Mountain Top', pounds: 100 },
  { name: '745 Mountain Top', pounds: 90 }
];
function getSelectedCabins() {
  return CABINS.filter(function (_, index) {
    return document.getElementById('cabin-' + index).checked;
  });
}
(function () {
  'use strict';
  var list = document.getElementById('cabinList');
  CABINS.forEach(function (cabin, index) {
    var label = document.createElement('label');
    label.className = 'cabin-option';
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'cabin-' + index;
    var name = document.createElement('span');
    name.textContent = cabin.name;
    var weight = document.createElement('strong');
    weight.textContent = cabin.pounds + ' lbs';
    label.append(input, name, weight);
    list.appendChild(label);
  });
  function updateSummary() {
    var cabins = getSelectedCabins();
    document.getElementById('cabinCount').textContent = cabins.length + (cabins.length === 1 ? ' cabin selected' : ' cabins selected');
    document.getElementById('cabinPounds').textContent = cabins.reduce(function (sum, cabin) { return sum + cabin.pounds; }, 0) + ' lbs';
  }
  list.addEventListener('change', updateSummary);
  document.getElementById('clearCabins').addEventListener('click', function () {
    list.querySelectorAll('input').forEach(function (input) { input.checked = false; });
    updateSummary();
    document.getElementById('form').dispatchEvent(new Event('input', { bubbles: true }));
  });
  document.getElementById('cabinSearch').addEventListener('input', function (event) {
    var query = event.target.value.trim().toLowerCase();
    var visible = 0;
    Array.from(list.children).forEach(function (row, index) {
      row.hidden = !CABINS[index].name.toLowerCase().includes(query);
      if (!row.hidden) visible++;
    });
    document.getElementById('noCabins').hidden = visible > 0;
  });
  // A previous calculation must not appear to describe newly edited inputs.
  document.getElementById('form').addEventListener('input', function (event) {
    if (event.target.id === 'cabinSearch') return;
    document.getElementById('results').style.display = 'none';
    document.getElementById('emptyResults').hidden = false;
    document.getElementById('saveStatus').textContent = '';
  });
})();
