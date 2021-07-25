
if (localStorage.getItem("bookList") === null) {
  localStorage.setItem("bookList", JSON.stringify([]));
} else {
  console.log(typeof localStorage.getItem("bookList"));
}

  // function updateLocalStorageSet() {
  //   localStorage.setItem("bookList", JSON.stringify([]));
  // }

const  bookName = document.getElementById("book-name");
const authorName = document.getElementById("auth-name");
const bookCategory = document.getElementById("category")
const bookPrice = document.getElementById("book-price")

/* ============ add a book  =========== */
const addBook = document.getElementById("add-btn")

addBook.addEventListener("click", e => {
  e.preventDefault()
  console.log('adfk', bookName.value);
  if (bookName.value === "" || authorName.value === "" || bookCategory.value === "" || bookPrice.value === "") {
    alert("Input Please!")
    return false;
  }

  let aBook = {
    bookName: bookName.value,
    authorName: authorName.value,
    bookCategory: bookCategory.value,
    bookPrice: bookPrice.value,
  }
  console.log('book', aBook);

  let oldData = JSON.parse(localStorage.getItem("bookList"))

  oldData.push(aBook)

 
  const obj = JSON.stringify(oldData)
  localStorage.setItem("bookList", obj)
  showBookList();
   bookName.value = "";
   authorName.value = "";
   bookCategory.value = "";
   bookPrice.value = "";
})

const bookLists = document.getElementById("book-lists")
/* ============ Function for show book list  =========== */

function showBookList() {
  let table = "";
  let singleBook = JSON.parse(localStorage.getItem("bookList"));
  console.log("list", singleBook);
  
  singleBook.forEach((el, idx) => {
    table += `
      <tr>
      <th scope="row">${idx + 1}</th>
      <td>${el.bookName}</td>
      <td>${el.authorName}</td>
      <td>${el.bookCategory}</td >
      <td>${el.bookPrice} tk</td>
      <td>
      <button onclick="setEditData(${idx})"   class="btn btn-sm"><img src="https://img.icons8.com/color/25/000000/edit.png"/></button><button class="btn btn-sm" onclick="deleteBtn(${idx})"><img src="https://img.icons8.com/color/25/000000/cancel--v1.png"/></button>
      </td>
    </tr>
      `;
  
  })
  bookLists.innerHTML = table;
}
/* ============ Function for set edit data =========== */

 showBookList();

function setEditData(index) {

  let singleBook = JSON.parse(localStorage.getItem("bookList"));
  bookName.value = singleBook[index].bookName;
  authorName.value = singleBook[index].authorName;
  bookCategory.value = singleBook[index].bookCategory;
  bookPrice.value = singleBook[index].bookPrice;
  document.getElementById("edit-index").value = index;

  window.scroll(0,0)
}
/* ============ Function for Edit  =========== */

function editBtn() {
  const editIndex = document.getElementById("edit-index").value;
  
    let editBook = {
      bookName: bookName.value,
      authorName: authorName.value,
      bookCategory: bookCategory.value,
      bookPrice: bookPrice.value,
  };
  console.log('edi book', editBook);
  
  const oldData = JSON.parse(localStorage.getItem("bookList"))

  oldData[editIndex] = editBook;
  const setData = JSON.stringify(oldData)
  localStorage.setItem("bookList", setData)
  bookName.value = ""
  authorName.value = ""
  bookCategory.value = ""
  bookPrice.value = ""

  showBookList();
}
/* ============  Function  for Single delete =========== */

function deleteBtn(index) {
  let localData = JSON.parse(localStorage.getItem("bookList"))

  console.log('local dart', localData);
  localData.splice(index, 1)
  localStorage.setItem("bookList", JSON.stringify(localData))
  showBookList()
  
}
/* ============ function for All delete  =========== */
function deleteAll() {
  const yes = confirm("Are you sure delete Book list???")
  if (yes) {
    localStorage.clear()
    location.reload()
    showBookList()
    
  } else {
    return false;
  }
}

  /* ============ searching   =========== */

const searchBtn = document.getElementById("search-btn")
let searchText = document.getElementById("search-text")
searchBtn.addEventListener("click", e => {
  e.preventDefault()
  console.log('searcn tex', searchText.value);
  
  let localData = JSON.parse(localStorage.getItem("bookList"));


  localData.map((el, idx) => {
    let table = "";

    console.log('test', String( el.bookName) == String( searchText.value));
    

    if (String(el.bookName) === String(searchText.value)) {
      table += `
      <tr>
      <th scope="row">${idx + 1}</th>
      <td>${el.bookName}</td>
      <td>${el.authorName}</td>
      <td>${el.bookCategory}</td >
      <td>${el.bookPrice} tk</td>
      <td>
      <button onclick="setEditData(${idx})"   class="btn btn-sm"><img src="https://img.icons8.com/color/25/000000/edit.png"/></button><button class="btn btn-sm" onclick="deleteBtn(${idx})"><img src="https://img.icons8.com/color/25/000000/cancel--v1.png"/></button>
      </td>
    </tr>
      `;
    } else {
     // alert("This data is not found!!!")
      
    }
    bookLists.innerHTML = table;
  });

})