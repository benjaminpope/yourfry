#!/usr/bin/perl -w
use Mojolicious::Lite;

get '/' => {text => 'U R Fry! Yes, U!');

app->start;
