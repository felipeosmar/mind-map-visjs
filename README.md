# 🧠 Mapa Mental Interativo

Uma aplicação web moderna e interativa para criação e edição de mapas mentais, construída com HTML5, CSS3, JavaScript ES6+ e a biblioteca vis.js.

## ✨ Características

### 🎯 Funcionalidades Principais

- **Criação Intuitiva**: Duplo clique para criar nós
- **Edição Dinâmica**: Edite textos e propriedades facilmente  
- **Conexões Automáticas**: Arestas criadas automaticamente entre nós pai e filho
- **Personalização Avançada**: Cores, formas, fontes e estilos customizáveis
- **Persistência Local**: Salve e carregue mapas usando localStorage
- **Exportação**: Exporte mapas como imagens PNG
- **Temas**: Alternância entre tema claro e escuro
- **Responsivo**: Interface adaptável para diferentes tamanhos de tela

### 🎨 Interface Moderna

- Design limpo e intuitivo
- Animações suaves e transições
- Ícones SVG escaláveis
- Sistema de grid visual
- Indicadores visuais para estados vazios

### ♿ Acessibilidade

- Suporte completo a leitores de tela
- Navegação por teclado
- Atributos ARIA apropriados
- Alto contraste quando necessário
- Respeita preferências de movimento reduzido

## 🚀 Como Usar

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd mind-map-visjs
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm start
```

4. Abra o navegador em `http://localhost:8080`

### Uso Básico

#### Criando Nós

- **Primeiro nó**: Dê um duplo clique na área vazia do canvas
- **Nós filhos**: Dê um duplo clique em um nó existente
- **Usando botão**: Selecione um nó e clique no botão ➕ na barra lateral

#### Editando Nós

- **Texto**: Selecione um nó e clique no botão ✏️ ou use duplo clique
- **Cor**: Selecione um nó e clique no botão 🎨
- **Forma**: Use o submenu de formas na barra lateral
- **Personalização**: Use o painel de personalização (🎨)

#### Gerenciando Mapas

- **Salvar**: Clique no botão 💾 e digite um nome
- **Carregar**: Clique no botão 📁 e digite o nome do mapa
- **Exportar**: Clique no botão 📸 para baixar como PNG

#### Navegação

- **Zoom**: Use a roda do mouse ou os controles de navegação
- **Pan**: Arraste o canvas para mover
- **Seleção**: Clique em nós/arestas para selecionar
- **Múltipla seleção**: Ctrl + clique para selecionar múltiplos elementos

## 🏗️ Arquitetura do Projeto

### Estrutura de Arquivos

```text
src/
├── index.html              # Página principal
├── css/
│   ├── style.css           # Estilos principais
│   └── theme.css           # Sistema de temas
├── js/
│   ├── main.js             # Ponto de entrada da aplicação
│   ├── ui.js               # Gerenciador de interface
│   └── components/
│       └── MindMap.js      # Classe principal do mapa mental
└── assets/
    └── icons/              # Ícones SVG
```

### Componentes Principais

#### MindMap.js

Classe principal que gerencia:

- Inicialização da rede vis.js
- CRUD de nós e arestas
- Eventos de interação
- Persistência de dados
- Exportação de imagens

#### main.js

Ponto de entrada que:

- Inicializa a aplicação
- Configura event listeners
- Coordena comunicação entre componentes
- Gerencia eventos de rede

#### ui.js

Gerenciador de UI que controla:

- Submenu de formas
- Alternância de temas
- Painel de personalização
- Estados visuais da interface

### Padrões de Design

#### Event-Driven Architecture

- Comunicação via eventos customizados do DOM
- Baixo acoplamento entre componentes
- Fácil extensibilidade

#### Module Pattern

- Código organizado em módulos ES6
- Encapsulamento de funcionalidades
- Importações/exportações explícitas

#### Configuration Objects

- Configurações centralizadas em objetos
- Fácil manutenção e modificação
- Valores padrão bem definidos

## 🎯 Boas Práticas Implementadas

### JavaScript

- **ES6+ Features**: Uso de classes, arrow functions, destructuring
- **Módulos ES6**: Organização modular do código
- **Error Handling**: Tratamento adequado de erros
- **Documentação JSDoc**: Comentários completos em todas as funções
- **Consistent Naming**: Convenções de nomenclatura consistentes
- **Pure Functions**: Funções sem efeitos colaterais quando possível

### CSS

- **Metodologia BEM**: Nomeação clara de classes
- **CSS Variables**: Uso de custom properties para temas
- **Mobile First**: Design responsivo
- **Accessibility**: Estilos para diferentes necessidades
- **Performance**: Otimizações para renderização

### HTML

- **Semantic HTML**: Uso apropriado de elementos semânticos
- **ARIA Labels**: Atributos de acessibilidade completos
- **Meta Tags**: SEO e compartilhamento social otimizados
- **Progressive Enhancement**: Funciona sem JavaScript básico

### Performance

- **Lazy Loading**: Scripts carregados de forma otimizada
- **Preload**: Recursos críticos pré-carregados
- **Caching**: Estratégias de cache implementadas
- **Minimal Dependencies**: Apenas bibliotecas essenciais

## 🔧 Configuração e Customização

### Cores e Temas

Edite `src/css/theme.css` para customizar:

- Paleta de cores
- Esquemas de tema
- Variáveis CSS
- Modo escuro/claro

### Configurações do Mapa

Modifique `src/js/components/MindMap.js`:

- Opções de física da rede
- Estilos padrão de nós/arestas
- Esquemas de cores
- Comportamentos de interação

### Interface

Ajuste `src/js/ui.js` para:

- Adicionar novos controles
- Modificar comportamentos
- Implementar novos temas
- Personalizar interações

## 🧪 Testes e Validação

### Testes Manuais Recomendados

1. **Criação de Nós**: Teste duplo clique e botões
2. **Edição**: Verifique edição de texto e propriedades
3. **Navegação**: Zoom, pan e seleção
4. **Persistência**: Salvar/carregar mapas
5. **Exportação**: Download de imagens
6. **Responsividade**: Teste em diferentes tamanhos
7. **Acessibilidade**: Navegação por teclado e screen readers
8. **Temas**: Alternância entre claro/escuro

### Validação de Código

```bash
# Validação HTML
npx html-validate src/index.html

# Lint CSS
npx stylelint src/css/*.css

# Lint JavaScript
npx eslint src/js/*.js
```

## 🌐 Compatibilidade de Navegadores

### Suportados

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Recursos Modernos Utilizados

- ES6 Modules
- CSS Custom Properties
- Flexbox/Grid
- SVG
- LocalStorage
- Canvas API

## 📋 Comandos Disponíveis

```bash
# Desenvolvimento
npm start          # Inicia servidor de desenvolvimento
npm run dev         # Alias para npm start

# Build (se implementado)
npm run build       # Gera versão otimizada para produção

# Testes
npm test           # Executa testes (se implementados)
npm run lint       # Validação de código

# Limpeza
npm run clean      # Remove arquivos temporários
```

## 🤝 Contribuindo

### Diretrizes de Desenvolvimento

1. **Siga as convenções**: Use os padrões estabelecidos
2. **Documente**: Adicione JSDoc em todas as funções
3. **Teste**: Valide funcionalidades antes de commit
4. **Acessibilidade**: Mantenha padrões de acessibilidade
5. **Performance**: Considere impacto na performance

### Processo de Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Implemente suas mudanças
4. Teste completamente
5. Submeta um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 🔗 Links Úteis

- [Documentação vis.js](https://visjs.github.io/vis-network/docs/network/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

## 📞 Suporte

Para reportar bugs ou sugerir melhorias:

1. Abra uma issue no GitHub
2. Descreva detalhadamente o problema
3. Inclua passos para reproduzir
4. Anexe capturas de tela se necessário

---

Feito com ❤️ para facilitar a organização de ideias através de mapas mentais interativos.