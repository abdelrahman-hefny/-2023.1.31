var title = document.getElementById("title");
var price = document.getElementById("price");
var tax = document.getElementById("tax");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var total = document.getElementById("total");
var count = document.getElementById("count");
var catigory = document.getElementById("catigory");
var creat = document.getElementById("creat");
var search = document.getElementById("search");
let mood = "creat";
let tmp;
// creat data
function totals() {
    if (price != "") {
        let result = +price.value + +tax.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "red";
    }
}
//array
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}
creat.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        catigory: catigory.value.toLowerCase(),
    };

    // count
    if (title.value != '' &&
        catigory.value != '' &&
        price.value != '' &&
        newPro.count < 100
    ) {
        if (mood === "creat") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mood = "creat";
            creat.innerHTML = " creat";
            count.style.display = "block";
        }
    }
    else {
        clearData();
    }

    // save local storage
    localStorage.setItem("product", JSON.stringify(dataPro));


    showData();
};

// clear data

function clearData() {
    title.value = "";
    price.value = "";
    tax.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    catigory.value = "";
    total.style.backgroundColor = "red";
}
// read data
function showData() {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        table += ` <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].tax = 0}</td>
            <td>${dataPro[i].ads = 0}</td>
            <td>${dataPro[i].discount = 0}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].catigory}</td>
            <td><button onclick = delateData(${i})>delate</button></td>
            <td><button onclick = updateData(${i}) id= 'update'>update</button></td>
        </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelate = document.getElementById("daleteAll");
    if (dataPro.length > 0) {
        btnDelate.innerHTML = `<button onclick =
        delateAll()>delate All (${dataPro.length})</button>`;
    } else {
        btnDelate.innerHTML = "";
    }
}
showData();
// delate
function delateData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);

    showData();
}
// delate all
function delateAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    tax.value = dataPro[i].tax;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    catigory.value = dataPro[i].catigory;
    count.style.display = "none";
    creat.innerHTML = "Update";
    totals();
    mood = "Update";
    tmp = i;
}
//search
let searchMood = "title";
function getSearch(id) {
    let search = document.getElementById("search");
    if (id === "searchByTitle") {
        searchMood = "title";
        search.placeholder = "Search By Title";
    } else {
        searchMood = "category";
        search.placeholder = "Search By Category";
    }
    search.focus();
    search.value = ''
    showData()
}
function searchData(value) {
    let table = "";
    if (searchMood === "title") {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += ` <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].tax}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].catigory}</td>
                            <td><button onclick = delateData(${i})>delate</button></td>
                            <td><button onclick = updateData(${i}) id= 'update'>update</button></td>
                        </tr>`;
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].catigory.includes(value)) {
                table += ` <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].tax}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].catigory}</td>
                            <td><button onclick = delateData(${i})>delate</button></td>
                            <td><button onclick = updateData(${i}) id= 'update'>update</button></td>
                        </tr>`;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;

}
