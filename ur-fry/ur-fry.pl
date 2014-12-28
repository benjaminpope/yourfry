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
# my $bg = $static->file('browser2.png');


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
app->log( Mojo::Log->new( path => 'log', level => 'debug' ) );
app->start;



__DATA__

@@ index.html.ep
<!DOCTYPE html>
<html>
    <head>
<meta charset="utf-8">

 <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js"></script>
<script src="http://www.bethmcmillan.com/geek/yourfry/cloud/lib/d3/d3.js"></script>
<script src="http://www.bethmcmillan.com/geek/yourfry/cloud/d3.layout.cloud.js"></script>

        <style media="screen" type="text/css">
            .tweet { 
                position:absolute;
                width: 408px;
                background:#ffffff url('http://bethmcmillan.com/geek/yourfry/website/browser2-light.png');
		color: #999999;
		border: 1px solid #999999;
		font-size: 0.7em;
		padding: 10px;
		padding-top: 60px;
		z-index: 0;
            }
            .cloud { 
                position:absolute;
                width: 408px;
                background:#ffffff url('http://bethmcmillan.com/geek/yourfry/website/browser2-light.png');
		color: #999999;
		border: 1px solid #999999;
		font-size: 0.7em;
		padding: 10px;
		padding-top: 60px;
		z-index: 2;
            }
            .header { 
                font-size: 150%;
            }
	    #quiz {
		padding-top: 43px;
		border: 2px solid black;
		background: url('http://bethmcmillan.com/geek/yourfry/website/mac-small.png');
		z-index: 2;
	    }
        </style>
 <script>
$(function() {
$( ".tweet" ).draggable();
$( "#quiz" ).draggable();
$( "#face" ).draggable();
$(".cloud").draggable();
});
</script>
        <title>ur-fry</title>
    </head>
    <body>
	<img src="http://www.bethmcmillan.com/geek/yourfry/website/painttecfry.png" id="face" alt="Stephen Fry's face">
        % for my $tweet (@{$tweets}) {
        % my $twidth = 300;
        % my $theight = 400;
        % my $xpos = rand(1024);
        % my $ypos = rand(3000);
        <div class="tweet" style="left: <%=${xpos}%>px; top: <%=${ypos}%>px;" >
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
        <iframe id="quiz" style="position: absolute; left: <%=${xpos}%>px; top: <%=${ypos}%>px;" width="600" height="450" src="http://www.onlineassessmenttool.com/what-fry-r-u/assessment-12306" allowfullscreen></iframe>

        % my $xpos = rand(1024);
        % my $ypos = rand(800)+800;

<div id="cloud0" class="cloud" style="position: absolute; left: <%=${xpos}%>px; top: <%=${ypos}%>px;">
</div>

        % my $xpos = rand(1024);
        % my $ypos = rand(800)+1200;

<div id="cloud1" class="cloud" style="position: absolute; left: <%=${xpos}%>px; top: <%=${ypos}%>px;">
</div>

        % my $xpos = rand(1024);
        % my $ypos = rand(800)+1600;

<div id="cloud2" class="cloud" style="position: absolute; left: <%=${xpos}%>px; top: <%=${ypos}%>px;">
</div>

        % my $xpos = rand(1024);
        % my $ypos = rand(800)+2200;


<div id="cloud3" class="cloud" style="position: absolute; left: <%=${xpos}%>px; top: <%=${ypos}%>px;">
</div>

<script src="http://www.bethmcmillan.com/geek/yourfry/ur-fry/cloud.js"></script>

          

    </body>
</html>
