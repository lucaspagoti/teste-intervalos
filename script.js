// script.js

const IntervalTrainer = (() => {
    const notes = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
    let startingNote = '';
    let intervalNumber = 0;
    let correctNote = '';
    let streak = 0;
    let highScore = 0;

    // Função para gerar uma nova questão
    function generateQuestion() {
        // Limpa o feedback anterior
        const feedbackMessage = document.getElementById('feedback-message');
        if (feedbackMessage) {
            feedbackMessage.textContent = '';
        }

        // Limpa classes dos botões
        resetButtonStyles();

        // Gera uma nota inicial aleatória
        startingNote = notes[Math.floor(Math.random() * notes.length)];

        // Gera um número de intervalo aleatório entre 2 e 7
        intervalNumber = Math.floor(Math.random() * 6) + 2;

        // Índice da nota inicial
        const startingIndex = notes.indexOf(startingNote);

        // Calcula o índice da nota correta considerando que a nota inicial é o primeiro grau
        const intervalIndex = (startingIndex + intervalNumber - 1) % notes.length;

        // Nota correta correspondente ao intervalo
        correctNote = notes[intervalIndex];

        // Atualiza o display com a nota inicial e o intervalo
        const startingNoteElement = document.getElementById('starting-note');
        const intervalNumberElement = document.getElementById('interval-number');

        if (startingNoteElement && intervalNumberElement) {
            startingNoteElement.textContent = startingNote;
            intervalNumberElement.textContent = intervalNumber;
        }

        // Habilita os botões de resposta
        disableButtons(false);
    }

    // Função para verificar a resposta do usuário
    function checkAnswer(selectedNote, button) {
        const feedbackMessage = document.getElementById('feedback-message');
        const streakCount = document.getElementById('streak-count');
        const highScoreElement = document.getElementById('high-score');

        if (selectedNote === correctNote) {
            streak++;
            if (feedbackMessage) {
                feedbackMessage.textContent = 'Correto!';
            }
            // Destaca o botão correto
            button.classList.add('correct');
        } else {
            streak = 0;
            if (feedbackMessage) {
                feedbackMessage.textContent = `Incorreto. A resposta correta é ${correctNote}.`;
            }
            // Destaca o botão incorreto
            button.classList.add('incorrect');
            // Destaca o botão correto
            const correctButton = document.querySelector(`button[data-note="${correctNote}"]`);
            if (correctButton) {
                correctButton.classList.add('correct');
            }
        }

        // Atualiza o contador de sequência no display
        if (streakCount) {
            streakCount.textContent = streak;
        }

        // Atualiza o recorde se a sequência atual for maior
        if (streak > highScore) {
            highScore = streak;
            // Armazena o novo recorde no localStorage
            localStorage.setItem('highScore', highScore);
            // Atualiza o display do recorde
            if (highScoreElement) {
                highScoreElement.textContent = highScore;
            }
        }

        // Desabilitar botões de resposta após a seleção
        disableButtons(true);

        // Após 2 segundos, gerar nova questão
        setTimeout(() => {
            generateQuestion();
        }, 2000);
    }

    // Função para desabilitar ou habilitar os botões de resposta
    function disableButtons(disable) {
        const buttons = document.querySelectorAll('.buttons button');
        buttons.forEach(button => {
            button.disabled = disable;
        });
    }

    // Função para limpar os estilos dos botões
    function resetButtonStyles() {
        const buttons = document.querySelectorAll('.buttons button');
        buttons.forEach(button => {
            button.classList.remove('correct', 'incorrect');
        });
    }

    // Função para carregar o recorde do localStorage
    function loadHighScore() {
        const storedHighScore = localStorage.getItem('highScore');
        if (storedHighScore !== null) {
            highScore = parseInt(storedHighScore, 10);
        } else {
            highScore = 0;
        }
        const highScoreElement = document.getElementById('high-score');
        if (highScoreElement) {
            highScoreElement.textContent = highScore;
        }
    }

    // Inicializa os event listeners dos botões
    function initEventListeners() {
        // Botões de notas
        const buttons = document.querySelectorAll('.buttons button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedNote = button.getAttribute('data-note');
                checkAnswer(selectedNote, button);
            });
        });
    }

    // Inicializa a aplicação
    function init() {
        loadHighScore();
        initEventListeners();
        generateQuestion();
    }

    return {
        init
    };
})();

// Inicializa a aplicação ao carregar a página
window.onload = IntervalTrainer.init;
