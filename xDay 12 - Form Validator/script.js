const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordsMatch = false;

function validateForm() {
    //Using contraint API
    isValid = form.checkValidity();
    if(!isValid)
    {
        message.textContent = 'Please fill out all fields.';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        return;
    }

    //check ispassword valid
    if(password1El.value === password2El.value) {
        passwordsMatch = true;
        password1El.style.borderColor = 'green';
        password2El.style.borderColor = 'green';
    }
    else {
        passwordsMatch = false;
        message.textContent = 'Make sure passwords must match.';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        password1El.style.borderColor = 'red';
        password2El.style.borderColor = 'red';
        return;
    }

    // if form is valid and password matches
        message.textContent = 'Successfully Registered!';
        message.style.color = 'green';
        messageContainer.style.borderColor = 'green';

        // store data
        storeFormData();
}

function storeFormData() {
    const user = {
        name : form.name.value,
        phone : form.phone.value,
        email : form.email.value,
        website : form.website.value,
        password: form.password.value
    }
    //store form data in data base s
    console.log(user);
}

function processFormDate(e) {
    e.preventDefault();
    // validate form
    validateForm();
}

// Event listner 
form.addEventListener('submit',processFormDate);
form.addEventListener('reset',() => form.reset());