$(function(){
  function buildMessage(message){
    let image = message.image? `<img class="input-box__image" src=${message.image}>` : "";
    let html=  `<div class="message" data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="lower-message">
                    <p class="message__text">
                      ${message.content}
                    </p>
                      ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on ('submit', function(e){
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
      let html = buildMessage(data);
      $('.messages').append(html);
      $('.messages').animate({
        scrollTop: $('.messages')[0].scrollHeight
      }, 'fast');
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(data){
      alert("メッセージ送信に失敗しました");
    });
  });

  let reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      let last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        let insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildMessage(message); 
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert("自動更新に失敗しました");
      });
    };
  setInterval(reloadMessages, 5000);
  
});
