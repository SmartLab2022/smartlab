var otp
var otp_counter

function signIn() {
    var data = {
        'email': $('#inputEmail').val(),
        'password': $('#inputPassword').val()
    };
    $.ajax({
        type: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'https://smartlabbackend.herokuapp.com/signIn',
        crossDomain: true,
        data: JSON.stringify(data),
        success: function (response) {
            if (response['status'] == 0) {
                localStorage.setItem('email', response['email']);
                localStorage.setItem('name' , response['name']);
                localStorage.setItem('type' , response['type'])
                if(response['type'] == 'Admin')
                    window.location.href = 'admin/admin.html';
                else
                    window.location.href = 'Introduction.html';
            }
            else {
                $('#inputPassword').val('');
                $('#error').html("*" + response['msg']);
            }
        },
        error: function (error) {
            //$('#error').html(error);
        }
    });
}

function validateEmail(userInput){
    $('#message').html('')
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!userInput.value.match(mailformat)){
        userInput.value = ''
        userInput.focus()
        $('#message').html('*Enter Valid Email Address!!')
    }
}

$(function(){
    $('#inputPassword').keypress(function(event){
        if(event.keyCode == 13 && document.title == 'Sign In')
            signIn()
    })
})

$(function(){
    $('#confirmPassword').keypress(function(event){
        if(event.keyCode === 13){
            signup()
        }
    });
});
function validateName(){
    $('#message').html('')
    var nameFormat = /^[A-Za-z\s]+$/
    if(!($('#fname').val().toString()).match(nameFormat)){
        $('#message').html('Enter Valid Name.')
        $('#fname').val('').focus()
    }
}

function confirmPassVerify(){
    $('#message').html('')
    if($('#inputPassword').val().toString() != $('#confirmPassword').val().toString()){
        $('#message').html('Password and Confirm Password should be same.')
        $('#inputPassword').val('').focus()
        $('#confirmPassword').val('')
    }
}
function signup(){
    var fname = $('#fname').val().toString()
    var lname = $('#lname').val().toString()
    var email = $('#inputEmail').val().toString()
    var password = $('#inputPassword').val().toString()
    if(fname != '' && email != '' && password != '' && $('#confirmPassword').val().toString() != ''){
        sessionStorage.setItem('fname',fname)
        sessionStorage.setItem('lname',lname)
        sessionStorage.setItem('email',email)
        sessionStorage.setItem('password',password)
        var otp_sent_status = sendOtp(email)
        if(otp_sent_status == 0){
            document.getElementById('verify_email').style.display = 'block'
            document.getElementById('otp_textbox').focus()
            document.getElementById('signup_details').style.display = 'none'
            otp_timer('SignUp')
        }
        else{ 
            $('#inputEmail').val('').focus()
            $('#inputPassword').val('')
            if(otp_sent_status == 1)
                $('#message').html('*A user with this email address already exists!')
            else
                $('#message').html('*Check Your Email Address!!')
        }

    }
    else{
        $('#message').html("*Enter Required Fields!")
    }
}

function sendOtp(email){
    var verify_data = {'email': email}
    var status
    $.ajax({ 
        type: "POST",
        async:false,
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'https://smartlabbackend.herokuapp.com/emailVerification',
        crossDomain: true,
        data: JSON.stringify(verify_data),
        success: function(response) {
           if(response['status'] == 0){
                otp = response['otp']
                status = 0
           }
           else
                status = response['status']
        },
        error: function(error) {
        }
    });
    return status
}


function addUser() {
    clearInterval(otp_counter)
    var otp_txt:HTMLInputElement = <HTMLInputElement>document.getElementById('otp_textbox')
    if(otp_txt.value.toString() == otp){
        var data = {
            'fname': sessionStorage.getItem('fname'),
            'lname': sessionStorage.getItem('lname'),
            'email': sessionStorage.getItem('email'),
            'password': sessionStorage.getItem('password'),
            'type': ''
        }
        $.ajax({ 
            type: "POST",
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            url: 'https://smartlabbackend.herokuapp.com/signUp',
            crossDomain: true,
            data: JSON.stringify(data),
            success: function(response) {
                alert(response['msg'])
                localStorage.setItem('email' , sessionStorage.getItem('email'))
                localStorage.setItem('name' , sessionStorage['fname'])
                sessionStorage.clear()
                window.location.href = 'Introduction.html'
            }
        });
    }
    else{
        otp_txt.innerHTML=''
        document.getElementById('verify_email').style.display = 'none'
        document.getElementById('signup_details').style.display = 'block'
        $('#message').html('*Incorrect OTP, check your email!!!')
    }
}


function otp_timer(page){
    var otp_sec = 60
    otp_counter = setInterval(() => {
        otp_sec -= 1
        if(otp_sec == 0){
            clearInterval(otp_counter)
            if(page == 'SignUp'){
                document.getElementById('verify_email').style.display = 'none'
                document.getElementById('signup_details').style.display = 'block'
                $('#inputEmail').val('')
                $('#inputPassword').val('')
            }
            else{
                document.getElementById('email_id_div').style.display = 'block'
                document.getElementById('forgotPassOtp').style.display = 'none'
                document.getElementById('updatePass').style.display = 'none'
            }
            $('#message').html('*OTP Expired!!!')
        }
        else
            document.getElementById('otp_timer').innerHTML = otp_sec.toString()
    },
        1000
    );
}

function resend_otp(page){
    clearInterval(otp_counter)
    if(page == 'SignUp')
        signup()
    else
        forgotPassword()
}

function changePassword(){
    var currentPassword = $('#currentPassword').val().toString()
    var newPassword = $('#newPassword').val().toString()
    var confirmPassword = $('#confirmPassword').val().toString()
    if(currentPassword !='' && newPassword !='' && confirmPassword !=''){
        if(newPassword == confirmPassword){
            var data = {
                'email':email,
                'currentPassword':currentPassword,
                'newPassword':newPassword
            }
            $.ajax({
                type: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                url: 'https://smartlabbackend.herokuapp.com/changePassword',
                crossDomain: true,
                data: JSON.stringify(data),
                success: function(response) {
                    //console.log(response)
                    if(response['status'] == true){
                        alert('Password Changed Succesfully!!')
                        if(localStorage['type'] == 'Admin')
                            window.location.href = 'admin.html'
                        else
                            window.location.href = 'Introduction.html'
                    }
                    else{
                        $('#message').html('Incorrect Current Password')
                        $('#currentPassword').val('').focus()
                        $('#newPassword').val('')
                        $('#confirmPassword').val('')
                    }
                }
            });
        }
        else{
            $('#message').html('New Password and Confirm Password does not match!')
            $('#newPassword').val('').focus()
            $('#confirmPassword').val('')
        }
    }
    else{
        $('#message').html('Enter Required Values.')
    }
}

function forgotPassword(){
    var data = {
        'email': $('#email').val()
    }
    sessionStorage.setItem('email', $('#email').val().toString())
    $.ajax({
        type: "POST",
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'https://smartlabbackend.herokuapp.com/forgotPassword',
        crossDomain: true,
        data: JSON.stringify(data),
        success: function(response) {
            //console.log(response)
            if(response['status'] == 0){
                otp = response['otp']
                document.getElementById('email_id_div').style.display = 'none'
                document.getElementById('forgotPassOtp').style.display = 'block'
                document.getElementById('forgotPassOtp_textbox').focus()
                otp_timer('ForgotPass')
            }
            else{
                $('#message').html('The User with this email doesnot exist.')
            }
        }
    });
}

function verify_otp(){
    if($('#forgotPassOtp_textbox').val().toString() == otp){
        document.getElementById('forgotPassOtp').style.display = 'none'
        document.getElementById('updatePass').style.display = 'block'
        document.getElementById('newPassword_forgotPass').focus()
    }
    else{
        document.getElementById('email_id_div').style.display = 'block'
        document.getElementById('forgotPassOtp').style.display = 'none'
        $('#message').html('Incorrect OTP.')
    }
}

function updatePass(){
    clearInterval(otp_counter)
    var newPass = $('#newPassword_forgotPass').val()
    var confirmPass = $('#confirmPassword_forgotPass').val()
    if(newPass != '' && newPass == confirmPass ){
        var data = {
            'email': sessionStorage.getItem('email'),
            'password':newPass
        }
        $.ajax({
            type: "POST",
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            url: 'https://smartlabbackend.herokuapp.com/updatePassword',
            crossDomain: true,
            data: JSON.stringify(data),
            success: function(response) {
                if(response['status'] == 0){
                    alert('Password Updated Successfully!!!')
                    window.location.href = 'signin.html'
                }
            }
        });

    }
    else{
        $('#updatePass_message').html('New Password and Confirm Password should be same. It cannot be null')
    }
}