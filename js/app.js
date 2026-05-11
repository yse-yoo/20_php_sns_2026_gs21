// ユーザメニューとポップアップの取得
function apiUrl(path) {
    const base = window.APP_BASE_URL ?? '/';
    return `${base}${path}`;
}

const userMenu = document.getElementById('user-menu');
const userPopup = document.getElementById('user-popup');

// ユーザメニューのクリックでポップアップの表示／非表示を切り替え
userMenu?.addEventListener('click', (e) => {
    e.stopPropagation(); // クリックイベントのバブリングを防ぐ
    userPopup.classList.toggle('hidden');
});

// ページ内の他の箇所がクリックされた場合はポップアップを非表示にする
document.addEventListener('click', () => {
    if (!userPopup) return;
    if (!userPopup.classList.contains('hidden')) {
        userPopup.classList.add('hidden');
    }
});

function inputTestRegistUser() {
    document.getElementById('account_name').value = 'user1';
    document.getElementById('display_name').value = 'Test User1';
    document.getElementById('email').value = 'user1@test.com';
    document.getElementById('password').value = '1111';
}

function inputTestLoginUser() {
    document.getElementById('account_name').value = 'user1';
    document.getElementById('password').value = '1111';
}

function updateLike(target) {
    target.closest('form').submit()
}

function deleteTweet(target) {
    if (!confirm('削除しますか？')) {
        return;
    }
    target.closest('form').submit()
}

// ハッシュタグ
document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".tweet-message").forEach(el => {

        const text = el.innerHTML;

        // # japan → ハッシュタグ化
        const linked = text.replace(
            /#\s*([一-龯ぁ-んァ-ンーA-Za-z0-9_]+)/gu,
            (match, tag) => {
                return `<a href="home/search.php?keyword=%23${encodeURIComponent(tag)}"
                            class="text-blue-500 hover:underline">${match}</a>`;
            }
        );

        el.innerHTML = linked;

        // 本文クリックで詳細へ
        el.addEventListener("click", function (e) {

            // ハッシュタグクリック時は除外
            if (e.target.closest("a")) {
                return;
            }

            const tweetId = el.dataset.id;
            window.location.href = `home/detail.php?id=${tweetId}`;
        });

    });

});