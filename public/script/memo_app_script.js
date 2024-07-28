// script.js
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", () => {
  const taskText = taskInput.value;
  if (taskText.trim() !== "") { // 空白のみの場合は追加しない
    const li = document.createElement("li");
    li.textContent = taskText;
    taskList.appendChild(li);
    taskInput.value = ""; // 入力欄をクリア
  }
});
