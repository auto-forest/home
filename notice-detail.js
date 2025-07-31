import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-lite.js";

// 문서 ID 가져오기
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// 잘못된 접근 처리
if (!id) {
  document.getElementById("notice-detail").innerHTML = "<p class='text-center text-red-500'>잘못된 접근입니다.</p>";
} else {
  const docRef = doc(db, "notices", id);
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      const title = data.title || "제목 없음";
      const content = data.content || "";
      const imageUrl = data.imageUrl || "";

      // 관리자 모드인지 확인
      const isAdmin = localStorage.getItem("isAdmin") === "true";

      // HTML 생성
      document.getElementById("notice-detail").innerHTML = `
        <div class="bg-white shadow p-6 rounded-lg max-w-2xl mx-auto">
          <h2 class="text-2xl font-bold mb-4">${title}</h2>
          ${imageUrl ? `<img src="${imageUrl}" alt="공지 이미지" class="w-full mb-4 rounded" />` : ""}
          <p class="mb-4 whitespace-pre-line">${content}</p>
          ${
            isAdmin
              ? `<div class="flex justify-end space-x-2">
                  <a href="notice-edit.html?id=${id}" class="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">수정</a>
                  <button id="delete-btn" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">삭제</button>
                </div>`
              : ""
          }
        </div>
      `;

      // 삭제 버튼 이벤트
      if (isAdmin) {
        document.getElementById("delete-btn").addEventListener("click", async () => {
          if (confirm("정말 삭제하시겠습니까?")) {
            await deleteDoc(docRef);
            alert("삭제되었습니다.");
            window.location.href = "index.html";
          }
        });
      }
    } else {
      document.getElementById("notice-detail").innerHTML = "<p class='text-center text-gray-500'>문서를 찾을 수 없습니다.</p>";
    }
  });
}
