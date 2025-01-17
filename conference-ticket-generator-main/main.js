let form = document.querySelector(".form");
let fileInput = document.querySelector("#fileInput");
let selectedFile = null;
let file_err = document.querySelector(".file_err");
let file_input_wrapper = document.querySelector(".file_input_wrapper");
let instruction = document.querySelector(".instruction");
let fullname_input = document.querySelector(".fullname");
let email_input = document.querySelector(".email");
let github_input = document.querySelector(".github");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let error_msg = Array.from(document.querySelectorAll(".error"));
let success_page = document.querySelector(".success_page");
let userRegistered;
console.log(error_msg);

fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0];

  if (file && file.size <= 500 * 1024) {
    selectedFile = file;

    const reader = new FileReader();
    reader.onload = function (event) {
      document
        .querySelector(".upload_logo")
        .setAttribute("src", event.target.result);
      console.log(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
    instruction.style.display = "none";
    handleImageUploaderUI();
  } else {
    file_err.textContent = "file too large. please upload a photo under 500KB";
  }
});

function handleImageUploaderUI() {
  if (selectedFile) {
    let existingWrapper = document.querySelector(".btn_wrapper");
    if (existingWrapper) {
      existingWrapper.remove();
    }

    let btn_wrapper = document.createElement("div");
    btn_wrapper.classList.add("btns_wrapper");

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Image";
    removeBtn.classList.add("btns");

    removeBtn.addEventListener("click", () => {
      selectedFile = null;
      document
        .querySelector(".upload_logo")
        .setAttribute("src", "../assets/images/icon-upload.svg");
      instruction.style.display = "flex";
      btn_wrapper.remove();
    });

    let changeBtn = document.createElement("button");
    changeBtn.textContent = "Change image";
    changeBtn.classList.add("btns");

    changeBtn.addEventListener("click", () => {
      fileInput.click();
      btn_wrapper.remove();
    });

    btn_wrapper.append(removeBtn, changeBtn);
    file_input_wrapper.append(btn_wrapper);
  }
}

const handleSubmisson = (e) => {
  e.preventDefault();

  let hasError = false;

  let fullname = fullname_input.value;
  let email = email_input.value;
  let github = github_input.value;

  document.querySelector(".file_err").textContent = "";

  error_msg.forEach((err) => {
    err.innerHTML = "";
  });

  if (!selectedFile) {
    document.querySelector(".file_err").textContent =
      "Image Upload is Required";
    hasError = true;
  }
  if (!fullname) {
    document.querySelector(".name_err").textContent = "Full Name is Required";
    fullname_input.classList.add("err_border");
    hasError = true;
  }
  if (!email) {
    document.querySelector(".email_err").textContent = "Email is Required";
    email_input.classList.add("err_border");
    hasError = true;
  } else if (!emailRegex.test(email)) {
    document.querySelector(".email_err").textContent =
      "Valid Email is Required";
    email_input.classList.add("err_border");
    hasError = true;
  }
  if (!github) {
    document.querySelector(".git_err").textContent =
      "Github Username is Required";
    github_input.classList.add("err_border");
    hasError = true;
  }

  if (hasError) return;

  userRegistered = {
    fullname,
    email,
    github,
    selectedFile,
    id: `${crypto.randomUUID().slice(0, 5)}#`,
  };

  if (userRegistered) {
    handleSuccessCard(userRegistered);
    console.log(userRegistered.id);
  }
};

const handleSuccessCard = (userRegistered) => {
  document.querySelector(".container").style.display = "none";
  success_page.style.display = "block";

  document.querySelector(".username").innerHTML = `${userRegistered.fullname}!`;
  document.querySelector(".sucess_email").innerHTML = userRegistered.email;
  document.querySelector(".success_name").innerHTML = userRegistered.fullname;
  document.querySelector(".sucess_mail_display").innerHTML =
    userRegistered.github;

  const objectURL = URL.createObjectURL(userRegistered.selectedFile);
  console.log(objectURL);
  document.querySelector(".success_image").src = objectURL;
};
//let success_image = document.querySelector(".success_image ");
//console.log(success_image);
form.addEventListener("submit", handleSubmisson);
