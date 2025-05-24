// 관리자 계정 생성을 위한 스크립트
const adminEmail = "admin@admin.com";  // 관리자 이메일
const adminPassword = "000000";        // 관리자 비밀번호

// Firebase 초기화 후
firebase.auth().createUserWithEmailAndPassword(adminEmail, adminPassword)
    .then((userCredential) => {
        console.log('관리자 계정이 생성되었습니다:', userCredential.user.email);
    })
    .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('이미 계정이 존재합니다. 로그인하세요.');
        } else {
            console.error('계정 생성 오류:', error);
        }
    }); 