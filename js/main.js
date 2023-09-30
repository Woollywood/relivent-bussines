$(document).ready(function(){

    const items = document.querySelectorAll(".item");

    items.forEach((item) => {
        item.addEventListener("click", () => {
            item.classList.toggle("open");
        });
    });


    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    })


    const tabsBtns = Array.from(document.querySelectorAll("[data-tab-id]"));
    const tabs = Array.from(document.querySelectorAll("[data-tab]"));

    let selectedTab = tabsBtns[0].dataset.tabId;

    const hideTabs = () => {
    tabs
        .filter((tab) => tab.dataset.tab !== selectedTab)
        .forEach((tab) => {
        tab.classList.add("tabs__tab--hide");
        });

    tabsBtns
        .filter((tab) => tab.dataset.tabId !== selectedTab)
        .forEach((tab) => {
        tab.classList.add("tabs__tab-btn--not-selected");
        });
    };
    hideTabs();

    const handleSelectTab = (e) => {
    selectedTab = e.target.dataset.tabId;

    tabs.forEach((tab) => {
        tab.classList.remove("tabs__tab--hide");
    });

    tabsBtns.forEach((tab) => {
        tab.classList.remove("tabs__tab-btn--not-selected");
    });

    hideTabs();
    };

    tabsBtns.forEach((btn) => {
    btn.addEventListener("click", handleSelectTab);
    });

  

    
$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
        if ($this.children('option').eq(i).is(':selected')){
          $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
        }
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
      $list.find('li.is-selected').removeClass('is-selected');
      $list.find('li[rel="' + $(this).attr('rel') + '"]').addClass('is-selected');
        $list.hide();
        //console.log($this.val());
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

    $('.responsive').slick({
        dots: true,
        infinite: false,
        centerPadding: '60px',
        speed: 300,
        infinite:true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [

            {
                breakpoint: 1550,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },

            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },

            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.slick__mobile').slick({
        dots: true,
        infinite: false,
        speed: 300,
        infinite:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [

            {
                breakpoint: 1550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },

            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },

            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

     

    const burger = document.querySelector('.burger');
    const navbar = document.querySelector('.mt-mobile');
    const body = document.querySelector('body');

    burger.addEventListener('click', () => {
        navbar.classList.toggle('nav-open');
        body.classList.toggle('body-open');
        burger.classList.toggle('burger-open');
        
    });

    function _class(name){
        return document.getElementsByClassName(name);
      }
      
      let tabPanes = _class("tab-header")[0].getElementsByTagName("div");
      
      for(let i=0;i<tabPanes.length;i++){
        tabPanes[i].addEventListener("click",function(){
          _class("tab-header")[0].getElementsByClassName("active")[0].classList.remove("active");
          tabPanes[i].classList.add("active");
          
          _class("tab-indicator")[0].style.top = `calc(80px + ${i*50}px)`;
          
          _class("tab-content2")[0].getElementsByClassName("active")[0].classList.remove("active");
          _class("tab-content2")[0].getElementsByTagName("div")[i].classList.add("active");
          
        });
      }


      var a , al , i , lfs , lfsl , b , c , p , g ;
// looking for custom select div in html code
a = document.getElementsByClassName("custom-select");
al = a.length;

for(i=0 ; i<al ; i++) {

    // looking for select tag and counting it
    lfs = a[i].getElementsByTagName("select")[0];
    lfsl = lfs.length;

    // for the select tag that counted created a div
    b = document.createElement("div");
    b.setAttribute("class" , "selected-item");
    a[i].appendChild(b);

    // created a span in the selected-item div
    p = document.createElement("span");
    p.setAttribute("class" , "text");

    // set the what you have written in the options to the new span that we have created
    p.innerHTML = lfs.options[lfs.selectedIndex].innerHTML;
    
    // created a span in selected-item div for arrow down
    g = document.createElement("span");
    g.setAttribute("class" , "arrow-down");
       


    // created a div that works as option list to hold options and placed it under selected-item div
    d = document.createElement("div");
    d.setAttribute("class" , "option-list");
    a[i].appendChild(d);
    
    // created div for each option 
    for(j=0 ; j<lfsl ; j++) {
        c = document.createElement("div");
        c.setAttribute("class" , "option");
        c.innerHTML = lfs.options[j].innerHTML;
        d.appendChild(c);
        b.appendChild(g);
        b.prepend(p);
        
        // this changes the clected item on click to options
        c.addEventListener("click" , function(){
            var s , sl , h , i;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling.firstChild; 

            // as you click on the options selected-item will update
            h.innerHTML= this.innerHTML;

            // this loop is for the refresh of tha page to keep the option as selected
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
      
                  s.selectedIndex = i;
      
                  h.innerHTML = this.innerHTML;
                  break;
                }
            }

            // if any option selected this will close the option list (jquery)
            $('.option-list').slideUp();

        });
    }    
}

// by clicking on the selected item the option list will toggle (jquery)
$('.selected-item').on("click" , function(e){
    $(this).next().slideToggle();
    $(this).parent().siblings().find('.option-list').slideUp();
    e.stopPropagation();
    $(this).children(".arrow-down").toggleClass("arrow-up");
    $(this).parent().siblings().find('.arrow-down').removeClass("arrow-up");
});

// click anywhere else to close all selec boxes
$('html , body').click(function(e){
    $(".option-list").slideUp();
    $(".arrow-down").removeClass("arrow-up");
});




});


