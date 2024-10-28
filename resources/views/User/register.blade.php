@extends('layouts.app')
@section('title' , 'REGISTER')
@section('content')
    <div id="login"></div>
    <script>
        let year = {!! json_encode($year) !!}        
    </script>
    <script src="/js/Index.js"></script>
@endsection