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
        return view('User.login',  compact('year') );
        
    }

    public function dashboard(){
       
        $year = Date('Y');
        return view('User.dashboard',  compact('year') );
        
    }

    public function register(){
       
        $year = Date('Y');
        return view('User.register',  compact('year') );
        
    }

    public function registration(Request $request){
       
        $fullName = $request -> fullName;
        $userName = $request -> userName;
        $password = md5($request -> password);

        DB::insert('insert into user (name, userName, password) values (?,?,?)', [$fullName, $userName, $password]);
        
    }
}

