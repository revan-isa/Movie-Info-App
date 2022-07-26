$(document).ready(function () {
  $("#btn").on("click", function () {
    //error handler :)
    if ($("#search").val() == "") {
      alert("Do not leave the input field empty!");
    } else {
      $("#pagination").pagination({
        dataSource: function (done) {
          let movie = $("#search").val();

          var result = [];

          // fetch api link
          $.ajax({
            type: "GET",
            url: `https://omdbapi.com/?s=${movie}&page=1&apikey=fc1fef96`,
            success: function (data) {
              for (var i = 1; i < data.totalResults; i++) {
                result.push(data.Search[i]);
              }
              done(result);

              // call function in order to display
              display(data);
            },
          });
        },
        showGoInput: true,
        pageSize: 10,
        pageRange: 2,
        className: "paginationjs-theme-gray paginationjs-big",
        showGoButton: true,
        callback: function (data, pagination) {
          // --------------------------

          let movie = $("#search").val();

          $.ajax({
            type: "GET",
            url: `https://omdbapi.com/?s=${movie}&page=${pagination.pageNumber}&apikey=fc1fef96`,
            success: function (data) {
              display(data, pagination.pageNumber);
            },
          });
          //  ----------------------

          $("#dataContainer").html(data);
        },
      });
    }
  });
  // function display movie when clicked
  function display(x, pageNum) {
    $("#pageNum").text(pageNum);
    let result2 = "";
    for (let i = 0; i < x.Search.length; i++) {
      result2 += `<div class="d-flex flex-column justify-content-center align-items-center col-md-4 mt-3">
            <img class="img-thumbnail" src="${x.Search[i].Poster}"/>
            <h5 class="text-white my-2 text-center">${x.Search[i].Title}</h5>
            <p class="text-white">${x.Search[i].Year}</p>
            <a class="btn btn-info" onclick='showInfo("${x.Search[i].imdbID}")'>More Info</a> 
            </div>`;
    }
    $("#movieDisplay").html(result2);
  }
});
