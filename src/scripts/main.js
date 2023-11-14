import { Trabalhadores, Professor, Secrataria, RH, TI } from "./funcionarios"

document.addEventListener("DOMContentLoaded", () => {
    const buttonEntrar = document.querySelector('form')
    const homePage = document.querySelector('.home-page')

    buttonEntrar.addEventListener('submit', function (e) {
        e.preventDefault()
        homePage.style.display = 'none';
    })

    TrocaConteudo()
    Funcionarios()
})

function TrocaConteudo() {
    const liItems = document.querySelectorAll('.main-page__side-bar__container__item')
    const contents = document.querySelectorAll('.main-page__content > div')

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

            //mostra somente o conteudo referente ao indice
            contents[indice].style.display = 'flex';
        });
    });
}

function Funcionarios() {
    const inputs = document.querySelectorAll('.main-page__content__funcionarios__cadastrar__form__input > input, .main-page__content__funcionarios__cadastrar__form__input > select')
    const form = document.querySelector('.main-page__content__funcionarios__cadastrar__form')
    const opcao = document.getElementById('profissoes')

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

        console.log(Trabalhadores)
    })
}
