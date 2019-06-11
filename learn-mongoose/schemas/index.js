const mongoose = require('mongoose');

module.exports = () =>{
  const connect = () =>{

    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    //개발 환경이 아닐때 몽구스가 생성하는 쿼리 내용을 콘솔을 통해 확인할수 있는 부분입니다
    mongoose.connect('mongodb://namgiho:1234@localhost:27017/admin',{
      dbName : 'nodejs',
    }, (error)=>{
      if (error) {
        console.log('몽고디비 연결 에러 ',error);
      }else{
        console.log('몽고디비 연결 성공');
      }
    });
    //몽구스와 몽고디비를 연결하는 부분입니다 몽고디비 주소로 접속을 시도합니다. 접속을 시도하는 주소의 데이터베이스는 admin 이지만
    //실제로 사용할 데이터베이스는 nodejs 이므로 두번째 인자로 dbName 옵션을 주어 nodejs 데이터베이스를 사용하게 했습니다 마지막 인자로 주어진 콜백 함수를 통해 연결여부를 확인합니다
  };
  connect();
  mongoose.connection.on('error',(error)=>{
    console.error('몽고디비 연결 에러',error);
  });
  mongoose.connection.on('disconnected',()=>{
    console.error('몽고디비 연결이 끊겼습니다 연결을 재시도 합니다');
    connect();
  });
  //몽구스 커넥션에 이벤트 리스너를 달아두었습니다 에러 발생시 에러 내용을 기록하고 연결 종료시 재연결을 시도합니다
  require('./user');
  require('./comment');
  //스키마 연결하는 부분!!

};