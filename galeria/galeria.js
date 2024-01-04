document.addEventListener('DOMContentLoaded', function () {
    // Artwork carousel
    const artworkCarousel = new Carousel('artwork-carousel', [
        { type: 'image', src: 'img/artwork1.jpg', alt: 'Artwork 1', description: 'Its you an me in this world' },
        { type: 'video', src: 'https://www.youtube.com/embed/VIDEO_ID', description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' },
        { type: 'image', src: 'img/artwork2.jpg', alt: 'Artwork 2', description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' },
        // Add more images and videos as needed
    ]);

    // Start artwork carousel
    artworkCarousel.start();
});

class Carousel {
    constructor(containerId, items) {
        this.container = document.getElementById(containerId);
        this.items = items;
        this.currentIndex = 0;
        this.intervalId = null;
        this.isVideoPlaying = false;
    }

    showItem(index) {
        this.container.innerHTML = '';
        const currentItem = this.items[index];

        if (currentItem.type === 'image') {
            const img = document.createElement('img');
            img.src = currentItem.src;
            img.alt = currentItem.alt;
            this.container.appendChild(img);
        } else if (currentItem.type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.width = '100%';
            iframe.height = '315';
            iframe.src = currentItem.src;
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            this.container.appendChild(iframe);
        }

        const description = document.createElement('p');
        description.textContent = currentItem.description;
        this.container.appendChild(description);
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.showItem(this.currentIndex);
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.showItem(this.currentIndex);
    }

    start() {
        this.showItem(this.currentIndex);
        this.intervalId = setInterval(() => {
            if (!this.isVideoPlaying) {
                this.next();
            }
        }, 5000); // Change the interval as needed (milliseconds)

        this.container.addEventListener('mouseenter', () => {
            clearInterval(this.intervalId);
        });

        this.container.addEventListener('mouseleave', () => {
            this.intervalId = setInterval(() => {
                if (!this.isVideoPlaying) {
                    this.next();
                }
            }, 5000); // Change the interval as needed (milliseconds)
        });

        this.addNavigationArrows();
    }

    addNavigationArrows() {
        const leftArrow = document.createElement('div');
        leftArrow.className = 'arrow left';
        leftArrow.innerHTML = '&#9664;';
        leftArrow.addEventListener('click', () => this.prev());
        this.container.appendChild(leftArrow);

        const rightArrow = document.createElement('div');
        rightArrow.className = 'arrow right';
        rightArrow.innerHTML = '&#9654;';
        rightArrow.addEventListener('click', () => this.next());
        this.container.appendChild(rightArrow);
    }
}
