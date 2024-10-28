<?php

namespace App\Http\Controllers;

//Illuminate
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
Use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Account;

Use Auth;
Use Validator;

class AuthController extends Controller{
    // public function auth(){
    //     if(!Session::get('login')){
    //         return redirect('/oneprodeco');          
    //     }else{
    //         $kpk = Session::get('kpk');
    //         $cekUser = Account::where('us_KPK' , $kpk)->first();
    //         $userStatus = DB::table('proddev.pd_grup')->where('grp_ID',$cekUser->grp_ID)->first();
    //         return view('CDI.CDI',  compact('cekUser','userStatus') );
    //     }
    // }

    public function login(){
       
        $year = Date('Y');
        $userDatabase = DB::table('users') -> get();
        return view('User.login',  compact('year', 'userDatabase') );
        
    }

    public function loginValidation(Request $request)
    {
        $request->validate([
            'userName' => 'required',
            'password' => 'required',
        ]);

        $username = $request->userName;
        $password = md5($request->password); // Hash the input password for comparison

        // Find the user by username
        $user = DB::table('users')
                ->where('userName', $username)
                ->where('password', $password) // Check hashed password directly
                ->first();

        if ($user) {
            // Clear any existing session data
            Session::flush();

            // Store user details in the session
            Session::put('userId', $user->id);
            Session::put('userName', $user->userName);
            Session::put('fullName', $user->fullName); // Corrected from 'name' to 'fullName'
            Session::put('role', $user->role);
            Session::put('isLoggedIn', true);

            return response()->json(['message' => 'Logged in successfully']);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }

    public function dashboard(){
       
        $year = Date('Y');
        $userName = Session::get('userName');
        $userData = DB::table('users') -> where ('userName', $userName) -> first();
        return view('User.dashboard',  compact('year', 'userData') );
        
    }

    public function register(){
       
        $year = Date('Y');
        return view('User.register',  compact('year') );
        
    }

    public function registration(Request $request){
       
        $request->validate([
            'fullName' => 'required',
            'userName' => 'required|unique:users', // Ensure the username is unique
            'password' => 'required',
        ]);

        $fullName = $request -> fullName;
        $userName = $request -> userName;
        $password = md5($request -> password);
        $role = $request->role ?? 'USER'; // Default to 'USER' if no role is provided

        DB::insert('insert into users (fullName, userName, password, role) values (?,?,?,?)', [$fullName, $userName, $password, $role]);
        
    }


}

