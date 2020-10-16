class SliderCarousel{
    constructor({wrap,item,prev,next,slidesToShow,position = 0,responsive = [],infinity,deviceWidth = [],}) {
        this.wrap = document.querySelector(wrap);
        this.item = document.querySelector(item);
        this.slidesItem = document.querySelector(item).children;
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.slidesToShow = slidesToShow;  
        this.infinity = infinity;   
        this.option = {
            position: 0,
            widthSlide: Math.floor(100 / this.slidesToShow),
        }
        this.deviceWidth = deviceWidth;
    }

    init() {
        this.showSlider(); 
        this.controlSlider();
        this.responsiveInit();
        
       
        
        
    }

    showSlider() {
       
        
        const style = document.createElement('style');
        this.item.classList.add('grisha-slider');
        this.wrap.classList.add('grisha-slider__wrap')

        for (const item of this.slidesItem ) {
            item.classList.add('grisha-slider-item');
        }
        style.textContent = `
            .grisha-slider__wrap {
                overflow:hidden;
                transition: transform 0.5s !important;
                will-change: transform !important;
                
            }
            .grisha-slider {
                display:flex;
                transition: transform 0.5s ;
                will-change: transform ;
                align-items:center;
                justify-content: space-between;
                
                
            
            }
            .grisha-slider-item {
                flex:0 0 ${this.option.widthSlide}%;
                margin: auto 0;
                position:absolute;
                
            }
           
           
        `
        document.head.appendChild(style);
    };
    
    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }
    prevSlider() {
        if (this.infinity || this.option.position > 0) {
            --this.option.position;
            if (this.option.position < 0) {
                this.option.position = this.slidesItem.length - this.slidesToShow;
            }
            this.item.style.transform = `translateX(-${this.option.position * this.option.widthSlide}%)`
            
            
        }
        
    }

    nextSlider() {
        if(this.infinity || this.option.position < this.slidesItem.length - this.slidesToShow)
            ++this.option.position;
            if (this.option.position > this.slidesItem.length - this.slidesToShow) {
                this.option.position = 0;
            }
            this.item.style.transform = ` translateX(-${this.option.position * this.option.widthSlide}%)`

            
            
    }

    responsiveInit() {
        const defaultToShow = this.slidesToShow;
        let allSize = this.deviceWidth.map(item => item.size);
        let maxSize = Math.max(...allSize);
        

        const checkDevice = () => {
            const widthWindow = document.documentElement.clientWidth;

            if(widthWindow < maxSize) {
                for (let i = 0; i < allSize.length;i++) {
                    if(widthWindow < allSize[i]) {
                        this.slidesToShow = this.deviceWidth[i].slidesToShow;
                        this.option.widthSlide = Math.floor((100 / this.slidesToShow ) - this.deviceWidth[i].pers);
                        this.showSlider();
                        console.log(this.option.widthSlide)
                        console.log(this.option.position)
                    }
                   
                }
               
            }
            else {
                this.slidesToShow = defaultToShow;
                this.option.widthSlide = Math.floor((100 / this.slidesToShow ) - 0.2);
                this.showSlider();
            
            
            }
        }
        checkDevice();
        
        window.addEventListener('resize', checkDevice);

    }
}