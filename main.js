//Selectors
const addContactButton = document.querySelector('.add-contact-btn');
const nameAndSurname = document.getElementById('nameSurnameInput');
const phoneNumber = document.getElementById('numberInput');
const additionalInfos = document.getElementById('additionalInfoInput');
const divAccordion = document.getElementById('accordion');

//Variables
let counter = 0;

//Event Listeners
addContactButton.addEventListener('click', addContactToList);


//Functions
function addContactToList(event) {
    counter++;
    
    //Prevent Default Submitting
    event.preventDefault();
    
    if (nameAndSurname.value === ' ') {
        alert('Enter name');
    } else if (nameAndSurname.value !== ' ') {
        
        //Create main div and add 'card' class
        const contactDetailsContainer = document.createElement('div');
        contactDetailsContainer.classList.add('card');
        
        //Create 1st sub-div ('card-header', with h5 and Name/Sur button)
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        
        //Popolate 1st sub-div: add h5 (i.e. 'clickableHeader')
        const clickableHeader = document.createElement('h5');
        clickableHeader.classList.add('mb-0');
        
        //Create Name/Sur clickable header button
        const buttonHeader = createHeaderButton();
        setSingleAttributes(buttonHeader, 'data-toggle', 'collapse');
        setSingleAttributes(buttonHeader, 'aria-expanded', 'false');
        
        //Retrieve value entered in Name and Surname field
        const nameAndSurnameValue = nameAndSurname.value;
        buttonHeader.innerText = nameAndSurnameValue;
        
        //Create trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        
        //Append button header to h5 (i.e. 'clickableHeader')
        clickableHeader.appendChild(buttonHeader);
        
        //Append trash button to h5
        clickableHeader.appendChild(trashButton);
        
        //Call delete function when trash button is clicked
        trashButton.addEventListener('click', deleteContact);
        
        //Append h5 to 1st sub-div
        cardHeader.appendChild(clickableHeader);
        
        //Append 'card-header' div to 'card' div
        contactDetailsContainer.appendChild(cardHeader);
        
        //Call ids and single attributes function
        //Header id
        setSingleAttributes(cardHeader, 'id', 'heading-' + counter);
        //Button id
        setSingleAttributes(buttonHeader, 'id', 'contact-name-' + counter);
        //Button data-target
        setSingleAttributes(buttonHeader, 'data-target', '#collapse-' + counter);
        //Button aria-controls
        setSingleAttributes(buttonHeader, 'aria-controls', 'collapse-' + counter);
        
        //Create 2nd sub-div (id='counter-collapse')
        const cardDetails = document.createElement('div');
        cardDetails.classList.add('collapse');
        
        //Create div body container
        const cardDetailsBody = document.createElement('div');
        cardDetailsBody.classList.add('card-body');
        
        //Create phone number paragraph
        const phoneNumberValue = phoneNumber.value;
        const phoneParagraph = document.createElement('p');
        phoneParagraph.innerText = 'Phone number: ' + phoneNumberValue;
        
        
        //Create additional infos paragraph
        const additionalInfosValue = additionalInfos.value;
        const additionalInfosParagraph = document.createElement('p');
        additionalInfosParagraph.innerText = 'Additional Infos: ' + additionalInfosValue;
        
        //Append paragraphs to body container div
        cardDetailsBody.appendChild(phoneParagraph);
        cardDetailsBody.appendChild(additionalInfosParagraph);
        
        //Append div body container (card-body) to div with 'collapse' class
        cardDetails.appendChild(cardDetailsBody);
        
        //Append 'collapse' div to 'card' div
        contactDetailsContainer.appendChild(cardDetails);
        
        //Call ids and single attributes function to 2nd sub-div (cardDetails)
        setSingleAttributes(cardDetails, 'id', 'collapse-' + counter);
        setSingleAttributes(cardDetails, 'aria-labelledby', 'heading-' + counter);
        setSingleAttributes(cardDetails, 'data-parent', '#accordion');
        
        //Append 'card' div to 'accordion' div
        divAccordion.appendChild(contactDetailsContainer);
        
        //Clear inputs
        nameAndSurname.value = "";
        phoneNumber.value = "";
        additionalInfos.value = "";
    }
}

function createHeaderButton() {
    buttonHeader = document.createElement('button');
    buttonHeader.classList.add('btn'); 
    buttonHeader.classList.add('btn-link'); 
    buttonHeader.setAttribute('type', 'button');
    
    return buttonHeader;
}

function setSingleAttributes(element, attribute, value) {
    const counterInString = counter.toString();
    element.setAttribute(attribute, value);
}

function deleteContact(event) {
    const item = event.target;
    const parentsItem = item.parentElement.parentElement.parentElement;
    if (item.classList[0] === 'trash-btn') {
        parentsItem.remove();
    }
    
}