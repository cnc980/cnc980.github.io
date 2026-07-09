// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.product-card, .feature-item, .download-card, .pricing-card, .testimonial-card, .detail-section');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
    });
});

// 添加 CSS 动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// 导航栏滚动效果
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // 向下滚动，隐藏导航栏
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease';
    } else {
        // 向上滚动或在顶部，显示导航栏
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// 表单提交处理
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('感谢您的留言！我们会尽快与您联系。');
        this.reset();
    });
}

// 控制台欢迎信息
console.log('%c🎬 YingJiang - 创意无限，工具无界', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c欢迎访问我们的官方网站！', 'color: #764ba2; font-size: 14px;');
console.log('%c📦 产品介绍：', 'color: #667eea; font-size: 12px; font-weight: bold;');
console.log('%c- 影匠剪辑: 专业视频编辑工具', 'color: #667eea; font-size: 12px;');
console.log('%c- VPN XX: VPN配置管理工具（不提供VPN服务）', 'color: #667eea; font-size: 12px;');
console.log('%c- SpellVPN: 智能网络加速应用', 'color: #667eea; font-size: 12px;');
console.log('%c📞 客服热线: 400-8888-8888', 'color: #764ba2; font-size: 12px;');
console.log('%c📧 邮箱: support@yingjiang.com', 'color: #764ba2; font-size: 12px;');