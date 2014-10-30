#!/usr/bin/perl -w
use Mojolicious::Lite;
use JSON qw/decode_json/;
use File::Slurp;
use Data::Dumper;

get '/' => sub {
    my $self = shift;
    my $tweets = $self->read_tweets();
    $self->render('index', tweets => $tweets);   
};

helper read_tweets => sub { 
    # grab every json file from the folder
    my $filepath = "../fry-stream/tweets/";
    opendir(TWEETS, $filepath); 
    my @tweetfiles = readdir(TWEETS);
    my @tweets;
    for my $tweetfile (@tweetfiles) { 
         next if $tweetfile =~ /^\.+/;
         say "Looking at $filepath$tweetfile";
         my $file = read_file("$filepath$tweetfile");
         say "Read file: $file";
         my $tweet = decode_json($file);
         say "decoded json: ",Dumper($tweet);
         push @tweets, decode_json(read_file("$filepath$tweetfile"));
    }

    # turn them into an array of hash refs (one hash ref per tweet)
    return \@tweets;
};

app->start;



__DATA__

@@ index.html.ep
<!DOCTYPE html>
<html>
    <head>
        <title>ur-fry</title>
        <link rel="stylesheet" type="text/css" href="urfry.css">
    </head>
    <body>
        % for my $tweet (@{$tweets}) {
        <div class="tweet">
            <div class="header">
                %= $tweet->{user}->{screen_name}
            </div>
            <div class="content">
                %= $tweet->{text}
            </div>
        </div>
        % }
    </body>
</html>
