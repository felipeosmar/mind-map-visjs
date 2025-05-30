// Este arquivo contém funções utilitárias para gerenciar o layout do mapa mental, utilizando as funcionalidades de layout dinâmico da biblioteca vis.js.

function setLayout(network) {
    const options = {
        hierarchical: {
            direction: 'UD', // Direção de cima para baixo
            sortMethod: 'directed' // Método de ordenação
        },
        physics: {
            enabled: true // Habilita a física para um layout dinâmico
        }
    };
    network.setOptions(options);
}

function fitNetwork(network) {
    network.fit({
        animation: {
            duration: 500,
            easingFunction: 'easeInOutQuad'
        }
    });
}

function updateLayout(network) {
    network.redraw();
}

// Exporta as funções para uso em outros módulos
export { setLayout, fitNetwork, updateLayout };