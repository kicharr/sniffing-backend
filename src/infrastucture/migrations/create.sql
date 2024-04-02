CREATE TABLE users
(
    id                uuid PRIMARY KEY,
    first_name        VARCHAR,
    second_name       VARCHAR,
    birth_date        timestamp,
    registration_date timestamp,
    sex               VARCHAR(6),
    avatar_url        VARCHAR
);

CREATE TABLE articles
(
    id          uuid PRIMARY KEY,
    title       VARCHAR,
    body        VARCHAR,
    create_date timestamp default now(),
    preview_url VARCHAR
);

CREATE TABLE articles_authors
(
    user_id    uuid references users (id) on delete cascade,
    article_id uuid references articles (id) on delete cascade,
    PRIMARY KEY (user_id, article_id)
);

