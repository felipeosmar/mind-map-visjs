/**
 * @fileoverview Classe principal do mapa mental
 * @description Gerencia a criação, edição e manipulação de nós e arestas usando vis.js
 * @author Sistema de Mapa Mental
 * @version 1.0.0
 */

/**
 * Configurações padrão do mapa mental
 */
const MINDMAP_CONFIG = {
    DEFAULT_NODE: {
        shape: 'dot',
        size: 16,
        font: {
            size: 14,
            face: 'Tahoma'
        },
        borderWidth: 2,
        shadow: true
    },
    DEFAULT_EDGE: {
        width: 2,
        shadow: true,
        smooth: {
            type: 'continuous',
            forceDirection: 'none'
        },
        font: {
            size: 13,
            color: '#555',
            face: 'Tahoma',
            align: 'middle'
        }
    },
    PHYSICS: {
        stabilization: false,
        barnesHut: {
            springLength: 150,
            gravitationalConstant: -3000
        }
    },
    INTERACTION: {
        hover: true,
        multiselect: true,
        navigationButtons: true
    },
    CENTRAL_NODE: {
        shape: 'circle',
        size: 25,
        color: {
            background: '#FFA807',
            border: '#C26401',
            highlight: {
                background: '#FFDDAD',
                border: '#C26401'
            }
        },
        font: { 
            size: 18,
            bold: true
        },
        shadow: true
    }
};

/**
 * Esquemas de cores pré-definidos para nós e arestas
 */
const COLOR_SCHEMES = {
    node: [
        {background: '#97C2FC', border: '#2B7CE9', highlight: {background: '#D2E5FF', border: '#2B7CE9'}},
        {background: '#FB7E81', border: '#FA0A10', highlight: {background: '#FFBDBD', border: '#FA0A10'}},
        {background: '#7BE141', border: '#417505', highlight: {background: '#C5F591', border: '#417505'}},
        {background: '#FFA807', border: '#C26401', highlight: {background: '#FFDDAD', border: '#C26401'}},
        {background: '#6E6EFD', border: '#3C3CC3', highlight: {background: '#BDBDFD', border: '#3C3CC3'}},
        {background: '#EE3F4D', border: '#A50310', highlight: {background: '#FF8088', border: '#A50310'}},
        {background: '#C2FABC', border: '#74AE6E', highlight: {background: '#E6FFE3', border: '#74AE6E'}},
        {background: '#FD9A52', border: '#D04A02', highlight: {background: '#FFDCBA', border: '#D04A02'}}
    ],
    edge: [
        {color: '#2B7CE9', highlight: '#2B7CE9', hover: '#2B7CE9'},
        {color: '#FA0A10', highlight: '#FA0A10', hover: '#FA0A10'},
        {color: '#417505', highlight: '#417505', hover: '#417505'},
        {color: '#C26401', highlight: '#C26401', hover: '#C26401'},
        {color: '#3C3CC3', highlight: '#3C3CC3', hover: '#3C3CC3'},
        {color: '#A50310', highlight: '#A50310', hover: '#A50310'},
        {color: '#74AE6E', highlight: '#74AE6E', hover: '#74AE6E'},
        {color: '#D04A02', highlight: '#D04A02', hover: '#D04A02'}
    ]
};

/**
 * Classe principal do mapa mental
 * Gerencia nós, arestas e a rede vis.js
 */
export class MindMap {
    /**
     * Construtor da classe MindMap
     * @param {HTMLElement} container - Elemento DOM que conterá o mapa mental
     */
    constructor(container) {
        this.container = container;
        this.nodes = new vis.DataSet();
        this.edges = new vis.DataSet();
        this.network = null;
        this.colorSchemes = COLOR_SCHEMES;
        this.currentColorIndex = 0;
        
        this.initNetwork();
    }

    /**
     * Inicializa a rede vis.js com configurações padrão
     */
    initNetwork() {
        const data = {
            nodes: this.nodes,
            edges: this.edges
        };

        const options = this.buildNetworkOptions();
        
        this.network = new vis.Network(this.container, data, options);
        this.network.on("doubleClick", this.onDoubleClick.bind(this));
    }

    /**
     * Constrói as opções de configuração da rede
     * @returns {Object} Opções de configuração
     */
    buildNetworkOptions() {
        return {
            nodes: { ...MINDMAP_CONFIG.DEFAULT_NODE },
            edges: { ...MINDMAP_CONFIG.DEFAULT_EDGE },
            physics: { ...MINDMAP_CONFIG.PHYSICS },
            interaction: { ...MINDMAP_CONFIG.INTERACTION },
            manipulation: { enabled: false }
        };
    }

    /**
     * Inicializa um nó central no mapa mental
     * @param {string|number} id - ID do nó central
     * @param {string} label - Texto do nó central
     */
    initializeCentralNode(id, label) {
        const centralNode = {
            id: id,
            label: label,
            ...MINDMAP_CONFIG.CENTRAL_NODE
        };
        
        this.nodes.add(centralNode);
    }

    /**
     * Obtém o próximo esquema de cores na sequência
     * @returns {Object} Esquema de cores para nó e aresta
     */
    getNextColorScheme() {
        const nodeColorScheme = this.colorSchemes.node[this.currentColorIndex % this.colorSchemes.node.length];
        const edgeColorScheme = this.colorSchemes.edge[this.currentColorIndex % this.colorSchemes.edge.length];
        this.currentColorIndex++;
        return { node: nodeColorScheme, edge: edgeColorScheme };
    }

    /**
     * Manipula eventos de duplo clique na rede
     * @param {Object} params - Parâmetros do evento vis.js
     */
    onDoubleClick(params) {
        const { nodes, pointer } = params;
        
        if (nodes.length > 0) {
            this.handleNodeDoubleClick(nodes[0]);
        } else {
            this.handleCanvasDoubleClick(pointer);
        }
    }

    /**
     * Manipula duplo clique em um nó existente
     * @param {string|number} nodeId - ID do nó clicado
     */
    handleNodeDoubleClick(nodeId) {
        const label = prompt("Digite o texto do novo nó:");
        if (label) {
            const newNodeId = this.addNode(label, nodeId);
            this.focusOnNode(newNodeId);
        }
    }

    /**
     * Manipula duplo clique no canvas vazio
     * @param {Object} pointer - Coordenadas do ponteiro
     */
    handleCanvasDoubleClick(pointer) {
        const label = prompt("Digite o texto do novo nó:");
        if (label) {
            const isFirstNode = this.nodes.length === 0;
            const newNodeId = this.addNode(label);
            
            if (isFirstNode) {
                this.convertToRootNode(newNodeId);
            }
            
            this.positionNodeAtPointer(newNodeId, pointer);
            this.focusOnNode(newNodeId);
        }
    }

    /**
     * Converte um nó para o estilo de nó raiz
     * @param {string|number} nodeId - ID do nó
     */
    convertToRootNode(nodeId) {
        this.nodes.update({
            id: nodeId,
            ...MINDMAP_CONFIG.CENTRAL_NODE
        });
    }

    /**
     * Posiciona um nó nas coordenadas do ponteiro
     * @param {string|number} nodeId - ID do nó
     * @param {Object} pointer - Coordenadas do ponteiro
     */
    positionNodeAtPointer(nodeId, pointer) {
        const canvasPosition = this.network.canvasToDOM(pointer.canvas);
        this.network.moveNode(nodeId, canvasPosition.x, canvasPosition.y);
    }

    /**
     * Foca a câmera em um nó específico
     * @param {string|number} nodeId - ID do nó
     */
    focusOnNode(nodeId) {
        this.network.focus(nodeId, {
            scale: 1.0,
            animation: true
        });
    }

    /**
     * Adiciona um novo nó ao mapa mental
     * @param {string} label - Texto do nó
     * @param {string|number} parentId - ID do nó pai (opcional)
     * @param {Object} options - Opções de personalização (opcional)
     * @returns {string} ID do novo nó
     */
    addNode(label, parentId = null, options = {}) {
        if (!label) {
            return null;
        }
        
        const newNodeId = this.generateNodeId();
        const colorScheme = this.getNextColorScheme();
        const nodeOptions = this.buildNodeOptions(colorScheme, options);
        
        this.nodes.add({ 
            id: newNodeId, 
            label: label,
            ...nodeOptions
        });

        if (parentId) {
            this.createEdge(parentId, newNodeId, colorScheme.edge);
        }
        
        return newNodeId;
    }

    /**
     * Gera um ID único para um novo nó
     * @returns {string} ID único baseado em timestamp
     */
    generateNodeId() {
        return Date.now().toString();
    }

    /**
     * Constrói as opções de configuração para um nó
     * @param {Object} colorScheme - Esquema de cores
     * @param {Object} options - Opções customizadas
     * @returns {Object} Opções completas do nó
     */
    buildNodeOptions(colorScheme, options = {}) {
        return {
            shape: options.shape || 'dot',
            size: options.size || 16,
            color: {
                background: options.backgroundColor || colorScheme.node.background,
                border: options.borderColor || colorScheme.node.border,
                highlight: options.highlight || colorScheme.node.highlight
            },
            font: {
                size: options.fontSize || 14,
                color: options.fontColor || '#343434',
                face: options.fontFace || 'Tahoma',
                bold: options.bold || false,
                italic: options.italic || false
            },
            shadow: options.shadow !== undefined ? options.shadow : true
        };
    }

    /**
     * Cria uma aresta entre dois nós
     * @param {string|number} fromId - ID do nó origem
     * @param {string|number} toId - ID do nó destino
     * @param {Object} colorScheme - Esquema de cores da aresta
     */
    createEdge(fromId, toId, colorScheme) {
        this.edges.add({
            from: fromId,
            to: toId,
            color: colorScheme,
            shadow: true,
            smooth: {
                type: 'continuous'
            }
        });
    }

    /**
     * Edita o texto de um nó existente
     * @param {string|number} nodeId - ID do nó
     * @param {string} newLabel - Novo texto
     * @returns {boolean} Sucesso da operação
     */
    editNode(nodeId, newLabel) {
        if (!newLabel || !this.nodeExists(nodeId)) {
            return false;
        }
        
        this.nodes.update({ id: nodeId, label: newLabel });
        return true;
    }

    /**
     * Remove um nó e suas conexões do mapa mental
     * @param {string|number} nodeId - ID do nó a ser removido
     * @returns {boolean} Sucesso da operação
     */
    removeNode(nodeId) {
        if (!this.nodeExists(nodeId)) {
            return false;
        }
        
        if (this.nodes.length <= 1) {
            this.nodes.remove(nodeId);
            return true;
        }
        
        if (this.isRootNodeWithChildren(nodeId)) {
            alert('Não é possível remover um nó raiz com filhos. Remova os filhos primeiro.');
            return false;
        }
        
        this.removeNodeAndConnections(nodeId);
        return true;
    }

    /**
     * Verifica se um nó existe
     * @param {string|number} nodeId - ID do nó
     * @returns {boolean} True se o nó existe
     */
    nodeExists(nodeId) {
        return this.nodes.get(nodeId) !== null;
    }

    /**
     * Verifica se é um nó raiz com filhos
     * @param {string|number} nodeId - ID do nó
     * @returns {boolean} True se é nó raiz com filhos
     */
    isRootNodeWithChildren(nodeId) {
        const incomingEdges = this.edges.get().filter(edge => edge.to === nodeId);
        const outgoingEdges = this.edges.get().filter(edge => edge.from === nodeId);
        
        return incomingEdges.length === 0 && outgoingEdges.length > 0;
    }

    /**
     * Remove um nó e todas suas conexões
     * @param {string|number} nodeId - ID do nó
     */
    removeNodeAndConnections(nodeId) {
        this.nodes.remove(nodeId);
        const connectedEdges = this.edges.get().filter(
            edge => edge.from === nodeId || edge.to === nodeId
        );
        this.edges.remove(connectedEdges);
    }

    /**
     * Exporta os dados do mapa mental
     * @returns {Object} Dados dos nós e arestas
     */
    exportData() {
        return {
            nodes: this.nodes.get(),
            edges: this.edges.get()
        };
    }

    /**
     * Importa dados para o mapa mental
     * @param {Object} data - Dados com nós e arestas
     * @returns {boolean} Sucesso da operação
     */
    importData(data) {
        if (!this.validateImportData(data)) {
            return false;
        }
        
        this.clearAllData();
        this.nodes.add(data.nodes);
        this.edges.add(data.edges);
        
        return true;
    }

    /**
     * Valida os dados de importação
     * @param {Object} data - Dados a serem validados
     * @returns {boolean} True se os dados são válidos
     */
    validateImportData(data) {
        return data && data.nodes && data.edges;
    }

    /**
     * Limpa todos os dados do mapa mental
     */
    clearAllData() {
        this.nodes.clear();
        this.edges.clear();
    }
    
    /**
     * Salva o mapa mental no localStorage
     * @param {string} name - Nome do arquivo
     * @returns {boolean} Sucesso da operação
     */
    saveToLocalStorage(name = 'default-mind-map') {
        try {
            const data = this.exportData();
            const key = `mind-map-${name}`;
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
            return false;
        }
    }
    
    /**
     * Carrega o mapa mental do localStorage
     * @param {string} name - Nome do arquivo
     * @returns {boolean} Sucesso da operação
     */
    loadFromLocalStorage(name = 'default-mind-map') {
        try {
            const key = `mind-map-${name}`;
            const data = localStorage.getItem(key);
            
            if (!data) {
                return false;
            }
            
            const parsedData = JSON.parse(data);
            return this.importData(parsedData);
        } catch (error) {
            console.error('Erro ao carregar do localStorage:', error);
            return false;
        }
    }

    /**
     * Exporta o mapa mental como imagem
     * @param {Function} callback - Callback opcional para receber a URL da imagem
     * @returns {string|null} URL da imagem ou null se falhou
     */
    exportAsImage(callback) {
        if (!this.network) {
            return null;
        }
        
        try {
            const dataUrl = this.network.canvasToImageUrl();
            
            if (callback) {
                callback(dataUrl);
            }
            
            return dataUrl;
        } catch (error) {
            console.error('Erro ao exportar imagem:', error);
            return null;
        }
    }

    /**
     * Altera a cor de um nó
     * @param {string|number} nodeId - ID do nó
     * @param {Object} colorScheme - Novo esquema de cores
     * @returns {boolean} Sucesso da operação
     */
    changeNodeColor(nodeId, colorScheme) {
        if (!this.nodeExists(nodeId)) {
            return false;
        }
        
        this.nodes.update({
            id: nodeId,
            color: {
                background: colorScheme.background,
                border: colorScheme.border,
                highlight: colorScheme.highlight
            }
        });
        
        return true;
    }

    /**
     * Altera a cor de uma aresta
     * @param {string|number} edgeId - ID da aresta
     * @param {Object} color - Nova cor
     * @returns {boolean} Sucesso da operação
     */
    changeEdgeColor(edgeId, color) {
        if (!this.edges.get(edgeId)) {
            return false;
        }
        
        this.edges.update({
            id: edgeId,
            color: color
        });
        
        return true;
    }

    /**
     * Altera a forma de um nó
     * @param {string|number} nodeId - ID do nó
     * @param {string} shape - Nova forma
     * @param {number} size - Novo tamanho (opcional)
     * @returns {boolean} Sucesso da operação
     */
    changeNodeShape(nodeId, shape, size = 16) {
        if (!this.nodeExists(nodeId)) {
            return false;
        }
        
        this.nodes.update({
            id: nodeId,
            shape: shape,
            size: size
        });
        
        return true;
    }
}

export default MindMap;