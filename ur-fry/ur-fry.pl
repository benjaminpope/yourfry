#!/usr/bin/perl -w
use Mojolicious::Lite;
use JSON qw/decode_json/;
use File::Slurp;
use Data::Dumper;
use Mojolicious::Static;

my $static = Mojolicious::Static->new;
push @{$static->paths}, 'images/';
my $head = $static->file('images/2-head.png');
my $foot = $static->file('images/2-foot.png');

get '/' => sub {
    my $self = shift;
    my $tweets = $self->read_tweets();
    my $headlines = $self->read_headlines();
    $self->render('index', tweets => $tweets, heads => $headlines);   
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

helper read_headlines => sub { 
    open HEAD,"../Headlines";
    my @headlines;
    for my $line (<HEAD>) {
        push @headlines, split /\t/, $line;
    }

    # turn them into an array of hash refs (one hash ref per tweet)
    return \@headlines;
};

app->start;



__DATA__

@@ index.html.ep
<!DOCTYPE html>
<html>
    <head>
        <style media="screen" type="text/css">
            .tweet { 
                position:absolute;
                width: 400px;
                background-color:"#ffffff";
            }
            .header { 
                font-size: 200%;
            }
        </style>
         <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <title>ur-fry</title>
    </head>
    <body>
        % for my $tweet (@{$tweets}) {
        % my $twidth = 300;
        % my $theight = 400;
        % my $xpos = rand(1024);
        % my $ypos = rand(800);
        <div class="tweet" style="left: <%=${xpos}%>px; top: <%=${ypos}%>px;">
            <div class="header">
                %= $tweet->{user}->{screen_name}
            </div>
            <div class="content">
                %= $tweet->{text}
            </div>
        </div>
        % }


        % my $xpos = rand(1024);
        % my $ypos = rand(800);
        <iframe style="position: absolute; left: <%={$xpos}%>px; top: <%=${ypos}%>px;" width="600" height="450" src="http://www.onlineassessmenttool.com/what-fry-r-u/assessment-12306" frameborder="0" allowfullscreen></iframe>
    </body>
</html>
