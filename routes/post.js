var posts = [
    {title: 'title0', body: 'body0'},
    {title: 'title1', body: 'body1'},
    {title: 'title2', body: 'body2'}
];

// 一覧画面
exports.index = (req, res) => {

    res.render('posts/index', {posts: posts});
};

// 詳細画面
exports.show = (req, res) => {

    res.render('posts/show', {post: posts[req.params.id]});
};
