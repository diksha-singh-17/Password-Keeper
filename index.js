const data = {
  id: null,
  title: "",
  password: "",
  flag: false,
  count: 0,
};

function handleEvent(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const password = document.getElementById("password").value;

  const obj = {
    title: title,
    password: password,
  };
  console.log(obj);
  if (data.flag === false) {
    axios
      .post(
        "https://crudcrud.com/api/8e53cb5938f640d1bdc7de84e4dd4155/pass-keeper",
        {
          obj,
        }
      )
      .then((response) => {
        console.log(response.data);
        data.title = response.data.obj.title;
        data.password = response.data.obj.password;
        data.id = response.data._id;
        //

        // const parentEl = document.getElementById("count");
        // newEl = document.createElement("span");
        // newEl.textContent = data.count++ + "";
        // parentEl.appendChild(newEl);
        // data.count = 0;
        //
        showData();
      })
      .catch((e) => console.log(e));
  } else {
    const title = document.getElementById("title").value;
    const password = document.getElementById("password").value;
    const obj = {
      title: title,
      password: password,
    };
    axios
      .put(
        `https://crudcrud.com/api/8e53cb5938f640d1bdc7de84e4dd4155/pass-keeper/${data.id}`,
        {
          obj,
        }
      )
      .then((response) => {
        console.log(response);
        data.title = obj.title;
        data.password = obj.password;

        showData();
        data.flag = false;
      })
      .catch((e) => console.log(e));
  }
  document.getElementById("title").value = "";
  document.getElementById("password").value = "";
}

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  axios
    .get(
      "https://crudcrud.com/api/8e53cb5938f640d1bdc7de84e4dd4155/pass-keeper"
    )
    .then((response) => {
      response.data.forEach((element) => {
        data.title = element.obj.title;
        data.password = element.obj.password;
        data.id = element._id;
        showData();
      });
      data.count = response.data.length;
      const parentEl = document.getElementById("count");
      newEl = document.createElement("span");
      newEl.textContent = data.count;
      parentEl.appendChild(newEl);
    })
    .catch((err) => console.log(err));
});

function showData() {
  const list = document.getElementById("list");
  list.innerHTML += `<li class="list p-2"id=${data.id}>${data.title}-${data.password}
  <button id="delete-btn"   class="btn btn-primary m-2" onclick=deleteUserDetails('${data.id}')>Delete</button>
    <button id="edit-btn"   class="btn btn-primary m-2" onclick=EditUserDetails('${data.title}','${data.password}','${data.id}')>Edit</button> 
      </li> `;
}

function deleteUserDetails(id) {
  const parentNode = document.getElementById("list");
  const childNodeToBeDeleted = document.getElementById(id);
  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
  axios
    .delete(
      `https://crudcrud.com/api/8e53cb5938f640d1bdc7de84e4dd4155/pass-keeper/${id}`
    )
    .catch((err) => {
      console.error(err, err.message);
      document.body.innerHTML = "Something went wrong, Check again:" + err;
    });
}

function EditUserDetails(title, password, id) {
  data.flag = true;
  data.id = id;
  document.getElementById("title").value = title;
  document.getElementById("password").value = password;
  document.getElementById("submit-btn").textContent = "Edit";
}

const filter = document.getElementById("search");

filter.addEventListener("keyup", function (event) {
  const textEntered = event.target.value.toLowerCase();
  console.log(textEntered);
  const passItems = document.querySelectorAll(".list");
  for (let i = 0; i < passItems.length; i++) {
    const currenetFruitsText =
      passItems[i].firstChild.textContent.toLowerCase();
    if (currenetFruitsText.indexOf(textEntered) === -1) {
      passItems[i].style.display = "none";
    } else {
      passItems[i].style.display = "block";
    }
  }
});
