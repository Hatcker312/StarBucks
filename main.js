let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Отримання елементів модальних вікон та посилань
var termsModal = document.getElementById('termsModal');
var companyModal = document.getElementById('companyModal');
var termsLink = document.getElementById('termsLink');
var companyLink = document.getElementById('companyLink');
var closeTerms = document.getElementById('closeTerms');
var closeCompany = document.getElementById('closeCompany');
var subscribeButton = document.getElementById('subscribeButton');
var authButton = document.getElementById('authButton');
var subscriptionMessage = document.getElementById('subscriptionMessage');
var authMessage = document.getElementById('authMessage');
var subscriptionsList = document.getElementById('subscriptionsList');

termsLink.onclick = function() {
  termsModal.style.display = 'block';
}

companyLink.onclick = function() {
  companyModal.style.display = 'block';
}

closeTerms.onclick = function() {
  termsModal.style.display = 'none';
  clearModalInputs(termsModal);
}

closeTerms.onclick = function() {
  termsModal.style.display = 'none';
  clearModalContents(termsModal);
}

closeCompany.onclick = function() {
  companyModal.style.display = 'none';
  clearModalContents(companyModal);
  subscriptionsList.style.display = 'none';
}

// Очищення введених даних та повідомлень у модальному вікні
function clearModalContents(modal) {
  var inputs = modal.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
  // Очищення повідомлень
  subscriptionMessage.innerText = '';
  authMessage.innerText = '';
}




// Закриття модального вікна при кліку поза ним
window.onclick = function(event) {
  if (event.target == termsModal) {
    termsModal.style.display = 'none';
  } else if (event.target == companyModal) {
    companyModal.style.display = 'none';
  }
}

// Обробка підписки
subscribeButton.onclick = function() {
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;

  if (username && email.includes('@')) {
    saveSubscription(username, email);
  } else {
    subscriptionMessage.innerText = 'Будь ласка, введіть дійсний логін та електронну пошту.';
    subscriptionMessage.style.color = 'red';
  }
}

function saveSubscription(username, email) {
  let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
  
  let subscriptionExists = subscriptions.some(subscription => subscription.username === username || subscription.email === email);

  if (subscriptionExists) {
    subscriptionMessage.innerText = 'Логін або електронна пошта вже використовуються.';
    subscriptionMessage.style.color = 'red';
  } else {
    let newSubscription = { username: username, email: email };
    subscriptions.push(newSubscription);
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    subscriptionMessage.innerText = 'Підписка успішно збережена.';
    subscriptionMessage.style.color = 'green';
  }
}

// Обробка авторизації для перегляду підписок
authButton.onclick = function() {
  var authUsername = document.getElementById('authUsername').value;
  var authPassword = document.getElementById('authPassword').value;

  if (authUsername === 'admin' && authPassword === '12345') { 
    displaySubscriptions();
    authMessage.innerText = '';
  } else {
    authMessage.innerText = 'Невірний логін або пароль.';
    authMessage.style.color = 'red';
  }
}

function displaySubscriptions() {
  let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
  subscriptionsList.innerHTML = '';

  subscriptions.forEach(subscription => {
    let listItem = document.createElement('li');
    listItem.textContent = `Username: ${subscription.username}, Email: ${subscription.email}`;
    subscriptionsList.appendChild(listItem);
  });
}
