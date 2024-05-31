let data = [
  { id: 1, name: "Yosin", description: "I am Yosin", complete: false },
  { id: 2, name: "Olim", description: "I am Olim", complete: true },
  { id: 3, name: "Abubakr", description: "I am Abubakr", complete: false },
];

let root = document.querySelector("#root");

let modal = document.querySelector(".modal");
let inpEditName = document.querySelector(".inpEditName");
let inpEditDes = document.querySelector(".inpEditDes");
let btnChange = document.querySelector(".btnChange");
let btnClose = document.querySelector(".btnClose");

let inpSearch = document.querySelector(".inpSearch");
let filter = document.querySelector(".filter");

let delModal = document.querySelector(".delModal");
let btnYes = document.querySelector(".btnYes");
let btnNo = document.querySelector(".btnNo");

let addModal = document.querySelector(".addModal");
let inpAddName = document.querySelector(".inpAddName");
let inpAddDes = document.querySelector(".inpAddDes");
let btnAdd = document.querySelector(".btnAdd");
let btnCloseAdd = document.querySelector(".btnCloseAdd");

let btnOpenAddModal = document.querySelector(".btnOpenAddModal");

//OPEN ADD MODAL

btnOpenAddModal.onclick = () => {
  addModal.showModal();
};

//ADD DATA

btnAdd.onclick = () => {
  if (
    inpAddName.value.trim().length == 0 ||
    inpAddDes.value.trim().length == 0
  ) {
    alert("Please fill all the fields");
  } else {
    let toDo = {
      id: data.length + 1,
      name: inpAddName.value,
      description: inpAddDes.value,
    };
    data.push(toDo);
    getData(data);
    addModal.close();
  }
};
btnCloseAdd.onclick = () => {
  addModal.close();
};

//btn No

btnNo.onclick = () => {
  delModal.close();
};
//btn Yes

btnYes.onclick = () => {
  data = data.filter((e) => {
    return e.id !== idxDel;
  });
  getData(data);
  delModal.close();
};
//CLOSE DATA

btnClose.onclick = () => {
  modal.close();
};
//FILTER DATA

filter.onclick = () => {
  let arr;
  arr = data.filter((e) => {
    if (filter.value == "true") {
      return e.complete;
    } else if (filter.value == "false") {
      return !e.complete;
    } else {
      return e;
    }
  });
  getData(arr);
};

//SEARCH DATA

inpSearch.oninput = () => {
  let arr;

  arr = data.filter((e) => {
    return e.name.toLowerCase().includes(inpSearch.value.trim().toLowerCase());
  });
  getData(arr);
};
//CHANGE DATA

btnChange.onclick = () => {
  if (
    inpEditName.value.trim().length == 0 ||
    inpEditDes.value.trim().length == 0
  ) {
    alert("Please fill input fields");
  } else {
    data.map((e) => {
      if (idx == e.id) {
        e.name = inpEditName.value;
        e.description = inpEditDes.value;
      }
      return e;
    });
    modal.close();
    getData(data);
  }
};

//OPEN DEL MODAL DATA
let idxDel = null;

function OpenDelModal(id) {
  idxDel = id;
  delModal.showModal();
}

//OPEN MODAL

let idx = null;
let openModal = (id) => {
  idx = id;
  modal.showModal();
  let sel = data.find((e) => {
    return e.id === id;
  });
  inpEditName.value = sel.name;
  inpEditDes.value = sel.description;
};

//CHECK DATA

let checkData = function (id) {
  data.map((e) => {
    if (e.id == id) {
      e.complete = !e.complete;
    }
    return e;
  });
  getData(data);
};
//GET DATA

function getData(data) {
  root.innerHTML = "";

  data.forEach((e) => {
    let sec = document.createElement("div");
    sec.classList.add("sec");

    let block1 = document.createElement("div");
    block1.classList.add("block1");

    let block2 = document.createElement("div");
    block2.classList.add("block2");

    let name = document.createElement("h1");
    name.innerHTML = e.name;
    if (e.complete) {
      name.style.textDecoration = "line-through";
    }
    let des = document.createElement("p");
    des.innerHTML = e.description;

    let btnDelModal = document.createElement("button");
    btnDelModal.innerHTML = "DEL";
    btnDelModal.onclick = () => {
      OpenDelModal(e.id);
    };
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = e.complete;
    checkBox.onclick = () => {
      checkData(e.id);
    };

    let btnOpenModal = document.createElement("button");
    btnOpenModal.innerHTML = "EDIT";
    btnOpenModal.onclick = () => {
      openModal(e.id);
    };

    block2.append(btnDelModal, btnOpenModal, checkBox);
    block1.append(name, des);
    sec.append(block1, block2);
    root.append(sec);
  });
}
getData(data);
