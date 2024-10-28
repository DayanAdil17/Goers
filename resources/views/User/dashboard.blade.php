@extends('layouts.apps')
@section('title' , 'DASHBOARD')
@section('content')
    <div id="login"></div>
    <script>
        let year = {!! json_encode($year) !!}
        let userData = {!! json_encode($userData) !!}        
    </script>
    <script src="/js/Index.js"></script>
@endsection