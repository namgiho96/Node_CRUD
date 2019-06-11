var express = require('express');
var Comment = require('../schemas/comment');

var router = express.Router();

router.get('/:id', function (req, res, next) {
  Comment.find({ commenter: req.params.id }).populate('commenter')
    .then((comments) => {
      console.log(comments);
      res.json(comments);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
//게시글 댜큐먼트를 조회하는 라우터입니다. find 메서드에 옵션이 추가되어 있습니다 먼저 댓글을 쓴 사용자의 아이디로 댓글을
//조회한 뒤 populate 매서드로 관련 있는 컬렉션의 다큐먼트를 불러올 수 있습니다 Comment 스키마 commenter 필드의
//ref 가 user로 되어 있으므로 알아서 users 컬렉션에서 사용자 다큐먼트를 찾아 합칩니다 commenter 필드가 사용자 다큐먼트로 치환합니다 이제 commenter 필드는 ObjectId 가아니라
//그 Objectid를 가진 사용자 다큐먼트가 됩니다

router.post('/', function (req, res, next) {
  const comment = new Comment({
    commenter: req.body.id,
    comment: req.body.comment,
  });
  comment.save()
    .then((result) => {
      return Comment.populate(result, { path: 'commenter' });
    })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

//다큐먼트를 등록하는 라우터 입니다 Comment 스키마로 comment 객체를 만들어 다큐먼트 내용을 넣은 뒤 save 메서드로 저장합니다
//프로미스의 결과로 반환된 result 객체를 populate 메서드로 User 스키마와 합쳤습니다 path 옵션으로 어떤 필드를 합칠지 설정해주면 됩니다
//이것이 save 한 뒤에 populate를 하는 방법입니다.

router.patch('/:id', function (req, res, next) {
  Comment.update({ _id: req.params.id }, { comment: req.body.comment })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
//다큐먼트를 수정하는 라우터입니다 수정에는 update 메서드를 사용합니다 시퀄라이즈와는 반대로 update 메서드에는 어떤
//다큐먼트를 수정할지에 대한 쿼리 객체를 첫 번째 인자로 제공하고 두번째 인자로는 수정할 필드와 값이 들어있는 객체를 제공합니다
//몽고디비와 다르게 $set 연산자를 사용하지 않아도 기입한 필드만 바꿔줍니다 실수로 다큐먼트를 통째로 수정할 일이 없어 안전합니다

router.delete('/:id', function (req, res, next) {
  Comment.remove({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
//다큐먼트를 삭제하는 라우터 입니다 remove 메서드를 사용하여 삭제합니다 remove 메서드에도 update 메서드와 유사하게 어떤 다큐먼트를 삭제할지 첫번째 객체에 조건을 넣어줍니다
module.exports = router;
