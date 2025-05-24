// 관리자 코드
const ADMIN_CODE = "508116";

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 로컬 스토리지에서 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        showDashboard();
        loadApplications();
    } else {
        showLoginForm();
    }

    // 코드 입력 필드에서 Enter 키 처리
    document.getElementById('adminCode').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            login();
        }
    });
});

// 로그인 함수
function login() {
    const codeInput = document.getElementById('adminCode');
    const errorMessage = document.getElementById('errorMessage');
    const enteredCode = codeInput.value;

    if (enteredCode === ADMIN_CODE) {
        localStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
        loadApplications();
        codeInput.value = '';
        errorMessage.style.display = 'none';
    } else {
        errorMessage.style.display = 'block';
        codeInput.value = '';
    }
}

// 로그아웃 함수
function logout() {
    localStorage.removeItem('adminLoggedIn');
    showLoginForm();
}

// 대시보드 표시
function showDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

// 로그인 폼 표시
function showLoginForm() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
}

// 전체 선택 토글
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.application-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
    updateDeleteButton();
}

// 삭제 버튼 상태 업데이트
function updateDeleteButton() {
    const deleteButton = document.getElementById('deleteSelected');
    const checkedBoxes = document.querySelectorAll('.application-checkbox:checked');
    deleteButton.style.display = checkedBoxes.length > 0 ? 'block' : 'none';
}

// 선택된 항목 삭제
async function deleteSelected() {
    const checkedBoxes = document.querySelectorAll('.application-checkbox:checked');
    if (!checkedBoxes.length) return;

    if (confirm('선택한 신청서를 삭제하시겠습니까?')) {
        try {
            for (const checkbox of checkedBoxes) {
                await db.collection('applications').doc(checkbox.dataset.id).delete();
            }
            alert('선택한 신청서가 삭제되었습니다.');
            document.getElementById('selectAll').checked = false;
            updateDeleteButton();
        } catch (error) {
            console.error('삭제 중 오류 발생:', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
    }
}

// 신청 데이터 로드
function loadApplications() {
    const applicationsList = document.getElementById('applicationsList');
    
    // 실시간 업데이트 리스너 설정
    db.collection('applications')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            applicationsList.innerHTML = ''; // 기존 내용 초기화
            
            snapshot.forEach((doc) => {
                const data = doc.data();
                const item = createApplicationItem(doc.id, data);
                applicationsList.appendChild(item);
            });

            // 전체 선택 체크박스 초기화
            document.getElementById('selectAll').checked = false;
            updateDeleteButton();
        }, (error) => {
            console.error('데이터 로드 실패:', error);
        });
}

// 신청 항목 생성
function createApplicationItem(docId, data) {
    const item = document.createElement('div');
    item.className = 'application-item';
    
    const date = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString() : '날짜 없음';
    
    item.innerHTML = `
        <div class="checkbox-wrapper" data-label="">
            <input type="checkbox" class="application-checkbox" data-id="${docId}" onchange="updateDeleteButton()">
        </div>
        <div data-label="이름: ">${data.name}</div>
        <div class="motivation-text" data-label="신청동기: ">${data.motivation}</div>
        <div data-label="이메일: ">${data.email}</div>
        <div data-label="연락처: ">${data.phone}</div>
        <div data-label="신청일: ">${date}</div>
    `;
    
    return item;
} 