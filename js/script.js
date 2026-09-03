
// ==========================
// 起動時ローディング
// ==========================

window.addEventListener('load', () => {

    const loading = document.getElementById('loading');

    if (loading) {

        // 画像がゆっくり表示される時間を待つ
        setTimeout(() => {
            loading.classList.add('hide');
        }, 1500);

    }

});





document.addEventListener('DOMContentLoaded', () => {
  // .fade クラスを持つすべての要素を取得
  const fadeElements = document.querySelectorAll('.fade');

  // Intersection Observer のオプション設定
  const observerOptions = {
    root: null, // ビューポートを基準にする
    rootMargin: '0px 0px -100px 0px', // 画面下に100px入ったタイミングで発火
    threshold: 0.1 // 要素が10%見えたら判定
  };

  // 交差判定時の処理
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 画面内に入ったら .show クラスを追加
        entry.target.classList.add('show');
        // 一度表示されたら監視を解除（1回のみアニメーションさせる場合）
        observer.unobserve(entry.target);
      }
    });
  };

  // Intersection Observer のインスタンスを作成
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // 各 .fade 要素の監視を開始
  fadeElements.forEach(element => {
    observer.observe(element);
  });
});

// トップに戻るボタンの制御
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    // スクロール時の判定（200px以上スクロールしたら表示）
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollTopBtn.classList.add('is-active');
        } else {
            scrollTopBtn.classList.remove('is-active');
        }
    });

    // ボタンクリック時にスムーズに最上部へ戻る
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}



document.addEventListener('DOMContentLoaded', () => {
    // 1. すべての星マークテキスト（★/☆）を1文字ずつ<span>タグで自動分割
    const ratingContainers = document.querySelectorAll('.star-rating');
    
    ratingContainers.forEach(container => {
        const text = container.textContent.trim();
        container.textContent = ''; // 一旦テキストをクリア
        
        [...text].forEach(char => {
            const span = document.createElement('span');
            span.classList.add('star');
            span.textContent = char;
            container.appendChild(span);
        });
    });

    // 2. スクロール検知（Intersection Observer）で画面に入ったら表示
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // セクションが画面に入ったら各ブロックごとに順番に星を表示
                const stars = entry.target.querySelectorAll('.star');
                stars.forEach((star, index) => {
                    setTimeout(() => {
                        star.classList.add('is-visible');
                    }, index * 100); // 120ミリ秒（0.12秒）間隔で左から順に表示
                });
                
                // 一度表示されたら監視を解除
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // セクションが30%見えたら発火

    // 監視対象を登録
    const statusSection = document.querySelector('#status-section');
    if (statusSection) {
        observer.observe(statusSection);
    }
});