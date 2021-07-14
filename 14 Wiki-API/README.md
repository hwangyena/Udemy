# RESTful API

### 💁 학습한 내용
* RESTful API 개념 학습
* Studio 3T for MongoDb - mongodb GUI
* Postman - FE 없이 testing
* Express - route로 chaning 하는 방법
* PUT과 PATCH의 차이

### RESTful 구현
1. /articles
  + **GET** Fetches all the articles
  + **POST** Creates one new article
  + **DELETE** Deletes all the articles

2. /articles/:articleTitle
  + **GET** Fetches the article on (:articleTitle)
  + **PUT** Updates the article on {:articleTitle}
  + **PATCH** Updates the article on {:articleTitle}
  + **DELETE** Deletes the article on {:articleTitle}
