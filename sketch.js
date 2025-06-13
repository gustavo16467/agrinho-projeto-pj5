// Celebração da Conexão Campo-Cidade - Versão Concurso!
// Um sketch em p5.js que mostra a conexão entre o rural e o urbano à noite, com interatividade e detalhes aprimorados.
// Tema: Festejando Campo-Cidade - A Ponte da Celebração Noturna

let fogosDeArtificio = []; // Array para armazenar os objetos de fogos de artifício
let particulas = [];       // Array para armazenar as partículas das explosões
let pessoas = [];          // Array para armazenar os objetos de pessoas
let estrelas = [];         // Array para armazenar os objetos de estrelas
let carros = [];           // Array para armazenar os objetos de carros urbanos
let pontesDeLuz = [];      // Array para armazenar as "pontes de luz" criadas pelo mouse
let carrosSoja = [];       // Array para armazenar os carros de soja
let colheitadeiras = [];   // NOVO: Array para armazenar as colheitadeiras
let tratores = [];         // NOVO: Array para armazenar os tratores
// Variáveis de estado do jogo
let gameState = 'INTRO'; // Pode ser 'INTRO', 'PLAYING', 'END'
let gameDuration = 15000; // Duração do estado 'PLAYING' em milissegundos (25 segundos)
let startTime;            // Tempo em que o estado 'PLAYING' começou

// Cores (Ajustadas para mais profundidade e contraste, tema noturno)
const corCeuNoturno = [10, 15, 60];     // Azul muito escuro para o topo do céu
const corCeuHorizonte = [30, 40, 90];   // Azul mais claro perto do horizonte
const corGramaCampo = [20, 70, 30];     // Verde escuro profundo para o campo
const corSoloCampo = [70, 55, 45];      // Marrom avermelhado para o solo rural
const corEstradaUrbana = [40, 40, 40];  // Cinza muito escuro para as ruas da cidade
const corEdificios = [25, 25, 35];      // Cinza azulado escuro para a base dos edifícios
const corSoja = [180, 150, 50];         // Cor para a carga de soja

// Variáveis para a lua
let luaBrilho = 240;        // Brilho inicial da lua
let luaPulsarVel = 0.02;    // Velocidade de pulsação da lua

function setup() {
    createCanvas(900, 650); // Canvas um pouco maior para mais detalhes e espaço
    angleMode(RADIANS);     // Garante consistência nos cálculos de ângulo (padrão é radianos, mas bom explicitar)
    frameRate(60);          // Define o framerate para 60 FPS para animações mais suaves

    // Criar estrelas (visíveis em todos os estados para manter o fundo noturno)
    for (let i = 0; i < 200; i++) {
        estrelas.push({
            x: random(width),
            y: random(height / 2.5), // Estrelas na parte superior do céu
            tamanho: random(1, 3),
            brilho: random(150, 255),
            velocidadePiscada: random(0.01, 0.08) // Maior variação para um piscar mais natural
        });
    }

    // Os elementos dinâmicos (fogos, pessoas, carros, máquinas) só serão criados e gerenciados no estado 'PLAYING'
}

function draw() {
    // Desenhar céu noturno com gradiente (sempre presente)
    desenharCeu();

    // Desenhar lua com pulsação sutil (sempre presente)
    desenharLua();

    // Desenhar estrelas (sempre presente)
    for (let estrela of estrelas) {
        desenharEstrela(estrela);
    }

    // Lógica baseada no estado do jogo
    switch (gameState) {
        case 'INTRO':
            desenharIntro();
            break;
        case 'PLAYING':
            desenharPlaying();
            break;
        case 'END':
            desenharFim();
            break;
    }
}

// === Funções de Gerenciamento de Estados ===

function desenharIntro() {
    // Desenhar a tela de introdução
    fill(255);
    stroke(0);
    strokeWeight(3);
    textSize(50);
    textAlign(CENTER);
    text("A Ponte da Celebração Noturna", width / 2, height / 2 - 50);

    textSize(24);
    strokeWeight(1);
    text("Clique para Iniciar a Celebração!", width / 2, height / 2 + 50);

    textSize(16);
    text("Tema: Festejando Campo-Cidade", width / 2, height / 2 + 100);
}

function desenharPlaying() {
    // Desenhar estrelas cadentes ocasionalmente
    if (random() < 0.002) { // Pequena chance de uma estrela cadente aparecer
        particulas.push(new EstrelaCadente(random(width / 4, width * 3 / 4), random(0, height / 4)));
    }

    // Desenhar divisão campo-cidade e paisagem
    desenharPaisagem();

    // Atualizar e desenhar fogos de artifício
    gerenciarFogos();

    // Atualizar e desenhar partículas (explosões e estrelas cadentes)
    gerenciarParticulas();

    // Desenhar e mover pessoas
    for (let p of pessoas) {
        p.update();
        p.display();
    }

    // Atualizar e desenhar carros urbanos
    gerenciarCarros();

    // Atualizar e desenhar carros de soja
    gerenciarCarrosSoja();

    // Atualizar e desenhar colheitadeiras
    gerenciarColheitadeiras();

    // Atualizar e desenhar tratores
    gerenciarTratores();

    // Desenhar pontes de luz (criadas pelo arraste do mouse)
    gerenciarPontesDeLuz();

    // Texto de título (no topo durante o jogo)
    fill(255);
    stroke(0);
    strokeWeight(3);
    textSize(40);
    textAlign(CENTER);
    text("A Ponte da Celebração Noturna", width / 2, 50);

    // Instruções interativas
    textSize(18);
    strokeWeight(1);
    fill(255, 255, 200, 200);
    text("Clique para lançar fogos! Arraste o mouse para criar pontes de luz!", width / 2, height - 25);

    // Verificar se o tempo de jogo acabou
    if (millis() - startTime > gameDuration) {
        gameState = 'END';
        // Limpar elementos dinâmicos para o próximo jogo
        fogosDeArtificio = [];
        particulas = [];
        pessoas = [];
        carros = [];
        carrosSoja = [];
        colheitadeiras = [];
        tratores = [];
        pontesDeLuz = [];
    }
}

function desenharFim() {
    // NOVO: Fundo preto para a tela final
    background(0);

    // Desenhar a tela final
    fill(255);
    stroke(0);
    strokeWeight(3);
    textSize(50);
    textAlign(CENTER);
    text("Fim da Celebração!", width / 2, height / 2 - 50);

    textSize(24);
    strokeWeight(1);
    text("Obrigado por Festejar Conosco!", width / 2, height / 2 + 20);

    textSize(18);
    text("Clique para Recomeçar", width / 2, height / 2 + 80);
}

// === Funções de Desenho de Cenário ===

function desenharCeu() {
    // Gradiente do céu noturno
    for (let y = 0; y < height / 2; y++) {
        let inter = map(y, 0, height / 2, 0, 1);
        let c = lerpColor(color(corCeuNoturno), color(corCeuHorizonte), inter);
        stroke(c);
        line(0, y, width, y);
    }
    // Adicionar uma névoa suave no horizonte para profundidade
    fill(corCeuHorizonte[0], corCeuHorizonte[1], corCeuHorizonte[2], 50);
    rect(0, height / 2 - 50, width, 100);
}

function desenharLua() {
    // Brilho da lua pulsando sutilmente
    let currentBrilho = luaBrilho + sin(frameCount * luaPulsarVel) * 20;
    fill(currentBrilho, currentBrilho, currentBrilho - 20); // Cor mais fria, como a lua
    noStroke();
    circle(width - 120, 100, 80);
    // Crateras da lua
    fill(currentBrilho - 30, currentBrilho - 30, currentBrilho - 50);
    circle(width - 135, 90, 18);
    circle(width - 95, 110, 25);
}

function desenharEstrela(estrela) {
    // Brilho da estrela piscando
    let brilho = estrela.brilho + sin(frameCount * estrela.velocidadePiscada) * 60;
    fill(brilho);
    circle(estrela.x, estrela.y, estrela.tamanho);
}

function desenharPaisagem() {
    noStroke();

    // Área rural (lado esquerdo)
    fill(corSoloCampo[0], corSoloCampo[1], corSoloCampo[2]);
    rect(0, height / 2, width / 2, height / 2);

    // Gramado/campos com forma orgânica
    fill(corGramaCampo[0], corGramaCampo[1], corGramaCampo[2]);
    beginShape();
    vertex(0, height / 2);
    bezierVertex(width * 0.1, height / 2 - 30, width * 0.2, height / 2 + 50, width / 2, height / 2);
    vertex(width / 2, height);
    vertex(0, height);
    endShape(CLOSE);

    // Caminho rural (curvo e orgânico) - Usado pelo carro de soja, colheitadeira e trator
    fill(90, 75, 60, 200); // Mais opaco para parecer mais sólido
    beginShape();
    vertex(width * 0.05, height);
    bezierVertex(width * 0.15, height - 60, width * 0.3, height / 2 + 80, width / 2 - 50, height / 2 + 30);
    bezierVertex(width / 2 - 30, height / 2 + 10, width / 2 - 10, height / 2 - 10, width / 2, height / 2);
    vertex(width * 0.1, height);
    endShape(CLOSE);

    // Campos de plantação
    for (let x = 0; x < width / 2; x += 40) {
        for (let y = height / 2 + 30; y < height - 50; y += 50) {
            desenharPlantacao(x, y);
        }
    }

    // Casas de fazenda com luzes e fumaça
    desenharCasaRural(width * 0.1, height / 2 + 80);
    desenharCasaRural(width * 0.3, height / 2 + 150);

    // Árvores rurais estilizadas (estáticas, sem movimento)
    desenharArvoreRural(width * 0.08, height / 2 + 40, 50);
    desenharArvoreRural(width * 0.25, height / 2 + 100, 60);
    desenharArvoreRural(width * 0.45, height / 2 + 70, 45);


    // Área urbana (lado direito)
    fill(corEstradaUrbana[0], corEstradaUrbana[1], corEstradaUrbana[2]);
    rect(width / 2, height / 2, width / 2, height / 2);

    // Linhas da estrada principal
    stroke(255, 200); // Mais visível
    strokeWeight(4);
    line(width / 2 + 10, height / 2 + 40, width - 10, height / 2 + 40);
    line(width / 2 + 10, height / 2 + 90, width - 10, height / 2 + 90);
    line(width / 2 + 10, height / 2 + 140, width - 10, height / 2 + 140);

    // Faixas tracejadas da estrada (amarelas)
    stroke(255, 255, 150, 150);
    strokeWeight(2);
    for (let i = 0; i < width / 2; i += 30) {
        line(width / 2 + 20 + i, height / 2 + 65, width / 2 + 35 + i, height / 2 + 65);
        line(width / 2 + 20 + i, height / 2 + 115, width / 2 + 35 + i, height / 2 + 115);
    }

    // Luzes da rua
    fill(255, 255, 150, 120); // Amarelo suave
    for (let x = width / 2 + 50; x < width - 50; x += 100) {
        circle(x, height / 2 + 20, 30); // Luzes maiores
        // Brilho no chão abaixo das luzes
        fill(255, 255, 150, 20);
        ellipse(x, height / 2 + 45, 80, 20);
    }

    // Prédios com luzes acesas e piscando de forma complexa
    desenharPredio(width / 2 + 30, height / 2 + 180, 80, 160, color(corEdificios));
    desenharPredio(width / 2 + 120, height / 2 + 120, 100, 220, color(corEdificios[0] + 10, corEdificios[1] + 10, corEdificios[2] + 10));
    desenharPredio(width / 2 + 240, height / 2 + 200, 70, 140, color(corEdificios[0] - 5, corEdificios[1] - 5, corEdificios[2] - 5));
    desenharPredio(width / 2 + 330, height / 2 + 150, 90, 190, color(corEdificios[0] + 5, corEdificios[1] + 5, corEdificios[2] + 5));
}

function desenharPlantacao(x, y) {
    // Base da planta
    fill(50, 40, 20); // Mais marrom escuro
    rect(x + 13, y + 15, 4, 15);

    // Folhas/cultura - mais escuras à noite, com variação de cor
    fill(random(25, 60), random(70, 100), random(25, 40), 200);
    ellipse(x + 15, y + 8, 22, 18);
    ellipse(x + 8, y + 12, 18, 14);
    ellipse(x + 22, y + 12, 18, 14);
}

function desenharCasaRural(x, y) {
    // Base da casa
    fill(80, 60, 50); // Cor mais quente para a casa
    rect(x, y, 70, 50);

    // Telhado
    fill(50, 30, 10);
    triangle(x - 15, y, x + 35, y - 40, x + 85, y);

    // Porta
    fill(70, 40, 20);
    rect(x + 30, y + 20, 12, 30);

    // Janelas com luz
    fill(255, 255, 180, 220); // Luz mais forte e amarelada
    rect(x + 12, y + 15, 15, 15);
    rect(x + 50, y + 15, 15, 15);

    // Luz projetada no chão das janelas
    fill(255, 255, 150, 20);
    quad(x + 12, y + 30, x + 27, y + 30, x + 5, y + 80, x - 10, y + 80);
    quad(x + 50, y + 30, x + 65, y + 30, x + 80, y + 80, x + 65, y + 80);

    // Chaminé
    fill(100, 90, 80);
    rect(x + 55, y - 50, 12, 25);

    // Fumaça da chaminé (com movimento mais orgânico)
    fill(200, 200, 200, 80);
    for (let i = 0; i < 3; i++) {
        let offsetX = sin(frameCount * 0.05 + i * 0.5) * 8;
        let offsetY = cos(frameCount * 0.03 + i * 0.3) * 5;
        ellipse(x + 61 + offsetX, y - 60 - i * 15 + offsetY, 10 - i * 2, 10 - i * 2);
    }
}

function desenharArvoreRural(x, y, tamanhoBase) {
    // Tronco da árvore
    fill(80, 60, 40);
    rect(x, y, tamanhoBase / 4, tamanhoBase);

    // Folhagem (mais densa e orgânica)
    fill(30, 90, 40);
    ellipse(x + tamanhoBase / 8, y - tamanhoBase / 2, tamanhoBase * 0.9, tamanhoBase * 0.7);
    ellipse(x - tamanhoBase / 4, y - tamanhoBase / 3, tamanhoBase * 0.6, tamanhoBase * 0.5);
    ellipse(x + tamanhoBase / 2, y - tamanhoBase / 4, tamanhoBase * 0.7, tamanhoBase * 0.6);
}

function desenharPredio(x, y, largura, altura, cor) {
    // Base do prédio
    fill(cor);
    rect(x, y, largura, altura);

    // Janelas iluminadas aleatoriamente e piscando de forma mais complexa
    for (let andar = 0; andar < altura / 20; andar++) {
        for (let j = 0; j < largura / 15; j++) {
            let windowX = x + 5 + j * (largura / (largura / 15));
            let windowY = y + 5 + andar * 20;
            let windowW = largura / 10;
            let windowH = 10;

            if (random() < 0.7) { // 70% de chance de estar acesa
                // Luz acesa com piscadas e variações de intensidade
                let flicker = sin(frameCount * random(0.05, 0.2) + (x + y) * 0.01) * 100 + 155;
                if (random() < 0.02) { // Pequena chance de piscar para "desligado"
                    fill(50, 50, 60, 200); // Cor de janela escura
                } else {
                    fill(255, 255, 150, flicker); // Luz acesa com brilho pulsante
                }
            } else {
                fill(50, 50, 60); // Janela apagada
            }
            rect(windowX, windowY, windowW, windowH);
        }
    }

    // Luz suave projetada para fora do prédio
    noStroke();
    fill(255, 255, 150, 15);
    rect(x - 10, y, largura + 20, altura + 30);
}

// === Gerenciamento de Elementos Dinâmicos ===

function gerenciarFogos() {
    for (let i = fogosDeArtificio.length - 1; i >= 0; i--) {
        let f = fogosDeArtificio[i];
        f.update();
        f.display();

        if (f.exploded) {
            fogosDeArtificio.splice(i, 1);
            // Lançar um novo fogo de artifício após um tempo randomizado
            if (random() < 0.8) { // 80% de chance de lançar um novo fogo
                setTimeout(criarFogoDeArtificio, random(800, 3000));
            }
        }
    }
}

function gerenciarParticulas() {
    for (let i = particulas.length - 1; i >= 0; i--) {
        let p = particulas[i];
        p.update();
        p.display();
        if (p.isDead()) {
            particulas.splice(i, 1);
        }
    }
}

function gerenciarCarros() {
    for (let i = carros.length - 1; i >= 0; i--) {
        carros[i].update();
        carros[i].display();
        if (carros[i].isOffscreen()) {
            carros.splice(i, 1);
            // Faz o carro reaparecer na área da cidade, garantindo que venha do lado certo
            let direcao = random([-1, 1]);
            let startX = (direcao === 1) ? width / 2 : width; // Se for para a direita, começa no meio; se para a esquerda, começa na borda
            carros.push(new Carro(startX, height / 2 + 50 + random(-5, 5), direcao)); // Pequena variação na altura
        }
    }
}

// Gerenciamento de carros de soja
function gerenciarCarrosSoja() {
    for (let i = carrosSoja.length - 1; i >= 0; i--) {
        carrosSoja[i].update();
        carrosSoja[i].display();
        if (carrosSoja[i].isOffscreen()) {
            carrosSoja.splice(i, 1);
            // Faz o carro de soja reaparecer no campo após um tempo
            setTimeout(() => carrosSoja.push(new CarroSoja()), random(5000, 15000)); // Mais tempo para reaparecer
        }
    }
}

// Gerenciamento de colheitadeiras
function gerenciarColheitadeiras() {
    for (let i = colheitadeiras.length - 1; i >= 0; i--) {
        colheitadeiras[i].update();
        colheitadeiras[i].display();
        if (colheitadeiras[i].isOffscreen()) {
            colheitadeiras.splice(i, 1);
            // Faz a colheitadeira reaparecer no campo
            setTimeout(() => colheitadeiras.push(new Colheitadeira()), random(8000, 20000));
        }
    }
}

// Gerenciamento de tratores
function gerenciarTratores() {
    for (let i = tratores.length - 1; i >= 0; i--) {
        tratores[i].update();
        tratores[i].display();
        if (tratores[i].isOffscreen()) {
            tratores.splice(i, 1);
            // Faz o trator reaparecer no campo
            setTimeout(() => tratores.push(new Trator()), random(7000, 18000));
        }
    }
}

function gerenciarPontesDeLuz() {
    for (let i = pontesDeLuz.length - 1; i >= 0; i--) {
        pontesDeLuz[i].update();
        pontesDeLuz[i].display();
        if (pontesDeLuz[i].isFaded()) {
            pontesDeLuz.splice(i, 1);
        }
    }
}

// === Eventos de Interação ===

function mousePressed() {
    if (gameState === 'INTRO') {
        gameState = 'PLAYING';
        startTime = millis(); // Inicia o temporizador do jogo
        // Inicializar elementos dinâmicos para o estado 'PLAYING'
        for (let i = 0; i < 4; i++) {
            setTimeout(criarFogoDeArtificio, random(500 * i, 2500 * i));
        }
        for (let i = 0; i < 20; i++) {
            pessoas.push(new Pessoa(random(width), random(height / 2 + 100, height - 30)));
        }
        for (let i = 0; i < 4; i++) {
            carros.push(new Carro(random(width / 2 + 10, width - 60), height / 2 + 50, random([-1, 1])));
        }
        // Criar múltiplos carros de soja iniciais com atraso
        for (let i = 0; i < 3; i++) {
            setTimeout(() => carrosSoja.push(new CarroSoja()), 2000 * i);
        }
        // Criar colheitadeira e trator iniciais
        setTimeout(() => colheitadeiras.push(new Colheitadeira()), 1000);
        setTimeout(() => tratores.push(new Trator()), 3000);

    } else if (gameState === 'PLAYING') {
        // Permite lançar fogos apenas se o clique for na parte superior (céu)
        if (mouseY < height / 2) {
            criarFogoDeArtificioNoClick(mouseX, mouseY);
        }
    } else if (gameState === 'END') {
        gameState = 'INTRO'; // Volta para a tela de introdução
    }
    return false; // Evita comportamento padrão do navegador (ex: menu de contexto)
}

function mouseDragged() {
    if (gameState === 'PLAYING') {
        // Cria uma "ponte de luz" enquanto o mouse é arrastado
        pontesDeLuz.push(new PonteDeLuz(pmouseX, pmouseY, mouseX, mouseY, color(random(200, 255), random(150, 255), 255, 200)));
    }
}

// === Funções de Criação Específicas ===

function criarFogoDeArtificio() {
    fogosDeArtificio.push(new FogoDeArtificio(random(width), height)); // Lança de uma posição X aleatória na base
}

function criarFogoDeArtificioNoClick(x, y) {
    fogosDeArtificio.push(new FogoDeArtificio(x, height, y)); // Lança da base para o Y do clique
}

// === CLASSES ===

// Classe para Fogos de Artifício
class FogoDeArtificio {
    constructor(startX, startY, targetY = random(50, 250)) {
        this.x = startX;
        this.y = startY;
        this.velocidade = random(3, 7);
        this.cor = color(random(150, 255), random(100, 255), random(100, 255));
        this.alvoY = targetY;
        this.exploded = false;
        this.tipoExplosao = floor(random(5)); // Mais tipos de explosão para variedade
    }

    update() {
        if (!this.exploded) {
            this.y -= this.velocidade;
            if (this.y <= this.alvoY) {
                this.explode();
                this.exploded = true;
            }
        }
    }

    display() {
        if (!this.exploded) {
            // Rastro com brilho e variação de cor
            stroke(this.cor, 200);
            strokeWeight(3);
            line(this.x, this.y, this.x, this.y + 15);
            strokeWeight(1);
            point(this.x + random(-1, 1), this.y + random(5, 10));
            point(this.x + random(-2, 2), this.y + random(10, 20));

            noStroke();
            fill(this.cor);
            circle(this.x, this.y, 5); // Corpo do fogo subindo
        }
    }

    explode() {
        // Simulação de som da explosão visualmente (um flash de luz)
        fill(255, 255, 200, 150);
        circle(this.x, this.y, 60);

        let numParticulas = random(60, 100); // Número variado de partículas
        for (let j = 0; j < numParticulas; j++) {
            let angulo, velocidadeInicial;
            let corParticula = color(
                red(this.cor) + random(-30, 30),
                green(this.cor) + random(-30, 30),
                blue(this.cor) + random(-30, 30)
            );

            switch (this.tipoExplosao) {
                case 0: // Circular padrão
                    angulo = random(TWO_PI);
                    velocidadeInicial = random(1, 4);
                    break;
                case 1: // Anel (partículas mais afastadas do centro)
                    angulo = random(TWO_PI);
                    velocidadeInicial = random(2, 3);
                    break;
                case 2: // Coração (requer ajuste no calculo de vx, vy para a forma)
                    angulo = random(PI); // Apenas metade do círculo para a forma de coração
                    let r = 15 * (1 - sin(angulo)); // Fórmula de cardioide
                    velocidadeInicial = map(r, 0, 30, 0.5, 3); // Mapeia r para velocidade
                    // Ajuste para formar o coração corretamente, com offset para cima
                    let heartX = this.x + r * cos(angulo);
                    let heartY = this.y - r * sin(angulo) * 1.5; // Multiplicador para alongar o coração
                    particulas.push(new Particula(heartX, heartY, cos(angulo) * velocidadeInicial, -sin(angulo) * velocidadeInicial, corParticula, random(2, 5)));
                    continue; // Pula a criação padrão para usar a específica do coração
                case 3: // Chuva de Ouro (partículas mais lentas, caem mais)
                    angulo = random(TWO_PI);
                    velocidadeInicial = random(0.5, 1.5);
                    break;
                case 4: // Palmeira (sobe um pouco e abre, depois cai)
                    angulo = random(PI / 4, 3 * PI / 4); // Abre para cima
                    velocidadeInicial = random(2, 4);
                    break;
            }
            particulas.push(new Particula(this.x, this.y, cos(angulo) * velocidadeInicial, sin(angulo) * velocidadeInicial, corParticula, random(2, 5)));
        }
    }
}

// Classe para Partículas (explosões dos fogos e estrelas cadentes)
class Particula {
    constructor(x, y, vx, vy, cor, tamanho, tipo = 'fogo') {
        this.x = x;
        this.y = y;
        this.vx = vx + random(-0.5, 0.5); // Pequena variação para dispersão
        this.vy = vy + random(-0.5, 0.5);
        this.cor = cor;
        this.tamanho = tamanho;
        this.vida = random(80, 150); // Vida mais longa para um efeito mais "cheio"
        this.gravidade = 0.05;
        this.friccao = 0.98; // Para partículas mais lentas e realistas
        this.tipo = tipo; // 'fogo' ou 'estrelaCadente'
    }

    update() {
        this.vy += this.gravidade;
        this.vx *= this.friccao; // Reduz a velocidade horizontal gradualmente
        this.vy *= this.friccao; // Reduz a velocidade vertical gradualmente

        this.x += this.vx;
        this.y += this.vy;
        this.vida -= 1.5; // Fades mais rápido
    }

    display() {
        noStroke();
        let alpha = map(this.vida, 0, 150, 0, 255); // Mapeia vida para transparência
        fill(red(this.cor), green(this.cor), blue(this.cor), alpha);
        circle(this.x, this.y, this.tamanho * (this.vida / 150)); // Reduz o tamanho conforme a vida
    }

    isDead() {
        return this.vida <= 0;
    }
}

// Classe para Estrela Cadente (um tipo específico de partícula)
class EstrelaCadente extends Particula {
    constructor(x, y) {
        super(x, y, random(3, 8), random(3, 8), color(255, 255, 200), random(3, 6), 'estrelaCadente');
        this.gravidade = 0.01; // Gravidade menor para um traço mais longo
        this.friccao = 0.99;
        this.vida = 150; // Vida mais longa
    }

    display() {
        // Desenha um traço longo para a estrela cadente
        noFill();
        stroke(red(this.cor), green(this.cor), blue(this.cor), map(this.vida, 0, 150, 0, 255));
        strokeWeight(this.tamanho * (this.vida / 150));
        line(this.x, this.y, this.x - this.vx * 5, this.y - this.vy * 5); // Traço
    }
}

// Classe para Pessoas
class Pessoa {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tamanho = random(18, 28);
        this.cor = color(random(100, 255), random(100, 255), random(100, 255));
        this.velocidade = random(0.5, 1.5); // Velocidade variada
        this.direcao = random([-1, 1]);
        this.olhandoFogos = false;
        this.timerOlhar = 0;
    }

    update() {
        this.x += this.velocidade * this.direcao;

        // Mudar direção quando atingir os limites da tela
        if (this.x < 0 || this.x > width) {
            this.direcao *= -1;
        }

        // Decidir se olha para os fogos
        if (random() < 0.005) { // Chance de 0.5% por frame de começar a olhar
            this.olhandoFogos = true;
            this.timerOlhar = random(60, 180); // Olhar por 1 a 3 segundos (60 frames/segundo)
        }
        if (this.olhandoFogos) {
            this.timerOlhar--;
            if (this.timerOlhar <= 0) {
                this.olhandoFogos = false;
            }
        }
    }

    display() {
        push();
        translate(this.x, this.y);

        // Corpo
        fill(this.cor);
        rect(-this.tamanho / 4, -this.tamanho / 4, this.tamanho / 2, this.tamanho / 2);

        // Cabeça
        fill(200, 180, 150); // Cor de pele
        circle(0, -this.tamanho / 2, this.tamanho / 2);

        // Pernas
        stroke(0);
        strokeWeight(2);
        line(-this.tamanho / 6, this.tamanho / 4, -this.tamanho / 6, this.tamanho / 2);
        line(this.tamanho / 6, this.tamanho / 4, this.tamanho / 6, this.tamanho / 2);

        // Braços
        line(-this.tamanho / 4, -this.tamanho / 8, -this.tamanho / 2, 0);
        line(this.tamanho / 4, -this.tamanho / 8, this.tamanho / 2, 0);

        // Olhando para os fogos (animação sutil dos olhos e boca)
        if (this.olhandoFogos) {
            fill(0);
            noStroke();
            let eyeOffset = map(sin(frameCount * 0.1), -1, 1, -1, 1); // Movimento sutil dos olhos
            circle(-this.tamanho / 8 + eyeOffset, -this.tamanho / 2, 2);
            circle(this.tamanho / 8 + eyeOffset, -this.tamanho / 2, 2);

            stroke(0);
            noFill();
            arc(0, -this.tamanho / 2 + 5, 8, 8, 0, PI); // Boca de admiração
        }

        pop();
    }
}

// Classe para Carro Urbano
class Carro {
    constructor(x, y, direcao) {
        this.x = x;
        this.y = y;
        this.largura = 60; // Carros um pouco maiores
        this.altura = 25;
        this.velocidade = random(1, 3) * direcao; // Velocidade variada
        this.cor = color(random(50, 200), random(50, 200), random(50, 200));
        this.direcao = direcao; // 1 para direita, -1 para esquerda
    }

    update() {
        this.x += this.velocidade;
    }

    display() {
        push();
        translate(this.x, this.y);

        // Corpo do carro
        fill(this.cor);
        rect(0, 0, this.largura, this.altura);

        // Teto do carro
        rect(this.largura * 0.1, -this.altura * 0.8, this.largura * 0.8, this.altura * 0.8);

        // Rodas
        fill(30); // Cor escura para as rodas
        circle(this.largura * 0.2, this.altura, 12);
        circle(this.largura * 0.8, this.altura, 12);

        // Faróis e lanternas traseiras
        if (this.direcao === 1) { // Indo para a direita
            fill(255, 255, 100, 200); // Faróis amarelos, mais brilhantes
            ellipse(this.largura, this.altura / 2, 10, 6); // Farol direito
            // Luz do farol no chão
            noStroke();
            fill(255, 255, 100, 40);
            triangle(this.largura + 5, this.altura / 2, this.largura + 40, this.altura / 2 + 15, this.largura + 40, this.altura / 2 - 15);

            fill(200, 0, 0, 200); // Lanterna traseira vermelha
            ellipse(0, this.altura / 2, 10, 6); // Lanterna esquerda
        } else { // Indo para a esquerda
            fill(255, 255, 100, 200); // Faróis amarelos
            ellipse(0, this.altura / 2, 10, 6); // Farol esquerdo
            // Luz do farol no chão
            noStroke();
            fill(255, 255, 100, 40);
            triangle(-5, this.altura / 2, -40, this.altura / 2 + 15, -40, this.altura / 2 - 15);

            fill(200, 0, 0, 200); // Lanterna traseira vermelha
            ellipse(this.largura, this.altura / 2, 10, 6); // Lanterna direita
        }
        pop();
    }

    isOffscreen() {
        // Verifica se o carro saiu da área de visualização ou da área da cidade
        if (this.direcao === 1 && this.x > width + 50) { // Se for para a direita e passou do limite total da tela
            return true;
        }
        // Se for para a esquerda e passou do limite da cidade (metade da tela)
        if (this.direcao === -1 && this.x < width / 2 - this.largura - 50) {
            return true;
        }
        return false;
    }
}

// Classe para Carro de Soja (transportando do campo para a cidade)
class CarroSoja {
    constructor() {
        this.x = -80; // Começa fora da tela no lado esquerdo (campo)
        this.y = height / 2 + 50; // Posição inicial na estrada rural
        this.largura = 80; // Carro de soja um pouco maior
        this.altura = 30;
        this.velocidade = random(0.8, 1.5); // Velocidade mais lenta para dar tempo de observar
        this.cor = color(80, 80, 80); // Cor do caminhão
        this.direcao = 1; // Sempre vai da esquerda para a direita (campo para cidade)

        // Pontos de controle para a curva quadrática do caminhão de soja
        this.pathP0 = createVector(width * 0.05, height - 20); // Ponto inicial da curva (rural)
        this.pathP1 = createVector(width * 0.3, height / 2 + 80); // Ponto de controle da curva
        this.pathP2 = createVector(width / 2, height / 2 + 10); // Ponto final da curva (entrada da cidade)
    }

    update() {
        // Mapeia a posição X do caminhão para um valor 't' entre 0 e 1, cobrindo o percurso da curva
        // Aumentei a faixa de mapeamento para garantir que o caminhão entre e saia suavemente da curva
        let t = map(this.x, this.pathP0.x - 100, this.pathP2.x + 100, 0, 1);

        // Calcula a posição Y na curva quadrática
        this.y = quadraticPoint(this.pathP0.y, this.pathP1.y, this.pathP2.y, t);

        // Move o caminhão horizontalmente
        this.x += this.velocidade;
    }

    display() {
        push();
        translate(this.x, this.y);

        // Corpo do caminhão
        fill(this.cor);
        rect(0, 0, this.largura, this.altura);

        // Cabine do caminhão
        rect(this.largura * 0.7, -this.altura * 0.8, this.largura * 0.3, this.altura * 0.8);

        // Carga de Soja
        fill(corSoja[0], corSoja[1], corSoja[2]);
        rect(this.largura * 0.1, -this.altura * 0.5, this.largura * 0.5, this.altura * 0.5);

        // Rodas
        fill(30);
        circle(this.largura * 0.15, this.altura, 15);
        circle(this.largura * 0.85, this.altura, 15);

        // Faróis (sempre acesos, já que está em movimento noturno)
        fill(255, 255, 100, 200);
        ellipse(this.largura, this.altura / 2, 10, 6); // Farol direito
        // Luz do farol no chão
        noStroke();
        fill(255, 255, 100, 40);
        triangle(this.largura + 5, this.altura / 2, this.largura + 40, this.altura / 2 + 15, this.largura + 40, this.altura / 2 - 15);

        // Lanterna traseira (sempre vermelha)
        fill(200, 0, 0, 200);
        ellipse(0, this.altura / 2, 10, 6); // Lanterna esquerda

        pop();
    }

    isOffscreen() {
        // Carro de soja sai da tela quando atinge o limite direito
        return this.x > width + 50;
    }
}

// Classe para Colheitadeira
class Colheitadeira {
    constructor() {
        this.x = -150; // Começa fora da tela no lado esquerdo (campo)
        this.y = height / 2 + 50; // Posição inicial na estrada rural (será ajustada pela curva)
        this.largura = 100;
        this.altura = 40;
        this.velocidade = random(0.3, 0.8); // Colheitadeira é lenta
        this.direcao = 1; // Sempre vai da esquerda para a direita (campo para cidade)
        this.cor = color(200, 150, 0); // Amarelo/laranja de colheitadeira

        // Pontos de controle para a curva quadrática
        this.pathP0 = createVector(width * 0.05, height - 20);
        this.pathP1 = createVector(width * 0.3, height / 2 + 80);
        this.pathP2 = createVector(width / 2, height / 2 + 10);
    }

    update() {
        // Mapeia a posição X da colheitadeira para um valor 't' entre 0 e 1, cobrindo o percurso da curva
        let t = map(this.x, -this.largura, width + this.largura, 0, 1);

        // Calcula a posição Y na curva quadrática
        this.y = quadraticPoint(this.pathP0.y, this.pathP1.y, this.pathP2.y, t);
        this.y += 10; // Ajuste fino para alinhar a base da colheitadeira com o caminho

        // Move a colheitadeira horizontalmente
        this.x += this.velocidade;
    }

    display() {
        push();
        translate(this.x, this.y);

        // Corpo principal
        fill(this.cor);
        rect(0, 0, this.largura, this.altura);

        // Cabine
        fill(this.cor[0] - 30, this.cor[1] - 30, this.cor[2] - 30);
        rect(this.largura * 0.6, -this.altura * 0.7, this.largura * 0.3, this.altura * 0.7);

        // Plataforma de corte (cabeçalho)
        fill(100, 100, 100); // Cinza escuro
        rect(-this.largura * 0.2, this.altura * 0.8, this.largura * 0.8, this.altura * 0.2);

        // Rodas grandes (traseiras)
        fill(30);
        circle(this.largura * 0.2, this.altura * 1.1, 25);
        // Rodas menores (dianteiras)
        circle(this.largura * 0.8, this.altura * 1.1, 18);

        // Luzes
        fill(255, 255, 150, 200); // Faróis amarelos
        ellipse(this.largura * 0.9, this.altura * 0.2, 8, 5);
        ellipse(this.largura * 0.7, this.altura * 0.2, 8, 5);

        pop();
    }

    isOffscreen() {
        // Colheitadeira sai da tela quando atinge o limite direito
        return this.x > width + 50;
    }
}

// Classe para Trator
class Trator {
    constructor() {
        this.x = -100; // Começa fora da tela no lado esquerdo (campo)
        this.y = height / 2 + 50; // Posição inicial na estrada rural (será ajustada pela curva)
        this.largura = 60;
        this.altura = 30;
        this.velocidade = random(0.5, 1.2); // Trator é um pouco mais rápido que a colheitadeira
        this.direcao = 1; // Sempre vai da esquerda para a direita (campo para cidade)
        this.cor = color(0, 120, 0); // Verde de trator

        // Pontos de controle para a curva quadrática
        this.pathP0 = createVector(width * 0.05, height - 20);
        this.pathP1 = createVector(width * 0.3, height / 2 + 80);
        this.pathP2 = createVector(width / 2, height / 2 + 10);
    }

    update() {
        // Mapeia a posição X do trator para um valor 't' entre 0 e 1, cobrindo o percurso da curva
        let t = map(this.x, -this.largura, width + this.largura, 0, 1);

        // Calcula a posição Y na curva quadrática
        this.y = quadraticPoint(this.pathP0.y, this.pathP1.y, this.pathP2.y, t);
        this.y += 15; // Ajuste fino para alinhar a base do trator com o caminho

        // Move o trator horizontalmente
        this.x += this.velocidade;
    }

    display() {
        push();
        translate(this.x, this.y);

        // Corpo principal
        fill(this.cor);
        rect(0, 0, this.largura, this.altura);

        // Cabine
        fill(this.cor[0] - 20, this.cor[1] - 20, this.cor[2] - 20);
        rect(this.largura * 0.6, -this.altura * 0.7, this.largura * 0.3, this.altura * 0.7);

        // Rodas grandes (traseiras)
        fill(30);
        circle(this.largura * 0.2, this.altura * 1.1, 20);
        // Rodas menores (dianteiras)
        circle(this.largura * 0.8, this.altura * 1.1, 12);

        // Luzes
        fill(255, 255, 150, 200); // Faróis amarelos
        ellipse(this.largura * 0.9, this.altura * 0.2, 6, 4);

        pop();
    }

    isOffscreen() {
        // Trator sai da tela quando atinge o limite direito
        return this.x > width + 50;
    }
}


// Função auxiliar para calcular um ponto em uma curva Bézier quadrática
function quadraticPoint(p0, p1, p2, t) {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}


// Classe para as Pontes de Luz (traços do mouse)
class PonteDeLuz {
    constructor(x1, y1, x2, y2, cor) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.cor = cor;
        this.vida = 255; // Vida inicial da luz (opacidade)
    }

    update() {
        this.vida -= 5; // Desvanece a luz gradualmente
    }

    display() {
        stroke(red(this.cor), green(this.cor), blue(this.cor), this.vida);
        strokeWeight(random(2, 5)); // Varia a espessura para um efeito mais orgânico e etéreo
        line(this.x1, this.y1, this.x2, this.y2);
    }

    isFaded() {
        return this.vida <= 0;
    }
}
