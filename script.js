function extractVideoID(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length==11)? match[2]: null;
}

function loadVideos() {
    const frameCount = parseInt(document.getElementById('frame-count').value) || 1;
    const links = document.getElementById('youtube-links').value.split(',').map(l=>l.trim());
    const startTime = parseInt(document.getElementById('start-time').value) || 0;
    const loopCount = parseInt(document.getElementById('loop-count').value) || 1;

    const grid = document.getElementById('video-grid');
    grid.innerHTML = "";

    for(let i=0; i<frameCount; i++){
        const videoID = extractVideoID(links[i % links.length]);
        if(!videoID) continue;

        const container = document.createElement('div');
        container.className = 'video-container';
        container.innerHTML = `
            <div class="browser-bar">Browser Window ${i+1}</div>
            <iframe src="https://www.youtube.com/embed/${videoID}?start=${startTime}&loop=${loopCount}&playlist=${videoID}" allowfullscreen></iframe>
        `;
        grid.appendChild(container);
    }
}
