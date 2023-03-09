

class Artist {
    constructor(artist, song) {
        this.artist = artist;
        this.song = song;
    }
}

class Genre {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.artist = [];
    }
    addArtist(artist) {
        this.artists.push(artist);
    }
    deleteArtist(artist) {
        let index = this.artists.indexof(artist);
        this.artists.splice(index, 1);
    }
}

let genres = [];
let genreId = 0;


onClick('new-genre', () => {
    genres.push(new Genre(genreId++, getValue('new-genre-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id);
}

function drawDOM() {
    let genreDiv = document.getElementById('genres')
    clearElement(genreDiv);
    for (genre of genres) {
        let table = createGenreTable(genre);
        let title = document.createElement('h2');
        title.innerHTML = genre.name;
        title.appendChild(createDeleteGenreButton(genre));
        genreDiv.appendChild(title);
        genreDiv.appendChild(table);
        for (artist of genre.artist) {
            createArtistRow(genre, table, artist);
        }
    }
}

function createArtistRow(genre, table, artist) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = artist.name;
    row.insertCell(1).innerHTML = artist.song;
    let actions = row.insertCell(2);
    //actions.appendChild(createDeleteRowButton(genre, artist));
}

function createDeleteRowButton(genre, artist) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'delete';
    btn.oneClick = () => {
        let index = genre.member.indexOf(artist);
        genre.members.splice(index, 1);
        drawDOM();
    };
}

function createDeleteGenreButton(genre) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'delete genre';
    btn.onClick = () => {
        let index = genre.indexOf(genre);
        genres.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewArtistButton(Genre) {
    let btn = document.createElement("Button");
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'create';
    btn.onclick = () => {
        genre.artist.push(new Artist(getValue('name-input', genre.id), getValue('song-input', genre.id)));
        drawDOM();
    };
    return btn;
}


function createGenreTable(Genre) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-solid');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let songColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    songColumn.innerHTML = 'Song';
    row.appendChild(nameColumn);
    row.appendChild(songColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let songth = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', 'name-input', genre.id);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let songInput = document.createElement('input');
    nameInput.setAttribute('id', 'song-input', genre.id);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let newArtistButton = createNewArtistButton(genre);
    nameTh.appendChild(nameInput);
    songth.appendChild(songInput);
    createTh.appendChild(newArtistButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(songth);
    formRow.appendChild(createTh);
    return table;
}





function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
