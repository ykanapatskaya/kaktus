$(window).load(function(){
    var wH = $(window).height()+20;
    //console.log(wH);
    if (wH > 1020) {
      $('#bg-img, #bg-left, #bg-right').addClass('bgFull');
    } else {
      $('#bg-img, #bg-left, #bg-right').removeClass('bgFull');

      if (wH < 800 && wH > 500) {
        $('#bg-img').css({'background-position': '50% '+wH-800+'px'});
      }
      else if (wH < 500) {
        $('#bg-img').css({'background-position': '50% '+-200+'px'});
      }
    }



    // $('#slideshow img').animate({top: -300+'px'}, 15000, 'linear').animate({top: -600+'px', opacity: 0.2}, 15000, 'linear');

    // $('#slideshow img').animate({width: 150+'%'}, 10000, 'linear').animate({top: -300+'px', opacity: 0.2}, 10000, 'linear');

    //if (parseInt($.browser.version) != 7 && $.browser.msie == true)
    $('.ie_exit').click(function(){
      $(this).parent('.ie-block').animate({top: wH}, 800, function(){$(this).hide()});
    })

    $('#loading_page').hide();
    $('#bg-img > div').show();

    var $contactBlock = $('#contactable_inner'),
    $contactForm = $('#contactForm'),
    wH = $(window).height(),
    wW = $(window).width();
    //console.log(wH);
    if (wH < 535 && wH > 480) {
      $contactBlock.css({top: wH-155+'px'});
      $contactForm.css({top: wH-450+'px'});
    } else if (wH < 480) {
      $contactBlock.css({top: '345px'});
      $contactForm.css({top: '50px'});
    }

    $contactBlock.click(function() {
      var $this = $(this);
      if ($('#contactForm').css("margin-right") != '0px') {
        $this.animate({"marginRight": "-=45px"}, "fast");
        $('#contactForm').animate({"marginRight": "-=0px"}, "fast");
        $this.animate({"marginRight": "+=145px"}, "slow");
        $('#contactForm').animate({"marginRight": "+=553px"}, "slow");
      } else {
        $('#contactForm').animate({"marginRight": "-=553px"}, "slow");
        $(this).animate({"marginRight": "-=145px"}, "slow").animate({"marginRight": "+=45px"}, "fast");
      }
    });

});

$(document).ready(function(){
  $('#slideshow img').each(function(i, val) {
    $slide = $(this);
    var tmpImg = new Image;
    tmpImg.src = $slide.attr('src');
    imgLoad(tmpImg, $slide);

  });

  function imgLoad(tmp, i) {
    $(tmp).load(function(e) {
      if (tmp.width < tmp.height) i.width('700px');
      else i.height('500px');
    });
  }

  $('#contactForm').submit(function() {
    var cont = $.ajax({
      type: "POST",
      data: "name="+$("#name").val()+"&email="+$("#email").val()+"&msg="+$("#msg").val()+"&kod="+$("#kod").val()+"&action=add_msg",
      cache: false,
      success: function(html){
        $("#img-kod").replaceWith($("#img-kod", html));
        $(".messages").replaceWith($(".messages", html));
        if ($('.messages').hasClass('send')) {
          $('#contactForm .text-input').val('');
          setTimeout(function() {
            $('#contactForm').animate({"marginRight": "-=553px"}, "slow");
            $('#contactable_inner').animate({"marginRight": "-=145px"}, "slow").animate({"marginRight": "+=45px"}, "fast");
          }, 2000);
        }
      }
    });
    return false;
  });

  $('#navigation-block a').on('click', function(e) {
    e.preventDefault();
    var cont2 = $.ajax({
      type: "POST",
      data: "issue_id="+$(this).attr('id')+"&lang=ru",
      cache: false,
      success: function(html){
        $(".content").replaceWith($(".content", html));
        $("#mcs_container").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10);
      }
    });
    return false;
  });

  $('#menu-img-content a').on('click', function(e) {
    e.preventDefault();
    $('#menu-img').removeClass('zindex');
    var wH = $(window).height();
    var wW = $(window).width();
    //alert(wH);
    var wTrambSm = 180;
    var hTrambSm = 120;
    var wTramb = 210;
    var hTramb = 140;
    var $menu;

    $('.info div').hide();
    $('.bgPhotos').hide().css({width: wTrambSm+40+'px'});

    $('.sub-menu').each(function(j, vals) {
      $menu = "#"+$(this).attr('id');
      $($menu+' .imgBlock').each(function(i, val) {
        $(this).css({top: -hTramb*i+'px', opacity: 0, width: wTrambSm+40+'px'});
      });
    });
    $('.imgBlock').css({top: -wH+'px', width: wTrambSm+40+'px'});
    $('.img, .bgPhoto').css({width: wTrambSm+'px', height: hTrambSm+'px'});


    $('#text').animate({'top': wH+20 + 'px'},500,function(){
      //$('#loading_page').show();
      $('body').addClass('gallery');
      $('<div class="fp_overlay"></div>').insertAfter($('#menu-img')).css({'top': wH+20+'px', 'height': wH+'px'});
      $('.fp_overlay').show().animate({'top': 0+'px'}, 500, function(){});

    });

    var cont3 = $.ajax({
      type: "POST",
      url: 'portfolio.php',
      data: "issue_id="+$(this).attr('id')+"&lang=ru",
      cache: false,
      success: function(html){

        $(html).insertAfter($('#menu-img'));

        galleryNavigate()
      },
      complete: function() {

      }
    });
    return false;
  });



});

$(window).resize(function() {
  var $contactBlock = $('#contactable_inner'),
      $contactForm = $('#contactForm'),
      wH = $(window).height(),
      wW = $(window).width();

  if (wH > 1000) {
    $('#bg-img, #bg-left, #bg-right').addClass('bgFull');
  } else {
    $('#bg-img, #bg-left, #bg-right').removeClass('bgFull');

    if (wH < 800 && wH > 500) {
      console.log('wH'+wH);
      $('#bg-img').css({'background-position-y': wH-800+'px'});
    }
    else if (wH < 500) {
      $('#bg-img').css({'background-position-y': -200+'px'});
    }
  }

  $contactBlock.css({top: '400px'});
  $contactForm.css({top: '100px'});

  if (wH < 535 && wH > 480) {
    $contactBlock.css({top: wH-155+'px'});
    $contactForm.css({top: wH-450+'px'});
  } else if (wH < 480) {
    $contactBlock.css({top: '345px'});
    $contactForm.css({top: '50px'});
  }


  //resize for gallery
  if ($('body').hasClass('gallery')) {

    //$('#thumbScroller .container').css('left',sliderLeft); //without easing
    $('#thumbScroller .container').stop().animate({left: sliderLeft}, 400,'easeOutCirc'); //with easing
    //$('#thumbScroller').css('width',$(window).width()-padding);

    $img = $('.fp_preview');
    $('#thumbScroller').width(wW-160+'px')

    $('#fp_gallery').height(wH-35+'px');
    $('#fp_gallery').width(wW+'px');
    $('.fp_overlay').height(wH+'px');
    $('.fp_overlay').width(wW+'px');

    sliderWidth=wW-160; //padding: 0 80px

    $img.height('auto');
    $img.width('auto');

    var iW = $img.width(),
        iH = $img.height();

    console.log('! iH='+iH+' iW='+iW+' wH='+wH+' wW='+wW);

    if (iW > iH && wW > iW) {
      if (wW/wH >= iW/iH ) {
        // console.log('wW/wH='+wW/wH+' iW/iH='+iW/iH);
        if (iH > wH) {
          $img.height(wH-50+'px').css({height: wH-50+'px'});
        }
        $img.width('auto').css({width: 'auto'});
      } else {
        // console.log('2 wW/wH='+wW/wH+' iW/iH='+iW/iH);
        // console.log('2 iH='+iH+' wH='+wH);
        // console.log('2 wW='+wW);
        if (iW > wW) {
          $img.width(wW-100+'px').css({width: wW-100+'px'});
        }
        $img.height('auto').css({height: 'auto'});
      }
      // console.log('iH='+iH+' iW='+iW);

    } else {
      if (wH/wW <= iH/iW) {
        // console.log('wW/wH='+wW/wH+' iW/iH='+iW/iH);
        if (iH > wH) {
          $img.height(wH-50+'px').css({height: wH-50+'px'});
        }
        $img.width('auto').css({width: 'auto'});
      } else {
        // console.log('2 wW/wH='+wW/wH+' iW/iH='+iW/iH);
        // console.log('2 iH='+iH+' wH='+wH);
        // console.log('2 wW='+wW);
        if (iW > wW) {
          $img.width(wW-100+'px').css({width: wW-100+'px'});
        }
        $img.height('auto').css({height: 'auto'});
      }
    }

    iW = $img.width();
    iH = $img.height();

    var $img_center = (wW - iW)/2;
    var $img_center_y = (wH - iH - 30)/2;
    var $btn_center_y = (wH - 160)/2;

    $img.css({left:$img_center, top:$img_center_y});

    $('#fp_next').css({'right':(wW - iW)/2-70+'px', top: $btn_center_y});
    $('#fp_prev').css({'left':(wW - iW)/2-70+'px', top: $btn_center_y});
    $('.fp_play').css({'right':(wW - iW)/2-65+'px', top: $btn_center_y+45+'px'});
  }
})
