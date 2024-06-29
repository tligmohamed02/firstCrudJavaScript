let title = document.querySelector('#title');
let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads = document.querySelector('#ads');
let discount = document.querySelector('#discount');
let total = document.querySelector('#total');
let count = document.querySelector('#count');
let category = document.querySelector('#category');
let submit = document.querySelector('#submit');
const redColor = 'rgb(188, 21, 9)';
let supprimer = document.querySelector('#supprimer');
let objectUpdated ;
//localStorage.clear();
const x = 10;


price.addEventListener('keyup', calcTotal);
taxes.addEventListener('keyup', calcTotal);
ads.addEventListener('keyup', calcTotal);
discount.addEventListener('keyup', calcTotal);

const checkIfDataAvailable = () => localStorage.length > 0 && localStorage.product;

function calcTotal() {
    if (price.value != '') {
        // parseInt, parseFloat
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        if (result > 0) {
            // innerHtml
            total.innerText = result;
            total.style.backgroundColor = 'green';
        } else {
            discount.value = '';
            total.innerText = '';
            total.style.backgroundColor = redColor;
        }
    } else {
        total.innerText = '';
        total.style.backgroundColor = redColor;
    }
}

// create product 
function createProduct() {
    let object = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    let myproduct = checkIfDataAvailable() ? JSON.parse(localStorage.product) : [];

    for (let i = 0; i < count.value; i++) {
        myproduct.push(object);
    }

    localStorage.setItem('product', JSON.stringify(myproduct))
    ReadData();
    clearInputs();
    affichageDelete();
}

function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    total.style.backgroundColor = redColor;
}

function ReadData() {
    if (checkIfDataAvailable()) {
        let myData = JSON.parse(localStorage.product);
        document.querySelector('#tabbody').innerText = '';
        for (let i = 0; i < myData.length; i++) {

            const tableRow = document.createElement('tr');
            let tableData = createAndAppendData(i + 1, tableRow);
            createAndAppendData(myData[i].title, tableRow);
            createAndAppendData(myData[i].price, tableRow);
            createAndAppendData(myData[i].taxes, tableRow);
            createAndAppendData(myData[i].ads, tableRow);
            createAndAppendData(myData[i].discount, tableRow);
            createAndAppendData(myData[i].total, tableRow);
            createAndAppendData(myData[i].category, tableRow);
            
            const buttonUpdate = document.createElement('button');
            buttonUpdate.innerText = 'UPDATE';
            buttonUpdate.classList.add('btn');
            buttonUpdate.id = 'update';
            buttonUpdate.addEventListener('click',update())
            
            tableData = document.createElement('td')
            tableData.appendChild(buttonUpdate);
            tableRow.appendChild(tableData);


            const buttonDelete = document.createElement('button');
            buttonDelete.innerText = 'DELETE';
            buttonDelete.classList.add('btn');
            buttonDelete.id = 'delete';
            tableData = document.createElement('td')
            tableData.appendChild(buttonDelete);
            tableRow.appendChild(tableData);

            document.querySelector('#tabbody').appendChild(tableRow);
        }
    }
}

ReadData();

function createAndAppendData(data, tableRow) {
    let tableData = document.createElement('td');
    tableData.innerText = data;
    tableRow.appendChild(tableData);
    // return tableData;
}
affichageDelete();
function affichageDelete() {
    if (checkIfDataAvailable()){
        supprimer.innerText = '';
        let numb = JSON.parse(localStorage.product).length;
        const buttonSupprimer = document.createElement('button');
        buttonSupprimer.innerText = `${'Delete All('}${numb}${')'}`;
        buttonSupprimer.className = 'btn';
        document.querySelector('#supprimer').appendChild(buttonSupprimer);
    }
}

function deleteAll(){
    localStorage.clear();
    document.querySelector('#tabbody').innerText = '';
    supprimer.innerText = '';
}

function update(){
    console.log(10)

}


window.addEventListener('beforeunload', function () {
    price.removeEventListener('keyup', calcTotal);
    taxes.removeEventListener('keyup', calcTotal);
    ads.removeEventListener('keyup', calcTotal);
    discount.removeEventListener('keyup', calcTotal);
});