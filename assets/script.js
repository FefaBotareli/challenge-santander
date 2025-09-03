// Adiciona um "ouvinte" que espera o HTML da página carregar completamente.
// Usamos apenas UM para o arquivo inteiro.
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM carregado. script.js em execução.');

    // ==========================================================
    //                  FUNÇÕES GLOBAIS
    // ==========================================================

    // Inicializa os Ícones (Feather Icons) de forma segura
    if (typeof feather !== 'undefined') {
        feather.replace();
        console.log('Feather Icons inicializados.');
    } else {
        console.error('A biblioteca Feather Icons não foi carregada.');
    }

    // ==========================================================
    //                  LÓGICA DA PÁGINA DE LOGIN
    // ==========================================================
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        console.log('Lógica da página de LOGIN ativada.');
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            window.location.href = 'home.html';
        });
    }

    // ==========================================================
    //                  LÓGICA DAS ABAS (PÁGINA DE ANÁLISES)
    // ==========================================================
    const tabsContainer = document.getElementById('tabs-container');
    if (tabsContainer) {
        console.log('Lógica das ABAS ativada.');
        const tabLinks = document.querySelectorAll('.tab-link');
        const tabContents = document.querySelectorAll('.tab-content');

        tabsContainer.addEventListener('click', function (event) {
            const clickedTab = event.target.closest('.tab-link');
            if (!clickedTab) return;

            event.preventDefault();
            const tabId = clickedTab.dataset.tab;

            tabLinks.forEach(tab => tab.classList.remove('active'));
            clickedTab.classList.add('active');

            tabContents.forEach(content => content.classList.add('hidden'));
            const activeContent = document.getElementById(tabId + '-content');
            if (activeContent) {
                activeContent.classList.remove('hidden');
            }
        });
    }

    // ==========================================================
    //                  LÓGICA DO MODAL (PÁGINA DE DADOS)
    // ==========================================================
    const detailsModal = document.getElementById('details-modal');
    const openModalBtn = document.getElementById('open-modal-btn');
    if (detailsModal && openModalBtn) {
        console.log('Lógica do MODAL de Dados ativada.');
        const closeModalBtns = detailsModal.querySelectorAll('.close-modal-btn');

        const openModal = () => detailsModal.classList.remove('hidden');
        const closeModal = () => detailsModal.classList.add('hidden');

        openModalBtn.addEventListener('click', openModal);
        closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
        detailsModal.addEventListener('click', (event) => {
            if (event.target === detailsModal) {
                closeModal();
            }
        });
    }

    // ==========================================================
    //            LÓGICA DO CRUD (PÁGINA ADMINISTRATIVO)
    // ==========================================================
    const userTableBody = document.getElementById('user-table-body');
    if (userTableBody) {
        console.log('Lógica do CRUD Administrativo ativada.');

        let selectedRow = null;
        let selectedUserData = {};

        const openEditBtn = document.getElementById('open-edit-modal-btn');
        const openDeleteBtn = document.getElementById('open-delete-modal-btn');
        const openCreateBtn = document.getElementById('open-create-modal-btn');
        
        const createModal = document.getElementById('create-modal');
        const editModal = document.getElementById('edit-modal');
        const deleteModal = document.getElementById('delete-modal');

        const editForm = document.getElementById('edit-form');
        const deleteUserName = document.getElementById('delete-user-name');
        const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

        // ATUALIZAÇÃO: Pega TODOS os botões de fechar e todos os modais da página
        const allModals = document.querySelectorAll('.fixed.inset-0'); // Uma forma de pegar todos os modais
        const allCloseModalBtns = document.querySelectorAll('.close-modal-btn');
        
        const openGenericModal = (modal) => modal.classList.remove('hidden');
        const closeAllModals = () => {
            allModals.forEach(modal => modal.classList.add('hidden'));
        };

        // --- Lógica de Seleção de Linha ---
        userTableBody.addEventListener('click', (event) => {
            const row = event.target.closest('tr');
            if (!row) return;

            if (selectedRow) {
                selectedRow.classList.remove('table-row-selected');
            }

            row.classList.add('table-row-selected');
            selectedRow = row;
            selectedUserData = {
                id: row.dataset.userId,
                nome: row.dataset.nome,
                email: row.dataset.email,
                perfil: row.dataset.perfil,
                ativo: row.dataset.ativo,
            };
            
            openEditBtn.disabled = false;
            openDeleteBtn.disabled = false;
            console.log('Usuário selecionado:', selectedUserData);
        });

        // --- Lógicas de Abertura dos Modais ---
        openCreateBtn.addEventListener('click', () => openGenericModal(createModal));
        
        openEditBtn.addEventListener('click', () => {
            if (!selectedRow) return alert('Por favor, selecione um usuário para editar.');
            editForm.elements['id'].value = selectedUserData.id;
            editForm.elements['nome'].value = selectedUserData.nome;
            editForm.elements['email'].value = selectedUserData.email;
            editForm.elements['perfil'].value = selectedUserData.perfil;
            editForm.elements['ativo'].value = selectedUserData.ativo;
            openGenericModal(editModal);
        });

        openDeleteBtn.addEventListener('click', () => {
            if (!selectedRow) return alert('Por favor, selecione um usuário para excluir.');
            deleteUserName.textContent = selectedUserData.nome;
            openGenericModal(deleteModal);
        });
        
        // --- Lógica de Exclusão ---
        confirmDeleteBtn.addEventListener('click', () => {
            if (selectedRow) {
                selectedRow.remove();
                console.log('Usuário com ID', selectedUserData.id, 'excluído.');
                selectedRow = null;
                selectedUserData = {};
                openEditBtn.disabled = true;
                openDeleteBtn.disabled = true;
                closeAllModals();
            }
        });

        // --- ATUALIZAÇÃO: Lógica para fechar QUALQUER modal ---
        allCloseModalBtns.forEach(btn => btn.addEventListener('click', closeAllModals));

        // Fechar ao clicar no fundo
        allModals.forEach(modal => {
             modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeAllModals();
                }
            });
        });
    }
});