// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
    getDatabase,
    push,
    set,
    ref,
    remove,
    update,
    onValue, // Sử dụng onValue thay vì get để lắng nghe sự thay đổi dữ liệu
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

// Firebase configuration (replace with your own Firebase project credentials)
const firebaseConfig = {
    apiKey: "AIzaSyCf7SsnI44vm30MP71lc0YVHHI6DtjP5Bc",
    authDomain: "myproject-fb3fe.firebaseapp.com",
    projectId: "myproject-fb3fe",
    storageBucket: "myproject-fb3fe.appspot.com",
    messagingSenderId: "1069308141712",
    appId: "1:1069308141712:web:68563fd4ce0b82c3a47815",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const add_data = document.getElementById("send_greetings");

function sendGreetings() {
    const name = document.getElementById("fullName").value;
    const content = document.getElementById("content").value;

    const newStudentRef = push(ref(db, "wedding"));

    set(newStudentRef, {
        name: name,
        content: content,
    });
    document.getElementById("fullName").value = "";
    document.getElementById("content").value = "";

    ReadData();
}

add_data.addEventListener("click", sendGreetings);

// Read Data in real-time using onValue
function ReadData() {
    const userRef = ref(db, "wedding/");

    onValue(userRef, (snapshot) => { // Sử dụng onValue để cập nhật dữ liệu theo thời gian thực
        const data = snapshot.val();

        const table = document.querySelector(".wish-box");
        let html = "";

        const keys = Object.keys(data).reverse();

        keys.forEach(key => {
            const { name, content } = data[key];

            html += `
                 <div class="wish-box-item">
                     <strong>${name}</strong>
                     <p>${content}</p>
                 </div>
              `;
        });

        table.innerHTML = html;
    });
}

ReadData();

