//login event handler ajax
$('#btn_login').click(function(e){
    e.preventDefault;
    $('#loader-box').show();
    $('#login-error').hide();
    var form = $('#frm_login');
    var formData = new FormData(form[0]);
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});
    $.ajax({
        type: 'post',
        url: $('#frm_login').attr('action'),
        data: formData,
				processData: false,
				cache: false,
				contentType: false,
				success: function(res)   {
					console.log(res);
					$('#loader-box').hide();
					if(res.status_code == 1) {
							window.location.href = '/dashboard';
					}   else    {
							$('#login-error span').empty();
							$('#login-error span').append('Something wrong, Please try laters.');
							$('#login-error').show();
					}
        },
        error: function(jqXHR, exception)    {
					$('#loader-box').hide();
					var msg = 'Something went wrong, Please try later.';
					$('#login-error span').html(' ');
					$('#login-error span').append(msg);
					$('#login-error').show();
        }
    });
});
