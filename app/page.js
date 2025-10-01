'use client';

import { useState } from 'react';
import UpgradeModal from './components/UpgradeModal';
import UsageCounter from './components/UsageCounter';
import { getUsageCount, incrementUsage, hasReachedLimit, getRemainingUses, isPremiumUser } from './utils/usage';

// Corporate jargon components
const VERBS = [
  'leverage', 'synergize', 'optimize', 'streamline', 'facilitate', 'ideate',
  'operationalize', 'monetize', 'strategize', 'revolutionize', 'disrupt',
  'incentivize', 'actionize', 'maximize', 'utilize', 'orchestrate', 'architect',
  'scale', 'iterate', 'pivot', 'empower', 'harness', 'deploy', 'actualize'
];

const ADJECTIVES = [
  'strategic', 'dynamic', 'robust', 'scalable', 'agile', 'holistic',
  'innovative', 'cross-functional', 'mission-critical', 'bleeding-edge',
  'best-in-class', 'future-proof', 'next-generation', 'transformative',
  'enterprise-grade', 'world-class', 'seamless', 'synergistic', 'paradigm-shifting'
];

const NOUNS = [
  'synergies', 'paradigms', 'initiatives', 'solutions', 'frameworks',
  'ecosystems', 'deliverables', 'bandwidth', 'verticals', 'touchpoints',
  'mindshare', 'core competencies', 'value propositions', 'pain points',
  'low-hanging fruit', 'moving forward', 'at the end of the day', 'stakeholders',
  'alignment', 'bandwidth', 'runway', 'velocity', 'metrics', 'KPIs'
];

const PHRASES = [
  'circle back', 'touch base', 'move the needle', 'think outside the box',
  'drill down', 'take it offline', 'run it up the flagpole', 'drink the Kool-Aid',
  'boil the ocean', 'peel the onion', 'pick the low-hanging fruit',
  'hit the ground running', 'get the ball rolling', 'bring to the table',
  'deep dive', 'level set', 'socialize this', 'put a pin in it',
  'open the kimono', 'move forward', 'parking lot this', 'table this'
];

// Meeting Bingo phrases
const BINGO_PHRASES = [
  'Let\'s take this offline',
  'Circle back on that',
  'Synergize our efforts',
  'Low-hanging fruit',
  'Move the needle',
  'Think outside the box',
  'Touch base next week',
  'Run it up the flagpole',
  'Shift the paradigm',
  'Deep dive into this',
  'Let\'s put a pin in that',
  'Open the kimono',
  'Drink the Kool-Aid',
  'Boil the ocean',
  'At the end of the day',
  'From a high level',
  'Net-net',
  'Quick win',
  'Table stakes',
  'Best practices',
  'Game changer',
  'Value add',
  'Bandwidth issues',
  'Level set',
  'Action items'
];

// Email deflection templates
const EMAIL_DEFLECTIONS = [
  {
    prefix: "Thank you for reaching out. I truly appreciate you thinking of me for this opportunity.",
    body: "After careful consideration and reviewing my current bandwidth allocation, I've determined that taking this on wouldn't allow me to deliver the level of excellence that both you and I would expect. My current strategic initiatives require deep focus, and I want to ensure I'm providing maximum value to existing commitments.",
    closing: "I'd love to revisit this conversation in the future when capacity opens up. Perhaps we can circle back next quarter?"
  },
  {
    prefix: "I want to start by saying how much I value our professional relationship and appreciate you considering me for this.",
    body: "That said, I need to be transparent about my current workload. I'm at capacity with mission-critical deliverables that demand my full attention. Taking on additional initiatives at this juncture would compromise the quality standards I hold myself to, and that's not fair to anyone involved.",
    closing: "Let's keep the lines of communication open. I'd be happy to revisit this when my runway clears up."
  },
  {
    prefix: "Thank you so much for thinking of me. It means a lot that you'd reach out.",
    body: "After conducting a thorough assessment of my current portfolio and strategic priorities, I've concluded that I need to respectfully decline at this time. I'm deeply committed to maintaining work-life integration while delivering exceptional results on existing projects, and adding more to my plate would dilute that focus.",
    closing: "I hope you understand, and I'm confident you'll find the right person for this. Let's definitely stay connected."
  }
];

function CorporateSpeakGenerator() {
  const [mode, setMode] = useState('generator'); // 'generator', 'bingo', 'email', 'voice'
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [bingoBoard, setBingoBoard] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState('generation');
  const [isPremium, setIsPremium] = useState(false);

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Load available voices on mount and when voices change
  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();

    // Filter for high-quality English voices
    const englishVoices = voices.filter(voice =>
      voice.lang.startsWith('en') &&
      voice.localService === false // Prefer cloud/neural voices
    );

    // If no cloud voices, fall back to local voices
    const localVoices = voices.filter(voice => voice.lang.startsWith('en'));

    const voicesToUse = englishVoices.length > 0 ? englishVoices : localVoices;

    // Sort by quality indicators (Google, Microsoft, Premium voices first)
    const sortedVoices = voicesToUse.sort((a, b) => {
      const aScore = (
        (a.name.includes('Google') ? 100 : 0) +
        (a.name.includes('Microsoft') ? 90 : 0) +
        (a.name.includes('Premium') || a.name.includes('Neural') ? 80 : 0) +
        (a.name.includes('Enhanced') ? 70 : 0)
      );
      const bScore = (
        (b.name.includes('Google') ? 100 : 0) +
        (b.name.includes('Microsoft') ? 90 : 0) +
        (b.name.includes('Premium') || b.name.includes('Neural') ? 80 : 0) +
        (b.name.includes('Enhanced') ? 70 : 0)
      );
      return bScore - aScore;
    });

    setAvailableVoices(sortedVoices);

    // Auto-select the best voice
    if (sortedVoices.length > 0 && !selectedVoice) {
      setSelectedVoice(sortedVoices[0]);
    }
  };

  // Load voices when component mounts
  if (typeof window !== 'undefined') {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    if (availableVoices.length === 0) {
      setTimeout(loadVoices, 100); // Small delay to ensure voices are loaded
    }
  }

  const generateCorporateSpeak = (text) => {
    if (!text.trim()) {
      return 'Please enter some text to corporatize!';
    }

    const templates = [
      `Let's ${getRandom(VERBS)} our ${getRandom(NOUNS)} to ${text.toLowerCase()}. From a ${getRandom(ADJECTIVES)} perspective, we need to ${getRandom(PHRASES)} and ${getRandom(VERBS)} this ${getRandom(ADJECTIVES)} initiative moving forward.`,

      `I think we should ${getRandom(PHRASES)} on "${text}". This represents a ${getRandom(ADJECTIVES)} opportunity to ${getRandom(VERBS)} our ${getRandom(NOUNS)} and drive ${getRandom(ADJECTIVES)} ${getRandom(NOUNS)} across the organization.`,

      `At the end of the day, "${text}" is really about ${getRandom(VERBS)}ing our ${getRandom(ADJECTIVES)} ${getRandom(NOUNS)}. Let's ${getRandom(PHRASES)}, align with ${getRandom(NOUNS)}, and ${getRandom(VERBS)} this in our next sprint.`,

      `From a ${getRandom(ADJECTIVES)} standpoint, we need to ${getRandom(VERBS)} "${text}" to maximize our ${getRandom(NOUNS)}. I'll ${getRandom(PHRASES)} with the ${getRandom(NOUNS)} and we can ${getRandom(VERBS)} this ${getRandom(ADJECTIVES)} solution.`,

      `"${text}" - I love where your head's at. Let's ${getRandom(VERBS)} that concept, ${getRandom(PHRASES)}, and create some ${getRandom(ADJECTIVES)} ${getRandom(NOUNS)} around it. This could be a real ${getRandom(ADJECTIVES)} game-changer for our ${getRandom(NOUNS)}.`,

      `To ${getRandom(VERBS)} on what you're saying about "${text}" - we need to take a ${getRandom(ADJECTIVES)} approach here. Let's ${getRandom(PHRASES)}, ${getRandom(VERBS)} our ${getRandom(NOUNS)}, and drive ${getRandom(ADJECTIVES)} outcomes. I'll socialize this with the stakeholders.`
    ];

    return getRandom(templates);
  };

  const generateBingoBoard = () => {
    // Shuffle and take 25 phrases
    const shuffled = [...BINGO_PHRASES].sort(() => Math.random() - 0.5);
    const board = shuffled.slice(0, 25);
    setBingoBoard(board);
  };

  const generateEmailDeflection = () => {
    const template = getRandom(EMAIL_DEFLECTIONS);

    return `Subject: Re: ${input || 'Your Request'}\n\n${template.prefix}\n\n${template.body}\n\n${template.closing}\n\nBest regards`;
  };

  const handleGenerate = () => {
    // Check premium status
    const premium = isPremiumUser();

    // Check usage limits for free users
    if (!premium) {
      if (mode === 'generator' && hasReachedLimit('generation')) {
        setUpgradeFeature('generation');
        setShowUpgradeModal(true);
        return;
      }
      if (mode === 'bingo' && hasReachedLimit('bingo')) {
        setUpgradeFeature('bingo');
        setShowUpgradeModal(true);
        return;
      }
    }

    // Generate content
    if (mode === 'generator') {
      setOutput(generateCorporateSpeak(input));
      if (!premium) incrementUsage('generation');
    } else if (mode === 'bingo') {
      generateBingoBoard();
      if (!premium) incrementUsage('bingo');
    } else if (mode === 'email') {
      setOutput(generateEmailDeflection());
      if (!premium) incrementUsage('generation');
    }
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyBingoBoard = () => {
    const text = bingoBoard.map((phrase, i) => {
      if ((i + 1) % 5 === 0) return phrase + '\n';
      return phrase;
    }).join(' | ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Voice Recording Feature
  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setVoiceError('Speech recognition not supported in this browser. Try Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      setVoiceError('');
      setInput('');
      setOutput('');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);

      // Auto-generate corporate speak
      const corporateText = generateCorporateSpeak(transcript);
      setOutput(corporateText);

      // Auto-play the corporate speak
      setTimeout(() => speakText(corporateText), 500);
    };

    recognition.onerror = (event) => {
      setIsRecording(false);
      setVoiceError(`Error: ${event.error}. Please try again.`);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  // Text-to-Speech Feature with selected voice
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      setVoiceError('Text-to-speech not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Use selected voice or find best available
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else if (availableVoices.length > 0) {
      utterance.voice = availableVoices[0];
    }

    // Natural speech settings
    utterance.rate = 1.0; // Normal speed for natural sound
    utterance.pitch = 1.0; // Natural pitch
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (event) => {
      setIsPlaying(false);
      setVoiceError(`Speech error: ${event.error}`);
    };

    // Small delay to ensure voices are loaded
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  // Preview voice function
  const previewVoice = (voice) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance("Let's leverage our synergies to drive strategic outcomes.");
    utterance.voice = voice;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎩 Corporate Speak Generator</h1>
        <p style={styles.subtitle}>Transform simple ideas into impressive business jargon</p>

        {/* Mode Selector */}
        <div style={styles.modeSelector}>
          <button
            onClick={() => setMode('generator')}
            style={{
              ...styles.modeButton,
              ...(mode === 'generator' ? styles.modeButtonActive : {})
            }}
          >
            💡 Make Me Sound Smart
          </button>
          <button
            onClick={() => {
              if (!isPremiumUser()) {
                setUpgradeFeature('voice');
                setShowUpgradeModal(true);
              } else {
                setMode('voice');
              }
            }}
            style={{
              ...styles.modeButton,
              ...(mode === 'voice' ? styles.modeButtonActive : {}),
              background: mode === 'voice' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 'white',
              border: mode === 'voice' ? 'none' : '2px solid #667eea',
              position: 'relative'
            }}
          >
            🎤 Voice Translator {!isPremiumUser() && <span style={styles.proBadge}>PRO</span>}
          </button>
          <button
            onClick={() => setMode('bingo')}
            style={{
              ...styles.modeButton,
              ...(mode === 'bingo' ? styles.modeButtonActive : {})
            }}
          >
            🎯 Meeting Bingo
          </button>
          <button
            onClick={() => setMode('email')}
            style={{
              ...styles.modeButton,
              ...(mode === 'email' ? styles.modeButtonActive : {})
            }}
          >
            📧 Email Fluffer
          </button>
        </div>

        {/* Generator Mode */}
        {mode === 'generator' && (
          <>
            {!isPremiumUser() && (
              <UsageCounter
                used={getUsageCount('generation')}
                limit={5}
                feature="generations"
              />
            )}
            <div style={styles.inputSection}>
              <label style={styles.label}>Enter your simple idea:</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., We should try that"
                style={styles.input}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button onClick={handleGenerate} style={styles.generateButton}>
                ✨ Corporatize It
              </button>
            </div>

            {output && (
              <div style={styles.outputSection}>
                <label style={styles.label}>Your impressive corporate speak:</label>
                <div style={styles.output}>{output}</div>
                <button onClick={copyToClipboard} style={styles.copyButton}>
                  {copied ? '✅ Copied!' : '📋 Copy to Clipboard'}
                </button>
              </div>
            )}

            <div style={styles.examples}>
              <h3 style={styles.examplesTitle}>Try these:</h3>
              <div style={styles.exampleButtons}>
                <button onClick={() => { setInput('We should try that'); handleGenerate(); }} style={styles.exampleButton}>
                  "We should try that"
                </button>
                <button onClick={() => { setInput('I need more time'); handleGenerate(); }} style={styles.exampleButton}>
                  "I need more time"
                </button>
                <button onClick={() => { setInput('That won\'t work'); handleGenerate(); }} style={styles.exampleButton}>
                  "That won't work"
                </button>
              </div>
            </div>
          </>
        )}

        {/* Meeting Bingo Mode */}
        {mode === 'bingo' && (
          <>
            <div style={styles.inputSection}>
              <p style={styles.bingoDescription}>
                Generate a 5x5 bingo board of corporate buzzwords to use (or watch for) in your next meeting!
              </p>
              <button onClick={handleGenerate} style={styles.generateButton}>
                🎲 Generate Bingo Board
              </button>
            </div>

            {bingoBoard.length > 0 && (
              <div style={styles.outputSection}>
                <div style={styles.bingoBoard}>
                  {bingoBoard.map((phrase, index) => (
                    <div key={index} style={styles.bingoCell}>
                      {phrase}
                    </div>
                  ))}
                </div>
                <button onClick={copyBingoBoard} style={styles.copyButton}>
                  {copied ? '✅ Copied!' : '📋 Copy Board'}
                </button>
              </div>
            )}
          </>
        )}

        {/* Voice Translator Mode */}
        {mode === 'voice' && (
          <>
            <div style={styles.inputSection}>
              <div style={styles.voiceCard}>
                <h3 style={styles.voiceTitle}>🎤 Voice to Corporate Jargon</h3>
                <p style={styles.voiceDescription}>
                  Speak naturally, and hear your words transformed into impressive corporate speak with AI voice!
                </p>

                {/* Voice Selection */}
                {availableVoices.length > 0 && (
                  <div style={styles.voiceSelector}>
                    <label style={styles.voiceSelectorLabel}>
                      🎙️ Select AI Voice:
                    </label>
                    <div style={styles.voiceSelectorContainer}>
                      <select
                        value={selectedVoice?.name || ''}
                        onChange={(e) => {
                          const voice = availableVoices.find(v => v.name === e.target.value);
                          setSelectedVoice(voice);
                        }}
                        style={styles.voiceDropdown}
                      >
                        {availableVoices.map((voice, index) => (
                          <option key={index} value={voice.name}>
                            {voice.name} ({voice.lang})
                            {voice.localService === false ? ' ⭐ Neural' : ''}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => selectedVoice && previewVoice(selectedVoice)}
                        style={styles.previewButton}
                        title="Preview this voice"
                      >
                        ▶️ Preview
                      </button>
                    </div>
                  </div>
                )}

                <div style={styles.voiceButtonContainer}>
                  {!isRecording ? (
                    <button onClick={startRecording} style={styles.recordButton}>
                      🎤 Start Recording
                    </button>
                  ) : (
                    <div style={styles.recordingIndicator}>
                      <div style={styles.recordingPulse}></div>
                      <span style={styles.recordingText}>Listening... Speak now!</span>
                    </div>
                  )}
                </div>

                {voiceError && (
                  <div style={styles.errorBox}>
                    ⚠️ {voiceError}
                  </div>
                )}

                {input && (
                  <div style={styles.transcriptSection}>
                    <label style={styles.label}>What you said:</label>
                    <div style={styles.transcriptBox}>
                      "{input}"
                    </div>
                  </div>
                )}

                {output && (
                  <div style={styles.outputSection}>
                    <label style={styles.label}>Corporate translation:</label>
                    <div style={styles.output}>{output}</div>

                    <div style={styles.voiceControls}>
                      {!isPlaying ? (
                        <button onClick={() => speakText(output)} style={styles.playButton}>
                          🔊 Play Corporate Voice
                        </button>
                      ) : (
                        <button onClick={stopSpeaking} style={styles.stopButton}>
                          ⏸️ Stop
                        </button>
                      )}
                      <button onClick={copyToClipboard} style={styles.copyButton}>
                        {copied ? '✅ Copied!' : '📋 Copy Text'}
                      </button>
                    </div>
                  </div>
                )}

                <div style={styles.voiceInstructions}>
                  <strong>How it works:</strong>
                  <ol style={styles.instructionsList}>
                    <li>Choose your preferred AI voice from the dropdown above</li>
                    <li>Click "Preview" to test the voice quality</li>
                    <li>Click "Start Recording" and allow microphone access</li>
                    <li>Speak your simple idea clearly</li>
                    <li>Listen as AI translates and speaks your corporate jargon!</li>
                  </ol>
                  <p style={styles.browserNote}>
                    💡 Works best in Chrome, Edge, or Safari. Neural voices (⭐) sound most natural!
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Email Fluffer Mode */}
        {mode === 'email' && (
          <>
            <div style={styles.inputSection}>
              <label style={styles.label}>What are you saying no to? (optional)</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., Speaking at your conference"
                style={styles.input}
              />
              <p style={styles.emailDescription}>
                Generate a professional, buzzword-filled way to say "no" without actually saying "no"
              </p>
              <button onClick={handleGenerate} style={styles.generateButton}>
                🎭 Fluff My Rejection
              </button>
            </div>

            {output && (
              <div style={styles.outputSection}>
                <label style={styles.label}>Your professional deflection:</label>
                <div style={styles.emailOutput}>{output}</div>
                <button onClick={copyToClipboard} style={styles.copyButton}>
                  {copied ? '✅ Copied!' : '📋 Copy Email'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <footer style={styles.footer}>
        <p>Made with 🙄 for corporate warriors everywhere</p>
        <p style={styles.footerSmall}>Remember: The more buzzwords, the more important you sound</p>
        <div style={styles.footerLinks}>
          <a href="/pricing" style={styles.footerLink}>Pricing</a>
          <span style={styles.footerDivider}>•</span>
          <a href="/terms" style={styles.footerLink}>Terms</a>
          <span style={styles.footerDivider}>•</span>
          <a href="/privacy" style={styles.footerLink}>Privacy</a>
          <span style={styles.footerDivider}>•</span>
          <a href="mailto:support@corporatespeakgen.com" style={styles.footerLink}>Contact</a>
        </div>
      </footer>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={upgradeFeature}
      />
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '900px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1rem',
    marginBottom: '30px',
  },
  modeSelector: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  modeButton: {
    padding: '12px 24px',
    fontSize: '1rem',
    border: '2px solid #667eea',
    backgroundColor: 'white',
    color: '#667eea',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '600',
  },
  modeButtonActive: {
    backgroundColor: '#667eea',
    color: 'white',
  },
  proBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#10b981',
    color: 'white',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    padding: '2px 6px',
    borderRadius: '10px',
  },
  inputSection: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: '600',
    color: '#333',
    fontSize: '1rem',
  },
  input: {
    width: '100%',
    padding: '15px',
    fontSize: '1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    marginBottom: '15px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  generateButton: {
    width: '100%',
    padding: '15px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.3s',
  },
  outputSection: {
    marginTop: '20px',
    animation: 'fadeIn 0.5s',
  },
  output: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    marginBottom: '15px',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#333',
    border: '2px solid #667eea',
  },
  emailOutput: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    marginBottom: '15px',
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#333',
    border: '2px solid #667eea',
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
  },
  copyButton: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  },
  examples: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
  },
  examplesTitle: {
    marginTop: '0',
    marginBottom: '15px',
    color: '#333',
    fontSize: '1.1rem',
  },
  exampleButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  exampleButton: {
    padding: '10px 15px',
    fontSize: '0.9rem',
    backgroundColor: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  bingoDescription: {
    marginBottom: '20px',
    color: '#666',
    fontSize: '1rem',
    lineHeight: '1.6',
  },
  emailDescription: {
    marginBottom: '20px',
    color: '#666',
    fontSize: '0.95rem',
    fontStyle: 'italic',
  },
  bingoBoard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',
    marginBottom: '20px',
  },
  bingoCell: {
    padding: '15px',
    backgroundColor: '#f8f9fa',
    border: '2px solid #667eea',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#333',
    minHeight: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: '40px',
    textAlign: 'center',
    color: 'white',
  },
  footerSmall: {
    fontSize: '0.9rem',
    opacity: '0.8',
    marginTop: '5px',
  },
  footerLinks: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  footerLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.9rem',
    opacity: '0.9',
    transition: 'opacity 0.3s',
  },
  footerDivider: {
    color: 'white',
    opacity: '0.5',
  },
  voiceCard: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '30px',
    borderRadius: '15px',
    border: '3px solid #667eea',
  },
  voiceSelector: {
    marginBottom: '25px',
    padding: '20px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '12px',
    border: '2px solid #667eea',
  },
  voiceSelectorLabel: {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '12px',
  },
  voiceSelectorContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '10px',
    alignItems: 'center',
  },
  voiceDropdown: {
    padding: '12px 15px',
    fontSize: '1rem',
    border: '2px solid #667eea',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: '#333',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s',
  },
  previewButton: {
    padding: '12px 20px',
    fontSize: '0.95rem',
    fontWeight: '600',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    whiteSpace: 'nowrap',
  },
  voiceTitle: {
    textAlign: 'center',
    color: '#333',
    marginTop: '0',
    marginBottom: '10px',
    fontSize: '1.8rem',
  },
  voiceDescription: {
    textAlign: 'center',
    color: '#555',
    marginBottom: '30px',
    fontSize: '1.05rem',
    lineHeight: '1.6',
  },
  voiceButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    minHeight: '70px',
    alignItems: 'center',
  },
  recordButton: {
    padding: '20px 50px',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.3s',
    boxShadow: '0 8px 20px rgba(245,87,108,0.3)',
  },
  recordingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 30px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '50px',
    border: '2px solid #ef4444',
  },
  recordingPulse: {
    width: '20px',
    height: '20px',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  recordingText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#ef4444',
  },
  errorBox: {
    padding: '15px',
    backgroundColor: '#fee2e2',
    border: '2px solid #ef4444',
    borderRadius: '10px',
    color: '#991b1b',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: '600',
  },
  transcriptSection: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  transcriptBox: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    border: '2px dashed #667eea',
    fontSize: '1.2rem',
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
  },
  voiceControls: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginTop: '15px',
  },
  playButton: {
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  },
  stopButton: {
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  },
  voiceInstructions: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: '10px',
    fontSize: '0.95rem',
    color: '#333',
  },
  instructionsList: {
    marginTop: '10px',
    marginBottom: '15px',
    paddingLeft: '20px',
    lineHeight: '1.8',
  },
  browserNote: {
    margin: '0',
    fontSize: '0.9rem',
    color: '#666',
    fontStyle: 'italic',
  },
};

export default function Home() {
  return <CorporateSpeakGenerator />;
}
