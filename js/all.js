$(document).ready(function () {
  //scroll top
  $(".btn-scroll-top").click(function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      700
    );
  });

  //方案選擇樣式 button CSS
  $(".btn-s").click(function () {
    // e.preventDefault(); //按鈕改用 li ，因此不需要清除 a 預設
    $(this).removeClass("btn-light");
    $(this).siblings().addClass("btn-light");
  });

  //方案選擇文字 button text
  const userNum = ["10000", "15000", "20000", "25000", ">25000"];
  const standardPrice = ["600", "800", "1,000", "1,200", "1,400"];
  const proPrice = ["1,600", "1,800", "2,000", "2,200", "2,400"];
  $(".btn-s").click(function () {
    let i = $(this).index(); //索引按鈕的位置
    $("#num").text(userNum[i]);
    $("#amount").text(standardPrice[i]);
    $("#pro-num").text(userNum[i]);
    $("#pro-amount").text(proPrice[i]);
  });

  // 常見問題 slideToggle
  $(".faq-list").click(function (e) {
    e.preventDefault();
    $(this).find("h3").toggleClass("faq-list-open"),
      $(this).find(".faq-list-p").slideToggle(),
      $(this).find(".faq-icon").toggleClass("faq-icon-minus");
  });
});
