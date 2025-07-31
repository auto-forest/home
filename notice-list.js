import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

const noticeContainer = document.getElementById('notice-list');

async function loadNotices() {
  const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const notice = doc.data();
    const id = doc.id;

    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden';

    card.innerHTML = `
      <img src="${notice.imageUrl}" alt="공지 이미지" class="w-full h-60 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold">${notice.title}</h3>
        <a href="notice-detail.html?id=${id}" class="text-blue-600 underline mt-2 inline-block">자세히 보기</a>
      </div>
    `;

    noticeContainer.appendChild(card);
  });
}

loadNotices();
