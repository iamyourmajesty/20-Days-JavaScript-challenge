const menuBars = document.getElementById('menu-bars');
const Overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');

const navItems =[nav1,nav2,nav3,nav4,nav5];

// control navigation animation
function navAnimation(direction1,direction2) {
    navItems.forEach((nav,i) =>{
        nav.classList.replace(`slide-${direction1}-${i+1}` , `slide-${direction2}-${i+1}`);
    });
}

function toggleNav() {

    // to toggle menu bar icon
    menuBars.classList.toggle("change");

    // toggle : Menu Active
    Overlay.classList.toggle('overlay-active');
    if(Overlay.classList.contains('overlay-active'))
    {
        
        //Animate in overlay
        Overlay.classList.replace('overlay-slide-left','overlay-slide-right');
        

        //animate in
        navAnimation('out','in');
    }
    else
    {
        // Animate out overlay 
        Overlay.classList.replace('overlay-slide-right','overlay-slide-left');

         //animate out
         navAnimation('in','out');
    }
    
}

// add EventListner
menuBars.addEventListener('click',toggleNav);
nav1.addEventListener('click',toggleNav);
nav2.addEventListener('click',toggleNav);
nav3.addEventListener('click',toggleNav);
nav4.addEventListener('click',toggleNav);
nav5.addEventListener('click',toggleNav);