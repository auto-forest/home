import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-lite.js";

// 관리자 인증
const isAdmin = localStorage.getItem("admin") === "true";

// 문서 ID 가져오기
const params = new URLSearchParams(location.search);
const id = params.get("id");

if (!id) {
  document.getElementById("notice-detail").innerHTML = "<p class='text-center text-red-500'>잘못된 접근입니다.</p>";
} else {
  loadNotice();
}

async function loadNotice() {
  const docRef = doc(db, "notices", id);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    document.getElementById("notice-detail").innerHTML = "<p class='text-center text-red-500'>존재하지 않는 문서입니다.</p>";
    return;
  }

  const data = snap.data();
  const container = document.getElementById("notice-detail");

  container.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">${data.title || "제목 없음"}</h2>
    ${data.imageUrl ? `<img src="${data.imageUrl}" alt="공지 이미지" class="w-full mb-4 rounded">` : ""}
    <p class="text-gray-700 whitespace-pre-line mb-4">${data.content || ""}</p>

    ${isAdmin ? `
      <div class="flex gap-4">
        <button id="edit-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">수정</button>
        <button id="delete-btn" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">삭제</button>
      </div>
    ` : ""}
  `;

  if (isAdmin) {
    document.getElementById("edit-btn").addEventListener("click", () => {
      location.href = `notice-edit.html?id=${id}`;
    });

    document.getElementById("delete-btn").addEventListener("click", async () => {
      const confirmDelete = confirm("정말 삭제하시겠습니까?");
      if (confirmDelete) {
        await deleteDoc(doc(db, "notices", id));
        alert("삭제되었습니다.");
        location.href = "index.html";
      }
    });
  }
}
