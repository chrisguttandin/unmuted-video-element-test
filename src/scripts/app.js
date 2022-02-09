const audioContext = new AudioContext();
const $toggleAudioElementButton = document.getElementById('toggle-video-element-button');
const $toggleBothButton = document.getElementById('toggle-both-button');
const $toggleWebAudioButton = document.getElementById('toggle-web-audio-button');

let isPlaying = false;
let mediaElementAudioSourceNode = null;

const stop = ($video) => {
    $video.pause();
    $video.currentTime = 0;

    if (mediaElementAudioSourceNode !== null) {
        mediaElementAudioSourceNode.disconnect();
        mediaElementAudioSourceNode = null;
    }
};

$toggleAudioElementButton.addEventListener('click', () => {
    const $video = document.getElementById('video');

    stop($video);

    isPlaying = !isPlaying;

    $toggleBothButton.disabled = isPlaying;
    $toggleWebAudioButton.disabled = isPlaying;

    if (isPlaying) {
        const $clonedVideo = document.createElement('video');

        $clonedVideo.id = $video.id;
        $clonedVideo.innerHTML = $video.innerHTML;

        $video.replaceWith($clonedVideo);

        $clonedVideo.play();
    }
});

$toggleBothButton.addEventListener('click', () => {
    const $video = document.getElementById('video');

    stop($video);

    isPlaying = !isPlaying;

    $toggleAudioElementButton.disabled = isPlaying;
    $toggleWebAudioButton.disabled = isPlaying;

    if (isPlaying) {
        audioContext.resume();

        const $clonedVideo = document.createElement('video');

        $clonedVideo.id = $video.id;
        $clonedVideo.innerHTML = $video.innerHTML;

        $video.replaceWith($clonedVideo);

        $clonedVideo.play();

        mediaElementAudioSourceNode = new MediaElementAudioSourceNode(audioContext, { mediaElement: $clonedVideo });

        mediaElementAudioSourceNode.connect(audioContext.destination);
    }
});

$toggleWebAudioButton.addEventListener('click', () => {
    const $video = document.getElementById('video');

    stop($video);

    isPlaying = !isPlaying;

    $toggleAudioElementButton.disabled = isPlaying;
    $toggleBothButton.disabled = isPlaying;

    if (isPlaying) {
        audioContext.resume();

        const $clonedVideo = document.createElement('video');

        $clonedVideo.id = $video.id;
        $clonedVideo.innerHTML = $video.innerHTML;

        $video.replaceWith($clonedVideo);

        $clonedVideo.play();

        mediaElementAudioSourceNode = new MediaElementAudioSourceNode(audioContext, { mediaElement: $clonedVideo });
    }
});
