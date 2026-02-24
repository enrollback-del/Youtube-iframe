function extractVideoID(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length==11)? match[2]: null;
}

async function fetchViewCount(videoID, apiKey) {
    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoID}&key=${apiKey}`);
        const data = await res.json();
        if(data.items && data.items.length > 0){
            return data.items[0].statistics.viewCount;
        }
        return "N/A";
    } catch(e){
        return "N/A";
    }
}

async function loadVideos() {
    const frameCount = parseInt(document.getElementById('frame-count').value) || 1;
    const links = document.getElementById('youtube-links').value.split(',').map(l=>l.trim());
    const startTime = parseInt(document.getElementById('start-time').value) || 0;
    const loopCount = parseInt(document.getElementById('loop-count').value) || 1;
    const apiKey = document.getElementById('api-key').value;
    
    const grid = document.getElementById('video-grid');
    grid.innerHTML = "";

    for(let i=0; i<frameCount; i++){
        const videoID = extractVideoID(links[i % links.length]);
        if(!videoID) continue;

        const viewCount = await fetchViewCount(videoID, apiKey);

        const container = document.createElement('div');
        container.className = 'video-container';
        container.innerHTML = `
            <div class="browser-bar">
                <span>Browser ${i+1}</span>
                <span class="views">${viewCount} views</span>
            </div>
            <iframe src="https://www.youtube.com/embed/${videoID}?start=${startTime}&loop=${loopCount}&playlist=${videoID}" allowfullscreen></iframe>
        `;
        grid.appendChild(container);
    }
}
