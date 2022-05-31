# 響應式網頁製作: **chatTalker AI 機器人**
> **六角學院 | 2022 公益程式體驗營**<br>
> 任務二 - chatTalker AI 機器人<br>
> 成品 https://gretali.github.io/chatTalker/

## 任務資訊

### 設計稿

[chatbot_UI](https://xd.adobe.com/view/4922398e-1a6e-4d4b-848c-044a079713bb-1c71/screen/cb9d2488-08ba-4589-98ad-eecdb84dcb93/specs/)

### **作業等級表**

1. Lv1：做其中一頁的 RWD 頁面，畫面不可顯示 x 軸，背景球可以不做
2. Lv2：做所有 RWD 頁面，且 JS 效果都做，畫面不可顯示 x 軸  `挑戰 Lv2`

### **x 軸備註**

- 還請不要在 body 或第一層 div 加上 overflow:hidden 來規避 x 軸問題

## 助教回饋
TBA

---

# CSS 筆記

### 斷點設計

- mobile-first
- 解析度由小到大
- 375px → min 768px → min 992px

### CSS 基本設定

```css
/* CSS reset 重設*/

/* CSS base 基本設定*/
*, *::before, *::after{
  box-sizing: border-box;
}

body{
  font-family:
    line-height: 1.5;
}

img{
  max-width: 100%;
  height: auto;
}

a{
  text-decoration: none;
}

/* 右下角小字 */
sub{
  vertical-align: sub;
}
```

### container 外容器設定

- 1366 - 139 - 139 + 16 + 16 = 1120 px

```css
.container {
  max-width: 1120px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}
```

### 內容器設定

```css
.card{
	margin-left: -8px;
	margin-right: -8px;
}
.card-item{
	width: 100%;
	padding-left: 8px;
	padding-right: 8px;
}

@media (min-width: 768px){
	.card-item{
		width: 50%;
	}
}

```

### 元件設定

```scss
//顏色變數
// _variable.scss
$primary: #56c4c5;
$secondary: #ffd153;
$accent: #ff5d50;
$bg-color: #f5f5f5;
$divider-color: #dddddd;
$text-color: #221e1f;
$text-color-light: #747474;

//按鈕
//_base.scss
.btn {
  padding: 12px 32px;
  font-size: 18px;
  text-align: center;
  color: #fff;
  background-color: $primary;
  border-radius: 27px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: all 0.3s;
  }
}

.btn-accent {
  padding: 8px 32px;
  margin-right: 6px;
  font-size: 16px;
  background-color: $accent;
}

.btn-s {
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid transparent;
}

.btn-light {
  color: $primary;
  background-color: #fff;
  border: 1px solid $primary;
  &:hover {
    background-color: $primary;
    color: #fff;
  }
}

//陰影
.box-shadow {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 10px #00000014;
  border-radius: 12px;
}
```

---

# JS 撞牆筆記

## 載入問題

一開始嘗試使用 CDN 載入 Jquery，但一直載入不成功無法使用 js，最後改使用本地端就順利載入了

```html
<script src="./js/jquery-3.6.0.min.js"></script>
<script src="./js/all.js"></script>
</body>
```

- 在 `</body>` 之前載入 Jquery 和自己的 js
- 記得每個頁面都要載入

```jsx
$(document).ready(funciton (){
	//測試
	$("h1").hide();

});
```

- 用 `.hide();` 方法測試是否載入成功再開始寫 js

## JQuery 功能運用

### 顯示或隱藏區塊

![https://i.imgur.com/6I2v5O9.gif](https://i.imgur.com/6I2v5O9.gif)

```jsx
// 常見問題 slideToggle
  $(".faq-list").click(function () {
    $(this).find("h3").toggleClass("faq-list-open"),
      $(this).find(".faq-list-p").slideToggle(),
      $(this).find(".faq-icon").toggleClass("faq-icon-minus");
  });
```

- `$(this)` 選取自身元素
- `.find("子層元素”);` 選取該元素的指定子層元素
- `.toggleClass(”類別名稱”);` 加上／移除類別樣式，記得 class 不需要加上 .
- `.slideToggle(毫秒數);` 上滑、下滑區塊
- 右邊加號圖示利用 class 權重覆蓋， 更換 `background` 背景圖片並加 transition 動畫

### 標籤按鈕樣式變換

![https://i.imgur.com/VVDCkb6.gif](https://i.imgur.com/VVDCkb6.gif)

```jsx
$(".btn-s").click(function (e) {
	//e.preventDefault(); //清除 a tag 預設
	$(this).removeClass("btn-light");
	$(this).siblings().addClass("btn-light");
});
```

- `e.preventDefault();`  清除原本 a 標籤預設的 href 導向
- `.siblings();`  選取該元素同層的兄弟姊妹
- `.addClass(”類別名稱”);` 加上類別樣式
- `.removeClass(”類別名稱”);` 移除類別樣式

### 標籤按鈕改變元素內容

操作 DOM 元素改變其他元素內容

![https://i.imgur.com/5iLavgJ.gif](https://i.imgur.com/5iLavgJ.gif)

```html
<!-- 簡化版本，非上圖實際 HTML -->
<div>
  <h2 class="standard">基本版</h2>
  <h3>訂閱用戶數</h3>
  <p id="num"></p> <!--資料寫入-->
  <h3>試算每月的費用</h3>
  <p id="amount"></p> <!--資料寫入-->
</div>

<div>
  <h2 class="pro">標準版</h2>
  <h3>訂閱用戶數</h3>
  <p id="pro-num"></p> <!--資料寫入-->
  <h3>試算每月的費用</h3>
  <p id="pro-amount"></p> <!--資料寫入-->
</div>
```

```jsx
//方案選擇文字 button text
  const userNum = ["10000", "15000", "20000"]; //陣列: 用戶數
  const standardPrice = ["600", "800", "1,000"]; //陣列: 基本版費用 
  const proPrice = ["1,600", "1,800", "2,000"]; //陣列: 標準版費用
  $(".btn-s").click(function () {
    let i = $(this).index(); //索引按鈕的位置
    $("#num").text(userNum[i]);
    $("#amount").text(standardPrice[i]);
    $("#pro-num").text(userNum[i]);
    $("#pro-amount").text(proPrice[i]);
  });
```

- 使用陣列儲存要代入的文本資料
- `.index();` 索引元素在同階層裡的位置
`let i = $(this).index();`  設變數 i 以用來代入資料索引的位置
- `陣列變數[序號]` 查詢陣列指定位置資料
- `.text(內容);`  寫入純文字內容

### 畫面上滑至頂端

![https://i.imgur.com/9dO71Q7.gif](https://i.imgur.com/9dO71Q7.gif)

```jsx
//scroll top
  $(".btn-scroll-top").click(function (e) {
    e.preventDefault();
    $("html, body").animate({
			 scrollTop: 0,   //移動位置
		}, 700)  //秒數
  });
```

- `$(”html, body”).animate( {scrollTop: 0, }, duraiton)`
- duration: 動畫完成的速度，可用毫秒、slow、normal、fast，預設是 normal
- [JQuery - scrollTop, offset 運用](https://medium.com/chloelo925/jquery-scrolltop-offset-%E9%81%8B%E7%94%A8-f7bbe93b77c4)

---

# 完成品

[https://github.com/GretaLi/chatTalker](https://github.com/GretaLi/chatTalker)

[chatTalker](https://gretali.github.io/chatTalker/)

## 作業心得

這次的作業中，首頁的部分共做了兩個版本，第一次使用 utility 的方法且 @media 寫在每個 section 後面；第二次則是用初心者技能手雕刻 SCSS、CSS，最後選擇用第二個版本手刻完成作業。

### 第一個版本: 自定義 utility

使用自定義 util 的好處是，寫完 HTML 後，排版大致上就出來了，不需要自己想 class 名稱，有些 div 單純是為了排版用，沒有語意功能，只要加上 `class=”flex”` 就直接搞定。

但由於還不熟練 util 的設計方式，第一次試做花了很多時間在歸納 class 名稱，金魚腦的我不停在地設計稿上看了又看，margin、padding 到底是 32px、24px 還是 16px，要統一用 mx、my 還是 mb、mt。找不到一個規律流程，卡住了很多次，首頁完成後覺得 HTML 無敵的肥大，程式閱讀起來非常痛苦🥲，所以果斷地放棄繼續做下一頁的打算，換了另一種方式重新開始。

### 第二個版本: 手刻 SCSS、CSS

才剛學習前端兩個多月的我，還是按部就班得從頭開始刻比較實在。我會先把 outline 打開，先下 position、display、width、height、部分 margin，將整個 section 的內、外容器框架大致排好後，才開始調整內部樣式，內部細調的時候就是我的精神時光屋，常常不知不覺完成了一個個番茄鐘。

至於 @media 我在排版時和第一版本一樣先寫在每個 section 後面，最後再把它們都統整好移到最下方，更符合 mobile-first 先讀取手機版本樣式再讀取桌面板的核心，最重要的是，我覺得放在底下比較好讀 😂。

以下是我在這次作業中使用到喜歡的方法：

**Hero Image 滿版來加強主視覺**

- `.banner{ height: 100vh; }`  讓主頁橫幅占滿視窗

**使用 & 來選取純排版用或想不到 class 名稱的 tag** 

- `&+A` 選取同層緊跟在後的那位跟屁蟲
- `&~A` 選取同層後方的所有兄弟姐妹
- `&>A` 選取子層的指定物件

**使用 variable 變數設定常用顏色**

- $primary: 主顏色;
- $secondary: 輔助色;
- $accent: 跳色;

**自訂元件樣式，把統一的樣式及原建設成 class**

- 按鈕: .btn、.btn-small、.btn-accent、.btn-light
- 邊框陰影: .box-shadow
- 大標題: .title

### Jquery 撞牆心得

從一開始 CDN 載入就直接撞牆，好險最後用本地端方法有成功連上，不然我可能會放棄挑戰 Lv2。按鈕的文字寫入功能卡關了一個晚上，甚至連睡覺都在想要怎麼寫，不斷嘗試不同方法想讓我的程式不要落落長，想到可以用按鈕的序號來取陣列的值，我原本寫 .indexof( ); 但console 一直無情地告訴我 Jquery 沒這個語法，最後解題的關鍵是 .index( ); 這個 Jquery 的索引的寫法。只能說，初學者不要偷懶要好好看[官方文件](https://api.jquery.com/index/)啊~

## What’s Next?

- 練習使用 Bootstrap 來製作第三個版本，從中學習 utility 的設計方法
- 加快細雕樣式的速度
