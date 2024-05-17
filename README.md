## public 사용시 유의사항

> public 디렉터리에 위치해 있는 에셋을 가져오고자 하는 경우, 항상 루트를 기준으로 하는 절대 경로로 가져와야만 합니다. ( public/icon.png 에셋은 소스 코드에서 /icon.png으로 접근이 가능합니다.) public 디렉터리에 위치한 에셋은 JavaScript > 코드로 가져올 수 없습니다.

> 컴포넌트와 페이지는 Pascal Case로 작성합니다
> 컴포넌트는 arrow function 형태로 작성합니다.

    예시를 들자면 아래처럼 작성해주세요.
    const TestPage = () => export default TestPage;
    단 페이지 컴포넌트는 뒤에 Page네이밍을 붙여주시고
    컴포넌트는 붙이지 않습니다.

## 폴더 구조 설명
    📦src
    ┣ 📂assets
    ┃ ┣ 📂icon
    ┃ ┗ 📂logo
    ┣ 📂components
    ┃ ┣ 📂Layout
    ┃ ┗ 📂common
    ┣ 📂hooks
    ┣ 📂icons
    ┃ ┣ 📂icon
    ┃ ┣ 📂logo
    ┣ 📂interfaces
    ┣ 📂mocks
    ┣ 📂pages
    ┣ 📂router
    ┣ 📂styles
    ┣ 📂types
    ┣ 📂utils


## Usage
    1. npm, node 설치가 필요합니다.
    2. yarn 설치 필요합니다
    3. 사전 설치 후 프로젝트를 클론합니다.
    4. pacakage.json 파일이 있는 경로에서 
    yarn install 명령어를 입력하여 의존성을 설치합니다.
    5. yarn prepare 명령어를 입력하여 husky를 설치합니다.
    6. yarn dev 명령어를 입력하여 프로젝트를 실행합니다.