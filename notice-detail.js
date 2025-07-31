import { db } from './firebase-config.js';
import { doc, getDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

const params = new URLSearchParams(window.location.search);
const noticeId = params.get('id');

const detailContainer = document.getElementById('notice-detail');

if (!noticeId) {
  detailContainer.innerHTML = '<p class="text-red-500">잘못된 접근입니다.</p>';
} else {
  displayDetail(noticeId);
}

async function displayDetail(id) {
  const docRef = doc(db, 'notices', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    detailContainer.innerHTML = '<p class="text-red-500">존재하지 않는 공지입니다.</p>';
    return;
  }

  const data = docSnap.data();
  detailContainer.innerHTML = `
    <img src="${data.imageUrl}" class="w-full max-w-3xl mx-auto mb-4 object-contain">
    <h1 class="text-2xl font-bold mb-2">${data.title}</h1>
    <p class="mb-4">${data.content}</p>
    <div id="admin-buttons" class="hidden space-x-2">
      <button class="bg-yellow-500 px-4 py-2 text-white rounded" onclick="editNotice()">수정</button>
      <button class="bg-red-600 px-4 py-2 text-white rounded" onclick="deleteNotice()">삭제</button>
    </div>
  `;

  // 관리자 인증 체크
  const isAdmin = localStorage.getItem('admin') === 'true';
  if (isAdmin) {
    document.getElementById('admin-buttons').classList.remove('hidden');
  }
}

window.editNotice = () => {
  window.location.href = `notice-edit.html?id=${noticeId}`;
};

window.deleteNotice = async () => {
  if (confirm('정말 삭제하시겠습니까?')) {
    await deleteDoc(doc(db, 'notices', noticeId));
    alert('삭제되었습니다.');
    window.location.href = 'index.html';
  }
};
