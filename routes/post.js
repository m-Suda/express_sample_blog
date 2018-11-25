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


// 新規作成画面
exports.new = (req, res) => {

    res.render('posts/new');
};

// 新規作成処理
exports.create = (req, res) => {

    var post = {
        title: req.body.title,
        body: req.body.body
    };

    posts.push(post);
    res.redirect('/');
};

// 編集画面
exports.edit = (req, res) => {

    res.render('posts/edit',
        {
            post: posts[req.params.id],
            id: req.params.id
        }
    );
};

// 更新処理
exports.update = (req, res, next) => {

    if (req.body.id !== req.params.id) {
        next(new Error('ID is not valid'));
        return;
    }

    posts[req.body.id] = {
        title: req.body.title,
        body: req.body.body
    };
    res.redirect('/');

};

// 削除処理
exports.destroy = (req, res, next) => {

    if (req.body.id !== req.params.id) {
        next(new Error('ID is not valid'));
        return;
    }

    // 指定された配列の要素を指定された数の分削除する。
    posts.splice(req.body.id, 1);
    res.redirect('/');
}