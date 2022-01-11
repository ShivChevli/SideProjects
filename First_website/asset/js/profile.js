$(document).ready(function () {
    
    // alert($name);
    // alert($emial);
    // alert($mobileNumber);
    // alert($add);
    // alert($pincode);
    
    $('[value="Edit Profile"]').click(function(){
       
        $('#edit-profile').removeClass('hide');
        $('#view-profile').addClass('hide');
    });

    $('[value="Save"]').click(function(){
        $name = $('#n').val();
        $emial = $('#emailId').val();
        $mobileNumber = $('#ph').val();
        $add = $('#add').val();
        $pincode = $('#pin').val();
        $profliePic = $('#customFile').val();
        alert($profliePic);
        $('#putn').text($name);
        $('#put_emailId').text($emial);
        $('#put_ph').text($mobileNumber);
        $('#put_pin').text($pincode);
        $('#put_ProflilePic').attr('src',$profliePic);
        
        $('#view-profile').removeClass('hide');
        $('#edit-profile').addClass('hide');
    });

    $('[value="cancel"]').click(function(){ 
        $('#view-profile').removeClass('hide');
        $('#edit-profile').addClass('hide');
    });

    $('.carousel').carousel('pause');

    $(window).resize(function () { 
        $w = $(window).width();
        // alert($w);
        if($w < 767)
        {
            $('#cancel-order').removeClass('btn-outline-light');
            $('#cancel-order').addClass('btn-outline-dark');
        } 
        else{
            $('#cancel-order').removeClass('btn-outline-dark');    
            $('#cancel-order').addClass('btn-outline-light');
        }
    });
});