// epaper-control.js

const listContainer = document.getElementById('epaper-list');
const viewer = document.getElementById('epaper-viewer');
const swiperWrapper = document.getElementById('swiper-wrapper');
const thumbWrapper = document.getElementById('thumb-wrapper');

let mySwiper = null; 
let thumbsSwiper = null;

function initEpaperList() {
    listContainer.innerHTML = '';
    if (typeof epaperData === 'undefined' || epaperData.length === 0) {
        listContainer.innerHTML = '<div class="col-12 text-center">無資料</div>';
        return;
    }
    epaperData.forEach(issue => {
        let publishDate = issue.publishDate;
        
        if (!publishDate) {
            const dateParts = issue.id.split('-');
            publishDate = dateParts.length === 2 ? `${dateParts[0]}年${dateParts[1]}月` : issue.id;
        }

        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="card epaper-card shadow-sm border-0">
                <div class="epaper-img-container">
                    <img src="${issue.cover}" class="card-img-top" alt="${issue.title}">
                </div>
                
                <div class="card-body text-center d-flex flex-column pt-3">
                    <h5 class="card-title fs-6 mb-1">${issue.title}</h5>
                    
                    <small class="text-secondary d-block mb-2" style="font-size: 0.85rem;">
                        出版日期&nbsp;${publishDate}
                    </small>
                    
                    <small class="text-muted pb-3">點擊閱讀</small>
                </div>
            </div>
        `;
        col.querySelector('.epaper-card').addEventListener('click', () => {
            openViewer(issue.pages);
        });
        listContainer.appendChild(col);
    });
}

function openViewer(pages) {
    swiperWrapper.innerHTML = '';
    thumbWrapper.innerHTML = '';

    pages.forEach(imgSrc => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="swiper-zoom-container">
                <img src="${imgSrc}" loading="lazy" alt="Page" />
            </div>
        `;
        swiperWrapper.appendChild(slide);

        const thumbSlide = document.createElement('div');
        thumbSlide.className = 'swiper-slide';
        thumbSlide.innerHTML = `<img src="${imgSrc}" alt="Thumbnail" />`;
        thumbWrapper.appendChild(thumbSlide);
    });

    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';

    resetThumbState();

    if (mySwiper) { mySwiper.destroy(true, true); mySwiper = null; }
    if (thumbsSwiper) { thumbsSwiper.destroy(true, true); thumbsSwiper = null; }

    thumbsSwiper = new Swiper(".thumbSwiper", {
        spaceBetween: 10,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesProgress: true,
    });

    mySwiper = new Swiper(".mySwiper", {
        effect: 'slide',   
        speed: 600,        
        spaceBetween: 30,  
        
        zoom: true, 
        loop: false,
        keyboard: { enabled: true },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
            formatFractionCurrent: (num) => '第 ' + num,
            formatFractionTotal: (num) => num + ' 頁'
        },
        mousewheel: true,
        thumbs: {
            swiper: thumbsSwiper,
        },
        on: {
            click: function (swiper, event) {
                const target = event.target;
                if (target.tagName === 'IMG') return;
                if (target.closest('.swiper-button-next') || target.closest('.swiper-button-prev')) return;
                if (target.closest('#toggleThumbsBtn')) return;

                const windowWidth = window.innerWidth;
                const clickX = event.clientX;
                const safeZoneRatio = 0.15;

                if (clickX < windowWidth * safeZoneRatio || clickX > windowWidth * (1 - safeZoneRatio)) {
                    return;
                }
                closeViewer();
            }
        }
    });
}

function closeViewer() {
    viewer.classList.remove('active');
    document.body.style.overflow = '';
    
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
    }
}

function toggleThumbs() {
    const thumbSection = document.getElementById('thumbsSection');
    const btn = document.getElementById('toggleThumbsBtn');
    
    thumbSection.classList.toggle('collapsed');

    if (thumbSection.classList.contains('collapsed')) {
        btn.innerHTML = '<i class="bi bi-chevron-up"></i> 顯示縮圖';
        btn.style.bottom = '0px'; 
    } else {
        btn.innerHTML = '<i class="bi bi-chevron-down"></i> 隱藏縮圖';
        btn.style.bottom = '120px'; 
    }

    setTimeout(() => {
        if (mySwiper) mySwiper.update();
    }, 350);
}

function resetThumbState() {
    const thumbSection = document.getElementById('thumbsSection');
    const btn = document.getElementById('toggleThumbsBtn');
    
    thumbSection.classList.remove('collapsed');
    btn.innerHTML = '<i class="bi bi-chevron-down"></i> 隱藏縮圖';
    btn.style.bottom = '120px';
}

function zoomIn() {
    if (mySwiper && mySwiper.zoom) mySwiper.zoom.in();
}

function zoomOut() {
    if (mySwiper && mySwiper.zoom) mySwiper.zoom.out();
}

async function downloadImage() {
    if (!mySwiper) return;
    
    const activeIndex = mySwiper.activeIndex;
    const activeSlide = mySwiper.slides[activeIndex];
    const img = activeSlide.querySelector('img');

    if (img && img.src) {
        try {
            const response = await fetch(img.src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `epaper-page-${activeIndex + 1}.jpg`; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('下載失敗:', error);
            alert('無法直接下載，將為您開啟圖片，請按右鍵另存。');
            window.open(img.src, '_blank');
        }
    }
}

function toggleFullscreen() {
    const elem = document.documentElement;
    
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) elem.requestFullscreen();
        else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
        else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
        
        const icon = document.getElementById('fullscreen-icon');
        if(icon) icon.className = "bi bi-fullscreen-exit";
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();

        const icon = document.getElementById('fullscreen-icon');
        if(icon) icon.className = "bi bi-arrows-fullscreen";
    }
}

function shareNewsletter() {
    const shareData = {
        title: '電子報分享',
        text: '快來看看這份電子報！',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch((err) => console.log('分享取消', err));
    } else {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('網址已複製到剪貼簿！'))
            .catch(() => alert('複製失敗'));
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && viewer.classList.contains('active')) {
        closeViewer();
    }
});

document.addEventListener('DOMContentLoaded', initEpaperList);