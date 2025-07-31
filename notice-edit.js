import { db } from './firebase-config.js';
import { doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

const params = new URLSearchParams(window.location.search);
const noticeId = params.get('id');

const form = document.getElementById('editForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');

if (!noticeId) {
  alert('잘못된 접근입니다.');
  window.location.href = 'index.html';
}

async function loadNotice() {
  const docRef = doc(db, 'notices', noticeId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    titleInput.value = data.title;
    contentInput.value = data.content;
  } else {
    alert('존재하지 않는 공지입니다.');
    window.location.href = 'index.html';
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newTitle = titleInput.value.trim();
  const newContent = contentInput.value.trim();

  await updateDoc(doc(db, 'notices', noticeId), {
    title: newTitle,
    content: newContent
  });

  alert('수정 완료되었습니다.');
  window.location.href = `notice-detail.html?id=${noticeId}`;
});

loadNotice();
