import { Trabalhadores, Professor, Secrataria, RH, TI } from "./funcionarios"

document.addEventListener("DOMContentLoaded", () => {
    const buttonEntrar = document.querySelector('form')
    const homePage = document.querySelector('.home-page')

    buttonEntrar.addEventListener('submit', function (e) {
        e.preventDefault()
        homePage.style.display = 'none';
    })

    TrocaConteudo()
    FuncionariosCad()
    SelecionaOpcao()
    funcionariosAut(Trabalhadores)

    // console.log(Trabalhadores)
})

function TrocaConteudo() {
    const liItems = document.querySelectorAll('.main-page__side-bar__container__item')
    const contents = document.querySelectorAll('.main-page__content > div.main')
    const opcoes = document.querySelectorAll('.main-page__content__opcoes > div')

    liItems.forEach((item, indice) => {
        item.addEventListener('click', () => {
            //removendo o modificador --active
            liItems.forEach(otherItem => {
                otherItem.classList.remove('main-page__side-bar__container__item--active');
            });
            //adicionando o modificador no item q foi clicado
            item.classList.add('main-page__side-bar__container__item--active');

            //oculta todos os conteudos
            contents.forEach(item => item.style.display = 'none')
            opcoes.forEach(item => item.style.display = 'none')

            //mostra somente o conteudo referente ao indice
            contents[indice].style.display = 'flex';
        });
    });
}

function FuncionariosCad() {
    const inputs = document.querySelectorAll('.main-page__content__opcoes__cadastrar__form__input > input')
    const form = document.querySelector('.main-page__content__opcoes__cadastrar__form')
    const opcao = document.getElementById('profissoes')
    const buttonCancelar = document.querySelectorAll('.cancelar')

    let novoFuncionario = ''

    form.addEventListener('submit', () => {

        if (opcao.value === 'professor') {
            novoFuncionario = new Professor(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value)
            Trabalhadores.push(novoFuncionario)
        }

        if (opcao.value === 'Rh') {
            novoFuncionario = new RH(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value)
            Trabalhadores.push(novoFuncionario)
        }

        if (opcao.value === 'Ti') {
            novoFuncionario = new TI(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value)
            Trabalhadores.push(novoFuncionario)
        }

        if (opcao.value === 'secretaria') {
            novoFuncionario = new Secrataria(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value)
            Trabalhadores.push(novoFuncionario)
        }

        form.reset()
        alert(`Usuário ${novoFuncionario.nome} cadastrado com sucesso`)
    })

    buttonCancelar.forEach(item => {
        item.addEventListener('click', () => {
            //removendo o form da tela
            document.querySelector('.main-page__content__opcoes__cadastrar').style.display = 'none';
            document.querySelector('.main-page__content__opcoes__alterar').style.display = 'none';

            //retornando a tela de escolha de opção
            document.querySelector('.main-page__content__funcionarios').style.display = 'flex';
        })
    })
}

function SelecionaOpcao() {
    const Lis = document.querySelectorAll('.main-page__content__funcionarios__nav__container__item')
    const opcoes = document.querySelectorAll('.main-page__content__opcoes > div')
    const containerItens = document.querySelector('.main-page__content__funcionarios')

    Lis.forEach((item, indice) => {
        item.addEventListener('click', () => {
            containerItens.style.display = 'none'

            document.querySelector('.main-page__content__opcoes').style.display = 'block';
            opcoes.forEach(item => item.style.display = 'none')
            opcoes[indice].style.display = 'block'
        })
    })
}

function funcionariosAut1(array) {
    const CampoSearch = document.getElementById('campoSearch')
    const buttonSearch = document.getElementById('buttonSearch')
    let corpoForm = document.querySelector('.main-page__content__opcoes__alterar__content__container')
    let funcionarioEncontrado = null

    buttonSearch.addEventListener('click', () => {
        const nomePesquisado = CampoSearch.value.toLowerCase()

        funcionarioEncontrado = Trabalhadores.find(item => item.nome === nomePesquisado)


    })

}

function funcionariosAut(array) {
    const CampoSearch = document.getElementById('campoSearch');
    const buttonSearch = document.getElementById('buttonSearch');
    const corpoForm = document.querySelector('.main-page__content__opcoes__alterar__content');

    buttonSearch.addEventListener('click', () => {
        const nomePesquisado = CampoSearch.value.toLowerCase();

        const funcionarioEncontrado = array.find(item => item.nome.toLowerCase() === nomePesquisado);

        if (funcionarioEncontrado) {
            const form = document.createElement('form');
            form.classList.add('main-page__content__opcoes__alterar__content__container__form');

            for (const prop in funcionarioEncontrado) {
                const label = document.createElement('label');
                label.textContent = prop;
                const input = document.createElement('input');
                input.name = prop;
                input.value = funcionarioEncontrado[prop];
                form.appendChild(label);
                form.appendChild(input);
            }

            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = 'Salvar';
            form.appendChild(submitButton);

            corpoForm.innerHTML = '';
            corpoForm.appendChild(form);

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                for (const prop in funcionarioEncontrado) {
                    funcionarioEncontrado[prop] = form[prop].value;
                }
                alert(`Dados do funcionário ${funcionarioEncontrado.nome} atualizados com sucesso!`);
                console.log(Trabalhadores)
            });
        } else {
            alert('Usuário não encontrado');
        }
    });
}

