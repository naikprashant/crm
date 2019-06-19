//Update general settings
$(document).ready(function(){
    $('#btn_general_setting').click(function(e){
        e.preventDefault;
        $('#loader-box').show();
        var form = $('#frm_general_setting');
        var formData = new FormData(form[0]);
        $.ajax({
            method: "POST",
            processData:false,
            contentType:false,
            cache:false,
            data: formData,
            url: $('#frm_general_setting').attr('action'),
            success: function(result) {
                var parse = JSON.parse(result);
                //console.log(result);
                $('#loader-box').hide();
                if(parse.status_code == 1) {
                  $.confirm({
                    title: 'Success',
                    content: 'General settings updated successfully',
                    theme: 'material',
                    type: 'green',
                    typeAnimated: true,
                    useBootstrap: true,
                    draggable: true,
                    buttons: {
                      thankYou: {
                         text: 'ok',
                         btnClass: 'btn-default',
                         action: function(){
                             window.location.href = base_url + 'settings';
                           }
                       }
                  }
                  });
                }   else if(parse.status_code == 0)    {
                  $('#settings-error span').empty();
                  $('#settings-error span').append(parse.message);
                  $('#settings-error').show();
                }   else    {
                  $('#settings-error span').empty();
                  $('#settings-error span').append(parse.message);
                  $('#settings-error').show();
                }
            },
            error: function(jqXHR, exception)    {
                $('#loader-box').hide();
                var msg = '';
                if(jqXHR.status == 0)   {
                    msg = 'Unable to connect.';
                } else  if(jqXHR.status == 404) {
                    msg = '404 Page not found.';
                } else if(jqXHR.status == 500)  {
                    msg = '500 Internal server error.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Something wrong, Please try later.';
                }
                $('#settings-error span').html(' ');
                $('#settings-error span').append(msg);
                $('#settings-error').show();
            }
        });
    });
});
//Update social setting
$(document).ready(function(){
    $('#btn_social_setting').click(function(e){
        e.preventDefault;
        $('#loader-box').show();
        var form = $('#frm_social_setting');
        var formData = new FormData(form[0]);
        $.ajax({
            method: "POST",
            processData:false,
            contentType:false,
            cache:false,
            data: formData,
            url: $('#frm_social_setting').attr('action'),
            success: function(result) {
                var parse = JSON.parse(result);
                console.log(result);
                $('#loader-box').hide();
                if(parse.status_code == 1) {
                  $.confirm({
                    title: 'Success',
                    content: 'Social settings updated successfully',
                    theme: 'material',
                    type: 'green',
                    typeAnimated: true,
                    useBootstrap: true,
                    draggable: true,
                    buttons: {
                      thankYou: {
                         text: 'ok',
                         btnClass: 'btn-default',
                         action: function(){
                             window.location.href = base_url + 'settings';
                           }
                       }
                  }
                  });
                }   else if(parse.status_code == 0)    {
                  $('#settings-error span').empty();
                  $('#settings-error span').append(parse.message);
                  $('#settings-error').show();
                }   else    {
                  $('#settings-error span').empty();
                  $('#settings-error span').append(parse.message);
                  $('#settings-error').show();
                }
            },
            error: function(jqXHR, exception)    {
                $('#loader-box').hide();
                var msg = '';
                if(jqXHR.status == 0)   {
                    msg = 'Unable to connect.';
                } else  if(jqXHR.status == 404) {
                    msg = '404 Page not found.';
                } else if(jqXHR.status == 500)  {
                    msg = '500 Internal server error.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Something wrong, Please try later.';
                }
                $('#settings-error span').html(' ');
                $('#settings-error span').append(msg);
                $('#settings-error').show();
            }
        });
    });
});
