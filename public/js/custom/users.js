//apply datatables for user table
$(document).ready(function(){
  $('#tbl-users').DataTable();
});
//display states
$(document).ready(function(){
   $('#country').change(function(e){
       e.preventDefault;
       $('#loader-box').show();
       var country_id	=	$(this).val();
       $.ajax({
          method: "POST",
          data: { country_id: country_id },
          url: base_url + 'users/get_states',
          success: function(response)   {
           var parsed = JSON.parse(response);
           $('#loader-box').hide();
           if(parsed.status_code == 1)    {
               //alert('yes');
               $("#state").html('');
               $("#state").html(parsed.data);
           }
       }
       });
   });
});
//display cities
 $(document).ready(function(){
   $('#state').change(function(e){
       e.preventDefault;
       $('#loader-box').show();
       var state_id	=	$(this).val();
       $.ajax({
          method: "POST",
          data: { state_id: state_id },
          url: base_url + 'users/get_cities',
          success: function(response)   {
           $('#loader-box').hide();
           var parsed = JSON.parse(response);
           if(parsed.status_code == 1)    {
               //alert('yes');
               $("#city").html('');
               $("#city").html(parsed.data);
           }
       }
       });
   });
});
//submit user info
$(document).ready(function(){
    $('#btn_user').click(function(e){
        e.preventDefault;
        $('#loader-box').show();
        $('#signup-error').hide();
        var form = $('#frm_user');
        var formData = new FormData(form[0]);
        $.ajax({
            method: "POST",
            url: $('#frm_user').attr('action'),
            data: formData,
            contentType:false,
            processData:false,
            cache:false,
            success: function(result) {
                $('#loader-box').hide();
                var parse = JSON.parse(result);
                if(parse.status_code == 1) {
                   $.confirm({
                     title: 'Success',
                     content: 'User added successfully',
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
                              window.location.href = base_url + 'users';
                            }
                        }
                   }
                   });
                }   else if(parse.status_code == 0)    {
                    $('#signup-error span').empty();
                    $('#signup-error span').append(parse.message);
                    $('#signup-error').show();
                }   else    {
                    $('#signup-error span').empty();
                    $('#signup-error span').append(parse.message);
                    $('#signup-error').show();
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
                $('#signup-error span').html(' ');
                $('#signup-error span').append(msg);
                $('#signup-error').show();
            }
        });
    });
});
//View user information
//triggered when modal is about to be shown
$('#mdl_vw_user').on('show.bs.modal', function(e)
{
    var button = $(event.relatedTarget); // Button that triggered the modal
    //get data-id attribute of the clicked element
    var id          = $(e.relatedTarget).data('id');
    var username    = $(e.relatedTarget).data('username');
    var email       = $(e.relatedTarget).data('email');
    var first_name  = $(e.relatedTarget).data('first_name');
    var last_name   = $(e.relatedTarget).data('last_name');
    var phone       = $(e.relatedTarget).data('phone');
    var gender      = $(e.relatedTarget).data('gender');
    var address     = $(e.relatedTarget).data('address');
    var country     = $(e.relatedTarget).data('country');
    var state       = $(e.relatedTarget).data('state');
    var city        = $(e.relatedTarget).data('city');
    var profile_url = $(e.relatedTarget).data('profile_url');
    $('#vw_gender').val('');
    $('#vw_country').val('');
    $('#vw_state').val('');
    $('#vw_city').val('');
    $('#vw_admin').iCheck('disable');
    $('#vw_user').iCheck('disable');
    $('#vw_mechanic').iCheck('disable');
    var modal = $(this);
    $('#loader-box').show();
    $.ajax({
       method: 'POST',
       url: base_url + 'users/user_details',
       data: {id:id, gender:gender, country_id:country, state_id:state, city_id:city},
       success: function(result)  {
           $('#loader-box').hide();
           var parse = JSON.parse(result);
           if(parse.user_group.id == 1) {
           $('#vw_admin').iCheck('check');
           }    else if(parse.user_group.id == 4)  {
                  $('#vw_user').iCheck('check');
           }    else if(parse.user_group.id == 3) {
                  $('#vw_mechanic').iCheck('check');
           }
           modal.find('.modal-body #vw_gender').val(parse.gender);
           modal.find('.modal-body #vw_country').val(parse.country.name);
           modal.find('.modal-body #vw_state').val(parse.state.name);
           modal.find('.modal-body #vw_city').val(parse.city.name);
       }
    });
    modal.find('.modal-body #vw_first_name').val(first_name);
    modal.find('.modal-body #vw_last_name').val(last_name);
    modal.find('.modal-body #vw_username').val(username);
    modal.find('.modal-body #vw_email').val(email);
    modal.find('.modal-body #vw_contactno').val(phone);
    modal.find('.modal-body #vw_address').val(address);
    if(profile_url) {
        modal.find('.modal-body #vw_profile_img').attr('src',base_url + profile_url);
    }   else    {
        modal.find('.modal-body #vw_profile_img').attr('src',base_url + 'assets/backend/img/users/dummy.jpg');
    }
});

//Edit user information
$('#mdl_ed_user').on('show.bs.modal', function(e)
{
    var button = $(event.relatedTarget); // Button that triggered the modal
    //get data-id attribute of the clicked element
    var id          = $(e.relatedTarget).data('id');
    var username    = $(e.relatedTarget).data('username');
    var email       = $(e.relatedTarget).data('email');
    var first_name  = $(e.relatedTarget).data('first_name');
    var last_name   = $(e.relatedTarget).data('last_name');
    var phone       = $(e.relatedTarget).data('phone');
    var gender      = $(e.relatedTarget).data('gender');
    var address     = $(e.relatedTarget).data('address');
    var country     = $(e.relatedTarget).data('country');
    var state       = $(e.relatedTarget).data('state');
    var city        = $(e.relatedTarget).data('city');
    var profile_url = $(e.relatedTarget).data('profile_url');
    $('#ed_gender').val('');
    $('#ed_country').val('');
    $('#ed_state').val('');
    $('#ed_city').val('');
    $('#loader-box').show();
    //get states
    $.ajax({
       method: "POST",
       data: { country_id: country},
       url: base_url + 'users/get_states',
       success: function(response)  {
           $('#loader-box').hide();
           var parsed = JSON.parse(response);
           if(parsed.status_code == 1)    {
               //alert('yes');
               $("#ed_state").html('');
               $("#ed_state").html(parsed.data);
               $('[name=ed_state]').val(state);
           }
       }
    });
    $('#loader-box').show();
    //get cities
    $.ajax({
       method: "POST",
       data: { state_id: state},
       url: base_url + 'users/get_cities',
       success: function(response)  {
           $('#loader-box').hide();
           var parsed = JSON.parse(response);
           if(parsed.status_code == 1)    {
               //alert('yes');
               $("#ed_city").html('');
               $("#ed_city").html(parsed.data);
               //city selected
               $('[name=ed_city]').val(city);
           }
       }
    });
    //get user information
    $.ajax({
        method: "POST",
        url: base_url + 'users/get_user_group',
        data: {user_id: id},
        success: function(result)   {
            var parsed = JSON.parse(result);
            if(parsed.status_code == 1) {
                if(parsed.data.id == 1) {
                    $('#ed_admin').iCheck('check');
                }   else if(parsed.data.id == 4)    {
                    $('#ed_user').iCheck('check');
                }   else if(parsed.data.id == 3)    {
                    $('#ed_mechanic').iCheck('check');
                }
                $('#hd_user_type').val(parsed.data.id);
            }
        }
    })
    var modal = $(this);
    modal.find('.modal-body #ed_user_id').val(id);
    modal.find('.modal-body #ed_first_name').val(first_name);
    modal.find('.modal-body #ed_last_name').val(last_name);
    modal.find('.modal-body #ed_username').val(username);
    modal.find('.modal-body #ed_email').val(email);
    modal.find('.modal-body #ed_contactno').val(phone);
    modal.find('.modal-body #ed_address').val(address);
    //gender selected
    $('[name=ed_gender]').val(gender);
    //country selected
    $('[name=ed_country]').val(country);
    if(profile_url) {
        modal.find('.modal-body #ed_profile_img').attr('src',base_url + profile_url);
    }   else    {
        modal.find('.modal-body #ed_profile_img').attr('src',base_url + 'assets/backend/img/users/dummy.jpg');
    }
});
//get states
    $(document).ready(function(){
       $('#ed_country').change(function(e){
           e.preventDefault;
           $('#loader-box').show();
           var country_id	=	$(this).val();
           $.ajax({
              method: "POST",
              data: { country_id: country_id },
              url: base_url + 'users/get_states',
              success: function(response)   {
               $('#loader-box').hide();
               var parsed = JSON.parse(response);
               if(parsed.status_code == 1)    {
                   //alert('yes');
                   $("#ed_state").html('');
                   $("#ed_city").html('');
				          $("#ed_state").html(parsed.data);
               }
           }
           });
       });
    });
    //get cities
     $(document).ready(function(){
       $('#ed_state').change(function(e){
           e.preventDefault;
           $('#loader-box').show();
           var state_id	=	$(this).val();
           $.ajax({
              method: "POST",
              data: { state_id: state_id },
              url: base_url + 'users/get_cities',
              success: function(response)   {
               $('#loader-box').hide();
               var parsed = JSON.parse(response);
               if(parsed.status_code == 1)    {
                   //alert('yes');
                   $("#ed_city").html('');
				           $("#ed_city").html(parsed.data);
               }
           }
           });
       });
    });
    //Update user info
    $(document).ready(function(){
        $('#btn_update_user').click(function(e){
            e.preventDefault;
            $('#loader-box').show();
            var form = $('#update_user_form');
            var formData = new FormData(form[0]);
            $.ajax({
                method: "POST",
                processData:false,
                contentType:false,
                cache:false,
                data: formData,
                url: base_url + 'users/update',
                success: function(result) {
                    $('#loader-box').hide();
                    var parse = JSON.parse(result);
                    if(parse.status_code == 1) {
                      $.confirm({
                        title: 'Success',
                        content: 'Information updated successfully',
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
                                 window.location.href = base_url + 'users';
                               }
                           }
                      }
                      });
                    }   else if(parse.status_code == 0)    {
                        $('#update-error span').empty();
                        $('#update-error span').append(parse.message);
                        $('#update-error').show();
                    }   else    {
                        $('#update-error span').empty();
                        $('#update-error span').append(parse.message);
                        $('#update-error').show();
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
                    $('#update-error span').html(' ');
                    $('#update-error span').append(msg);
                    $('#update-error').show();
                }
            });
        });
    });
//delete user
function del_user(id,firstname,lastname)   {
    $.confirm({
        title: 'Are you sure?',
        content:  '<p style="font-size: 14px;">Delete user record for<b style="font-size: 14px;"> ' + firstname + ' ' +  lastname + ' </b>will not retrieve back !</p>',
        type: 'red',
        theme: 'material',
        autoClose: 'cancelAction|8000',
        typeAnimated: true,
        useBootstrap: true,
        draggable: true,
        buttons: {
        deleteUser: {
            text: 'delete user',
            btnClass: 'btn-danger',
            action: function () {
              $.ajax({
                 method: "POST",
                 url: base_url + 'users/delete/',
                 data: {id:id},
                 success : function(result)  {
                  var parse = JSON.parse(result);
                     if(parse.status_code == 1)   {
                         //deleted
                         $.confirm({
                             title: 'Successful',
                             content:  '<p style="font-size: 14px;">User deleted successfully</p>',
                             type: 'green',
                             theme: 'material',
                             customClass: 'animated fadeIn',
                             buttons: {
                               deleted: {
                                  text: 'ok',
                                  btnClass: 'btn-default',
                                  action: function(){
                                      location.reload();
                                    }
                                }
                           }
                         });
                     }    else if(parse.status_code == 0) {
                         //error
                         $.alert({
                             title: 'Error',
                             content:  parse.message,
                             type: 'red',
                             customClass: 'animated fadeIn'
                         });
                     }    else    {
                         //error
                         $.alert({
                             title: 'Error',
                             content:  '<p style="font-size: 14px;">Something wrong, unable to delete user !</p>',
                             type: 'red',
                             customClass: 'animated fadeIn'
                         });
                     }
                  },
                  error: function(jqXHR, exception) {
                    $('#loader-box').hide();
                    $.alert({
                        title: 'Error',
                        content:  '<p style="font-size: 14px;">Something wrong, unable to delete user !</p>',
                        type: 'red',
                        customClass: 'animated fadeIn'
                    });
                  }
              });
            }
        },
        cancelAction: {
            text: 'Cancel',
            btnClass: 'btn-default',
        }
      }
    });
}
//activate deactivate user
function activate_deactivate_user(id,firstname,lastname, status) {
    var alert = '';
    if(status == 0) {
      alert = 'activate';
    } else if(status == 1)  {
      alert = 'deactivate';
    } else {
      alert = 'activate / deactivate';
    }
    $.confirm({
        title: alert +  '?  ',
        content:  '<p style="font-size: 14px;">Do you really want to ' + alert + '</p><b style="font-size: 14px;">' + firstname + ' ' +  lastname + '</b>',
        type: 'red',
        theme: 'material',
        autoClose: 'cancelAction|8000',
        typeAnimated: true,
        useBootstrap: true,
        draggable: true,
        buttons: {
        deleteUser: {
            text: alert,
            btnClass: 'btn-danger',
            action: function () {
              $('#loader-box').show();
              $.ajax({
                 method: "POST",
                 url: base_url + 'users/activate_deactivate/',
                 data: {id:id},
                 success : function(result)  {
                  $('#loader-box').hide();
                  var parse = JSON.parse(result);
                     if(parse.status_code == 1 || parse.status_code == 2)   {
                         //deleted
                         $.confirm({
                             title: 'Successful',
                             content:  '<p style="font-size: 14px;">' + parse.message + '</p>',
                             type: 'green',
                             theme: 'material',
                             customClass: 'animated fadeIn',
                             buttons: {
                               deleted: {
                                  text: 'ok',
                                  btnClass: 'btn-default',
                                  action: function(){
                                      location.reload();
                                    }
                                }
                           }
                         });
                     }    else if(parse.status_code == 0) {
                         //error
                         $.alert({
                             title: 'Error',
                             content:  parse.message,
                             type: 'red',
                             customClass: 'animated fadeIn'
                         });
                     }    else    {
                         //error
                         $.alert({
                             title: 'Error',
                             content:  '<p style="font-size: 14px;">Something wrong, unable to delete user !</p>',
                             type: 'red',
                             customClass: 'animated fadeIn'
                         });
                     }
                  },
                  error: function(jqXHR, exception) {
                    $('#loader-box').hide();
                    $.alert({
                        title: 'Error',
                        content:  '<p style="font-size: 14px;">Something wrong, Please try later</p>',
                        type: 'red',
                        customClass: 'animated fadeIn'
                    });
                  }
              });
            }
        },
        cancelAction: {
            text: 'Cancel',
            btnClass: 'btn-default',
        	}
        }
   });
}
//image update
$(document).ready(function() {
    var brand = document.getElementById('profile-img');
    brand.className = 'attachment_upload';
    brand.onchange = function() {
        document.getElementById('fakeUploadLogo').value = this.value.substring(12);
    };
    // Source: http://stackoverflow.com/a/4459419/6396981
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.img-preview').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#profile-img").change(function() {
        readURL(this);
    });
});
