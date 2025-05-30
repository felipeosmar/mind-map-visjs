/**
 * @fileoverview Arquivo principal da aplicação de mapa mental
 * @description Inicializa a aplicação e configura todos os event listeners
 * @author Sistema de Mapa Mental
 * @version 1.0.0
 */

import { MindMap } from './components/MindMap.js';

/**
 * Configurações da aplicação
 */
const CONFIG = {
    CONTAINER_ID: 'mind-map-container',
    EMPTY_CONTAINER_CLASS: 'empty-container',
    HAS_NODES_CLASS: 'has-nodes',
    CENTER_INDICATOR_CLASS: 'center-indicator'
};

/**
 * Mensagens da aplicação
 */
const MESSAGES = {
    DOM_LOADED: 'DOM carregado, iniciando aplicação...',
    CONTAINER_NOT_FOUND: 'Container do mapa mental não encontrado!',
    INITIALIZING: 'Inicializando o mapa mental...',
    BUTTON_ADD_CLICKED: 'Botão adicionar clicado',
    NEW_NODE_ADDED: 'Novo nó adicionado:',
    SELECT_PARENT_NODE: 'Selecione um nó pai ou dê um duplo clique no mapa para adicionar um nó.',
    SELECT_NODE_TO_EDIT: 'Selecione um nó para editar.',
    SELECT_NODE_TO_REMOVE: 'Selecione um nó para remover.',
    CANNOT_REMOVE_ROOT: 'O nó principal não pode ser removido.',
    CONFIRM_REMOVE: 'Tem certeza que deseja remover este nó?',
    SELECT_NODE_FOR_COLOR: 'Selecione um nó para alterar a cor.',
    SELECT_NODE_FOR_SHAPE: 'Selecione um nó para alterar a forma.',
    SELECT_NODE_TO_CUSTOMIZE: 'Selecione um nó para personalizar.',
    SUCCESS_INIT: 'Aplicação inicializada com sucesso! Dê um duplo clique para adicionar o primeiro nó.'
};

/**
 * Inicializa a aplicação quando o DOM está carregado
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log(MESSAGES.DOM_LOADED);
    
    const container = getContainer();
    if (!container) {
        console.error(MESSAGES.CONTAINER_NOT_FOUND);
        return;
    }
    
    try {
        console.log(MESSAGES.INITIALIZING);
        const mindMap = new MindMap(container);
        
        initializeEventListeners(mindMap, container);
        setupNetworkEvents(mindMap, container);
        
        console.log(MESSAGES.SUCCESS_INIT);
    } catch (error) {
        console.error('Erro ao inicializar a aplicação:', error);
    }
});

/**
 * Obtém o container do mapa mental
 * @returns {HTMLElement|null} O elemento container ou null se não encontrado
 */
function getContainer() {
    return document.getElementById(CONFIG.CONTAINER_ID);
}

/**
 * Inicializa todos os event listeners da aplicação
 * @param {MindMap} mindMap - Instância do mapa mental
 * @param {HTMLElement} container - Container do mapa mental
 */
function initializeEventListeners(mindMap, container) {
    setupToolbarEvents(mindMap);
    setupFileOperationEvents(mindMap);
    setupCustomizationEvents(mindMap);
    setupContainerEvents(mindMap, container);
    setupCustomEvents(mindMap);
}

/**
 * Configura os eventos da toolbar
 * @param {MindMap} mindMap - Instância do mapa mental
 */
function setupToolbarEvents(mindMap) {
    // Botão adicionar nó
    document.getElementById('add-node').addEventListener('click', () => {
        console.log(MESSAGES.BUTTON_ADD_CLICKED);
        handleAddNode(mindMap);
    });
    
    // Botão editar nó
    document.getElementById('edit-node').addEventListener('click', () => {
        handleEditNode(mindMap);
    });
    
    // Botão remover nó
    document.getElementById('delete-node').addEventListener('click', () => {
        handleDeleteNode(mindMap);
    });
    
    // Botão alterar cor
    document.getElementById('change-color').addEventListener('click', () => {
        handleChangeColor(mindMap);
    });
    
    // Botão alterar forma
    document.getElementById('change-shape').addEventListener('click', () => {
        handleChangeShape(mindMap);
    });
}

/**
 * Configura os eventos de operações de arquivo
 * @param {MindMap} mindMap - Instância do mapa mental
 */
function setupFileOperationEvents(mindMap) {
    // Botão salvar mapa
    document.getElementById('save-map').addEventListener('click', () => {
        handleSaveMap(mindMap);
    });
    
    // Botão carregar mapa
    document.getElementById('load-map').addEventListener('click', () => {
        handleLoadMap(mindMap);
    });
    
    // Botão exportar imagem
    document.getElementById('export-image').addEventListener('click', () => {
        handleExportImage(mindMap);
    });
}

/**
 * Configura os eventos de personalização
 * @param {MindMap} mindMap - Instância do mapa mental
 */
function setupCustomizationEvents(mindMap) {
    // Personalização de nós
    document.addEventListener('customizeNode', (event) => {
        handleCustomizeNode(mindMap, event.detail);
    });
    
    // Evento de mudança de forma
    document.addEventListener('shapeChange', (event) => {
        handleShapeChange(mindMap, event.detail.shape);
    });
}

/**
 * Configura os eventos do container
 * @param {MindMap} mindMap - Instância do mapa mental
 * @param {HTMLElement} container - Container do mapa mental
 */
function setupContainerEvents(mindMap, container) {
    // Controle de classes do container
    container.addEventListener('click', () => {
        updateContainerClasses(mindMap, container);
    });
    
    // Animação inicial
    setTimeout(() => {
        updateContainerClasses(mindMap, container);
    }, 500);
}

/**
 * Configura os eventos customizados
 * @param {MindMap} mindMap - Instância do mapa mental
 */
function setupCustomEvents(mindMap) {
    // Evento para remover indicador quando houver nós
    mindMap.nodes.on('add', () => {
        if (mindMap.nodes.length > 0) {
            const container = getContainer();
            container.classList.add(CONFIG.HAS_NODES_CLASS);
            container.classList.remove(CONFIG.CENTER_INDICATOR_CLASS);
        }
    });
    
    // Adicionar classe para indicador central quando não houver nós
    if (mindMap.nodes.length === 0) {
        const container = getContainer();
        container.classList.add(CONFIG.CENTER_INDICATOR_CLASS);
    }
}

/**
 * Configura os eventos da rede vis.js
 * @param {MindMap} mindMap - Instância do mapa mental
 * @param {HTMLElement} container - Container do mapa mental
 */
function setupNetworkEvents(mindMap, container) {
    // Evento de zoom para ajustar o background
    mindMap.network.on('zoom', (params) => {
        handleZoomEvent(container, params.scale);
    });
    
    // Suporte a rótulos nas conexões (arestas)
    mindMap.network.on('selectEdge', (params) => {
        handleEdgeSelection(mindMap, params);
    });
}

// ===== HANDLERS DE EVENTOS =====

/**
 * Manipula a adição de um novo nó
 * @param {MindMap} mindMap - Instância do mapa mental
 */
function handleAddNode(mindMap) {
    const selectedNodes = mindMap.network.getSelectedNodes();
    if (selectedNodes.length > 0) {
        const parentId = selectedNodes[0];
        const label = prompt('Digite o texto do novo nó:');
        if (label) {
            const newNodeId = mindMap.addNode(label, parentId);
            console.log(MESSAGES.NEW_NODE_ADDED, newNodeId);
        }
    } else {
        alert(MESSAGES.SELECT_PARENT_NODE);
    }
}

/**
 * Manipula a edição de um nó
 * @param {MindMap} mindMap - Instância do mapa mental
 */
function handleEditNode(mindMap) {
    const selectedNodes = mindMap.network.getSelectedNodes();
    if (selectedNodes.length > 0) {
        const nodeId = selectedNodes[0];
        const currentLabel = mindMap.nodes.get(nodeId).label;
        const newLabel = prompt('Editar texto do nó:', currentLabel);
        if (newLabel) {
            mindMap.editNode(nodeId, newLabel);
        }
    } else {
        alert(MESSAGES.SELECT_NODE_TO_EDIT);
    }
}

/**
 * Manipula a remoção de um nó
 * @param {MindMap} mindMap - Instância do mapa mental
 */
function handleDeleteNode(mindMap) {
    const selectedNodes = mindMap.network.getSelectedNodes();
    if (selectedNodes.length > 0) {
        const nodeId = selectedNodes[0];
        
        // Não permitir excluir o nó central (id: 1)
        if (nodeId === 1) {
            alert(MESSAGES.CANNOT_REMOVE_ROOT);
            return;
        }
        
        if (confirm(MESSAGES.CONFIRM_REMOVE)) {
            mindMap.removeNode(nodeId);
        }
    } else {
        alert(MESSAGES.SELECT_NODE_TO_REMOVE);
    }
}

/**
 * Manipula a mudança de cor de um nó
 * @param {MindMap} mindMap - Instância do mapa mental
 */
function handleChangeColor(mindMap) {
    const selectedNodes = mindMap.network.getSelectedNodes();
    if (selectedNodes.length > 0) {
        const nodeId = selectedNodes[0];
        const colorScheme = mindMap.getNextColorScheme();
        mindMap.changeNodeColor(nodeId, colorScheme.node);
        
        // Atualizar arestas conectadas
        const connectedEdges = mindMap.network.getConnectedEdges(nodeId);
        connectedEdges.forEach(edgeId => {
            const edge = mindMap.edges.get(edgeId);
            if (edge.from === nodeId) {
                mindMap.changeEdgeColor(edgeId, colorScheme.edge);
            }
        });
    } else {
        alert(MESSAGES.SELECT_NODE_FOR_COLOR);
    }
}

/**
 * Manipula a mudança de forma de um nó
 * @param {MindMap} mindMap - Instância do mapa mental
 */
function handleChangeShape(mindMap) {
    const selectedNodes = mindMap.network.getSelectedNodes();
    if (selectedNodes.length > 0) {
        const nodeId = selectedNodes[0];
        const shapes = ['dot', 'diamond', 'triangle', 'square', 'star', 'ellipse'];
        const currentShape = mindMap.nodes.get(nodeId).shape;
        const currentIndex = shapes.indexOf(currentShape);
        const nextShape = shapes[(currentIndex + 1) % shapes.length];
        
        mindMap.changeNodeShape(nodeId, nextShape);
    } else {
        alert(MESSAGES.SELECT_NODE_FOR_SHAPE);
    }
}

/**
 * Manipula a mudança de forma via evento customizado
 * @param {MindMap} mindMap - Instância do mapa mental
 * @param {string} shape - Nova forma
 */
function handleShapeChange(mindMap, shape) {
    const selectedNodes = mindMap.network.getSelectedNodes();
    if (selectedNodes.length > 0) {
        const nodeId = selectedNodes[0];
        mindMap.changeNodeShape(nodeId, shape);
    } else {
        alert(MESSAGES.SELECT_NODE_FOR_SHAPE);
    }
}

/**
 * Manipula o salvamento do mapa
 * @param {MindMap} mindMap - Instância do mapa mental
 */
function handleSaveMap(mindMap) {
    const mapName = prompt('Digite um nome para salvar o mapa mental:');
    if (mapName) {
        if (mindMap.saveToLocalStorage(mapName)) {
            alert(`Mapa mental "${mapName}" salvo com sucesso!`);
        } else {
            alert('Erro ao salvar o mapa mental.');
        }
    }
}

/**
 * Manipula o carregamento do mapa
 * @param {MindMap} mindMap - Instância do mapa mental
 */
function handleLoadMap(mindMap) {
    const mapName = prompt('Digite o nome do mapa mental a ser carregado:');
    if (mapName) {
        if (mindMap.loadFromLocalStorage(mapName)) {
            alert(`Mapa mental "${mapName}" carregado com sucesso!`);
        } else {
            alert(`Não foi possível carregar o mapa mental "${mapName}".`);
        }
    }
}

/**
 * Manipula a exportação de imagem
 * @param {MindMap} mindMap - Instância do mapa mental
 */
function handleExportImage(mindMap) {
    const dataUrl = mindMap.exportAsImage();
    if (dataUrl) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'mapa-mental.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('Não foi possível exportar o mapa mental como imagem.');
    }
}

/**
 * Manipula a personalização de nós
 * @param {MindMap} mindMap - Instância do mapa mental
 * @param {Object} customization - Dados de personalização
 */
function handleCustomizeNode(mindMap, customization) {
    const selectedNodes = mindMap.network.getSelectedNodes();
    if (selectedNodes.length > 0) {
        selectedNodes.forEach(nodeId => {
            mindMap.nodes.update({
                id: nodeId,
                color: {
                    background: customization.color,
                    border: customization.borderColor
                },
                font: {
                    face: customization.font
                },
                shape: customization.shape
            });
        });
    } else {
        alert(MESSAGES.SELECT_NODE_TO_CUSTOMIZE);
    }
}

/**
 * Manipula o evento de zoom
 * @param {HTMLElement} container - Container do mapa mental
 * @param {number} scale - Escala do zoom
 */
function handleZoomEvent(container, scale) {
    const smallGridSize = Math.max(5, Math.min(40, 20 * scale));
    const largeGridSize = smallGridSize * 10;
    
    container.style.backgroundSize = 
        `${smallGridSize}px ${smallGridSize}px, ${smallGridSize}px ${smallGridSize}px, ${largeGridSize}px ${largeGridSize}px, ${largeGridSize}px ${largeGridSize}px`;
    
    const smallGridOpacity = Math.max(0.05, Math.min(0.2, 0.2 / scale));
    const largeGridOpacity = Math.max(0.1, Math.min(0.25, 0.25 / scale));
    
    container.style.backgroundImage = `
        linear-gradient(to right, rgba(200, 200, 200, ${smallGridOpacity}) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(200, 200, 200, ${smallGridOpacity}) 1px, transparent 1px),
        linear-gradient(to right, rgba(180, 180, 180, ${largeGridOpacity}) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(180, 180, 180, ${largeGridOpacity}) 1px, transparent 1px)
    `;
}

/**
 * Manipula a seleção de arestas
 * @param {MindMap} mindMap - Instância do mapa mental
 * @param {Object} params - Parâmetros do evento
 */
function handleEdgeSelection(mindMap, params) {
    if (params.edges.length > 0) {
        const edgeId = params.edges[0];
        const currentLabel = mindMap.edges.get(edgeId).label || '';
        const newLabel = prompt('Digite o texto do rótulo da conexão:', currentLabel);
        if (newLabel !== null) {
            mindMap.edges.update({ id: edgeId, label: newLabel });
        }
    }
}

/**
 * Atualiza as classes do container baseado no estado do mapa
 * @param {MindMap} mindMap - Instância do mapa mental
 * @param {HTMLElement} container - Container do mapa mental
 */
function updateContainerClasses(mindMap, container) {
    if (mindMap.nodes.length === 0) {
        container.classList.add(CONFIG.EMPTY_CONTAINER_CLASS);
    } else {
        container.classList.remove(CONFIG.EMPTY_CONTAINER_CLASS);
    }
}