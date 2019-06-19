//display datatables for orders table
$(document).ready(function(){
  $('#orders-table').DataTable();
});
//select2 100% width
$('#mdl-ed-order select').css('width', '100%');
//initiate select2 plugin
$('.select2').select2();
//Date picker
$('#ed_date').datepicker({
   format: 'dd/mm/yyyy',
   forceParse: false
});
//View order information on bootstrap modal
$('#mdl-vw-order').on('show.bs.modal', function(e) {
    var button = $(e.relatedTarget); // Button that triggered the modal
    //get data-id attribute of the clicked element
    var id              = $(e.relatedTarget).data('id');
    var c_id            = $(e.relatedTarget).data('c_id');
    var m_id            = $(e.relatedTarget).data('m_id');
    var name            = $(e.relatedTarget).data('name');
    var email           = $(e.relatedTarget).data('email');
    var contact_no      = $(e.relatedTarget).data('contact_no');
    var address         = $(e.relatedTarget).data('address');
    var product         = $(e.relatedTarget).data('product');
    var product_brand   = $(e.relatedTarget).data('product_brand');
    var problem         = $(e.relatedTarget).data('problem');
    var date            = $(e.relatedTarget).data('date');
    var time            = $(e.relatedTarget).data('time');
    var quantity        = $(e.relatedTarget).data('quantity');
    var status          = $(e.relatedTarget).data('status');
    var zipcode         = $(e.relatedTarget).data('zipcode');
    var a_img           = $(e.relatedTarget).data('a_img');
    var modal = $(this);
    $('#loader-box').show();
    modal.find('.modal-body #vw_o_id').val(id);
    modal.find('.modal-body #vw_name').val(name);
    modal.find('.modal-body #vw_email').val(email);
    modal.find('.modal-body #vw_contact_no').val(contact_no);
    modal.find('.modal-body #vw_address').val(address);
    modal.find('.modal-body #vw_product_brand').val(product_brand);
    modal.find('.modal-body #vw_problem').val(problem);
    modal.find('.modal-body #vw_date').val(date);
    modal.find('.modal-body #vw_zipcode').val(zipcode);
    modal.find('.modal-body #vw_time').val(time + ' EST');
    modal.find('.modal-body #vw_quantity').val(quantity);
    $('#download_img').css('display','block');
    modal.find('.modal-body #vw_a_img').attr('src','');
    if(a_img) {
      modal.find('.modal-body #vw_a_img').attr('src', base_url + a_img);
    }   else    {
      $('#download_img').css('display','none');
      modal.find('.modal-body #vw_a_img').attr('src',base_url + 'assets/backend/img/orders/appliances/dummy.png');
    }
    $('#vw_pending').iCheck('disable');
    $('#vw_confirmed').iCheck('disable');
    $('#vw_complete').iCheck('disable');
    $('#vw_cancelled').iCheck('disable');
    if(status == 0) {
           $('#vw_pending').iCheck('check');
    }    else if(status == 1)  {
           $('#vw_confirmed').iCheck('check');
    }    else if(status == 2) {
           $('#vw_complete').iCheck('check');
    }    else if(status == 3) {
           $('#vw_cancelled').iCheck('check');
    }
    $('#loader-box').hide();
    if(c_id != 0 || m_id != 0)  {
    $.ajax({
      method: 'POST',
      url: base_url + 'orders/get_user',
      data: {c_id:c_id,m_id:m_id},
      success: function(response) {
        var parse = JSON.parse(response);
        //console.log(parse);
        if(parse.status_code == 1)  {
          if(parse.c_name) {
            $('#vw_client').val(parse.c_name);
          } else {
            $('#vw_client').val('not defined');
          }
          if(parse.m_name) {
            $('#vw_mechanic').val(parse.m_name);
          } else{
            $('#vw_mechanic').val('not defined');
        }
      }else {
        $('#vw_client').val('not defined');
        $('#vw_mechanic').val('not defined');
      }
      }
    });
  }
	if(product)	{
		//get product category
		$.ajax({
			method: 'post',
			url: base_url + 'orders/get_product',
			data: {product:product},
			success: function(res)	{
				var parse = JSON.parse(res);
				//console.log(parse);
				$('#vw_product').val(parse.data.name);
			}
		});
	}
});
//Update order info
$(document).ready(function(){
    $('#btn_update_order').click(function(e){
        e.preventDefault;
        $('#loader-box').show();
        var form = $('#frm_update_order');
        var formData = new FormData(form[0]);
        $.ajax({
            method: "POST",
            processData:false,
            contentType:false,
            cache:false,
            data: formData,
            url: base_url + 'orders/update',
            success: function(result) {
              $('#loader-box').hide();
              var parse = JSON.parse(result);
              if(parse.status_code == 1) {
                 $.confirm({
                   title: 'Success',
                   content: parse.message,
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
                            window.location.href = base_url + 'orders';
                          }
                      }
                 }
                 });
              }   else if(parse.status_code == 0)    {
									$('#update-order-error').scrollTop(0);
                  $('#update-order-error span').empty();
                  $('#update-order-error span').append(parse.message);
                  $('#update-order-error').show();
              }   else    {
                  $('#update-order-error span').empty();
                  $('#update-order-error span').append(parse.message);
                  $('#update-order-error').show();
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
                $('#update-order-error span').html(' ');
                $('#update-order-error span').append(msg);
                $('#update-order-error').show();
            }
        });
    });
});
//Update payment info
$(document).ready(function(){
    $('#btn_payment').click(function(e){
        e.preventDefault;
        $('#loader-box').show();
        var form = $('#frm_payment');
        var formData = new FormData(form[0]);
        $.ajax({
            method: "POST",
            processData:false,
            contentType:false,
            cache:false,
            data: formData,
            url: base_url + 'orders/update_payment',
            success: function(result) {
              $('#loader-box').hide();
              var parse = JSON.parse(result);
              if(parse.status_code == 1) {
                 $.confirm({
                   title: 'Success',
                   content: parse.message,
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
                            window.location.href = base_url + 'orders';
                          }
                      }
                 }
                 });
              }   else if(parse.status_code == 0)    {
									$('#payment-error').scrollTop(0);
                  $('#payment-error span').empty();
                  $('#payment-error span').append(parse.message);
                  $('#payment-error').show();
              }   else    {
                  $('#payment-error span').empty();
                  $('#payment-error span').append(parse.message);
                  $('#payment-error').show();
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
                $('#payment-error span').html(' ');
                $('#payment-error span').append(msg);
                $('#payment-error').show();
            }
        });
    });
});
//delete user
function del_order(o_id,name)   {
  $.confirm({
      title: 'Are you sure?',
      content:  '<p style="font-size: 14px;">Delete order record of<b style="font-size: 14px;"> ' + name + ' </b>will not retrieve back !</p>',
      type: 'red',
      theme: 'material',
      autoClose: 'cancelAction|8000',
      typeAnimated: true,
      useBootstrap: true,
      draggable: true,
      buttons: {
      deleteOrder: {
          text: 'Delete order',
          btnClass: 'btn-danger',
          action: function () {
            $.ajax({
               method: "POST",
               url: base_url + 'orders/delete/',
               data: {o_id:o_id},
               success : function(result)  {
                var parse = JSON.parse(result);
                   if(parse.status_code == 1)   {
                       //deleted
                       $.confirm({
                           title: 'Successful',
                           content:  parse.message,
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
                           content:  '<p style="font-size: 14px;">Something wrong, unable to delete order !</p>',
                           type: 'red',
                           customClass: 'animated fadeIn'
                       });
                   }
                },
                error: function(jqXHR, exception) {
                  $('#loader-box').hide();
                  $.alert({
                      title: 'Error',
                      content:  '<p style="font-size: 14px;">Something wrong, unable to delete order !</p>',
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
