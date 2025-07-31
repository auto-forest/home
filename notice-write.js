import { db, storage } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js';

document.getElementById('noticeForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const imageFile = document.getElementById('image').files[0];

  if (!title || !content || !imageFile) {
    alert('제목, 내용, 이미지를 모두 입력하세요.');
    return;
  }

  try {
    const storageRef = ref(storage, 'notices/' + Date.now() + '_' + imageFile.name);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'notices'), {
      title,
      content,
      imageUrl,
      createdAt: serverTimestamp()
    });

    alert('공지사항이 등록되었습니다.');
    window.location.href = 'index.html';
  } catch (error) {
    console.error(error);
    alert('등록 중 오류가 발생했습니다.');
  }
});
