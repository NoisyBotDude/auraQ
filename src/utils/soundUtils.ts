// Audio context for handling browser autoplay policies
let audioContext: AudioContext | null = null;

// Initialize audio context on first user interaction
const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
};

// Preload audio elements
const buttonClickAudio = new Audio('public/sounds/button-click.mp3');
const successAudio = new Audio('public/sounds/success.mp3');
const errorAudio = new Audio('public/sounds/error.mp3');
const backgroundMusicAudio = new Audio('public/sounds/background-music.mp3');

// Set initial volumes  
buttonClickAudio.volume = 0.3;
successAudio.volume = 0.3;
errorAudio.volume = 0.3;
backgroundMusicAudio.volume = 0.1;

// Function to safely play audio
const playAudio = async (audio: HTMLAudioElement) => {
  try {
    // Initialize audio context on first play
    initAudioContext();
    
    // Reset the audio to start
    audio.currentTime = 0;
    
    // Play the audio
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      await playPromise;
    }
  } catch (error) {
    console.error('Error playing audio:', error);
  }
};

export const playButtonClickSound = () => {
  playAudio(buttonClickAudio);
};

export const playSuccessSound = () => {
  playAudio(successAudio);
};

export const playErrorSound = () => {
  playAudio(errorAudio);
};

export const playBackgroundMusic = () => {
  try {
    backgroundMusicAudio.loop = true;
    playAudio(backgroundMusicAudio);
    return backgroundMusicAudio;
  } catch (error) {
    console.error('Error with background music:', error);
    return null;
  }
};

// Initialize audio context on any user interaction
document.addEventListener('click', initAudioContext, { once: true });
document.addEventListener('keydown', initAudioContext, { once: true });
document.addEventListener('touchstart', initAudioContext, { once: true }); 