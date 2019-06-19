@extends('backend.layout.app')
@section('content')
<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Dashboard
        <small>Control panel</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Dashboard</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>10</h3>
              <p>Total Orders</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <a href="" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>$10000</h3>
              <p>Total Amount</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>100</h3>
              <p>Clients Registrations</p>
            </div>
            <div class="icon">
              <i class="ion ion-person-add"></i>
            </div>
            <a href="" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-red">
            <div class="inner">
              <h3>16</h3>
              <p>Categories</p>
            </div>
            <div class="icon">
              <i class="ion ion-pie-graph"></i>
            </div>
            <a href="" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
      </div>
      <!-- /.row -->
      <!-- Main row -->
      <div class="row">
        <!-- Left col -->
        <section class="col-lg-7 connectedSortable">
          <!-- Custom tabs (Charts with tabs)-->
          <div class="nav-tabs-custom">
            <!-- Tabs within a box -->
            <ul class="nav nav-tabs pull-right">
              <li class="active"><a href="#sales-chart" data-toggle="tab">Graph</a></li>
              <li class="pull-left header"><i class="fa fa-inbox"></i> Orders</li>
            </ul>
            <div class="tab-content no-padding">
              <div class="chart tab-pane active" id="sales-chart" style="position: relative; height: 300px;"></div>
            </div>
          </div>
          <!-- /.nav-tabs-custom -->
          <!-- quick email widget -->
          <div class="box box-default">
            <div class="box-header">
              <i class="fa fa-envelope"></i>
              <h3 class="box-title">Quick Email</h3>
              <!-- tools box -->
              <div class="pull-right box-tools">
                <button type="button" class="btn btn-default btn-sm" data-widget="remove" data-toggle="tooltip"
                        title="Remove">
                  <i class="fa fa-times"></i></button>
              </div>
              <!-- /. tools -->
            </div>
						<div class="alert alert-danger alert-dismissible fade in" id="email-error" style="display: none;">
								<a href="#" class="close" data-hide=".alert">&times;</a>
								<h4><i class="fa fa-ban"></i> Alert!</h4>
								<span></span>
						</div>
            <form method="post" id="frm_email" name="frm_email">
            <div class="box-body">
                <div class="form-group">
                  <input type="email" class="form-control" name="email" placeholder="Email to:" >
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" name="subject" placeholder="Subject">
                </div>
                <div>
                <textarea name="message" id="message" class="textarea" placeholder="Message"
                            style="width: 100%; height: 125px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                </div>
            </div>
            <div class="box-footer clearfix">
              <button type="button" class="pull-right btn btn-default" id="btn_email">Send
                <i class="fa fa-arrow-circle-right"></i></button>
            </div>
            </form>
          </div>
        </section>
        <!-- /.Left col -->
        <!-- right col (We are only adding the ID to make the widgets sortable)-->
        <section class="col-lg-5 connectedSortable">
          <!-- Calendar -->
          <div class="box box-solid bg-green-gradient">
            <div class="box-header">
              <i class="fa fa-calendar"></i>
              <h3 class="box-title">Calendar</h3>
              <!-- tools box -->
              <div class="pull-right box-tools">
                <!-- button with a dropdown -->
                <div class="btn-group">
                  <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-bars"></i></button>
                  <ul class="dropdown-menu pull-right" role="menu">
                    <li><a href="#">Add new event</a></li>
                    <li><a href="#">Clear events</a></li>
                    <li class="divider"></li>
                    <li><a href="#">View calendar</a></li>
                  </ul>
                </div>
                <button type="button" class="btn btn-success btn-sm" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-success btn-sm" data-widget="remove"><i class="fa fa-times"></i>
                </button>
              </div>
              <!-- /. tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding">
              <!--The calendar -->
              <div id="calendar" style="width: 100%"></div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->

        </section>
        <!-- right col -->
      </div>
      <!-- /.row (main row) -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <!-- Morris.js charts -->
  <script src="{{ asset('public/js/raphael.min.js') }}"></script>
  <script src="{{ asset('public/js/morris.min.js') }}"></script>
	<script src="{{ asset('public/js/custom/common.js') }}"></script>
  <script src="{{ asset('public/js/bootstrap-datepicker.min.js') }}"></script>
  <script src="{{ asset('public/js/custom/dashboard.js') }}"></script>
	<script>
		$('#btn_email').click(function(e){
    e.preventDefault;
    $('#loader-box').show();
    $('#login-error').hide();
    var form = $('#frm_email');
    var formData = new FormData(form[0]);
    $.ajax({
        method: 'post',
        url: 'dashboard/quick_email',
        data: formData,
        contentType: false,
        processData: false,
        cache: false,
        success: function(result)   {
            var parse = JSON.parse(result);
            $('#loader-box').hide();
            if(parse.status_code == 1) {
                $.alert({
											 title: 'Success',
											 content:  '<p style="font-size: 14px;">' + parse.message + '</p>',
											 type: 'green',
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
            }   else if(parse.status_code == 0)    {
                $('#email-error span').empty();
                $('#email-error span').append(parse.message);
                $('#email-error').show();
            }   else    {
                $('#email-error span').empty();
                $('#email-error span').append('Something wrong, Please try later.');
                $('#email-error').show();
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
            $('#email-error span').empty();
						$('#email-error span').append(msg);
						$('#email-error').show();
        }
    });
});
</script>
<script>
  //sales graph
new Morris.Bar({
    element: 'sales-chart',
    resize: true,
    data: [
      {date: "", orders:},
    ],
    xkey: 'date',
    ykeys     : ['orders'],
    labels    : ['orders'],
    barColors : ['#d0d0d0'],
  });
</script>
@endsection