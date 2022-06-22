var sim_min = 0
var sim_sec = 0
var min 
var sec 
var currentPage
var currentExperiment
var footPrintFlag
var pageTimer
var email 
function checkAuth(page = '' , experiment = ''){
    if(localStorage.getItem('email') == null){
        if(experiment == 'Stack' || experiment == 'BST' || page == 'Aim' || page == 'Index')
            window.location.href = '../signin.html';
        else if(experiment == null)
            window.location.href = 'signin.html';
        else
        window.location.href = '../../signin.html';
    }

    email =localStorage.getItem('email')
    $('#welcomeMsg').html('Welcome ' + localStorage.getItem('name'));
    currentPage = page
    currentExperiment = experiment
    recordTime()
    footPrintFlag = true
}

function logout(directory_level){
    var link
    localStorage.clear();
    if(directory_level == 0)
        link = 'signin.html'
    else if(directory_level == 1)
        link = '../signin.html'
    else
        link = '../../signin.html'
    footPrint(link)
}


window.addEventListener('beforeunload' , function(e){
    if(footPrintFlag != false)
        footPrint()
    clearInterval(pageTimer)
});

function footPrint(link = '' , page = '' , experiment = ''){
    if(currentExperiment != ''){
        var data = {
            "email": email,
            "page": currentPage,
            "experiment": currentExperiment,
            "min": min,
            "sec": sec,
            "moveToPage": page,
            "moveToExperiment": experiment
        };
        $.ajax({
            type: 'POST',
            headers:{
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            url: 'https://smartlabbackend.herokuapp.com/addFootPrints',
            crossDomain: true,
            data: JSON.stringify(data),
            success: function(response){
                //console.log(response)
            }
        });
    }
    footPrintFlag = false
    if(link != '')
        window.location.href = link
}

function recordTime(){
    min = sec = 0
    pageTimer = setInterval(() => {
        if(sec<60)
            sec+=1
        else{
            min+=1
            sec=0
        }
    },
        1000
    );
}

function simulationRecord(falseCount , experiment){
    var data = {
        'email': email,
        'experiment': experiment,
        'error': falseCount,
        'min': (min - sim_min),
        'sec': (sec - sim_sec)
    }
    $.ajax({
        type: 'POST',
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'https://smartlabbackend.herokuapp.com/simulationRecord',
        crossDomain: true,
        data: JSON.stringify(data),
        success: function(response){
            //console.log(response)
        }
    }); 
}

function testScore(score , experiment , tmin , tsec){
    var data = {
        'email': email,
        'experiment': experiment,
        'score': score,
        'min': tmin,
        'sec': tsec 
    }
    $.ajax({
        type: 'POST',
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'https://smartlabbackend.herokuapp.com/testScore',
        crossDomain: true,
        data: JSON.stringify(data),
        success: function(response){
            //console.log(response)
        }
    });
}

function updateLeaderBoard(score , experiment , gmin , gsec){
    var data = {
        'email': email,
        'experiment': experiment,
        'score': score,
        'min': gmin,
        'sec': gsec
    }
    $.ajax({
        type: 'POST',
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'https://smartlabbackend.herokuapp.com/updateLeaderBoard',
        crossDomain: true,
        data: JSON.stringify(data),
        success: function(response){
            //console.log(response)
        }
    });
}

function getHighScore(experiment){
    $("#highscoreTable tbody").remove();
    var data = {
        'email': email,
        'experiment': experiment
    }
    $.ajax({
        type: 'POST',
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'https://smartlabbackend.herokuapp.com/getHighScore',
        crossDomain: true,
        data: JSON.stringify(data),
        success: function(response){
            var len = response.length;
            var table:HTMLTableElement = <HTMLTableElement>document.getElementById('highscoreTable')

            table.className = "table table-dark table-striped"
            var row = table.insertRow(0)
            var cell1 = row.insertCell(0)
            var cell2 = row.insertCell(1)
            var cell3 = row.insertCell(2)

            cell1.innerHTML = 'Played on'
            cell2.innerHTML = 'Score'
            cell3.innerHTML = 'Time Taken'

            for(var i = 0 ; i < len ; i++){
                row = table.insertRow(i+1);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell3 = row.insertCell(2);

                cell1.innerHTML = response[i]['date'];
                cell2.innerHTML = response[i]['score']
                cell3.innerHTML = response[i]['time_taken']['min'] + ' : ' + response[i]['time_taken']['sec']
            }
        }
    });
}

function getTestScore(experiment){
    $("#TestScore tbody").remove();
    var data = {
        'experiment': experiment
    }
    $.ajax({
        type: 'POST',
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'https://smartlabbackend.herokuapp.com/getTestScore',
        crossDomain: true,
        data: JSON.stringify(data),
        success: function(response){
            console.log(response)
            var len = response.length;
            var table:HTMLTableElement = <HTMLTableElement>document.getElementById('TestScore')

            table.className = "table"
            var row = table.insertRow(0)
            var cell0 = row.insertCell(0)
            var cell1 = row.insertCell(1)
            var cell2 = row.insertCell(2)
            var cell3 = row.insertCell(3)

            cell0.innerHTML = 'Email'
            cell1.innerHTML = 'Played on'
            cell2.innerHTML = 'Score (in %)'
            cell3.innerHTML = 'Time Taken'

            for(var i = 0 ; i < len ; i++){
                row = table.insertRow(i+1);
                cell0 = row.insertCell(0)
                cell1 = row.insertCell(1);
                cell2 = row.insertCell(2);
                cell3 = row.insertCell(3);

                cell0.innerHTML = response[i]['email']
                cell1.innerHTML = response[i]['date']
                cell2.innerHTML = response[i]['score'] + '%'
                cell3.innerHTML = response[i]['time_taken']['min'] + ' : ' + response[i]['time_taken']['sec']
            }
        }
    });
}

function getLeaderBoard(experiment){
    $("#LeaderBoard tbody").remove();
    var data = {
        'experiment': experiment
    }
    $.ajax({
        type: 'POST',
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'https://smartlabbackend.herokuapp.com/getLeaderBoard',
        crossDomain: true,
        data: JSON.stringify(data),
        success: function(response){
            var len = response.length;
            var table:HTMLTableElement = <HTMLTableElement>document.getElementById('LeaderBoard')

            table.className = "table "
            var row = table.insertRow(0)
            var cell0 = row.insertCell(0)
            var cell1 = row.insertCell(1)
            var cell2 = row.insertCell(2)
            var cell3 = row.insertCell(3)

            cell0.innerHTML = 'Email'
            cell1.innerHTML = 'Played on'
            cell2.innerHTML = 'Score'
            cell3.innerHTML = 'Time Taken'

            for(var i = 0 ; i < len ; i++){
                row = table.insertRow(i+1);
                cell0 = row.insertCell(0)
                cell1 = row.insertCell(1);
                cell2 = row.insertCell(2);
                cell3 = row.insertCell(3);

                cell0.innerHTML = response[i]['email']
                cell1.innerHTML = response[i]['date']
                cell2.innerHTML = response[i]['score']
                cell3.innerHTML = response[i]['time_taken']['min'] + ' : ' + response[i]['time_taken']['sec']
            }
        }
    });
}
