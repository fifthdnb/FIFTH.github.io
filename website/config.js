// FIFTH Website Configuration
// Alle herbruikbare links en configuratie op één plek

const CONFIG = {
    // Social Media Links
    socials: {
        spotify: 'https://open.spotify.com/artist/2nkPDrBTpqCFWeK3ZMLmlF',
        appleMusic: 'https://music.apple.com/nl/artist/fifth/1777844558?l=en-GB',
        instagram: 'https://www.instagram.com/fifthdnb',
        soundcloud: 'https://soundcloud.com/fifthdnb',
        beatport: 'https://www.beatport.com/artist/fifth/742392'          
    },
    
    // Contact Informatie
    contact: {
        email: 'contact@fifth.nu',
        website: 'https://www.fifth.nu',
        pressKit: 'https://www.dropbox.com/scl/fo/lp00na93ejps5i59g00s7/APVDEATm-fYE5iWofOXUzOw?rlkey=6bbn9f8zfuj9pwdj1pjjxtqxd&dl=0'
    },
    
    // Navigatie Links (relatieve paden worden automatisch aangepast)
    navigation: {
        music: 'music.html',
        agenda: '#agenda',
        updates: '#updates',
        biography: 'biography.html'
    },
    
    // Site Informatie
    site: {
        name: 'FIFTH',
        fullName: 'FIFTH - Drum & Bass Artist',
        description: 'Tour dates, music releases, and updates from DJ and producer FIFTH.',
        copyrightYear: '2026'
    }
};

// Maak CONFIG beschikbaar voor alle scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
