const Reproductor = (function () {
    // Clase padre Multimedia
    class Multimedia {
        constructor(url) {
            this._url = url;
        }

        get url() {
            return this._url;
        }

        // Método para inicio del video
        setInicio(tiempo) {
            console.log("Este método es para realizar un cambio en la URL del video");
        }
    }

    // Clase hija Reproductor
    class Reproductor extends Multimedia {
        constructor(url, id) {
            super(url);
            this.id = id;
        }

        // Método para reproducir multimedia
        playMultimedia() {
            const iframe = document.getElementById(this.id);
            iframe.setAttribute("src", this.url);
        }

        // Tiempo de inicio al video
        setInicio(tiempo) {
            const iframe = document.getElementById(this.id);
            const urlTime = `${this.url}?start=${tiempo}`;
            iframe.setAttribute("src", urlTime);
        }
    }

    return Reproductor;
})();

// Instancias música, película y serie
const musica = new Reproductor("https://www.youtube.com/embed/Z0e8zwJzNr0?si=b3Y6aa2fk9Mw-oZVE", "musica");
const pelicula = new Reproductor("https://www.youtube.com/embed/kPMi_VxqcUc?si=fDPXYdDW6LY021Q7", "peliculas");
const serie = new Reproductor("https://www.youtube.com/embed/gapK18-dFMw?si=emkljSbaa1WI9VfC", "series");

// Método playMultimedia para cada instancia
musica.playMultimedia();
pelicula.playMultimedia();
serie.playMultimedia();

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('videoForm');
    const slider = document.getElementById('videoStart');
    const tiempoInicioLabel = document.getElementById('tiempoInicio');

    slider.addEventListener('input', function () {
        tiempoInicioLabel.textContent = this.value;
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const enlaceEmbed = document.getElementById('videoUrl').value;
        const url = convertirEnlaceYouTubeAEmbed(enlaceEmbed);

        const category = document.getElementById('videoCategory').value;
        const startTime = document.getElementById('videoStart').value;

        switch (category) {
            case 'Música':
                musica.setUrl(url);
                musica.setInicio(startTime);
                musica.playMultimedia();
                break;
            case 'Película':
                pelicula.setUrl(url);
                pelicula.setInicio(startTime);
                pelicula.playMultimedia();
                break;
            case 'Serie':
                serie.setUrl(url);
                serie.setInicio(startTime);
                serie.playMultimedia();
                break;
        }
    });
});

function convertirEnlaceYouTubeAEmbed(enlace) {
    // Identificar enlaces de YouTube.
    const regexYT = /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

    // Identificar enlaces de incrustación de YouTube.
    const regexEmbed = /^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;

    // Verifica si el enlace es un enlace de YouTube.
    if (regexYT.test(enlace) && !regexEmbed.test(enlace)) {
        const idVideo = enlace.match(regexYT)[1];
        // Devuelve el enlace de incrustación con el ID del video.
        return `https://www.youtube.com/embed/${idVideo}`;
    }

    return enlace;
}