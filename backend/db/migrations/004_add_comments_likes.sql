CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comments_post_id ON comments(post_id);

CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    is_like BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, post_id)
);

CREATE INDEX idx_likes_post_id ON likes(post_id);
