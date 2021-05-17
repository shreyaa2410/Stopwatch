$(function() {
    var mode = 0; //App mode//
    var timeCounter = 0; //time counter//
    var lapCounter = 0; //lap counter//
    var action; //set time-interval//
    var lapnumber = 0; //number of laps//
    //minutes,seconds,centiseconds for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds,
        lapMinutes, lapSeconds, lapCentiseconds;

    hideshowButtons("#startbutton", "#lapbutton"); //show start and laps button

    //clicking on the start button
    $("#startbutton").click(function() {
        mode = 1;
        hideshowButtons("#stopbutton", "#lapbutton"); //show stop and laps button
        startAction();
    });

    //clicking on stop button 
    $("#stopbutton").click(function() {
        clearInterval(action);
        hideshowButtons("#resumebutton", "#restartbutton");
    });

    //clicking on resume button 
    $("#resumebutton").click(function() {
        startAction();
        hideshowButtons("#stopbutton", "#lapbutton");
    });

    //clicking on restart button 
    $("#restartbutton").click(function() {
        //reload the page
        location.reload()
    });


    //clicking the lap button 
    $("#lapbutton").click(function() {
        // if mode is on 
        if (mode) {
            clearInterval(action);
            lapCounter = 0;
            startAction();
            addLaps();
        }
    });


    //start the counter
    function startAction() {
        action = setInterval(function() {
            timeCounter++;
            if (timeCounter == 100 * 60 * 100) {
                timeCounter = 0;
            }
            lapCounter++;
            if (lapCounter == 100 * 60 * 100) {
                lapCounter = 0;
            }
            updateTime();
        }, 10);
    }


    //function to update time 
    function updateTime() {
        //1min=60*100centiseconds=6000centiseconds
        timeMinutes = Math.floor(timeCounter / 6000);
        //1sec=100centiseconds
        timeSeconds = Math.floor((timeCounter % 6000) / 100);
        timeCentiseconds = (timeCounter % 6000) % 100;
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));

        //1min=60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter / 6000);
        //1sec=100centiseconds
        lapSeconds = Math.floor((lapCounter % 6000) / 100);
        lapCentiseconds = (lapCounter % 6000) % 100;
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }

    //display the laps time 
    function addLaps() {
        lapnumber++;
        var lapdetails =
            '<div class="lap">' +
            '<div class="laptimetitle">' +
            'Lap:' + lapnumber +
            '</div>' +
            '<div class="laptime">' + '<span>' + format(lapMinutes) +
            '</span>' +
            ':<span>' + format(lapSeconds) +
            '</span>' +
            ':<span>' + format(lapCentiseconds) +
            '</span>' +
            '</div>' +
            '</div>';

        //adding the details of the lap in the div 
        var x = $("#laps").html();
        x = lapdetails + x;
        $("#laps").html(x);

    }

    //format the time 
    function format(number) {
        if (number < 10)
            return '0' + number;

        else
            return number;
    }

    //function to hide and show start,laps,reset,stop,resume according to needs//
    function hideshowButtons(x, y) {
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

});