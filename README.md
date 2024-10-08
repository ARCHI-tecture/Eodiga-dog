# 어디가개

## 1. 프로젝트 설명

기존의 지도들은 반려견 동반이 가능한 가게를 찾는 것이 어려웠다. 따라서 한국문화정보원_전국 반려동물 동반 가능 문화시설 위치 데이터 api를 사용해 반려견 동반이 가능한 가게를 따로 모아놓은 지도 사이트의 필요성을 느껴 제작하고자 한다.

## 2. 주요 기능

### [홈]

- 지도 출력 : 마커를 이용해 반려견 동반 가능 가게 표시
- 사이드 바 출력
- 필터 기능
- 회원 가입 기능
- 로그인 / 로그아웃 기능


### [사이드 바]

- 가게 이름, 지역, 주소 검색
- 홈페이지의 필터 검색

### [상세 정보]

- 제한사항, 운영시간, 위치, 전화번호, 주차 가능 여부 등 표시
- 별점 표시, 리뷰 남기기 기능
- 찜하기 기능

### [마이 페이지]

- 내 즐겨찾기 모아보기 기능
- 내 리뷰 모아보기 기능

## 3. 개발 환경

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Mui](https://img.shields.io/badge/Mui-007FFF?style=for-the-badge&logo=mui&logoColor=white) ![Tailwind](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white) ![MySQL](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=4479A1) ![NextJS](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=000000)

## 4. 팀원 소개

|                                  🐰**이가영**                                  |                            🐣**노효민**                             |                            🐼**손예림**                             |                                  🐹**조다솜**                                  |
| :----------------------------------------------------------------------------: | :-----------------------------------------------------------------: | :-----------------------------------------------------------------: | :----------------------------------------------------------------------------: |
| <img src="https://i.ibb.co/7yBsKX8/porfolio-profile.jpg" height=220 width=180> | <img src="https://i.ibb.co/Hd9Pz5B/image.jpg" height=220 width=180> | <img src="https://i.ibb.co/DpmsYD3/image.png" height=220 width=180> | <img src="https://i.ibb.co/L0wswBF/removebg-preview.png" height=220 width=180> |
|                          팀장, FE, BE<br>메인 홈페이지                           |                         FE, BE<br>사이드 바, 검색, 로그인/회원가입 UI                         |                      FE, BE<br>컴포넌트 구성, 마이페이지 UI, 로그인/회원가입                      |                               FE, BE<br>마이페이지, 상세 정보 페이지                                |

## 6. 구조

```
src
 ┣ components
 ┃ ┗ layout
 ┣ pages
 ┃ ┣ category
 ┃ ┃ ┣ categoryHeader
 ┃ ┃ ┣ categoryList
 ┃ ┃ ┗ type.ts
 ┃ ┣ home
 ┃ ┃ ┣ button
 ┃ ┃ ┣ calendar
 ┃ ┃ ┣ feed
 ┃ ┃ ┗ types.ts
 ┃ ┣ record
 ┃ ┣ routine
 ┃ ┃ ┣ RoutineCategory
 ┃ ┃ ┣ RoutineList
 ┃ ┃ ┗ RoutineType.ts
 ┃ ┗ timer
 ┣ styles
 ┃ ┗ tailwind.css
 ┣ App.css
 ┣ App.tsx
 ┣ index.css
 ┣ index.tsx
 ┗ setupTests.ts
```

## 7. 트러블 슈팅

#### 1. 노효민

#### - 원인

필터 검색 기능을 구현하는 과정에서 카테고리 버튼의 이름이 OpenApi에서 제공하는 값과 일치하지 않는 문제가 발생했습니다. 그결과 버튼을 클릭해도 해당 카테고리에 맞는 데이터가 제대로 필터링 되지 않았습니다. 이로 인해 검색 결과가 정확하지 않거나 아예 표시 되지 않는 문제가 발생하였습니다. 각 버튼에 맞는 API 값을 직접적으로 매칭하기 어려웠고, 필터링 로직에 대해 고민이 필요했습니다.

#### - 해결

처음에는 OpenAPI 데이터를 수정하거나 별도로 매칭 테이블을 만드는 방안을 고려했지만, 그러기엔 너무 프로젝트가 진행되어서 별도 테이블을 생성하기 어려운 상황이었습니다. 
카테고리2, 카테고리3 속성에 포함된 값을 활용하기로 결정하였고 include 함수를 사용하여 버튼 클릭 시 해당 카테고리가 카테고리2나 카테고리3 속성에 포함되어 있는지 여부를 기준으로 필터링을 구현하였습니다. 이 방법으로 카테고리 이름과 OpenApi데이터 간의 불일치 문제를 해결할 수 있었습니다.

#### 2. 조다솜

#### - 원인

별점 평균을 계산할 때, 리뷰에 변동이 없는데도 useEffect 안에서 별점이 꾸준히 렌더링되는 에러가 발생.

#### - 해결

별점 평균을 업데이트하는 useEffect에서 이전 별점(prevRating)과 현재 별점(currentRating)이 동일한 경우, 상태를 변경하지 않도록 조건을 추가. 이렇게 하면 별점이 변경되지 않았을 때 불필요한 렌더링을 방지하는데 성공.

#### 3. 손예림

#### - 원인



#### - 해결

## 8. 개발 후기

| 🐰**이가영**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 🐣**노효민**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|이번 프로젝트는 이전에 진행했던 주제와 일부 겹치는 부분이 있어 팀원들이 걱정했지만, 다른 언어로 진행되었고, 저번에 맡지 않았던 기능들을 중점으로 개발하면 문제가 없다는 결론을 내렸습니다. 또한, 저번 토이 프로젝트에서 TypeScript를 충분히 활용하지 못한 아쉬움이 있어, 이번 프로젝트에서는 더욱 깊이 있게 학습하기 위해 TypeScript를 선택했습니다. 팀원들 모두 Next.js를 사용해보고자 하여, 약 10일 동안 Next.js를 공부한 후 본격적으로 프로젝트를 시작했습니다. Next.js는 처음 사용해보는 기술이라 폴더 구조를 설계하는 데 어려움을 겪었지만, 이를 통해 구조적인 이해를 쌓는 계기가 되었습니다. 협업 과정에서는 GitHub를 사용했는데, .gitignore 파일에 Next.js 폴더를 제외하려고 했으나 제대로 적용되지 않아, 커밋할 때마다 직접 폴더를 삭제하는 번거로움이 있었습니다. 처음에는 ListStation 컴포넌트에 카드 형식으로 데이터를 표시하려 했으나, 한 화면에 많은 정보를 표시하기 어려울 것 같아 무한 스크롤을 구현하려 했습니다. 하지만 자연스럽게 스크롤이 형성되었고, 무한 스크롤 대신 스크롤이 끝까지 가면 맨 위로 올려주는 ScrollTopButton만 추가하는 방식으로 변경하였습니다. 이번 프로젝트를 통해 Next.js의 구조와 활용법을 깊이 있게 학습할 수 있었고, TypeScript에 대한 이해도도 크게 높일 수 있었습니다. 특히 우선순위를 정해 큰 틀을 먼저 만들고, 어려운 문제는 팀원들과 공유하며 해결하는 협업 방식을 통해 더욱 효율적으로 프로젝트를 마무리할 수 있었습니다. 앞으로도 유지 보수하며 개선할 계획입니다.                                                                                                                                                          |
| 🐼**손예림**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Next.js를 처음 사용해본 프로젝트라서 Next.js를 공부하는 것으로 시작해 SSR을 경험해본 것이 굉장히 좋았습니다. React에서 Route를 사용할 때와 달리 폴더를 만들면 Rest Api Path로 작동되는 부분이 인상깊었고, TypesScript도 단순히 string, number 뿐만이 아닌 ReactNode, HtmlInputElement 같은 타입도 알게되면서 조금 더 엄격한 코드 작성이 가능했습니다. 또한 공통 컴포넌트 제작을 맡게 되어서 다른 팀원분들이 어떻게 해야 이 코드를 쉽게 이해할 수 있을까, 어디까지 허용해야 사용하기 괜찮은 컴포넌트일까를 계속 고민해볼 수 있어서 좋았습니다. 이번 프로젝트를 끝내고 어떻게 해야 더 성장할 수 있을지에 대한 고민이 생겼고, 단순히 UI를 만들고 기능을 연결하는 것이 아닌 그보다 더 깊은 문제를 해결 해봐야겠다는 생각이 들었습니다.                                                                                                                                                                                                                                                                                                                                                                                       |
| 🐹**조다솜**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|이번 프로젝트를 통해 OpenAPI와 Next.js를 처음 사용했습니다. Next.js의 파일 기반 구조는 초기에는 어렵게 느껴졌지만, 이를 익히면서 백엔드와 프론트엔드 간의 경계를 허물어 데이터 송수신이 원활해졌습니다. 특히 OpenAPI와 SQL 데이터 처리 덕분에 데이터 통합과 렌더링 속도가 크게 개선되었습니다. 서버 사이드 렌더링 기능을 통해 페이지 로딩 속도가 빨라지고, 전체적인 성능이 향상되었습니다. 결과적으로, Next.js와 OpenAPI의 통합을 통해 보다 체계적이고 효율적인 개발 환경을 구축할 수 있었습니다.  |
