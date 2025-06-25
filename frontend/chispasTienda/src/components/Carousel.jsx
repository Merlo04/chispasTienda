import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function CarouselComponent() {
    return (
        <div className="carousel-container">
            <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay
                interval={3000}
                showStatus={false}
                dynamicHeight={false}
            >
                <div>
                    <img src="https://www.nakaoutdoors.com.ar/img/articulos/2024/02/naturehike_neceser_xs01_toiletry_bag_10_imagen7.jpg" alt="Producto 1" />
                </div>
                <div>
                    <img src="https://acdn-us.mitiendanube.com/stores/001/174/214/products/apa-neceser-floresylimones_2fa7cabe-3cad-41a6-9970-2b6c994fae44-7db5eb0204b8f16e9617113813620615-1024-1024.webp" alt="Producto 2" />
                </div>
                <div>
                    <img src="https://acdn-us.mitiendanube.com/stores/998/449/products/d_nq_np_2x_976160-mla73371826793-79b5ee73941420865b17023931254305-640-0.jpg" alt="Producto 3" />
                </div>
            </Carousel>
        </div>
    );
}

export default CarouselComponent;