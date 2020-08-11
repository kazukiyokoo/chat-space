$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
      `<div class="MessageBox">
        <div class="MessageInfo">
          <div class="chat-main__message-list__user-name">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__user-name__posted-time">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="Message__content">
            ${message.content}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>
      </div>`
      return html;
    }  else {
      let html =
      `<div class="MessageBox">
        <div class="MessageInfo">
          <div class="chat-main__message-list__user-name">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__user-name__posted-time">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      $('.chat-main__message-list').append(html);
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});