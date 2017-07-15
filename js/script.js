'use strict';

var allAgreements = document.getElementById('wszystkie-zgody');
console.log(allAgreements);
// Pobranie wszystkich checkboxów
var allCheckboxes = document.querySelectorAll('input[type=checkbox]');
console.log(allCheckboxes);

// Sprawdzenie stanu checkboxa (można użyć onclick)
allAgreements.onchange = function() {
    console.log(this.checked);
//    document.getElementById('zgoda-marketingowa-1').checked = true;
//    document.getElementById('zgoda-marketingowa-2').checked = true;
//    // Wyłączanie innych zgód po zaznaczeniu wszystkich
//    document.getElementById('zgoda-marketingowa-1').disabled = true;
//    document.getElementById('zgoda-marketingowa-2').disabled = true;    
    
    for (var i = 0; i < allCheckboxes.length - 1; i++) { // Zaznaczenie wszystkich z wyjątkiem ostatniego
        allCheckboxes[i].checked = this.checked;
        allCheckboxes[i].disabled = this.checked;
    }
}

// Sprawdzenie czy pola formularza są wypełnione
document.getElementById('wyslij').addEventListener('click', validateForm);
function validateForm(event) {
    event.preventDefault(); // Inaczej log się nie wyświetli - musi być validateForm(event)
    
    var textInputs = document.querySelectorAll('input[type=text]');
    // Sprawdzenie czy wszystkie są niepuste
    for (var i = 0; i < textInputs.length; i++) {
        if (textInputs[i].value == '') {
            event.preventDefault(); // Inaczej okno się nie wyświetli
            
            // Sprawdzenie czy komunikat już się nie wyświetlił
            if (textInputs[i].nextElementSibling.tagName == 'P') {
                continue; // Przerywamy jeżeli wystąpił P (duże)
            }
            createAlert(textInputs[i], i);
            //alert('Uzupełnij wszystkie pola');
        } else if (textInputs[i].nextElementSibling.tagName == 'P') {
            document.getElementById('alert-' + i).remove(); // Usuwanie niepotrzebnych komunikatów
        }
    }
    
    function createAlert(element, id) {
        var message = document.createElement('p');
        message.id = 'alert-' + id; // Tworzenie dynamicznego id, żeby były unikatowe
        message.innerHTML = 'To pole jest wymagane';
        element.parentNode.insertBefore(message, element.nextElementSibling);
    }
}

