// scripts.js

// Guardar y mostrar el perfil
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('profileForm')) {
        document.getElementById('profileForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const profileName = document.getElementById('profileName').value;
            const profilePicture = document.getElementById('profilePicture').files[0];

            const reader = new FileReader();
            reader.onloadend = function () {
                localStorage.setItem('profileName', profileName);
                localStorage.setItem('profilePicture', reader.result);
                alert('Perfil actualizado!');
                displayProfile();
            };
            if (profilePicture) {
                reader.readAsDataURL(profilePicture);
            } else {
                localStorage.setItem('profileName', profileName);
                alert('Perfil actualizado!');
                displayProfile();
            }
        });
    }

    function displayProfile() {
        const profileName = localStorage.getItem('profileName');
        const profilePicture = localStorage.getItem('profilePicture');
        if (profileName && profilePicture) {
            document.getElementById('profileDisplay').innerHTML = `
                <p>Nombre: ${profileName}</p>
                <img src="${profilePicture}" alt="Foto de Perfil">
            `;
        }
    }

    if (document.getElementById('profileDisplay')) {
        displayProfile();
    }

    // Publicar una nueva publicación
    if (document.getElementById('postForm')) {
        document.getElementById('postForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const postContent = document.getElementById('postContent').value.trim();
            if (postContent === '') return;

            const postId = Date.now();
            const post = {
                id: postId,
                content: postContent,
                comments: [],
                likes: 0
            };
            localStorage.setItem(`post-${postId}`, JSON.stringify(post));
            document.getElementById('postContent').value = '';
            window.location.href = 'publicaciones.html'; // Redireccionar a la página de publicaciones
        });
    }

    // Mostrar todas las publicaciones en la página de publicaciones
    function displayPosts() {
        const postsContainer = document.getElementById('postsContainer');
        if (!postsContainer) return;
        postsContainer.innerHTML = '';

        // Iterar sobre todas las entradas en localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('post-')) {
                const post = JSON.parse(localStorage.getItem(key));

                // Crear elemento HTML para la publicación
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <p>${post.content}</p>
                    <button onclick="likePost(${post.id})">Like (${post.likes})</button>
                    <div>
                        <textarea id="comment-${post.id}" placeholder="Escribe un comentario..."></textarea>
                        <button onclick="commentPost(${post.id})">Comentar</button>
                    </div>
                    <div class="comments">
                        ${post.comments.map((comment, index) => `
                            <div class="comment">
                                <p>${comment.text}</p>
                                <button onclick="likeComment(${post.id}, ${index})">Like (${comment.likes})</button>
                            </div>
                        `).join('')}
                    </div>
                `;
                postsContainer.appendChild(postElement);
            }
        }
    }

    if (document.getElementById('postsContainer')) {
        displayPosts();
    }

    // Función para dar like a una publicación
    window.likePost = function likePost(postId) {
        const postKey = `post-${postId}`;
        let post = JSON.parse(localStorage.getItem(postKey));
        post.likes++;
        localStorage.setItem(postKey, JSON.stringify(post));
        displayPosts(); // Actualizar la lista de publicaciones
    };

    // Función para comentar en una publicación
    window.commentPost = function commentPost(postId) {
        const commentContent = document.getElementById(`comment-${postId}`).value.trim();
        if (commentContent === '') return;

        const postKey = `post-${postId}`;
        let post = JSON.parse(localStorage.getItem(postKey));
        post.comments.push({ text: commentContent, likes: 0 });
        localStorage.setItem(postKey, JSON.stringify(post));
        displayPosts(); // Actualizar la lista de publicaciones
    };

    // Función para dar like a un comentario
    window.likeComment = function likeComment(postId, commentIndex) {
        const postKey = `post-${postId}`;
        let post = JSON.parse(localStorage.getItem(postKey));
        post.comments[commentIndex].likes++;
        localStorage.setItem(postKey, JSON.stringify(post));
        displayPosts(); // Actualizar la lista de publicaciones
    };
});
