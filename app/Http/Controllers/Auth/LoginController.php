<?php

namespace CRM\Http\Controllers\Auth;

use CRM\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;
use Response;
use URL;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/dashboard';
		protected $redirectAfterLogout = '/login';
		/*
		 * redirect use after logout
		 *
		 *@var string
		 */
		protected function loggedOut(Request $request) {
    	return redirect($this->redirectAfterLogout)->with('message', 'You have been logged out!');
		}
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
		public function login(Request $request)
		{
				$auth = false;
				$credentials = $request->only('email', 'password');

				if(Auth::attempt($credentials, $request->has('remember'))) {
						return response()->json([
								'status_code' => 1,
								'status' => 'success',
								'message' => 'Login successful',
								'intended' => URL::previous()
						]);
				}
				return response()->json([
					'status_code' => 0,
					'status' => 'fail',
					'message' => ''
				]);
		}
}
