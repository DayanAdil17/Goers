@extends('layouts.app')
@section('title' , 'LOGIN')
@section('content')
    <div id="login"></div>
    <script>
        let year = {!! json_encode($year) !!}
        let userDatabase = {!! json_encode($userDatabase->toArray()) !!};
    </script>
    <script src="/js/Index.js"></script>
@endsection