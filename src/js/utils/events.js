// Este arquivo contém funções para gerenciar eventos de interação do usuário, como cliques e arrastar e soltar nós.

class EventManager {
    constructor(network) {
        this.network = network;
        this.initEvents();
    }

    initEvents() {
        this.network.on('click', this.handleNodeClick.bind(this));
        this.network.on('doubleClick', this.handleNodeDoubleClick.bind(this));
        this.network.on('dragEnd', this.handleNodeDragEnd.bind(this));
    }

    handleNodeClick(params) {
        if (params.nodes.length) {
            const nodeId = params.nodes[0];
            console.log(`Nó clicado: ${nodeId}`);
            // Aqui você pode adicionar lógica para selecionar o nó ou exibir opções
        }
    }

    handleNodeDoubleClick(params) {
        if (params.nodes.length) {
            const nodeId = params.nodes[0];
            console.log(`Nó duplo clicado: ${nodeId}`);
            // Aqui você pode adicionar lógica para editar o nó
        }
    }

    handleNodeDragEnd(params) {
        if (params.nodes.length) {
            const nodeId = params.nodes[0];
            console.log(`Nó arrastado: ${nodeId}`);
            // Aqui você pode adicionar lógica para atualizar a posição do nó
        }
    }
}

export default EventManager;