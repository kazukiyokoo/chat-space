$(function() {
  // doneだった場合のビュー追加ボタン
  function addUser(user) {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    $("#UserSearchResult").append(html);
  }
  // else だった場合のビュー
  function addNoUser() {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    $("#UserSearchResult").append(html);
  }

  // 追加ボタンをクリックされたユーザーの名前を、チャットメンバーの部分に追加し、検索結果からは消そうのビュー
  function addMember(name, id) {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
    $(".ChatMembers").append(html);
  }
  // インクリメンタルサーチ実装
  $("#UserSearch__field").on("keyup", function() {
    let input = $("#UserSearch__field").val();
    // イベント時に非同期通信できるようにしよう
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $("#UserSearchResult").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });
  // 追加ボタンが押された時にイベントが発火するようにしよう
  $("#UserSearchResult").on("click", ".ChatMember__add", function() {
    // 追加ボタンをクリックされたユーザーの名前を、チャットメンバーの部分に追加し、検索結果からは消そう
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addMember(userName, userId);
  });
  // 削除を押すと、チャットメンバーから削除しよう
  $(".ChatMembers").on("click", ".ChatMember__remove", function() {
    $(this).parent().remove();
  });
});