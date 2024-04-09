// getElementById를 통해서 write-form 요소를 가져옴
const form = document.getElementById("write-form");

const handleSubmitForm = async (event) => {
  event.preventDefault();
  const body = new FormData(form);
  body.append("insertAt", new Date().getTime());
  try {
    const res = await fetch("/items", {
      method: "POST",
      body,
    });
    const data = await res.json();
    if (data === "200") window.location.pathname = "/";
  } catch (e) {
    console.error(e);
  }
};

// submit이라는 이벤트가 발생하면 다음 동작을 할거다
form.addEventListener("submit", handleSubmitForm);
