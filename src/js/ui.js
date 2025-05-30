/**
 * @fileoverview Gerenciador de interface de usuário para toolbar e submenus
 * @description Manipula interações da UI como submenu de formas, alternância de tema e personalização
 * @author Sistema de Mapa Mental
 * @version 1.0.0
 */

/**
 * Configurações da UI
 */
const UI_CONFIG = {
    SELECTORS: {
        CHANGE_SHAPE_BTN: '#change-shape',
        SHAPE_SUBMENU: '#shape-submenu',
        SHAPE_OPTIONS: '.shape-option',
        MORE_SHAPES_BTN: '#more-shapes',
        THEME_TOGGLE_BTN: '#theme-toggle',
        CUSTOMIZE_BTN: '#customize-nodes',
        CUSTOMIZATION_PANEL: '#customization-panel',
        CLOSE_CUSTOMIZATION: '#close-customization',
        APPLY_CUSTOMIZATION: '#apply-customization',
        NODE_COLOR_PICKER: '#node-color-picker',
        NODE_BORDER_COLOR_PICKER: '#node-border-color-picker',
        NODE_FONT_SELECT: '#node-font-select',
        NODE_SHAPE_SELECT: '#node-shape-select'
    },
    CLASSES: {
        DARK_THEME: 'dark-theme'
    },
    STORAGE_KEYS: {
        THEME: 'theme'
    },
    THEMES: {
        DARK: 'dark',
        LIGHT: 'light'
    },
    DISPLAY: {
        BLOCK: 'block',
        NONE: 'none'
    }
};

/**
 * Inicializa a UI quando o DOM está carregado
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeUI();
});

/**
 * Inicializa todos os componentes da UI
 */
function initializeUI() {
    initializeShapeSubmenu();
    initializeThemeToggle();
    initializeCustomization();
}

/**
 * Inicializa o submenu de formas
 */
function initializeShapeSubmenu() {
    const changeShapeBtn = document.querySelector(UI_CONFIG.SELECTORS.CHANGE_SHAPE_BTN);
    const shapeSubmenu = document.querySelector(UI_CONFIG.SELECTORS.SHAPE_SUBMENU);
    const shapeOptions = document.querySelectorAll(UI_CONFIG.SELECTORS.SHAPE_OPTIONS);
    const moreShapesBtn = document.querySelector(UI_CONFIG.SELECTORS.MORE_SHAPES_BTN);
    
    if (!changeShapeBtn || !shapeSubmenu) {
        console.warn('Elementos do submenu de formas não encontrados');
        return;
    }
    
    let submenuOpen = false;
    
    /**
     * Alterna a visibilidade do submenu
     * @param {Event} event - Evento de clique
     */
    const toggleSubmenu = (event) => {
        if (event) {
            event.stopPropagation();
        }
        submenuOpen = !submenuOpen;
        shapeSubmenu.style.display = submenuOpen ? UI_CONFIG.DISPLAY.BLOCK : UI_CONFIG.DISPLAY.NONE;
    };
    
    // Configurar eventos
    changeShapeBtn.addEventListener('click', toggleSubmenu);
    
    // Fechar submenu ao clicar fora
    document.addEventListener('click', (event) => {
        if (submenuOpen && !changeShapeBtn.contains(event.target)) {
            closeSubmenu();
        }
    });
    
    // Configurar opções de forma
    shapeOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            handleShapeOptionClick(event, option);
            closeSubmenu();
        });
    });
    
    // Configurar botão "Mais formas"
    if (moreShapesBtn) {
        moreShapesBtn.addEventListener('click', handleMoreShapesClick);
    }
    
    /**
     * Fecha o submenu
     */
    function closeSubmenu() {
        submenuOpen = false;
        shapeSubmenu.style.display = UI_CONFIG.DISPLAY.NONE;
    }
    
    /**
     * Manipula o clique em uma opção de forma
     * @param {Event} event - Evento de clique
     * @param {HTMLElement} option - Elemento da opção
     */
    function handleShapeOptionClick(event, option) {
        event.stopPropagation();
        const shape = option.dataset.shape;
        
        if (shape) {
            dispatchShapeChangeEvent(shape);
        }
    }
    
    /**
     * Manipula o clique no botão "Mais formas"
     * @param {Event} event - Evento de clique
     */
    function handleMoreShapesClick(event) {
        event.stopPropagation();
        alert('Mais formas em breve!');
    }
    
    /**
     * Dispara evento customizado de mudança de forma
     * @param {string} shape - Nova forma selecionada
     */
    function dispatchShapeChangeEvent(shape) {
        const shapeChangeEvent = new CustomEvent('shapeChange', {
            detail: { shape }
        });
        document.dispatchEvent(shapeChangeEvent);
    }
}

/**
 * Inicializa a alternância de tema
 */
function initializeThemeToggle() {
    const themeToggleBtn = document.querySelector(UI_CONFIG.SELECTORS.THEME_TOGGLE_BTN);
    
    if (!themeToggleBtn) {
        console.warn('Botão de alternância de tema não encontrado');
        return;
    }
    
    // Configurar evento de clique
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // Carregar tema salvo
    loadSavedTheme();
    
    /**
     * Alterna entre tema claro e escuro
     */
    function toggleTheme() {
        document.body.classList.toggle(UI_CONFIG.CLASSES.DARK_THEME);
        saveThemePreference();
    }
    
    /**
     * Salva a preferência de tema no localStorage
     */
    function saveThemePreference() {
        const isDarkTheme = document.body.classList.contains(UI_CONFIG.CLASSES.DARK_THEME);
        const theme = isDarkTheme ? UI_CONFIG.THEMES.DARK : UI_CONFIG.THEMES.LIGHT;
        localStorage.setItem(UI_CONFIG.STORAGE_KEYS.THEME, theme);
    }
    
    /**
     * Carrega o tema salvo do localStorage
     */
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem(UI_CONFIG.STORAGE_KEYS.THEME);
        if (savedTheme === UI_CONFIG.THEMES.DARK) {
            document.body.classList.add(UI_CONFIG.CLASSES.DARK_THEME);
        }
    }
}

/**
 * Inicializa o sistema de personalização
 */
function initializeCustomization() {
    const customizeBtn = document.querySelector(UI_CONFIG.SELECTORS.CUSTOMIZE_BTN);
    const customizationPanel = document.querySelector(UI_CONFIG.SELECTORS.CUSTOMIZATION_PANEL);
    const closeCustomization = document.querySelector(UI_CONFIG.SELECTORS.CLOSE_CUSTOMIZATION);
    const applyCustomization = document.querySelector(UI_CONFIG.SELECTORS.APPLY_CUSTOMIZATION);
    
    if (!customizeBtn || !customizationPanel) {
        console.warn('Elementos de personalização não encontrados');
        return;
    }
    
    // Configurar eventos
    customizeBtn.addEventListener('click', openCustomizationPanel);
    
    if (closeCustomization) {
        closeCustomization.addEventListener('click', closeCustomizationPanel);
    }
    
    if (applyCustomization) {
        applyCustomization.addEventListener('click', applyNodeCustomization);
    }
    
    /**
     * Abre o painel de personalização
     */
    function openCustomizationPanel() {
        customizationPanel.style.display = UI_CONFIG.DISPLAY.BLOCK;
    }
    
    /**
     * Fecha o painel de personalização
     */
    function closeCustomizationPanel() {
        customizationPanel.style.display = UI_CONFIG.DISPLAY.NONE;
    }
    
    /**
     * Aplica as personalizações selecionadas
     */
    function applyNodeCustomization() {
        const customizationData = getCustomizationData();
        
        if (customizationData) {
            dispatchCustomizeNodeEvent(customizationData);
            closeCustomizationPanel();
        }
    }
    
    /**
     * Obtém os dados de personalização dos inputs
     * @returns {Object|null} Dados de personalização ou null se inválidos
     */
    function getCustomizationData() {
        const colorPicker = document.querySelector(UI_CONFIG.SELECTORS.NODE_COLOR_PICKER);
        const borderColorPicker = document.querySelector(UI_CONFIG.SELECTORS.NODE_BORDER_COLOR_PICKER);
        const fontSelect = document.querySelector(UI_CONFIG.SELECTORS.NODE_FONT_SELECT);
        const shapeSelect = document.querySelector(UI_CONFIG.SELECTORS.NODE_SHAPE_SELECT);
        
        if (!colorPicker || !borderColorPicker || !fontSelect || !shapeSelect) {
            console.warn('Elementos de personalização não encontrados');
            return null;
        }
        
        return {
            color: colorPicker.value,
            borderColor: borderColorPicker.value,
            font: fontSelect.value,
            shape: shapeSelect.value
        };
    }
    
    /**
     * Dispara evento customizado de personalização de nó
     * @param {Object} customizationData - Dados de personalização
     */
    function dispatchCustomizeNodeEvent(customizationData) {
        const customizeEvent = new CustomEvent('customizeNode', {
            detail: customizationData
        });
        document.dispatchEvent(customizeEvent);
    }
}