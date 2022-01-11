$(document).ready(function() {

    // $(window).scroll(function() {
    //     var x = $(this).scrollTop();
    //     // var $y = 100;
    //     // var $z = 0;
    //     // $z = $y-$x;
    //     if (x > 100) {
    //         $("#cetogary-menu").css({"position":"fixed","top":"0px"});
    //     } 
    //   });

    // $(window).scroll(function() {
    //     if ($(this).scrollTop() < 100) {
    //         $("#cetogary-menu").css({"position":"fixed","top":"100px"});
    //     } 
    // });
    
    $('[data-toggle="modal"]').click(function(){
        
        var $imgsrc = $(this).find('img').attr('src');
        var $imghea = $(this).find('h4').text();
        var $imgdec = $(this).find('p').text();
        $('#modalImg').attr('src',$imgsrc);
        $('#big-description-heading').text($imghea);
        $('#big-description').text($imgdec);
        $('.modal').addClass('modal-app');
        $('#modalImg').elevateZoom({
            zoomType:"inner",
            easing:"true"
        });
        var $width = $(window).width();
        if(width>576){

        }
    });
    
    // ------------------------- Menu Function ----------------------
    $('#Shirt').click(function(){
        $('.active-cat').removeClass('active-cat');
        $(this).addClass('active-cat');
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('.item-cont').hide();
        $('.shirt').show();
    });
    $('#all').click(function(){
        $('.active-cat').removeClass('active-cat');
        $(this).addClass('active-cat');
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('.item-cont').show();
    });
    $('#Tshirt').click(function(){
        $('.active-cat').removeClass('active-cat');
        $(this).addClass('active-cat');
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('.item-cont').hide();
        $('.tshirt').show();
    });
    $('#jence').click(function(){
        $('.active-cat').removeClass('active-cat');
        $(this).addClass('active-cat');
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('.item-cont').hide();
        $('.jence').show();
    });
    $('#shoes').click(function(){
        $('.active-cat').removeClass('active-cat');
        $(this).addClass('active-cat');
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('.item-cont').hide();
        $('.shoes').show();
    });
    $('#sendal').click(function(){
        $('.active-cat').removeClass('active-cat');
        $(this).addClass('active-cat');
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('.item-cont').hide();
        $('.sendal').show();
    });
    $('#menc').click(function(){
        $('.active-cat').removeClass('active-cat');
        $(this).addClass('active-cat');
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('.item-cont').hide();
        $('.man').show();
    });
    $('#womenc').click(function(){
        $('.active-cat').removeClass('active-cat');
        $(this).addClass('active-cat');
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('.item-cont').hide();
        $('.women').show();
    });
    $('#childc').click(function(){
        $('.active-cat').removeClass('active-cat');
        $(this).addClass('active-cat');
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('.item-cont').hide();
        $('.child').show();
    });

    // $('.nav-item').click(function(){
    //     $('#navbarNav').hide();
    // });
    // $('.navbar-toggler').click(function(){
    //     $('#navbarNav').show();
    // });

    $('#buy-poduct').click(function(){
        // $('.alert').alert();
        alert("Your Order is Sussecesfully Placed\nThank You for your Trust");
    });
    
    $('#profileBox').click(function(){ 
        $(this).addClass('profile-box');
        $('#profileMenuOption').show();
    });
    
    $('#profileBox').mouseleave(function(){ 
        $(this).removeClass('profile-box');
        $('#profileMenu').hide();
        $('#profileMenuOption').hide();
    });

    $('#cart-poduct').click(function(){
        alert("Your Order is Sussecesfully Added Into your cart\nHope We will get Order Soon");
    });

    $('[data-dismiss="modal"]').click(function(){
        setTimeout(function(){
            $('#modelId').modal('hide')
        }, 500);
        $('.modal').addClass('disapp');
    });

    $('[data-dismiss="modal"],.modal-backdrop').click(function(){
        setTimeout(function(){
            $('#modelId').modal('hide')
        }, 500000);
        $('.zoomContainer').hide();
    }); 

} );