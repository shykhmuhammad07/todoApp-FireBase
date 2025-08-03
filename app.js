import { signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { auth } from './config.js';
import { db } from './config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("Logged in user UID:", uid);
  } else {
    window.location.href = './signup.html';
  }
});

const btn = document.getElementById("btn");
const todoInput = document.getElementById("todo");
const getUl = document.getElementById("list");

// Add task
btn.addEventListener("click", async () => {
  const task = todoInput.value.trim();
  if (task === "") {
    Swal.fire({
      icon: "warning",
      title: "Oops!",
      text: "Please enter a task first.",
    });
    return;
  }
     

  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      tasks: task,
      time: Timestamp.now(),
    });
    console.log("Document written with ID: ", docRef.id);
    todoInput.value = "";

    Swal.fire({
      icon: "success",
      title: "Task Added",
      showConfirmButton: false,
      timer: 1200,
    });

    readData();
  } catch (e) {
    console.error("Error adding document: ", e);
    Swal.fire({
      icon: "error",
      title: "Failed to Add",
      text: "Something went wrong!",
    });
  }
});

// Read tasks
const readData = async () => {
  getUl.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "tasks"));
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const id = docSnap.id;
   getUl.innerHTML += `
  <li class="todo-item">
    <span class="todo-text">${data.tasks}</span>
    <div class="todo-actions">
      <button class="btn btn-sm btn-outline" onclick="edit('${id}')">Edit</button>
      <button class="btn btn-sm btn-danger" onclick="delTodo('${id}')">Delete</button>
    </div>
  </li>`;

  });
};

readData();

// Delete task
async function delTodo(id) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This will delete the task permanently!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    await deleteDoc(doc(db, "tasks", id));
    Swal.fire("Deleted!", "Your task has been deleted.", "success");
    readData();
  }
}
window.delTodo = delTodo;

// Edit task
async function edit(id) {
  const { value: updatedValue } = await Swal.fire({
    title: "Update Task",
    input: "text",
    inputLabel: "New task value",
    inputPlaceholder: "Enter updated task",
    showCancelButton: true,
  });

  if (!updatedValue || updatedValue.trim() === "") {
    Swal.fire({
      icon: "warning",
      title: "Invalid input!",
      text: "Task cannot be empty.",
    });
    return;
  }

  const docRef = doc(db, "tasks", id);
  await updateDoc(docRef, {
    tasks: updatedValue.trim(),
    time: Timestamp.now(),
  });

  Swal.fire({
    icon: "success",
    title: "Task Updated",
    showConfirmButton: false,
    timer: 1200,
  });

  readData();
}
window.edit = edit;

let lgbtn = document.getElementById('logout')

lgbtn.addEventListener('click', ()=>{
  signOut(auth)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Logged out!",
        showConfirmButton: false,
        timer: 1200,
      });
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 1200);
    })
    .catch((error) => {
      // Error.
      console.error("Error signing out: ", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to logout.",
      });
    });
})