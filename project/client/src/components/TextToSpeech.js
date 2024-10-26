import React, { useState, useEffect } from 'react';

const TextToSpeech = ({ term }) => {
    const [phonetic, setPhonetic] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en'

    useEffect(() => {
        if (!term) {
            setPhonetic('')
            setAudioUrl('')
        }

        if (term) {
            // Fetch pronunciation data from the dictionary API
            fetch(`${DICTIONARY_API_URL}/${term}`)
                .then(response => response.json())
                .then(data => {
                    if (data && Array.isArray(data) && data[0].phonetics) {
                        const phonetics = data[0].phonetics.find(p => p.text && p.audio)
                        if (phonetics) {
                            setPhonetic(phonetics.text)
                            setAudioUrl(phonetics.audio)
                        } else {
                            setPhonetic('')
                            setAudioUrl('')
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching pronunciation:', error)
                    setPhonetic('')
                    setAudioUrl('')
                });
        }
    }, [term]);

    const handlePlay = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    return (
        term && phonetic && (
            <div style={styles.container}>
                <h3>How is the <i>{term}</i> pronounced?</h3>
                <p style={styles.p}>U.S. English</p>
                <div style={styles.pronunciationBox}>
                    <span style={styles.pronunciation}>{phonetic}</span>
                    <button style={styles.playButton} onClick={handlePlay}>
                        🔊 Play
                    </button>
                </div>
            </div>
        )
    );
};

const styles = {
    container: {
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        maxWidth: '400px',
        textAlign: 'center',
        margin: '20px auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    pronunciationBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '8px',
    },
    pronunciation: {
        fontSize: '18px',
        marginRight: '8px',
    },
    playButton: {
        cursor: 'pointer',
        fontSize: '16px',
        padding: '4px 8px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
    },
    p: {
        color: 'red'
    }
}

export default TextToSpeech;
