import { insertMenuBar } from "./menu-bar.js"

// init
insertMenuBar()

// Presentation Popup 기능
function initPresentationPopup() {
    const popup = document.getElementById('presentation-popup');
    const closeBtn = popup.querySelector('.popup-close');
    const iframe = document.getElementById('presentation-iframe');
    const presentationLinks = document.querySelectorAll('.presentation-link');
    
    // 팝업 열기
    presentationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const slideUrl = link.getAttribute('data-slide-url');
            if (slideUrl) {
                iframe.src = slideUrl;
                popup.classList.add('active');
                document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
            }
        });
    });
    
    // 팝업 닫기
    function closePopup() {
        popup.classList.remove('active');
        iframe.src = ''; // iframe 리소스 해제
        document.body.style.overflow = ''; // 배경 스크롤 복원
    }
    
    closeBtn.addEventListener('click', closePopup);
    
    // 오버레이 클릭 시 닫기
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    // ESC 키로 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
}

// DOM 로드 완료 후 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresentationPopup);
} else {
    initPresentationPopup();
}