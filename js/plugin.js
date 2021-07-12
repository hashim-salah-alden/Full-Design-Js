
let interval ,

    randomizeStatue = false ;

// store option spans of random background 
let backgroundOptions = document.querySelectorAll('.setting-options .random-background span');

// the options of colors
let colorOption = document.querySelectorAll('.color-options li');

// store chosen statue of random background
let chosenBackOption = localStorage.getItem('background-statue');

// check if there's background option in clocal storage
if(chosenBackOption !== 'null'){

        // remove active class from another option
        document.querySelector('.setting-options .random-background .active').classList.remove('active');

        backgroundOptions.forEach(option => {
            
        if(option.dataset.option === chosenBackOption){
            // add active class to chosen option
            option.classList.add('active')
        }
        })

        if(chosenBackOption === 'true'){

            randomizeStatue = true ;
        
        }else{

            randomizeStatue = false ;

        }
}

// store the value of chosen color in local storage
let chosenColor = localStorage.getItem('chosen-color');

// check if there is chosen color in local storage
if(chosenColor !== null){
    // change the main color to the chosen color in local storage
    document.documentElement.style.setProperty('--main-color',chosenColor);

    // remove active class from another option
    document.querySelector('.color-options .active').classList.remove('active');

    colorOption.forEach(option => {
        
        if(option.dataset.color === chosenColor){
            // add active class to chosen option
            option.classList.add('active')
        }
    })
}

// open the side bar 
let openButton = document.querySelector('.toggle-option');

openButton.onclick = function () {
    // add show class and open the side bar
    document.querySelector('.setting-options').classList.toggle('show');
    // add spin class to gear icon
    document.querySelector('.fa-gear').classList.toggle('fa-spin');
};

// switch colors function
colorOption.forEach(option =>{

    option.onclick = function() {
        // change the main color to chosen color
        document.documentElement.style.setProperty('--main-color',option.dataset.color);
        // remove active class from another option
        document.querySelector('.color-options .active').classList.remove('active');
        // add active class to chosen color
        this.classList.add('active');
        // add chosen color to local storage
        localStorage.setItem('chosen-color',option.dataset.color);
    }  
});

// create control of random background  function 
backgroundOptions.forEach(option => {

    option.addEventListener('click',(e) => {
        // remove active class from another option
        document.querySelector('.setting-options .random-background .active').classList.remove('active');
        // add active class to chosen option
        e.target.classList.add('active');

        if(e.target.dataset.option === 'true'){

            randomizeStatue = true ;

            randomizeBackground ();

            localStorage.setItem('background-statue',true);

        }else{

            randomizeStatue = false ;

            clearInterval(interval);

            localStorage.setItem('background-statue',false);

        }

    });

});

// store the backgrounds in array
let backgroundImgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// store the header into var
let header = document.querySelector('.header');

// create randomize function
function randomizeBackground () {

if (randomizeStatue === true){

interval = setInterval(() => {
    // get random index
    let randomNum = Math.floor(Math.random() * backgroundImgs.length);
        
    // change the background src to random index
    header.style.backgroundImage = `url(images/${backgroundImgs[randomNum]})`;
        
    },3000)
}
};

randomizeBackground ();

// create pop up when click on the images

// get the main elements in vars
let imgs = document.querySelectorAll('.gallery .images-box img');

imgs.forEach(img => {

img.addEventListener('click', (e) => {
        // create the popup
        let popUp = document.createElement('div');

        //add overlay class to the popup div
        popUp.className = 'popup-overlay';

        // append the popup to body
        document.body.appendChild(popUp);
        
        // create the image box
        let imgBox = document.createElement('div');

        // add class to img box
        imgBox.className  = 'imgBox';

        // append the img box to the body
        document.body.appendChild(imgBox);
        // check if there's heading to add it above the img
        if(e.target.alt !== ""){
            // create the heading container
            let heading = document.createElement('div');
            // add the class
            heading.className = 'img-heading';
            // add the text
            heading.innerHTML = `<h3 class="capitalize">${e.target.alt}</h3>`;
            // append the heading to img box
            imgBox.appendChild(heading);

        }

        // create the img element
        let popupImg = document.createElement('img');

        // add the src to img
        popupImg.src = e.target.src;

        // append the img to the popup box
        imgBox.appendChild(popupImg);

        // create the close element
        let closeButton = document.createElement('span');

        closeButton.className = 'close-button';
        // add the icon class to element
        closeButton.innerHTML = `<i class="fa fa-times-circle icon"></i>`
        // append the icon to the main element
        imgBox.appendChild(closeButton);
        // close button function
        closeButton.addEventListener('click', () => {
            // remove the popup div
            popUp.remove();
            // remove the img box
            imgBox.remove();
        
        });
});

});

// the main skills div
let ourSkills = document.querySelector('.skills'),

// the skill span
skillsElements = document.querySelectorAll('.skills .progress-span');

window.onscroll = function () {

        // Skills Offset Top
        let skillsOffsetTop = ourSkills.offsetTop - 100,
            // the scrolled value
            windowScrollTop = this.pageYOffset ;

            if(windowScrollTop >= skillsOffsetTop){

                skillsElements.forEach(ele => {
                    
                    ele.style.width = ele.dataset.progress;
                });
            }
}

// get the bullets elemnets and links 
let bullets = document.querySelectorAll('.navigation-bullets .bullet'),

    links   =document.querySelectorAll('.nav .links li')

// scroll to element
function scrollTo(elements){
    // get element 
    elements.forEach(ele => {

        ele.addEventListener('click', (e) => {

            document.querySelector(e.target.dataset.target).scrollIntoView({

                behavior: 'smooth'

            });

        });

    });

};

// call the scroll function
scrollTo(bullets);

scrollTo(links);