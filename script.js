// permet de faire une transition douce
$("#animationAccueil").click(function(){
    $("html, body").animate({scrollTop:0}, 1500);
});
$("#animationPropos").click(function(){
    $("html, body").animate({scrollTop:$("#propos").offset().top}, 1500);
});
$("#animationProjet").click(function(){
    $("html, body").animate({scrollTop:$("#projet").offset().top}, 1500);
});
$("#animationCompetences").click(function(){
    $("html, body").animate({scrollTop:$("#competences").offset().top}, 1500);
});
$("#animationContact").click(function(){
    $("html, body").animate({scrollTop:$("#contact").offset().top}, 1500);
});
$("#top").click(function(){
    $("html, body").animate({scrollTop:$("#photo-cv").offset().top}, 1500);
});
// funtion pour cacher et faire apparaître
$(function(){
    $('#number-phone').hide();
    $('#phone').click(function(){
        $('#number-phone').toggle()
     });
 }); 
